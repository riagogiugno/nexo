import type { VitrineItem } from "../../../../packages/data-contracts/src/index.ts";

import type { VitrineRenderResult, VitrineView } from "./vitrine-view.ts";

/** Implementação DOM da porta de visualização da Vitrine. */
export class VitrineDomView implements VitrineView {
  private readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(item: VitrineItem): VitrineRenderResult {
    const card = document.createElement("article");
    card.className = `vitrine-card vitrine-card--${item.type}`;

    const media = this.createMedia(item);
    const content = document.createElement("div");
    content.className = "vitrine-card__content";

    const type = document.createElement("span");
    type.className = "vitrine-card__type";
    type.textContent = item.type;

    const title = document.createElement("h1");
    title.className = "vitrine-card__title";
    title.textContent = item.title;

    const description = document.createElement("p");
    description.className = "vitrine-card__description";
    description.textContent = item.description;

    content.append(type, title, description);
    card.append(media.element, content);
    this.root.replaceChildren(card);

    return media.videoElement ? { videoElement: media.videoElement } : {};
  }

  renderEmpty(): void {
    const message = document.createElement("p");
    message.className = "vitrine-empty";
    message.textContent = "Nenhum conteúdo disponível no momento.";
    this.root.replaceChildren(message);
  }

  private createMedia(item: VitrineItem): { element: HTMLElement; videoElement?: HTMLVideoElement } {
    if (item.type === "video") {
      const video = document.createElement("video");
      video.className = "vitrine-card__media";
      video.src = item.mediaUrl;
      video.poster = item.thumbnailUrl;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.play().catch(() => undefined);
      return { element: video, videoElement: video };
    }

    const image = document.createElement("img");
    image.className = "vitrine-card__media";
    image.src = item.type === "image" ? item.mediaUrl : item.thumbnailUrl;
    image.alt = item.title;
    return { element: image };
  }
}
