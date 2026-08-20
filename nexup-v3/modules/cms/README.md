# CMS

Núcleo editorial puro do NexUp V3. Esta fronteira cria e administra conteúdo sem banco de dados, autenticação, upload, API ou interface visual.

## Modelo

`src/editorial-content.ts` define conteúdo editorial, mídia, autoria, metadados, status e módulos de destino: Vitrine, Sports, Forex, Markets, Crypto, News, Radar e Premium.

`src/cms-content-service.ts` implementa operações imutáveis de criar, atualizar, publicar, agendar, arquivar e cancelar publicação. Todas retornam um resultado explícito de sucesso ou erro e validam datas, prioridade, ordem, autoria e mídia.

`src/editorial-content-repository.ts` define a porta assíncrona de persistência. `src/in-memory-editorial-content-repository.ts` é o adaptador em memória para desenvolvimento e testes; um adaptador PostgreSQL, Supabase ou API poderá implementar a mesma porta sem mudar os consumidores.

## Integração com a Vitrine

`toVitrineItem()` converte conteúdo publicado destinado à Vitrine para o `VitrineItem` já definido em `packages/data-contracts`. O CMS não replica esse contrato: conteúdo sem mídia compatível, sem publicação válida ou fora do destino Vitrine simplesmente não é projetado.

## Próxima camada

Uma futura persistência poderá armazenar `EditorialContent`; CMS/API deverão usar as mesmas operações e entregar projeções específicas por módulo. Os testes podem ser executados com `node --test src/cms-content-service.test.ts src/in-memory-editorial-content-repository.test.ts`.
