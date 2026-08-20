import type { VitrineItem } from "../../../../packages/data-contracts/src/index.ts";

export interface VitrineMediaElement {
  addEventListener(type: "ended", listener: () => void): void;
  removeEventListener(type: "ended", listener: () => void): void;
}

export interface VitrineRenderResult {
  videoElement?: VitrineMediaElement;
}

/** Porta da visualização: o controlador não conhece APIs do navegador. */
export interface VitrineView {
  render(item: VitrineItem): VitrineRenderResult;
  renderEmpty(): void;
}
