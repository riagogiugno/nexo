import type { VitrineCollection } from "../../../../packages/data-contracts/src/index.ts";

/** Dados exclusivamente visuais; serão substituídos por uma coleção do CMS/API. */
export const demoVitrineCollection: VitrineCollection = {
  items: [
    {
      id: "demo-video",
      type: "video",
      title: "Leituras que acompanham o ritmo do mundo",
      description: "Exemplo visual de um vídeo: o avanço ocorre somente ao término real da mídia.",
      mediaUrl: "/legacy-assets/card1.mp4",
      thumbnailUrl: "/legacy-assets/AwnTG.png",
      durationMs: null,
      priority: 3,
      order: 1,
      active: true,
      publishedAt: "2026-01-01T00:00:00.000Z",
      expiresAt: null,
    },
    {
      id: "demo-image",
      type: "image",
      title: "Clareza para observar antes de decidir",
      description: "Exemplo de conteúdo visual com duração própria, controlada pelo item.",
      mediaUrl: "/legacy-assets/AwnTG.png",
      thumbnailUrl: "/legacy-assets/AwnTG.png",
      durationMs: 4_500,
      priority: 2,
      order: 1,
      active: true,
      publishedAt: "2026-01-01T00:00:00.000Z",
      expiresAt: null,
    },
    {
      id: "demo-article",
      type: "article",
      title: "Contexto é parte da decisão",
      description: "Exemplo de artigo da Vitrine, preparado para receber conteúdo editorial do CMS.",
      mediaUrl: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
      durationMs: 6_000,
      priority: 1,
      order: 1,
      active: true,
      publishedAt: "2026-01-01T00:00:00.000Z",
      expiresAt: null,
    },
  ],
};
