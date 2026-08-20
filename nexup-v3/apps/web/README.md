# Cliente Web — Vitrine

Esta primeira camada visual usa DOM nativo, sem framework ou dependências. A inicialização recebe uma `VitrineCollection`; em `src/main.ts`, ela é fornecida somente pelos mocks de demonstração.

## Fronteiras

- `src/vitrine/vitrine-dom-view.ts`: somente renderização segura de itens no DOM.
- `src/vitrine/vitrine-playback-controller.ts`: integração de reprodução entre a view e o `VitrineEngine`.
- `src/demo/`: dados de demonstração, isolados dos componentes.
- `src/bootstrap-vitrine.ts`: composição da coleção, motor, view e controlador.

O controlador não replica regras de elegibilidade, ordem ou seleção: todas elas pertencem ao `VitrineEngine`. Imagem e artigo recebem um único agendamento com `durationMs` do item atual. Vídeos não recebem timer; o avanço ocorre apenas quando o elemento emite `ended`.

Os arquivos TypeScript são fontes para a futura configuração de build Web. Não há bundler instalado nesta etapa.

