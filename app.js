/* =====================================================
   NEXUP — APPLICATION
   APP.JS
   CAMINHOS EDUCACIONAIS — 6 CAMINHOS / 24 MÓDULOS
===================================================== */


/* =====================================================
   STATE
===================================================== */

let currentOnboardingStep = 1;
let onboardingAnswers = {};
let currentPage = "homeSection";
let currentExplorePath = null;


/* =====================================================
   NEXUP — 6 CAMINHOS / 24 MÓDULOS
===================================================== */

const PATHS = {

  /* ===================================================
     01 — INICIANTE
  =================================================== */

  iniciante: {

    icon: "🧭",

    title: "INICIANTE",

    subtitle: "COMECE PELO ENTENDIMENTO.",

    intro:
      "Você não precisa começar operando. Precisa começar entendendo.",

    focus:
      "ENTENDER ANTES DE OPERAR.",

    modules: [

      {
        id: "fundamentos",

        title: "FUNDAMENTOS",

        kicker: "01 · BASE",

        intro:
          "O ponto de partida do NEXUP é separar jogo, mercado e decisão.",

        sections: [

          [
            "O QUE É UMA DECISÃO",
            "Uma decisão não é apenas escolher um mercado. É formular uma hipótese, definir o que precisa ser verdadeiro para ela fazer sentido e aceitar que o resultado pode contrariar a leitura."
          ],

          [
            "JOGO ≠ MERCADO",
            "O jogo acontece em campo. O mercado é uma representação precificada das possibilidades. Uma boa leitura do jogo não garante, sozinha, uma boa operação."
          ],

          [
            "ODD E PROBABILIDADE",
            "A odd representa um preço. O trabalho analítico começa quando você compara esse preço com a probabilidade que sua leitura atribui ao evento."
          ],

          [
            "VALOR",
            "Valor não significa acertar mais. Significa encontrar situações em que o preço disponível parece maior do que o risco implícito na sua estimativa."
          ],

          [
            "REGRA DE OURO",
            "Nunca transforme uma opinião em certeza. Uma leitura pode ser boa e ainda assim perder."
          ]

        ],

        checklist: [
          "Sei explicar minha hipótese?",
          "Sei qual mercado estou analisando?",
          "Sei por que o preço importa?",
          "Aceito a possibilidade de estar errado?"
        ]

      },


      {
        id: "ler-jogo",

        title: "COMO LER UM JOGO",

        kicker: "02 · LEITURA",

        intro:
          "Antes de procurar uma entrada, organize o que está acontecendo.",

        sections: [

          [
            "CONTEXTO",
            "Quem joga? Onde? Em qual competição? Qual é a situação de cada equipe? Contexto muda a interpretação dos números."
          ],

          [
            "FORÇA E ESTILO",
            "Observe como as equipes produzem e sofrem situações de perigo. Não basta saber quem venceu os últimos jogos."
          ],

          [
            "MOMENTO",
            "Forma recente é uma pista, não uma sentença. Procure mudanças de desempenho e não apenas resultados."
          ],

          [
            "EVENTOS RELEVANTES",
            "Escalações, lesões, suspensões, calendário e motivação podem alterar a leitura."
          ],

          [
            "TESE",
            "Depois de observar, resuma o jogo em uma frase. Se você não consegue explicar a tese, provavelmente ainda está coletando informação."
          ]

        ],

        checklist: [
          "Contexto identificado?",
          "Estilo das equipes entendido?",
          "Informação relevante separada do ruído?",
          "Tese escrita em uma frase?"
        ]

      },


      {
        id: "mercados",

        title: "ENTENDENDO MERCADOS",

        kicker: "03 · MERCADO",

        intro:
          "Mercado é uma forma de expressar uma hipótese. Não é um botão de lucro.",

        sections: [

          [
            "RESULTADO",
            "Mercados de resultado tentam responder quem vence ou como o placar termina. Eles carregam uma interpretação simples, mas não necessariamente fácil."
          ],

          [
            "GOLS",
            "Mercados de gols exigem entender produção ofensiva, resistência defensiva, ritmo e contexto do confronto."
          ],

          [
            "AMBAS MARCAM",
            "A pergunta é diferente de 'quem vence': as duas equipes têm condições reais de marcar?"
          ],

          [
            "HANDICAPS",
            "O handicap modifica a referência do resultado. Leia sempre qual condição precisa acontecer para sua hipótese estar correta."
          ],

          [
            "MERCADO E TESE",
            "Escolha o mercado depois de entender o jogo. Não force a leitura para caber no mercado que você queria operar."
          ]

        ],

        checklist: [
          "Sei exatamente o que o mercado exige?",
          "Minha tese combina com o mercado?",
          "Conheço o risco específico?",
          "Estou escolhendo o preço ou apenas o nome do mercado?"
        ]

      },


      {
        id: "processo",

        title: "PROCESSO DE DECISÃO",

        kicker: "04 · PROCESSO",

        intro:
          "Uma decisão consistente nasce de um processo repetível.",

        sections: [

          [
            "1. OBSERVE",
            "Colete apenas informações que podem mudar sua leitura."
          ],

          [
            "2. FORMULE",
            "Transforme informação em hipótese: o que você acredita que pode acontecer e por quê?"
          ],

          [
            "3. PRECIFIQUE",
            "Compare sua estimativa com o preço disponível. Sem preço, não existe avaliação completa de valor."
          ],

          [
            "4. DECIDA",
            "Entrar, esperar ou não operar também são decisões válidas."
          ],

          [
            "5. REGISTRE",
            "Anote a tese antes do resultado. Isso protege sua análise contra o viés de retrospectiva."
          ]

        ],

        checklist: [
          "Observei?",
          "Formulei?",
          "Comparei preço e probabilidade?",
          "Decidi sem impulso?",
          "Registrei?"
        ]

      }

    ]

  },


  /* ===================================================
     02 — PUNTER
  =================================================== */

  punter: {

    icon: "🎯",

    title: "PUNTER",

    subtitle: "ENCONTRE VALOR ANTES DO JOGO.",

    intro:
      "O punter trabalha principalmente com preparação, tese e preço antes da partida.",

    focus:
      "TESE ANTES DA ENTRADA.",

    modules: [

      {
        id: "valor",

        title: "ENCONTRAR VALOR",

        kicker: "01 · VALOR",

        intro:
          "Valor começa antes da entrada: nasce da comparação entre sua leitura e o preço.",

        sections: [

          [
            "PREÇO PRIMEIRO",
            "Uma boa equipe não é automaticamente uma boa aposta. A pergunta é: este preço compensa a probabilidade estimada?"
          ],

          [
            "PROBABILIDADE",
            "Transforme sua opinião em uma estimativa. Ela pode ser aproximada, mas precisa existir para permitir comparação."
          ],

          [
            "MARGEM",
            "Quanto maior a distância entre sua estimativa e o preço, maior a margem teórica — e maior também a necessidade de revisar se sua leitura não está otimista demais."
          ],

          [
            "CONTRA O FAVORITISMO",
            "Nome, camisa e sequência de vitórias não são argumento suficiente. Valor exige preço."
          ],

          [
            "PASSE",
            "Se o preço não oferece uma relação interessante entre risco e retorno, não operar é parte do método."
          ]

        ],

        checklist: [
          "Tenho estimativa?",
          "Tenho preço?",
          "Existe margem?",
          "Procurei argumentos contra minha tese?",
          "Aceitaria passar?"
        ]

      },


      {
        id: "prejogo",

        title: "ANÁLISE PRÉ-JOGO",

        kicker: "02 · PRÉ-JOGO",

        intro:
          "Uma análise pré-jogo eficiente elimina ruído e organiza contexto.",

        sections: [

          [
            "CENÁRIO",
            "Competição, mando, necessidade de resultado e calendário formam o cenário."
          ],

          [
            "FORMA",
            "Use resultados recentes como evidência, não como narrativa pronta."
          ],

          [
            "CASA/FORA",
            "Desempenho como mandante e visitante pode alterar significativamente a leitura."
          ],

          [
            "ELENCOS",
            "Ausências importantes podem mudar estrutura, intensidade e qualidade."
          ],

          [
            "CONCLUSÃO",
            "Finalize com uma tese objetiva e com as condições que fariam você desistir dela."
          ]

        ],

        checklist: [
          "Cenário?",
          "Forma?",
          "Casa/fora?",
          "Elencos?",
          "Condição de invalidação?"
        ]

      },


      {
        id: "mercados",

        title: "MERCADOS",

        kicker: "03 · ESCOLHA",

        intro:
          "O melhor mercado é aquele que expressa melhor a sua hipótese.",

        sections: [

          [
            "MAPEIE A TESE",
            "Se sua tese é sobre domínio, procure mercados que dependam de domínio. Se é sobre gols, procure mercados coerentes com essa leitura."
          ],

          [
            "NÃO FORCE",
            "Não escolha um mercado apenas porque a odd parece atraente."
          ],

          [
            "LINHAS",
            "Compare linhas e preços quando disponíveis. Pequenas diferenças mudam a relação risco/retorno."
          ],

          [
            "LIQUIDEZ E CONTEXTO",
            "Considere se o mercado é adequado ao seu momento e à sua capacidade de acompanhar a operação."
          ],

          [
            "REGISTRO",
            "Anote qual mercado escolheu e por que ele era a melhor tradução da tese."
          ]

        ],

        checklist: [
          "Mercado traduz a tese?",
          "Linha entendida?",
          "Preço analisado?",
          "Risco conhecido?"
        ]

      },


      {
        id: "gestao",

        title: "GESTÃO & DISCIPLINA",

        kicker: "04 · CONTROLE",

        intro:
          "Gestão não melhora uma leitura ruim, mas impede que uma decisão ruim destrua o processo.",

        sections: [

          [
            "RISCO",
            "Defina antes da operação quanto está disposto a colocar em risco."
          ],

          [
            "SEM RECUPERAÇÃO",
            "Uma perda não cria obrigação de fazer outra operação. Recuperar banca não é objetivo de uma decisão."
          ],

          [
            "DISCIPLINA",
            "A regra precisa existir antes da emoção. Depois que a pressão chega, improvisar fica muito mais difícil."
          ],

          [
            "SEQUÊNCIAS",
            "Resultados consecutivos não provam que a próxima decisão deve ser diferente. Cada operação precisa ser avaliada pelo próprio contexto."
          ],

          [
            "PASSE",
            "Disciplina também é dizer não quando a oportunidade não atende aos critérios."
          ]

        ],

        checklist: [
          "Risco definido?",
          "Sem tentativa de recuperação?",
          "Critérios intactos?",
          "Aceito ficar de fora?"
        ]

      }

    ]

  },


  /* ===================================================
     03 — TRADER
  =================================================== */

  trader: {

    icon: "📈",

    title: "TRADER",

    subtitle: "LEIA O MERCADO EM MOVIMENTO.",

    intro:
      "Trading exige acompanhar jogo, preço, timing e comportamento sem confundir movimento com informação.",

    focus:
      "MOVIMENTO + CONTEXTO + DECISÃO.",

    modules: [

      {
        id: "mercado",

        title: "MERCADO",

        kicker: "01 · MERCADO",

        intro:
          "O preço se move porque informação, expectativa e liquidez mudam.",

        sections: [

          [
            "PREÇO",
            "Observe o preço como informação do mercado, não como verdade absoluta."
          ],

          [
            "MOVIMENTO",
            "Uma mudança de preço pode acontecer por vários motivos. Antes de reagir, procure a causa."
          ],

          [
            "JOGO E PREÇO",
            "A operação fica mais forte quando o movimento do mercado encontra confirmação no que acontece em campo."
          ],

          [
            "DIVERGÊNCIA",
            "Quando jogo e preço contam histórias diferentes, existe uma situação para investigar — não uma entrada automática."
          ],

          [
            "ESPERA",
            "Esperar confirmação também é uma posição."
          ]

        ],

        checklist: [
          "O que mudou?",
          "Por que mudou?",
          "O jogo confirma?",
          "O preço ainda faz sentido?"
        ]

      },


      {
        id: "timing",

        title: "TIMING",

        kicker: "02 · MOMENTO",

        intro:
          "Timing é escolher quando agir, não apenas saber o que você pensa.",

        sections: [

          [
            "ANTES",
            "Entrar cedo pode oferecer preço, mas exige maior tolerância à incerteza."
          ],

          [
            "DURANTE",
            "Esperar um evento pode reduzir incerteza, mas também pode piorar o preço."
          ],

          [
            "CONFIRMAÇÃO",
            "Defina previamente o que seria confirmação e o que seria invalidação."
          ],

          [
            "ATRASO",
            "Não persiga um movimento que já aconteceu."
          ],

          [
            "PACIENTE",
            "O melhor timing às vezes é nenhum timing."
          ]

        ],

        checklist: [
          "Sei o gatilho?",
          "Sei a invalidação?",
          "Estou perseguindo preço?",
          "O timing melhora a tese?"
        ]

      },


      {
        id: "entrada-saida",

        title: "ENTRADA & SAÍDA",

        kicker: "03 · EXECUÇÃO",

        intro:
          "Uma operação precisa nascer com plano de entrada e condições de saída.",

        sections: [

          [
            "ENTRADA",
            "Defina qual condição precisa estar presente para a entrada fazer sentido."
          ],

          [
            "STOP",
            "Uma saída por invalidação protege o processo contra apego à tese."
          ],

          [
            "ALVO",
            "Se existe uma condição para encerrar com ganho, ela deve ser coerente com a tese."
          ],

          [
            "MUDANÇA",
            "Se a informação que sustentava a operação desapareceu, a posição precisa ser reavaliada."
          ],

          [
            "SEM IMPROVISO",
            "Alterar regras no meio da pressão transforma uma estratégia em reação."
          ]

        ],

        checklist: [
          "Entrada definida?",
          "Invalidação definida?",
          "Saída definida?",
          "Mudança de cenário monitorada?"
        ]

      },


      {
        id: "psicologia",

        title: "PSICOLOGIA",

        kicker: "04 · MENTE",

        intro:
          "A parte difícil do trading não é apenas interpretar o jogo. É continuar seguindo critérios quando o resultado pressiona.",

        sections: [

          [
            "RESULTADO NÃO É PROCESSO",
            "Uma decisão ruim pode ganhar. Uma decisão boa pode perder. Avalie primeiro a qualidade da decisão."
          ],

          [
            "FOMO",
            "Perder uma oportunidade não cria outra oportunidade. Entrar atrasado por medo é uma nova decisão."
          ],

          [
            "REVANCHE",
            "Uma perda não precisa ser compensada imediatamente."
          ],

          [
            "EXCESSO DE CONFIANÇA",
            "Uma sequência positiva não elimina o risco."
          ],

          [
            "DIÁRIO",
            "Registre estado emocional, tese e execução. Padrões psicológicos aparecem quando você olha para várias decisões."
          ]

        ],

        checklist: [
          "Estou calmo?",
          "Estou perseguindo?",
          "Estou tentando recuperar?",
          "Minha regra continua a mesma?"
        ]

      }

    ]

  },


  /* ===================================================
     04 — PRÉ-LIVE
  =================================================== */

  prelive: {

    icon: "⏱️",

    title: "PRÉ-LIVE",

    subtitle: "PREPARE A LEITURA ANTES DO JOGO.",

    intro:
      "Transforme a preparação em um processo antes que a velocidade do live comece.",

    focus:
      "PREPARAÇÃO ANTES DA PRESSÃO.",

    modules: [

      {
        id: "checklist",

        title: "CHECKLIST PRÉ-JOGO",

        kicker: "01 · PREPARAÇÃO",

        intro:
          "Um checklist reduz a chance de esquecer justamente o que contradiz sua primeira impressão.",

        sections: [

          [
            "JOGO",
            "Competição, horário, mando e contexto."
          ],

          [
            "EQUIPES",
            "Forma, estilo, desfalques e calendário."
          ],

          [
            "MERCADO",
            "Mercado escolhido, linha e preço."
          ],

          [
            "TESE",
            "Hipótese principal e argumentos contra."
          ],

          [
            "PLANO",
            "O que observar antes de decidir."
          ]

        ],

        checklist: [
          "Contexto?",
          "Elencos?",
          "Mercado?",
          "Preço?",
          "Tese?",
          "Plano?"
        ]

      },


      {
        id: "escalacoes",

        title: "ESCALAÇÕES",

        kicker: "02 · ELENCOS",

        intro:
          "Escalação não é detalhe: pode alterar a estrutura do jogo.",

        sections: [

          [
            "QUEM SAI",
            "Identifique ausências que alteram qualidade, função ou equilíbrio."
          ],

          [
            "QUEM ENTRA",
            "Não avalie apenas o nome. Observe a função que será ocupada."
          ],

          [
            "SISTEMA",
            "Uma mudança individual pode produzir uma mudança coletiva."
          ],

          [
            "BANCO",
            "Opções de substituição também fazem parte do cenário."
          ],

          [
            "REVISÃO",
            "Se a escalação contradiz sua tese, revise antes de operar."
          ]

        ],

        checklist: [
          "Ausências relevantes?",
          "Funções alteradas?",
          "Sistema mantido?",
          "Tese continua válida?"
        ]

      },


      {
        id: "contexto",

        title: "CONTEXTO",

        kicker: "03 · CENÁRIO",

        intro:
          "Números sem contexto podem criar uma história convincente e errada.",

        sections: [

          [
            "COMPETIÇÃO",
            "Pontos, mata-mata, calendário e necessidade de resultado."
          ],

          [
            "CALENDÁRIO",
            "Descanso e sequência de jogos podem influenciar intensidade."
          ],

          [
            "MOTIVAÇÃO",
            "Evite tratar motivação como certeza psicológica. Procure evidências no cenário."
          ],

          [
            "MANDO",
            "O local do jogo altera dinâmica e comportamento."
          ],

          [
            "CLIMA DO JOGO",
            "Antecipe quais eventos podem mudar a partida."
          ]

        ],

        checklist: [
          "Competição?",
          "Calendário?",
          "Mando?",
          "Necessidade?",
          "Eventos-chave?"
        ]

      },


      {
        id: "tese",

        title: "TESE DO JOGO",

        kicker: "04 · HIPÓTESE",

        intro:
          "A tese é uma previsão condicional, não uma promessa.",

        sections: [

          [
            "UMA FRASE",
            "Resuma sua leitura em uma frase simples."
          ],

          [
            "POR QUÊ",
            "Liste os dois ou três argumentos mais fortes."
          ],

          [
            "CONTRA",
            "Liste o principal argumento que pode destruir sua leitura."
          ],

          [
            "MERCADO",
            "Escolha a forma mais adequada de expressar a hipótese."
          ],

          [
            "PLANO",
            "Defina o que precisa acontecer para agir, esperar ou abandonar."
          ]

        ],

        checklist: [
          "Tese em uma frase?",
          "Argumentos?",
          "Contra-argumento?",
          "Mercado?",
          "Gatilho?"
        ]

      }

    ]

  },


  /* ===================================================
     05 — LIVE
  =================================================== */

  live: {

    icon: "🔴",

    title: "LIVE",

    subtitle: "O JOGO MUDA. SUA LEITURA TAMBÉM.",

    intro:
      "No live, informação nova chega rápido. O trabalho é decidir o que realmente mudou.",

    focus:
      "INFORMAÇÃO NOVA → NOVA DECISÃO.",

    modules: [

      {
        id: "monitorar",

        title: "MONITORAR JOGO",

        kicker: "01 · OBSERVAÇÃO",

        intro:
          "Monitorar não é clicar a cada evento. É acompanhar variáveis que importam para a tese.",

        sections: [

          [
            "MOMENTO",
            "Observe quem controla o ritmo e se isso é sustentado."
          ],

          [
            "CHANCES",
            "Qualidade de oportunidades importa mais do que simplesmente contar finalizações."
          ],

          [
            "TÁTICA",
            "Mudanças de posicionamento podem alterar a leitura."
          ],

          [
            "EVENTOS",
            "Cartões, lesões e substituições podem mudar o cenário."
          ],

          [
            "MERCADO",
            "Acompanhe preço sem permitir que ele substitua a leitura do jogo."
          ]

        ],

        checklist: [
          "O que mudou?",
          "É sustentado?",
          "É relevante para a tese?",
          "O preço acompanhou?"
        ]

      },


      {
        id: "momento",

        title: "MOMENTO",

        kicker: "02 · LEITURA",

        intro:
          "Momento é uma fotografia em movimento. O objetivo é distinguir pressão passageira de mudança estrutural.",

        sections: [

          [
            "PRESSÃO",
            "Quem está criando situações de perigo com frequência?"
          ],

          [
            "QUALIDADE",
            "Pressão territorial sem chance clara pode ser menos relevante do que parece."
          ],

          [
            "RESPOSTA",
            "Observe como a equipe adversária reage."
          ],

          [
            "DURAÇÃO",
            "Um lance isolado não necessariamente muda o jogo."
          ],

          [
            "MUDANÇA",
            "Quando vários sinais apontam na mesma direção, a tese merece revisão."
          ]

        ],

        checklist: [
          "Pressão?",
          "Qualidade?",
          "Resposta?",
          "Persistência?",
          "Mudança real?"
        ]

      },


      {
        id: "mercado-live",

        title: "MERCADO LIVE",

        kicker: "03 · PREÇO",

        intro:
          "O mercado live reage ao jogo. A sua tarefa é entender se a reação é proporcional ao que aconteceu.",

        sections: [

          [
            "EVENTO",
            "Identifique o acontecimento que provocou o movimento."
          ],

          [
            "REAÇÃO",
            "Pergunte se o preço incorporou uma mudança pequena ou estrutural."
          ],

          [
            "ATRASO",
            "Uma oportunidade pode existir quando informação ainda não foi totalmente refletida, mas isso exige cautela."
          ],

          [
            "LIQUIDEZ",
            "Execução e liquidez importam ainda mais em movimento rápido."
          ],

          [
            "SEM PERSEGUIR",
            "Se o preço fugiu, reavalie a operação em vez de correr atrás."
          ]

        ],

        checklist: [
          "Causa?",
          "Reação?",
          "Proporção?",
          "Execução?",
          "Ainda existe tese?"
        ]

      },


      {
        id: "leitura-tempo-real",

        title: "LEITURA EM TEMPO REAL",

        kicker: "04 · DECISÃO",

        intro:
          "A leitura live deve transformar acontecimentos em decisões, não em ansiedade.",

        sections: [

          [
            "ANTES DO CLIQUE",
            "Explique mentalmente o que você está vendo e por que isso importa."
          ],

          [
            "CONFIRMAÇÃO",
            "Defina qual evidência sustenta a decisão."
          ],

          [
            "INVALIDAÇÃO",
            "Defina qual evento faria você parar."
          ],

          [
            "ESPERAR",
            "Se a informação ainda não é suficiente, espere."
          ],

          [
            "REGISTRAR",
            "Depois da operação, registre o que realmente aconteceu."
          ]

        ],

        checklist: [
          "Vi?",
          "Entendi?",
          "Confirmei?",
          "Decidi?",
          "Registrei?"
        ]

      }

    ]

  },


  /* ===================================================
     06 — MÉTODO & LEITURA
  =================================================== */

  metodo: {

    icon: "🧠",

    title: "MÉTODO & LEITURA",

    subtitle: "TRANSFORME EXPERIÊNCIA EM PROCESSO.",

    intro:
      "Método é transformar experiência em critérios que podem ser observados, testados e melhorados.",

    focus:
      "DECISÃO → REGISTRO → ANÁLISE → EVOLUÇÃO.",

    modules: [

      {
        id: "construir",

        title: "CONSTRUINDO UM MÉTODO",

        kicker: "01 · MÉTODO",

        intro:
          "Um método começa com perguntas repetíveis, não com uma promessa de acerto.",

        sections: [

          [
            "CRITÉRIOS",
            "Defina o que precisa estar presente antes de considerar uma oportunidade."
          ],

          [
            "PRIORIDADES",
            "Nem toda informação tem o mesmo peso. Organize o que realmente muda sua leitura."
          ],

          [
            "REPETIÇÃO",
            "Um método precisa poder ser aplicado novamente para produzir dados comparáveis."
          ],

          [
            "FLEXIBILIDADE",
            "Critérios não significam ignorar o contexto. Significam saber quando e por que você foge da regra."
          ],

          [
            "TESTE",
            "Avalie o processo por amostras suficientes, evitando conclusões por poucos resultados."
          ]

        ],

        checklist: [
          "Critérios claros?",
          "Aplicáveis?",
          "Registráveis?",
          "Repetíveis?",
          "Testáveis?"
        ]

      },


      {
        id: "leitura",

        title: "LEITURA DE JOGO",

        kicker: "02 · LEITURA",

        intro:
          "Leitura é organizar sinais diferentes em uma hipótese coerente.",

        sections: [

          [
            "DADOS",
            "Use números para investigar, não para decorar uma narrativa."
          ],

          [
            "CONTEXTO",
            "Pergunte o que os dados não conseguem explicar sozinhos."
          ],

          [
            "CONTRADIÇÕES",
            "Uma boa leitura procura também os sinais que discordam da hipótese."
          ],

          [
            "PESO",
            "Dê mais peso ao que é relevante para a pergunta que você está tentando responder."
          ],

          [
            "SÍNTESE",
            "Finalize com uma tese curta e verificável."
          ]

        ],

        checklist: [
          "Dados?",
          "Contexto?",
          "Contradições?",
          "Peso?",
          "Síntese?"
        ]

      },


      {
        id: "checklist-decisao",

        title: "CHECKLIST DE DECISÃO",

        kicker: "03 · DECISÃO",

        intro:
          "O checklist transforma intenção em processo observável.",

        sections: [

          [
            "CONTEXTO",
            "Entendi o cenário?"
          ],

          [
            "TESE",
            "Consigo explicar o que espero que aconteça?"
          ],

          [
            "PREÇO",
            "O preço é compatível com minha estimativa?"
          ],

          [
            "RISCO",
            "Se eu estiver errado, o que acontece?"
          ],

          [
            "EXECUÇÃO",
            "Sei quando entrar, quando esperar e quando sair?"
          ]

        ],

        checklist: [
          "Contexto",
          "Tese",
          "Preço",
          "Risco",
          "Execução",
          "Registro"
        ]

      },


      {
        id: "historico",

        title: "ANÁLISE DO HISTÓRICO",

        kicker: "04 · APRENDIZADO",

        intro:
          "Histórico não serve apenas para contar ganhos e perdas. Serve para descobrir como você decide.",

        sections: [

          [
            "RESULTADO",
            "Veja o resultado, mas não pare nele."
          ],

          [
            "PROCESSO",
            "A decisão seguiu os critérios?"
          ],

          [
            "PADRÕES",
            "Procure mercados, horários, situações e comportamentos recorrentes."
          ],

          [
            "ERROS",
            "Classifique erros: leitura, preço, execução, disciplina ou registro."
          ],

          [
            "EVOLUÇÃO",
            "Escolha uma variável para melhorar de cada vez e acompanhe a mudança."
          ]

        ],

        checklist: [
          "Resultado?",
          "Processo?",
          "Padrão?",
          "Erro classificado?",
          "Próximo ajuste?"
        ]

      }

    ]

  }

};


