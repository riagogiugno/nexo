import assert from "node:assert/strict";
import test from "node:test";

import type { CreateEditorialContentInput, EditorialContent } from "./editorial-content.ts";
import {
  archiveEditorialContent,
  cancelPublication,
  createEditorialContent,
  getEffectiveStatus,
  publishEditorialContent,
  scheduleEditorialContent,
  toVitrineItem,
  updateEditorialContent,
} from "./cms-content-service.ts";

const CREATED_AT = "2026-08-20T12:00:00.000Z";
const AUTHOR = { id: "author-1", name: "Ana" };
const EDITOR = { id: "editor-1", name: "Bruno" };

function input(overrides: Partial<CreateEditorialContentInput> = {}): CreateEditorialContentInput {
  return {
    id: "content-1",
    type: "image",
    title: "Uma leitura importante",
    description: "Conteúdo editorial para demonstração.",
    media: {
      mediaUrl: "https://example.test/image.png",
      thumbnailUrl: "https://example.test/thumbnail.png",
      durationMs: 3_000,
      altText: "Uma imagem de demonstração",
    },
    targetModules: ["vitrine", "news"],
    priority: 2,
    order: 1,
    expiresAt: "2026-08-22T12:00:00.000Z",
    author: AUTHOR,
    metadata: { slug: "uma-leitura", locale: "pt-BR", tags: ["leitura"], seoTitle: null, seoDescription: null },
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function created(overrides: Partial<CreateEditorialContentInput> = {}): EditorialContent {
  const result = createEditorialContent(input(overrides));
  assert.equal(result.ok, true);
  return result.value;
}

test("cria conteúdo como rascunho", () => {
  const content = created();

  assert.equal(content.status, "draft");
  assert.equal(content.publishedAt, null);
});

test("atualiza conteúdo de forma imutável", () => {
  const content = created();
  const result = updateEditorialContent(content, { title: "Título revisado", editor: EDITOR }, "2026-08-20T13:00:00.000Z");

  assert.equal(result.ok, true);
  assert.equal(result.value.title, "Título revisado");
  assert.equal(content.title, "Uma leitura importante");
});

test("publica conteúdo e produz o contrato existente da Vitrine", () => {
  const result = publishEditorialContent(created(), "2026-08-20T13:00:00.000Z", EDITOR);
  assert.equal(result.ok, true);

  const vitrineItem = toVitrineItem(result.value, "2026-08-20T14:00:00.000Z");
  assert.deepEqual(vitrineItem, {
    id: "content-1",
    type: "image",
    title: "Uma leitura importante",
    description: "Conteúdo editorial para demonstração.",
    mediaUrl: "https://example.test/image.png",
    thumbnailUrl: "https://example.test/thumbnail.png",
    durationMs: 3_000,
    priority: 2,
    order: 1,
    active: true,
    publishedAt: "2026-08-20T13:00:00.000Z",
    expiresAt: "2026-08-22T12:00:00.000Z",
  });
});

test("agenda apenas para data futura", () => {
  const result = scheduleEditorialContent(created(), "2026-08-20T14:00:00.000Z", "2026-08-20T13:00:00.000Z", EDITOR);
  assert.equal(result.ok, true);
  assert.equal(result.value.status, "scheduled");

  const invalid = scheduleEditorialContent(created(), "2026-08-20T12:00:00.000Z", CREATED_AT, EDITOR);
  assert.equal(invalid.ok, false);
});

test("arquiva e cancela publicação", () => {
  const published = publishEditorialContent(created(), "2026-08-20T13:00:00.000Z", EDITOR);
  assert.equal(published.ok, true);

  const cancelled = cancelPublication(published.value, "2026-08-20T14:00:00.000Z", EDITOR);
  assert.equal(cancelled.ok, true);
  assert.equal(cancelled.value.status, "draft");
  assert.equal(cancelled.value.publishedAt, null);

  const archived = archiveEditorialContent(cancelled.value, "2026-08-20T15:00:00.000Z", EDITOR);
  assert.equal(archived.ok, true);
  assert.equal(archived.value.status, "archived");
});

test("rejeita conteúdo editorial inválido", () => {
  const result = createEditorialContent(input({ title: "", targetModules: [], priority: Number.NaN }));

  assert.equal(result.ok, false);
  assert.equal(result.errors.length >= 3, true);
});

test("conteúdo expirado não é projetado para a Vitrine", () => {
  const published = publishEditorialContent(created(), "2026-08-20T13:00:00.000Z", EDITOR);
  assert.equal(published.ok, true);

  assert.equal(getEffectiveStatus(published.value, "2026-08-23T00:00:00.000Z"), "expired");
  assert.equal(toVitrineItem(published.value, "2026-08-23T00:00:00.000Z"), null);
});
