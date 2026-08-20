# NexUp V3

Fundação do novo produto NexUp. Esta pasta é independente das versões anteriores e, nesta etapa, contém somente arquitetura, contratos vazios e documentação — sem funcionalidades, código migrado ou dependências instaladas.

## Princípios

- **Uma camada de dados compartilhada:** Web e Mobile dependem dos mesmos contratos em `packages/data-contracts` e do mesmo domínio em `packages/domain`.
- **Domínio antes da interface:** regras de negócio não pertencem a componentes, telas ou provedores externos.
- **Módulos isolados:** Vitrine, CMS, Premium, Sports, Forex, Markets, Crypto, News, Radar e NexUp AI evoluem sem acoplamento direto entre si.
- **UI reutilizável:** componentes visuais ficam em `packages/ui`; clientes ficam em `apps`.

Consulte [docs/architecture.md](docs/architecture.md) para responsabilidades e fronteiras.

