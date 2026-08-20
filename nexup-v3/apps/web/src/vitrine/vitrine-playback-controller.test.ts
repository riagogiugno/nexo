import assert from "node:assert/strict";
import test from "node:test";

import type { VitrineItem } from "../../../../packages/data-contracts/src/index.ts";
import { VitrineEngine } from "../../../../modules/vitrine/src/index.ts";
import {
  VitrinePlaybackController,
  type VitrineScheduler,
} from "./vitrine-playback-controller.ts";
import type { VitrineMediaElement, VitrineView } from "./vitrine-view.ts";

const NOW = new Date("2026-08-20T12:00:00.000Z");

function item(overrides: Partial<VitrineItem> = {}): VitrineItem {
  return {
    id: "item",
    type: "image",
    title: "Título",
    description: "Descrição",
    mediaUrl: "https://example.test/media",
    thumbnailUrl: "https://example.test/thumbnail",
    durationMs: 2_000,
    priority: 1,
    order: 1,
    active: true,
    publishedAt: "2026-01-01T00:00:00.000Z",
    expiresAt: null,
    ...overrides,
  };
}

class FakeVideo implements VitrineMediaElement {
  private listener: (() => void) | null = null;

  addEventListener(_type: "ended", listener: () => void): void { this.listener = listener; }
  removeEventListener(): void { this.listener = null; }
  emitEnded(): void { this.listener?.(); }
}

class FakeView implements VitrineView {
  readonly renderedIds: string[] = [];
  readonly video = new FakeVideo();
  emptyCalls = 0;

  render(current: VitrineItem) {
    this.renderedIds.push(current.id);
    return current.type === "video" ? { videoElement: this.video } : {};
  }

  renderEmpty(): void { this.emptyCalls += 1; }
}

class FakeScheduler implements VitrineScheduler {
  readonly calls: { callback: () => void; durationMs: number }[] = [];
  cancelled = 0;

  schedule(callback: () => void, durationMs: number): unknown {
    this.calls.push({ callback, durationMs });
    return callback;
  }

  cancel(): void { this.cancelled += 1; }
}

function createEngine(items: readonly VitrineItem[]): VitrineEngine {
  return new VitrineEngine(items, () => NOW);
}

test("evento ended do vídeo avança pelo motor sem criar timer concorrente", () => {
  const view = new FakeView();
  const scheduler = new FakeScheduler();
  const controller = new VitrinePlaybackController(
    createEngine([
      item({ id: "video", type: "video", durationMs: null, order: 1 }),
      item({ id: "image", type: "image", durationMs: 4_200, order: 2 }),
    ]),
    view,
    scheduler,
  );

  controller.start();
  assert.deepEqual(view.renderedIds, ["video"]);
  assert.equal(scheduler.calls.length, 0);

  view.video.emitEnded();

  assert.deepEqual(view.renderedIds, ["video", "image"]);
  assert.equal(scheduler.calls.length, 1);
  assert.equal(scheduler.calls[0].durationMs, 4_200);
});

test("imagem usa a duração individual e agenda apenas um avanço", () => {
  const view = new FakeView();
  const scheduler = new FakeScheduler();
  const controller = new VitrinePlaybackController(
    createEngine([item({ id: "image", durationMs: 1_750 })]),
    view,
    scheduler,
  );

  controller.start();

  assert.equal(scheduler.calls.length, 1);
  assert.equal(scheduler.calls[0].durationMs, 1_750);
  assert.equal(scheduler.cancelled, 0);
});
