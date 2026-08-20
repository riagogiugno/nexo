import assert from "node:assert/strict";
import test from "node:test";

import type { CreateEditorialContentInput } from "./editorial-content.ts";
import { InMemoryEditorialContentRepository } from "./in-memory-editorial-content-repository.ts";

const CREATED_AT = "2026-08-20T12:00:00.000Z";
const AUTHOR = { id: "author-1", name: "Ana" };
const EDITOR = { id: "editor-1", name: "Bruno" };

function input(overrides: Partial<CreateEditorialContentInput> = {}): CreateEditorialContentInput {
  return {
    id: "content-1",
    type: "image",
    title: "Conteúdo de teste",
    description: "Conteúdo para o repositório em memória.",
    media: {
      mediaUrl: "https://example.test/image.png",
      thumbnailUrl: "https://example.test/thumbnail.png",
      durationMs: 2_500,
      altText: "Imagem de teste",
    },
    targetModules: ["vitrine", "news"],
    priority: 2,
    order: 1,
    expiresAt: "2026-08-22T12:00:00.000Z",
    author: AUTHOR,
    metadata: { slug: "conteudo-teste", locale: "pt-BR", tags: ["teste"], seoTitle: null, seoDescription: null },
    createdAt: CREATED_AT,
    ...overrides,
  };
}

test("executa CRUD de conteúdo editorial", async () => {
  const repository = new InMemoryEditorialContentRepository();
  const created = await repository.create(input());
  assert.equal(created.ok, true);

  const found = await repository.findById("content-1");
  assert.equal(found?.title, "Conteúdo de teste");

  const updated = await repository.update("content-1", { title: "Título atualizado", editor: EDITOR }, "2026-08-20T13:00:00.000Z");
  assert.equal(updated.ok, true);
  assert.equal(updated.value.title, "Título atualizado");

  assert.equal((await repository.list()).length, 1);
  assert.equal(await repository.remove("content-1"), true);
  assert.equal(await repository.findById("content-1"), null);
});

test("rejeita criação duplicada e atualização de item inexistente", async () => {
  const repository = new InMemoryEditorialContentRepository();
  await repository.create(input());

  assert.equal((await repository.create(input())).ok, false);
  assert.equal((await repository.update("missing", { title: "Nada" }, CREATED_AT)).ok, false);
});

test("consulta somente conteúdos publicados pelo módulo de destino", async () => {
  const repository = new InMemoryEditorialContentRepository();
  await repository.create(input({ id: "published-news" }));
  await repository.create(input({ id: "draft-news" }));
  await repository.create(input({ id: "published-sports", targetModules: ["sports"] }));
  await repository.publish("published-news", "2026-08-20T13:00:00.000Z", EDITOR);
  await repository.publish("published-sports", "2026-08-20T13:00:00.000Z", EDITOR);

  const news = await repository.listPublishedByTarget("news", "2026-08-20T14:00:00.000Z");
  assert.deepEqual(news.map(({ id }) => id), ["published-news"]);
});

test("publicação e projeção para Vitrine reutilizam as regras do CMS", async () => {
  const repository = new InMemoryEditorialContentRepository();
  await repository.create(input());

  const published = await repository.publish("content-1", "2026-08-20T13:00:00.000Z", EDITOR);
  assert.equal(published.ok, true);

  const items = await repository.listVitrineItems("2026-08-20T14:00:00.000Z");
  assert.equal(items.length, 1);
  assert.equal(items[0].id, "content-1");

  assert.deepEqual(await repository.listVitrineItems("2026-08-23T00:00:00.000Z"), []);
});
