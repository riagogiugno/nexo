# Vitrine

A Vitrine é a fronteira para descoberta pública do NexUp, posicionamento de produto e jornadas de conversão. A apresentação pode ser Web ou Mobile, mas as regras de ciclo e os dados compartilhados ficam fora dos clientes.

## Motor

`src/vitrine-engine.ts` contém o `VitrineEngine`, uma classe pura sem dependência de DOM, navegador, framework, temporizador ou API externa. Ela recebe uma coleção de `VitrineItem`, então:

1. descarta itens inativos, ainda não publicados, expirados ou com datas inválidas;
2. ordena o resultado por `priority` decrescente, `order` crescente e `id` crescente;
3. mantém o item atual e avança ciclicamente para o próximo elegível;
4. expõe a duração individual do item atual por `getCurrentDurationMs()`.

O cliente decide como aguardar a duração retornada: não existe duração global. Para itens de vídeo, o adaptador da interface deve chamar `advanceAfterVideoEnded()` ao receber o evento real `ended`; o motor não presume duração de vídeo. Itens sem `durationMs` não devem receber avanço automático.

## Dados do CMS

Futuramente o CMS deve publicar uma coleção no formato `VitrineCollection`, definido em `packages/data-contracts`. A API/BFF validará, autorizará e entregará esse contrato aos clientes. Web e Mobile instanciam o mesmo motor com os mesmos dados, mas cada um implementa sua própria camada visual e adaptador de mídia.

## Testes

Os testes usam apenas o executor nativo do Node e podem ser executados com `npm run test:vitrine` quando um runtime Node estiver disponível.
