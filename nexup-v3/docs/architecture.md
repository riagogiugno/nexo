# Arquitetura do NexUp V3

## Camadas

| Camada | Local | Responsabilidade |
| --- | --- | --- |
| Clientes | `apps/web`, `apps/mobile` | Interface e experiência específica de cada plataforma. Não contém regras de domínio nem acesso direto a provedores. |
| UI | `packages/ui` | Componentes, tokens e padrões de interação reutilizáveis. |
| Domínio | `packages/domain` | Conceitos, regras, políticas e casos de uso independentes de interface e infraestrutura. |
| Conteúdo | `packages/content` | Modelos editoriais e conteúdo versionável, sem dependência de apresentação. |
| Contratos de dados | `packages/data-contracts` | Tipos e interfaces estáveis usados por Web, Mobile e futuras APIs. |
| Módulos de produto | `modules/*` | Capacidades isoladas do NexUp; dependem apenas das camadas compartilhadas. |

## Regra de dependência

`apps` e `modules` podem consumir `ui`, `domain`, `content` e `data-contracts`. As camadas compartilhadas não conhecem clientes. Integrações externas futuras devem implementar contratos em uma camada de infraestrutura, nunca ser chamadas diretamente pela UI.

## Dados para Web e Mobile

O cliente Web e o futuro cliente Mobile devem consumir os mesmos DTOs e contratos definidos em `packages/data-contracts`. Uma futura API/BFF poderá traduzir provedores externos para esses contratos, aplicar autenticação, autorização, cache e observabilidade.

## Estado desta etapa

Não há framework, dependência, banco, API, integração ou funcionalidade implementada. Os arquivos TypeScript são apenas pontos de entrada documentados para a próxima etapa.

