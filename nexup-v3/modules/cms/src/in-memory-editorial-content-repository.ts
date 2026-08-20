import type { VitrineItem } from "../../../packages/data-contracts/src/index.ts";

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
import type {
  CmsResult,
  CmsTargetModule,
  CreateEditorialContentInput,
  EditorialContent,
  EditorialUser,
  UpdateEditorialContentInput,
} from "./editorial-content.ts";
import type { EditorialContentRepository } from "./editorial-content-repository.ts";

/** Adapter substituível de persistência para desenvolvimento e testes locais. */
export class InMemoryEditorialContentRepository implements EditorialContentRepository {
  private readonly records = new Map<string, EditorialContent>();

  async create(input: CreateEditorialContentInput): Promise<CmsResult<EditorialContent>> {
    if (this.records.has(input.id)) {
      return failure(`Já existe conteúdo com o id "${input.id}".`);
    }

    const result = createEditorialContent(input);
    if (result.ok) {
      this.records.set(result.value.id, result.value);
    }

    return result;
  }

  async update(id: string, update: UpdateEditorialContentInput, updatedAt: string): Promise<CmsResult<EditorialContent>> {
    const current = this.records.get(id);
    if (!current) return notFound(id);

    const result = updateEditorialContent(current, update, updatedAt);
    return this.saveResult(result);
  }

  async findById(id: string): Promise<EditorialContent | null> {
    return this.records.get(id) ?? null;
  }

  async list(): Promise<readonly EditorialContent[]> {
    return [...this.records.values()];
  }

  async remove(id: string): Promise<boolean> {
    return this.records.delete(id);
  }

  async publish(id: string, publishedAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>> {
    const current = this.records.get(id);
    if (!current) return notFound(id);

    return this.saveResult(publishEditorialContent(current, publishedAt, editor));
  }

  async schedule(
    id: string,
    scheduledAt: string,
    updatedAt: string,
    editor: EditorialUser,
  ): Promise<CmsResult<EditorialContent>> {
    const current = this.records.get(id);
    if (!current) return notFound(id);

    return this.saveResult(scheduleEditorialContent(current, scheduledAt, updatedAt, editor));
  }

  async archive(id: string, archivedAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>> {
    const current = this.records.get(id);
    if (!current) return notFound(id);

    return this.saveResult(archiveEditorialContent(current, archivedAt, editor));
  }

  async cancelPublication(id: string, cancelledAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>> {
    const current = this.records.get(id);
    if (!current) return notFound(id);

    return this.saveResult(cancelPublication(current, cancelledAt, editor));
  }

  async listPublishedByTarget(target: CmsTargetModule, at: string): Promise<readonly EditorialContent[]> {
    return [...this.records.values()].filter(
      (content) => content.targetModules.includes(target) && getEffectiveStatus(content, at) === "published",
    );
  }

  async listVitrineItems(at: string): Promise<readonly VitrineItem[]> {
    return [...this.records.values()]
      .map((content) => toVitrineItem(content, at))
      .filter((item): item is VitrineItem => item !== null);
  }

  private saveResult(result: CmsResult<EditorialContent>): CmsResult<EditorialContent> {
    if (result.ok) {
      this.records.set(result.value.id, result.value);
    }

    return result;
  }
}

function notFound(id: string): CmsResult<never> {
  return failure(`Conteúdo "${id}" não encontrado.`);
}

function failure(error: string): CmsResult<never> {
  return { ok: false, errors: [error] };
}
