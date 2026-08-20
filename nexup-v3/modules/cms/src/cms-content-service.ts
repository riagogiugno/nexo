import type { VitrineItem, VitrineItemType } from "../../../packages/data-contracts/src/index.ts";

import type {
  CmsResult,
  CreateEditorialContentInput,
  EditorialContent,
  EditorialContentStatus,
  UpdateEditorialContentInput,
} from "./editorial-content.ts";

export function createEditorialContent(input: CreateEditorialContentInput): CmsResult<EditorialContent> {
  const content: EditorialContent = {
    ...input,
    status: "draft",
    publishedAt: null,
    editor: null,
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
  };

  return validateContent(content);
}

export function updateEditorialContent(
  content: EditorialContent,
  update: UpdateEditorialContentInput,
  updatedAt: string,
): CmsResult<EditorialContent> {
  return validateContent({ ...content, ...update, updatedAt });
}

export function publishEditorialContent(
  content: EditorialContent,
  publishedAt: string,
  editor: EditorialContent["author"],
): CmsResult<EditorialContent> {
  const candidate = { ...content, status: "published" as const, publishedAt, editor, updatedAt: publishedAt };
  return validatePublishable(candidate, publishedAt);
}

export function scheduleEditorialContent(
  content: EditorialContent,
  scheduledAt: string,
  updatedAt: string,
  editor: EditorialContent["author"],
): CmsResult<EditorialContent> {
  const scheduledDate = parseDate(scheduledAt);
  const updateDate = parseDate(updatedAt);
  if (!scheduledDate || !updateDate || scheduledDate <= updateDate) {
    return failure("A publicação agendada deve estar em uma data futura válida.");
  }

  const candidate = { ...content, status: "scheduled" as const, publishedAt: scheduledAt, editor, updatedAt };
  return validatePublishable(candidate, updatedAt);
}

export function archiveEditorialContent(
  content: EditorialContent,
  archivedAt: string,
  editor: EditorialContent["author"],
): CmsResult<EditorialContent> {
  return validateContent({ ...content, status: "archived", editor, updatedAt: archivedAt });
}

export function cancelPublication(
  content: EditorialContent,
  cancelledAt: string,
  editor: EditorialContent["author"],
): CmsResult<EditorialContent> {
  if (content.status !== "published" && content.status !== "scheduled") {
    return failure("Somente conteúdos publicados ou agendados podem ter a publicação cancelada.");
  }

  return validateContent({ ...content, status: "draft", publishedAt: null, editor, updatedAt: cancelledAt });
}

/** Calcula expiração sem persistir ou mutar o conteúdo original. */
export function getEffectiveStatus(content: EditorialContent, at: string): EditorialContentStatus {
  const referenceDate = parseDate(at);
  const expiresAt = content.expiresAt === null ? null : parseDate(content.expiresAt);
  if (content.status === "published" && referenceDate && expiresAt && referenceDate >= expiresAt) {
    return "expired";
  }

  return content.status;
}

/** Projeção para a Vitrine; reutiliza o contrato existente, sem recriá-lo. */
export function toVitrineItem(content: EditorialContent, at: string): VitrineItem | null {
  if (
    !content.targetModules.includes("vitrine") ||
    getEffectiveStatus(content, at) !== "published" ||
    content.publishedAt === null ||
    !isVitrineType(content.type) ||
    !content.media ||
    !content.media.thumbnailUrl
  ) {
    return null;
  }

  return {
    id: content.id,
    type: content.type,
    title: content.title,
    description: content.description,
    mediaUrl: content.media.mediaUrl,
    thumbnailUrl: content.media.thumbnailUrl,
    durationMs: content.media.durationMs,
    priority: content.priority,
    order: content.order,
    active: true,
    publishedAt: content.publishedAt,
    expiresAt: content.expiresAt,
  };
}

function validatePublishable(content: EditorialContent, at: string): CmsResult<EditorialContent> {
  const baseResult = validateContent(content);
  if (!baseResult.ok) {
    return baseResult;
  }

  if (!parseDate(at) || !content.publishedAt) {
    return failure("A data de publicação deve ser válida.");
  }

  return baseResult;
}

function validateContent(content: EditorialContent): CmsResult<EditorialContent> {
  const errors: string[] = [];

  if (!content.id.trim()) errors.push("O id é obrigatório.");
  if (!content.title.trim()) errors.push("O título é obrigatório.");
  if (!content.description.trim()) errors.push("A descrição é obrigatória.");
  if (content.targetModules.length === 0) errors.push("Informe pelo menos um módulo de destino.");
  if (!Number.isFinite(content.priority)) errors.push("A prioridade deve ser numérica.");
  if (!Number.isInteger(content.order)) errors.push("A ordem deve ser um número inteiro.");
  if (!isValidUser(content.author)) errors.push("O autor é obrigatório.");
  if (content.editor !== null && !isValidUser(content.editor)) errors.push("O editor é inválido.");
  if (!parseDate(content.createdAt) || !parseDate(content.updatedAt)) errors.push("Datas de criação e atualização devem ser válidas.");
  if (content.publishedAt !== null && !parseDate(content.publishedAt)) errors.push("A data de publicação é inválida.");
  if (content.expiresAt !== null && !parseDate(content.expiresAt)) errors.push("A data de expiração é inválida.");
  if (!isDateRangeValid(content.publishedAt, content.expiresAt)) errors.push("A expiração deve ser posterior à publicação.");
  if (!isValidMedia(content.media)) errors.push("A referência de mídia é inválida.");
  if (!isValidMetadata(content.metadata)) errors.push("Os metadados são inválidos.");

  return errors.length === 0 ? { ok: true, value: content } : { ok: false, errors };
}

function isVitrineType(type: EditorialContent["type"]): type is VitrineItemType {
  return type === "video" || type === "image" || type === "article";
}

function isValidUser(user: EditorialContent["author"]): boolean {
  return Boolean(user.id.trim() && user.name.trim());
}

function isValidMedia(media: EditorialContent["media"]): boolean {
  if (media === null) return true;
  return Boolean(
    media.mediaUrl.trim() &&
    (media.thumbnailUrl === null || media.thumbnailUrl.trim()) &&
    (media.altText === null || media.altText.trim()) &&
    (media.durationMs === null || (Number.isFinite(media.durationMs) && media.durationMs > 0)),
  );
}

function isValidMetadata(metadata: EditorialContent["metadata"]): boolean {
  return Boolean(metadata.locale.trim() && metadata.tags.every((tag) => tag.trim()));
}

function isDateRangeValid(publishedAt: string | null, expiresAt: string | null): boolean {
  if (publishedAt === null || expiresAt === null) return true;
  const published = parseDate(publishedAt);
  const expires = parseDate(expiresAt);
  return Boolean(published && expires && expires > published);
}

function parseDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function failure(error: string): CmsResult<never> {
  return { ok: false, errors: [error] };
}
