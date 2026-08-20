import { VitrineEngine } from "../../../../modules/vitrine/src/index.ts";

import type { VitrineMediaElement, VitrineView } from "./vitrine-view.ts";

export interface VitrineScheduler {
  schedule(callback: () => void, durationMs: number): unknown;
  cancel(handle: unknown): void;
}

const browserScheduler: VitrineScheduler = {
  schedule: (callback, durationMs) => setTimeout(callback, durationMs),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};

/**
 * Única ponte de ciclo entre uma view e o VitrineEngine.
 * Vídeos avançam por `ended`; imagens e artigos usam somente durationMs do item.
 */
export class VitrinePlaybackController {
  private scheduledAdvance: unknown | null = null;
  private videoElement: VitrineMediaElement | null = null;
  private readonly engine: VitrineEngine;
  private readonly view: VitrineView;
  private readonly scheduler: VitrineScheduler;
  private readonly onVideoEnded = () => {
    this.engine.advanceAfterVideoEnded();
    this.renderCurrent();
  };

  constructor(engine: VitrineEngine, view: VitrineView, scheduler: VitrineScheduler = browserScheduler) {
    this.engine = engine;
    this.view = view;
    this.scheduler = scheduler;
  }

  start(): void {
    this.renderCurrent();
  }

  dispose(): void {
    this.clearScheduledAdvance();
    this.detachVideoEndedListener();
  }

  private renderCurrent(): void {
    this.clearScheduledAdvance();
    this.detachVideoEndedListener();

    const current = this.engine.getCurrent();
    if (!current) {
      this.view.renderEmpty();
      return;
    }

    const rendered = this.view.render(current);
    if (current.type === "video") {
      this.videoElement = rendered.videoElement ?? null;
      this.videoElement?.addEventListener("ended", this.onVideoEnded);
      return;
    }

    const durationMs = this.engine.getCurrentDurationMs();
    if (durationMs === null) {
      return;
    }

    this.scheduledAdvance = this.scheduler.schedule(() => {
      this.scheduledAdvance = null;
      this.engine.advanceAfterDuration();
      this.renderCurrent();
    }, durationMs);
  }

  private clearScheduledAdvance(): void {
    if (this.scheduledAdvance !== null) {
      this.scheduler.cancel(this.scheduledAdvance);
      this.scheduledAdvance = null;
    }
  }

  private detachVideoEndedListener(): void {
    this.videoElement?.removeEventListener("ended", this.onVideoEnded);
    this.videoElement = null;
  }
}