/* =====================================================
   UTILITIES
===================================================== */

function escapeHtml(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


/* =====================================================
   SECTION MANAGEMENT
===================================================== */

function getSections() {

  return [

    "gamesSection",
    "exploreSection",
    "historySection",
    "metricsSection",
    "decisionsSection"

  ];

}


function updateNav(sectionId, button) {

  document
    .querySelectorAll("#mainNavigation button")
    .forEach(function(item) {

      item.classList.remove("active");

    });


  if (button) {

    button.classList.add("active");

  } else {

    const match =
      document.querySelector(
        '#mainNavigation button[data-section="' +
        sectionId +
        '"]'
      );

    if (match) {

      match.classList.add("active");

    }

  }

}


function showSection(sectionId, button) {

  getSections().forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add("hidden");

    }

  });


  const home =
    document.getElementById("homeSection");

  if (home) {

    home.classList.add("hidden");

  }


  const selected =
    document.getElementById(sectionId);

  if (selected) {

    selected.classList.remove("hidden");

  }


  const nav =
    document.getElementById("mainNavigation");

  if (nav) {

    nav.classList.remove("hidden");

  }


  updateNav(sectionId, button);

  currentPage = sectionId;


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  if (sectionId === "exploreSection") {

    renderExploreHub();

  }

}


