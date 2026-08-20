import type {
  VitrineAdvanceReason,
  VitrineItem,
} from "../../../packages/data-contracts/src/index.ts";

export type VitrineClock = () => Date;

/**
 * Núcleo puro do ciclo da Vitrine. Adaptadores de Web e Mobile controlam
 * temporizadores e eventos de mídia e chamam os métodos de avanço adequados.
 */
export class VitrineEngine {
  private readonly clock: VitrineClock;
  private items: readonly VitrineItem[];
  private currentItemId: string | null = null;

  constructor(items: readonly VitrineItem[] = [], clock: VitrineClock = () => new Date()) {
    this.items = [...items];
    this.clock = clock;
  }

  replaceItems(items: readonly VitrineItem[]): void {
    this.items = [...items];
    if (!this.findEligibleById(this.currentItemId, this.clock())) {
      this.currentItemId = null;
    }
  }

  getEligibleItems(at: Date = this.clock()): readonly VitrineItem[] {
    return this.items
      .filter((item) => this.isEligible(item, at))
      .sort(compareVitrineItems);
  }

  getCurrent(at: Date = this.clock()): VitrineItem | null {
    const current = this.findEligibleById(this.currentItemId, at);
    if (current) {
      return current;
    }

    const [first] = this.getEligibleItems(at);
    this.currentItemId = first?.id ?? null;
    return first ?? null;
  }

  getCurrentDurationMs(at: Date = this.clock()): number | null {
    return this.getCurrent(at)?.durationMs ?? null;
  }

  selectNext(at: Date = this.clock()): VitrineItem | null {
    const eligibleItems = this.getEligibleItems(at);
    if (eligibleItems.length === 0) {
      this.currentItemId = null;
      return null;
    }

    const currentIndex = eligibleItems.findIndex((item) => item.id === this.currentItemId);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % eligibleItems.length;
    const next = eligibleItems[nextIndex];
    this.currentItemId = next.id;
    return next;
  }

  advanceAfterDuration(at: Date = this.clock()): VitrineItem | null {
    const current = this.getCurrent(at);
    if (!current || current.durationMs === null) {
      return current;
    }

    return this.selectNext(at);
  }

  advanceAfterVideoEnded(at: Date = this.clock()): VitrineItem | null {
    const current = this.getCurrent(at);
    return current?.type === "video" ? this.selectNext(at) : current;
  }

  advance(reason: VitrineAdvanceReason, at: Date = this.clock()): VitrineItem | null {
    if (reason === "video-ended") {
      return this.advanceAfterVideoEnded(at);
    }

    if (reason === "duration-elapsed") {
      return this.advanceAfterDuration(at);
    }

    return this.selectNext(at);
  }

  private findEligibleById(id: string | null, at: Date): VitrineItem | null {
    if (!id) {
      return null;
    }

    return this.getEligibleItems(at).find((item) => item.id === id) ?? null;
  }

  private isEligible(item: VitrineItem, at: Date): boolean {
    if (!item.active || !isValidDuration(item.durationMs)) {
      return false;
    }

    const publishedAt = parseIsoDate(item.publishedAt);
    const expiresAt = item.expiresAt === null ? null : parseIsoDate(item.expiresAt);
    if (!publishedAt || (item.expiresAt !== null && !expiresAt)) {
      return false;
    }

    return publishedAt <= at && (expiresAt === null || at < expiresAt);
  }
}

function compareVitrineItems(a: VitrineItem, b: VitrineItem): number {
  return b.priority - a.priority || a.order - b.order || a.id.localeCompare(b.id);
}

function isValidDuration(durationMs: number | null): boolean {
  return durationMs === null || (Number.isFinite(durationMs) && durationMs > 0);
}

function parseIsoDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
