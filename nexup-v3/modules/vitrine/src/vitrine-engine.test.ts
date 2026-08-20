import assert from "node:assert/strict";
import test from "node:test";

import type { VitrineItem } from "../../../packages/data-contracts/src/index.ts";
import { VitrineEngine } from "./vitrine-engine.ts";

const NOW = new Date("2026-08-20T12:00:00.000Z");

function item(overrides: Partial<VitrineItem> = {}): VitrineItem {
  return {
    id: "item-1",
    type: "image",
    title: "Item",
    description: "Descrição",
    mediaUrl: "https://example.test/media",
    thumbnailUrl: "https://example.test/thumbnail",
    durationMs: 3_000,
    priority: 1,
    order: 1,
    active: true,
    publishedAt: "2026-08-20T11:00:00.000Z",
    expiresAt: null,
    ...overrides,
  };
}

function engine(items: readonly VitrineItem[]): VitrineEngine {
  return new VitrineEngine(items, () => NOW);
}

test("seleciona o próximo item e reinicia o ciclo", () => {
  const vitrine = engine([item({ id: "a", order: 1 }), item({ id: "b", order: 2 })]);

  assert.equal(vitrine.getCurrent()?.id, "a");
  assert.equal(vitrine.selectNext()?.id, "b");
  assert.equal(vitrine.selectNext()?.id, "a");
});

test("ordena por prioridade descendente e ordem ascendente", () => {
  const vitrine = engine([
    item({ id: "low", priority: 1, order: 1 }),
    item({ id: "high-late", priority: 2, order: 2 }),
    item({ id: "high-first", priority: 2, order: 1 }),
  ]);

  assert.deepEqual(vitrine.getEligibleItems().map(({ id }) => id), ["high-first", "high-late", "low"]);
});

test("não exibe itens inativos", () => {
  const vitrine = engine([item({ id: "inactive", active: false }), item({ id: "active" })]);

  assert.deepEqual(vitrine.getEligibleItems().map(({ id }) => id), ["active"]);
});

test("não exibe itens expirados", () => {
  const vitrine = engine([
    item({ id: "expired", expiresAt: "2026-08-20T11:59:59.000Z" }),
    item({ id: "available", expiresAt: "2026-08-20T12:01:00.000Z" }),
  ]);

  assert.deepEqual(vitrine.getEligibleItems().map(({ id }) => id), ["available"]);
});

test("expõe e respeita a duração individual de cada item", () => {
  const vitrine = engine([
    item({ id: "short", durationMs: 1_200, order: 1 }),
    item({ id: "long", durationMs: 8_500, order: 2 }),
  ]);

  assert.equal(vitrine.getCurrentDurationMs(), 1_200);
  assert.equal(vitrine.advanceAfterDuration()?.id, "long");
  assert.equal(vitrine.getCurrentDurationMs(), 8_500);
});

test("avança vídeo apenas quando o evento real de término é informado", () => {
  const vitrine = engine([
    item({ id: "video", type: "video", durationMs: null, order: 1 }),
    item({ id: "image", type: "image", durationMs: 4_000, order: 2 }),
  ]);

  assert.equal(vitrine.getCurrent()?.id, "video");
  assert.equal(vitrine.advanceAfterDuration()?.id, "video");
  assert.equal(vitrine.advanceAfterVideoEnded()?.id, "image");
});

test("retorna nulo para uma lista vazia", () => {
  const vitrine = engine([]);

  assert.equal(vitrine.getCurrent(), null);
  assert.equal(vitrine.selectNext(), null);
  assert.equal(vitrine.getCurrentDurationMs(), null);
});