window.showSection = showSection;


/* =====================================================
   HOME
===================================================== */

window.openHomeSection = function(sectionId) {

  showSection(sectionId, null);

};

window.showNexUpProfile = function() {

  const profile =
    onboardingAnswers.nexupProfile || "EQUILIBRADO";

  const score =
    onboardingAnswers.nexupProfileScore || 0;

  const profileSection =
    document.getElementById("profileSection");

  if (!profileSection) {
    return;
  }

  getSections().forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {
      section.classList.add("hidden");
    }

  });

  profileSection.classList.remove("hidden");

  profileSection.innerHTML = `

    <div class="section-heading-row">

      <div>

        <div class="section-kicker">
          NEXUP · MEU PERFIL
        </div>

        <h2 class="section-title">
          SEU PERFIL NEXUP
        </h2>

        <div class="section-subtitle">
          Seu perfil foi definido a partir das respostas do seu questionário.
        </div>

      </div>

    </div>


    <div
      class="panel"
      style="
        margin-top:18px;
        text-align:center;
        padding:30px 20px;
      "
    >

      <div
        style="
          font-size:28px;
          margin-bottom:12px;
        "
      >
        ⚡
      </div>

      <div
        style="
          font-size:11px;
          color:var(--text-muted);
          letter-spacing:1px;
          font-weight:800;
        "
      >
        SEU PERFIL
      </div>

      <div
        style="
          margin-top:8px;
          font-size:24px;
          font-weight:900;
          letter-spacing:.5px;
        "
      >
        ${profile}
      </div>

      <div
        style="
          margin-top:12px;
          color:var(--text-soft);
          font-size:11px;
        "
      >
        Pontuação: ${score}/16
      </div>

    </div>

  `;

  currentPage = "profileSection";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};
