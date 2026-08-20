import type { VitrineCollection } from "../../../packages/data-contracts/src/index.ts";
import { VitrineEngine } from "../../../modules/vitrine/src/index.ts";

import { VitrineDomView } from "./vitrine/vitrine-dom-view.ts";
import { VitrinePlaybackController } from "./vitrine/vitrine-playback-controller.ts";

/** Compõe a Vitrine Web a partir de uma coleção entregue por CMS/API no futuro. */
export function mountVitrine(root: HTMLElement, collection: VitrineCollection): VitrinePlaybackController {
  const engine = new VitrineEngine(collection.items);
  const view = new VitrineDomView(root);
  const controller = new VitrinePlaybackController(engine, view);

  controller.start();
  return controller;
}
