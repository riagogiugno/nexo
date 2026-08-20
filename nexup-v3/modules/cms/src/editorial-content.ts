/** Tipos editoriais suportados pela fundação do CMS. */
export type EditorialContentType = "video" | "image" | "article" | "brief" | "analysis" | "alert";

export type EditorialContentStatus = "draft" | "published" | "scheduled" | "expired" | "archived";

export type CmsTargetModule =
  | "vitrine"
  | "sports"
  | "forex"
  | "markets"
  | "crypto"
  | "news"
  | "radar"
  | "premium";

export interface EditorialUser {
  id: string;
  name: string;
}

/** Referência lógica a uma mídia; a gestão física de upload pertence à infraestrutura futura. */
export interface MediaReference {
  mediaUrl: string;
  thumbnailUrl: string | null;
  durationMs: number | null;
  altText: string | null;
}

export interface EditorialMetadata {
  slug: string | null;
  locale: string;
  tags: readonly string[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface EditorialContent {
  id: string;
  type: EditorialContentType;
  title: string;
  description: string;
  media: MediaReference | null;
  targetModules: readonly CmsTargetModule[];
  status: EditorialContentStatus;
  priority: number;
  order: number;
  publishedAt: string | null;
  expiresAt: string | null;
  author: EditorialUser;
  editor: EditorialUser | null;
  metadata: EditorialMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEditorialContentInput {
  id: string;
  type: EditorialContentType;
  title: string;
  description: string;
  media: MediaReference | null;
  targetModules: readonly CmsTargetModule[];
  priority: number;
  order: number;
  expiresAt: string | null;
  author: EditorialUser;
  metadata: EditorialMetadata;
  createdAt: string;
}

export interface UpdateEditorialContentInput {
  type?: EditorialContentType;
  title?: string;
  description?: string;
  media?: MediaReference | null;
  targetModules?: readonly CmsTargetModule[];
  priority?: number;
  order?: number;
  expiresAt?: string | null;
  editor?: EditorialUser | null;
  metadata?: EditorialMetadata;
}

export type CmsResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: readonly string[] };