window.returnToHome = function() {

  getSections().forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add("hidden");

    }

  });


  const home =
    document.getElementById("homeSection");

  if (home) {

    home.classList.remove("hidden");

  }


  const nav =
    document.getElementById("mainNavigation");

  if (nav) {

    nav.classList.add("hidden");

  }


  document
    .querySelectorAll("#mainNavigation button")
    .forEach(function(item) {

      item.classList.remove("active");

    });


  currentPage = "homeSection";

  currentExplorePath = null;


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

};


window.returnToGames = function() {

  showSection("gamesSection", null);

};


/* =====================================================
   EXPLORE — HUB
===================================================== */

function renderExploreHub() {

  const section =
    document.getElementById("exploreSection");


  if (!section) {

    return;

  }


  if (currentExplorePath) {

    return;

  }


  section.innerHTML = `

    <div class="section-heading-row">

      <div>

        <div class="section-kicker">
          NEXUP · CAMINHOS
        </div>

        <h2 class="section-title">
          ENCONTRE SEU CAMINHO.
        </h2>

        <div class="section-subtitle">
          Escolha o ponto de partida que mais combina com a forma como você pensa o jogo.
        </div>

      </div>

    </div>


    <div
      id="nexupPathGrid"
      style="
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:12px;
      "
    ></div>


    <div
      class="footer"
      style="margin-top:30px;"
    >
      NEXUP — DECISION INTELLIGENCE
    </div>

  `;


  const grid =
    document.getElementById("nexupPathGrid");


  if (!grid) {

    return;

  }


  Object.keys(PATHS).forEach(function(key) {

    const path =
      PATHS[key];


    const card =
      document.createElement("button");


    card.type = "button";


    card.style.cssText = `

      display:flex;

      align-items:center;

      gap:16px;

      width:100%;

      min-height:118px;

      padding:20px;

      text-align:left;

      background:
        linear-gradient(
          145deg,
          rgba(255,255,255,.018),
          transparent 65%
        ),
        var(--surface);

      border:1px solid var(--border);

      border-radius:13px;

      color:var(--text);

      cursor:pointer;

    `;


    card.innerHTML = `

      <div
        style="
          width:44px;
          height:44px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          border-radius:10px;
          background:rgba(255,255,255,.045);
          font-size:20px;
        "
      >
        ${path.icon}
      </div>


      <div style="flex:1;">

        <strong
          style="
            display:block;
            font-size:12px;
            letter-spacing:.4px;
          "
        >
          ${escapeHtml(path.title)}
        </strong>


        <span
          style="
            display:block;
            margin-top:6px;
            color:var(--text-muted);
            font-size:10px;
            line-height:1.45;
          "
        >
          ${escapeHtml(path.subtitle)}
        </span>


        <span
          style="
            display:block;
            margin-top:8px;
            color:var(--text-muted);
            font-size:10px;
          "
        >
          ${path.modules.length} módulos
        </span>

      </div>


      <div
        style="
          color:var(--text-muted);
          font-size:18px;
        "
      >
        →
      </div>

    `;


    card.addEventListener("click", function() {

      window.openExplorePath(key);

    });


    grid.appendChild(card);

  });


  if (window.innerWidth <= 700) {

    grid.style.gridTemplateColumns = "1fr";

  }

}


