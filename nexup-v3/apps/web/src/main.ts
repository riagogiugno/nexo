import { demoVitrineCollection } from "./demo/vitrine-items.ts";
import { mountVitrine } from "./bootstrap-vitrine.ts";

const root = document.querySelector<HTMLElement>("#vitrine-root");

if (!root) {
  throw new Error("Elemento raiz da Vitrine não encontrado.");
}

mountVitrine(root, demoVitrineCollection);
