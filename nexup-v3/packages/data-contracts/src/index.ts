/** Conteúdo que pode ser exibido na Vitrine em qualquer cliente NexUp. */
export type VitrineItemType = "video" | "image" | "article";

/**
 * Contrato compartilhado entre CMS, API/BFF, Web e Mobile.
 * Datas usam ISO 8601 para não acoplar o transporte à plataforma do cliente.
 */
export interface VitrineItem {
  id: string;
  type: VitrineItemType;
  title: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl: string;
  durationMs: number | null;
  priority: number;
  order: number;
  active: boolean;
  publishedAt: string;
  expiresAt: string | null;
}

/** Coleção entregue pelo CMS ou por uma futura API à Vitrine. */
export interface VitrineCollection {
  items: readonly VitrineItem[];
}

/** Motivo explícito de avanço no ciclo, independente da plataforma. */
export type VitrineAdvanceReason = "duration-elapsed" | "video-ended" | "manual";