/* =====================================================
   EXPLORE — PATH
===================================================== */

window.openExplorePath = function(pathKey) {

  const path =
    PATHS[pathKey];


  const section =
    document.getElementById("exploreSection");


  if (!path || !section) {

    return;

  }


  currentExplorePath =
    pathKey;


  section.innerHTML = `

    <div style="margin-bottom:22px;">

      <button
        type="button"
        id="nexupBackToPaths"
        style="
          padding:10px 14px;
          background:transparent;
          border:1px solid var(--border);
          border-radius:8px;
          color:var(--text-soft);
          font-size:10px;
          font-weight:800;
          cursor:pointer;
        "
      >
        ← TODOS OS CAMINHOS
      </button>

    </div>


    <div
      class="panel"
      style="margin-top:0;"
    >

      <div
        style="
          font-size:30px;
          margin-bottom:12px;
        "
      >
        ${path.icon}
      </div>


      <div class="section-kicker">
        ${escapeHtml(path.focus)}
      </div>


      <h2
        class="section-title"
        style="
          font-size:22px;
          margin-top:8px;
        "
      >
        ${escapeHtml(path.title)}
      </h2>


      <div class="section-subtitle">
        ${escapeHtml(path.subtitle)}
      </div>


      <p
        style="
          max-width:720px;
          color:var(--text-soft);
          font-size:12px;
          line-height:1.7;
          margin:0;
        "
      >
        ${escapeHtml(path.intro)}
      </p>

    </div>


    <div
      id="nexupModuleGrid"
      style="
        display:grid;
        grid-template-columns:
          repeat(2,minmax(0,1fr));
        gap:12px;
        margin-top:18px;
      "
    ></div>

  `;


  const grid =
    document.getElementById("nexupModuleGrid");


  path.modules.forEach(function(module, index) {

    const card =
      document.createElement("button");


    card.type = "button";


    card.style.cssText = `

      display:block;

      width:100%;

      padding:20px;

      text-align:left;

      background:var(--surface);

      border:1px solid var(--border);

      border-radius:12px;

      color:var(--text);

      cursor:pointer;

    `;


    card.innerHTML = `

      <div
        style="
          color:var(--indigo-soft);
          font-size:9px;
          font-weight:800;
          letter-spacing:1.2px;
        "
      >
        ${escapeHtml(module.kicker)}
      </div>


      <strong
        style="
          display:block;
          margin-top:8px;
          font-size:13px;
        "
      >
        ${escapeHtml(module.title)}
      </strong>


      <span
        style="
          display:block;
          margin-top:8px;
          color:var(--text-muted);
          font-size:10px;
          line-height:1.55;
        "
      >
        ${escapeHtml(module.intro)}
      </span>


      <span
        style="
          display:block;
          margin-top:14px;
          color:var(--indigo-soft);
          font-size:9px;
          font-weight:800;
        "
      >
        ABRIR →
      </span>

    `;


    card.addEventListener("click", function() {

      renderModule(
        pathKey,
        index
      );

    });


    grid.appendChild(card);

  });


  if (window.innerWidth <= 700) {

    grid.style.gridTemplateColumns =
      "1fr";

  }


  const backButton =
    document.getElementById("nexupBackToPaths");


  if (backButton) {

    backButton.addEventListener(
      "click",
      function() {

        currentExplorePath = null;

        renderExploreHub();

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

};


/* =====================================================
   EXPLORE — MODULE
===================================================== */

function renderModule(
  pathKey,
  moduleIndex
) {

  const path =
    PATHS[pathKey];


  const module =
    path.modules[moduleIndex];


  const section =
    document.getElementById("exploreSection");


  if (
    !section ||
    !module
  ) {

    return;

  }


  const sectionsHtml =
    module.sections
      .map(function(item, index) {

        return `

          <div
            class="panel"
            style="margin-top:12px;"
          >

            <div class="section-kicker">

              ${String(index + 1)
                .padStart(2, "0")}

            </div>


            <h3
              style="
                margin:8px 0;
                font-size:13px;
              "
            >
              ${escapeHtml(item[0])}
            </h3>


            <p
              style="
                margin:0;
                color:var(--text-soft);
                font-size:11px;
                line-height:1.7;
              "
            >
              ${escapeHtml(item[1])}
            </p>

          </div>

        `;

      })
      .join("");


  const checklistHtml =
    module.checklist
      .map(function(item) {

        return `

          <li
            style="
              margin:8px 0;
              color:var(--text-soft);
              font-size:11px;
              line-height:1.5;
            "
          >
            ${escapeHtml(item)}
          </li>

        `;

      })
      .join("");


  section.innerHTML = `

    <div
      style="
        margin-bottom:22px;
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      "
    >

      <button
        type="button"
        id="nexupBackToPath"
        style="
          padding:10px 14px;
          background:transparent;
          border:1px solid var(--border);
          border-radius:8px;
          color:var(--text-soft);
          font-size:10px;
          font-weight:800;
          cursor:pointer;
        "
      >
        ← ${escapeHtml(path.title)}
      </button>


      <button
        type="button"
        id="nexupBackToAllPaths"
        style="
          padding:10px 14px;
          background:transparent;
          border:1px solid var(--border);
          border-radius:8px;
          color:var(--text-soft);
          font-size:10px;
          font-weight:800;
          cursor:pointer;
        "
      >
        TODOS OS CAMINHOS
      </button>

    </div>


    <div
      class="panel"
      style="margin-top:0;"
    >

      <div class="section-kicker">
        ${escapeHtml(module.kicker)}
      </div>


      <h2
        class="section-title"
        style="
          font-size:21px;
          margin-top:8px;
        "
      >
        ${escapeHtml(module.title)}
      </h2>


      <div class="section-subtitle">
        ${escapeHtml(path.subtitle)}
      </div>


      <p
        style="
          max-width:760px;
          color:var(--text-soft);
          font-size:12px;
          line-height:1.7;
          margin:0;
        "
      >
        ${escapeHtml(module.intro)}
      </p>

    </div>


    ${sectionsHtml}


    <div class="panel">

      <div class="section-kicker">
        CHECKLIST NEXUP
      </div>


      <h3
        style="
          margin:8px 0;
          font-size:13px;
        "
      >
        ANTES DE SEGUIR
      </h3>


      <ul
        style="
          padding-left:18px;
          margin:10px 0 0;
        "
      >
        ${checklistHtml}
      </ul>

    </div>


    <div
      style="
        display:flex;
        justify-content:space-between;
        gap:10px;
        margin-top:18px;
      "
    >

      <button
        type="button"
        id="nexupPrevModule"
        style="
          padding:11px 14px;
          background:var(--surface);
          border:1px solid var(--border);
          border-radius:8px;
          color:var(--text-soft);
          font-size:10px;
          font-weight:800;
          cursor:pointer;
        "
      >
        ← ANTERIOR
      </button>


      <button
        type="button"
        id="nexupNextModule"
        style="
          padding:11px 14px;
          background:var(--indigo);
          border:1px solid var(--indigo);
          border-radius:8px;
          color:white;
          font-size:10px;
          font-weight:800;
          cursor:pointer;
        "
        ${moduleIndex === path.modules.length - 1
          ? "disabled"
          : ""}
      >
        PRÓXIMO →
      </button>

    </div>

  `;


  const backPath =
    document.getElementById(
      "nexupBackToPath"
    );


  if (backPath) {

    backPath.addEventListener(
      "click",
      function() {

        window.openExplorePath(
          pathKey
        );

      }
    );

  }


  const backAll =
    document.getElementById(
      "nexupBackToAllPaths"
    );


  if (backAll) {

    backAll.addEventListener(
      "click",
      function() {

        currentExplorePath = null;

        renderExploreHub();

      }
    );

  }


const previous =
  document.getElementById(
    "nexupPrevModule"
  );

if (previous) {

  previous.addEventListener(
    "click",
    function() {

      if (moduleIndex > 0) {

        renderModule(
          pathKey,
          moduleIndex - 1
        );

      } else {

        window.openExplorePath(
          pathKey
        );

      }

    }
  );

}


  const next =
    document.getElementById(
      "nexupNextModule"
    );


  if (
    next &&
    moduleIndex <
      path.modules.length - 1
  ) {

    next.addEventListener(
      "click",
      function() {

        renderModule(
          pathKey,
          moduleIndex + 1
        );

      }
    );

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================================
   ONBOARDING
===================================================== */

function showOnboardingStep(step) {

  currentOnboardingStep =
    step;


  document
    .querySelectorAll(".onboarding-step")
    .forEach(function(element) {

      element.classList.toggle(

        "active",

        Number(element.dataset.step) ===
          step

      );

    });


  document
    .querySelectorAll(".progress-dot")
    .forEach(function(dot, index) {

      dot.classList.toggle(

        "active",

        index === step - 1

      );

    });


  const back =
    document.getElementById(
      "onboardingBack"
    );


 if (back) {

  back.style.visibility = "visible";

  back.innerText =
    step === 1
      ? "✕ FECHAR"
      : "← VOLTAR";

}

  }


/* =====================================================
   OPEN ONBOARDING
===================================================== */

window.openOnboarding = function() {

  showOnboardingStep(1);


  const overlay =
    document.getElementById(
      "nexupOnboarding"
    );


  if (overlay) {

    overlay.classList.remove(
      "hidden"
    );

  }

};


/* =====================================================
   CLOSE ONBOARDING
===================================================== */

function closeOnboarding() {

  const overlay =
    document.getElementById(
      "nexupOnboarding"
    );


  if (overlay) {

    overlay.classList.add(
      "hidden"
    );

  }


  showOnboardingStep(1);


  window.returnToHome();

}


/* =====================================================
   FINISH ONBOARDING
===================================================== */
function calculateNexUpProfile() {

  let score = 0;

  const scores = {

    step1: {
      "INICIANTE": 1,
      "APRENDIZ": 1,
      "PUNTER": 2,
      "TRADER": 3,
      "TRADER EXPERIENTE": 4
    },

    step2: {
      "MENOS DE 6 MESES": 1,
      "6 MESES — 2 ANOS": 2,
      "2 — 5 ANOS": 3,
      "MAIS DE 5 ANOS": 4
    },

    step3: {
      "POUCAS OPERACOES": 1,
      "OPORTUNIDADE CLARA": 1,
      "DESCOBRINDO METODO": 2,
      "OPORTUNIDADES DURANTE O JOGO": 3,
      "MAIS RISCO": 4
    },

    step4: {
      "APRENDER": 1,
      "ORGANIZAR OPERACOES": 2,
      "MELHORAR DECISOES": 3,
      "EVOLUIR COMO TRADER": 3,
      "ENCONTRAR OPORTUNIDADES": 4
    }

  };

  score += scores.step1[onboardingAnswers.step1] || 0;
  score += scores.step2[onboardingAnswers.step2] || 0;
  score += scores.step3[onboardingAnswers.step3] || 0;
  score += scores.step4[onboardingAnswers.step4] || 0;

  let profile = "EQUILIBRADO";

  if (score <= 6) {
    profile = "CONSERVADOR";
  } else if (score <= 10) {
    profile = "EQUILIBRADO";
  } else if (score <= 13) {
    profile = "ARROJADO";
  } else {
    profile = "AGRESSIVO";
  }

  return {
    profile: profile,
    score: score
  };

}
function finishOnboarding() {
     const nexupProfile = calculateNexUpProfile();

  onboardingAnswers.nexupProfile = nexupProfile.profile;
  onboardingAnswers.nexupProfileScore = nexupProfile.score;

  localStorage.setItem(

    "nexupOnboarding",

    JSON.stringify(
      onboardingAnswers
    )

  );

  window.showNexUpProfile();

  const overlay =
    document.getElementById(
      "nexupOnboarding"
    );


  if (overlay) {

    overlay.classList.add(
      "hidden"
    );

  }

}


/* =====================================================
   LOAD SAVED ONBOARDING
===================================================== */

function loadSavedOnboarding() {

  const saved =
    localStorage.getItem(
      "nexupOnboarding"
    );


  if (!saved) {

    return;

  }


  try {

    onboardingAnswers =
      JSON.parse(saved);

  }

  catch (error) {

    onboardingAnswers = {};

  }

}


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const onboarding =
      document.getElementById(
        "nexupOnboarding"
      );


    const back =
      document.getElementById(
        "onboardingBack"
      );


    document
      .querySelectorAll(
        ".onboarding-step"
      )
      .forEach(function(
        stepElement
      ) {

        stepElement
          .querySelectorAll(
            ".onboarding-option"
          )
          .forEach(function(
            option
          ) {

            option.addEventListener(
              "click",
              function() {

                stepElement
                  .querySelectorAll(
                    ".onboarding-option"
                  )
                  .forEach(
                    function(item) {

                      item.classList.remove(
                        "selected"
                      );

                    }
                  );


                option.classList.add(
                  "selected"
                );


                const step =
                  Number(
                    stepElement.dataset.step
                  );


                onboardingAnswers[
                  "step" + step
                ] =

                  option.dataset.profile ||

                  option.dataset.answer ||

                  option.innerText.trim();


                setTimeout(
                  function() {

                    option.classList.remove(
                      "selected"
                    );


                    if (
                      step < 4
                    ) {

                      showOnboardingStep(
                        step + 1
                      );

                    }

                    else {

                      finishOnboarding();

                    }

                  },
                  180
                );

              }
            );

          });

      });


    if (back) {

      back.addEventListener(
        "click",
        function() {

          if (
            currentOnboardingStep > 1
          ) {

            showOnboardingStep(
              currentOnboardingStep - 1
            );

          }

          else {

            closeOnboarding();

          }

        }
      );

    }


    loadSavedOnboarding();


    showOnboardingStep(1);

  }
);


/* =====================================================
   OTHER MODULES
===================================================== */

window.openDecision = function() {

  showSection(
    "decisionsSection",
    null
  );

};


window.openMetrics = function() {

  showSection(
    "metricsSection",
    null
  );

};


window.openHistory = function() {

  showSection(
    "historySection",
    null
  );

};


/* =====================================================
   RESPONSIVE PATH GRID
===================================================== */

window.addEventListener(
  "resize",
  function() {

    const pathGrid =
      document.getElementById(
        "nexupPathGrid"
      );


    const moduleGrid =
      document.getElementById(
        "nexupModuleGrid"
      );


    if (pathGrid) {

      pathGrid.style.gridTemplateColumns =
        window.innerWidth <= 700
          ? "1fr"
          : "repeat(2,minmax(0,1fr))";

    }


    if (moduleGrid) {

      moduleGrid.style.gridTemplateColumns =
        window.innerWidth <= 700
          ? "1fr"
          : "repeat(2,minmax(0,1fr))";

    }

  }
);


/* =====================================================
   STARTUP
===================================================== */

console.log(
  "NEXUP carregado — 6 caminhos / 24 módulos."
);
