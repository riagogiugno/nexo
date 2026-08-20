# Contratos de dados

Esta camada define os contratos que Web, Mobile, CMS e a futura API compartilharão. Ela contém tipos de transporte e interfaces de portas; não chama rede, banco de dados ou SDKs.

O contrato `VitrineItem` é a primeira implementação: representa conteúdo publicável e usa datas ISO 8601 para que todos os clientes recebam a mesma forma de dados.
