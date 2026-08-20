import type { VitrineItem } from "../../../packages/data-contracts/src/index.ts";

import type {
  CmsResult,
  CmsTargetModule,
  CreateEditorialContentInput,
  EditorialContent,
  EditorialUser,
  UpdateEditorialContentInput,
} from "./editorial-content.ts";

/**
 * Porta de persistência do CMS. A interface é assíncrona para que um adapter
 * de memória possa ser trocado por PostgreSQL, Supabase ou uma API sem alterar
 * os consumidores do domínio.
 */
export interface EditorialContentRepository {
  create(input: CreateEditorialContentInput): Promise<CmsResult<EditorialContent>>;
  update(id: string, update: UpdateEditorialContentInput, updatedAt: string): Promise<CmsResult<EditorialContent>>;
  findById(id: string): Promise<EditorialContent | null>;
  list(): Promise<readonly EditorialContent[]>;
  remove(id: string): Promise<boolean>;

  publish(id: string, publishedAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>>;
  schedule(id: string, scheduledAt: string, updatedAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>>;
  archive(id: string, archivedAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>>;
  cancelPublication(id: string, cancelledAt: string, editor: EditorialUser): Promise<CmsResult<EditorialContent>>;

  listPublishedByTarget(target: CmsTargetModule, at: string): Promise<readonly EditorialContent[]>;
  listVitrineItems(at: string): Promise<readonly VitrineItem[]>;
}
