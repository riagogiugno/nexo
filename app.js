/* =====================================================
   NEXUP — APPLICATION
   APP.JS
   ===================================================== */


/* =====================================================
   STATE
===================================================== */

let currentOnboardingStep = 1;

let onboardingAnswers = {};

let currentPage = "homeSection";

let currentExplorePath = null;


/* =====================================================
   ELEMENTS
===================================================== */

const onboarding =
  document.getElementById("nexupOnboarding");

const onboardingBack =
  document.getElementById("onboardingBack");

const onboardingSteps =
  document.querySelectorAll(".onboarding-step");

const progressDots =
  document.querySelectorAll(".progress-dot");

const navButtons =
  document.querySelectorAll("#mainNavigation button");


/* =====================================================
   ONBOARDING
===================================================== */

function showOnboardingStep(step) {

  currentOnboardingStep = step;

  onboardingSteps.forEach(function(element) {

    const elementStep =
      Number(element.dataset.step);

    element.classList.toggle(
      "active",
      elementStep === step
    );

  });


  progressDots.forEach(function(dot, index) {

    dot.classList.toggle(
      "active",
      index === step - 1
    );

  });


  if (onboardingBack) {

    if (step === 1) {

      onboardingBack.style.visibility =
        "hidden";

    } else {

      onboardingBack.style.visibility =
        "visible";

    }

  }

}


/* =====================================================
   OPEN ONBOARDING
===================================================== */

window.openOnboarding = function() {

  currentOnboardingStep = 1;

  showOnboardingStep(1);

  if (onboarding) {

    onboarding.classList.remove(
      "hidden"
    );

  }

};


/* =====================================================
   ONBOARDING OPTIONS
===================================================== */

onboardingSteps.forEach(function(stepElement) {

  const options =
    stepElement.querySelectorAll(
      ".onboarding-option"
    );


  options.forEach(function(option) {

    option.addEventListener(
      "click",
      function() {

        options.forEach(function(item) {

          item.classList.remove(
            "selected"
          );

        });


        option.classList.add(
          "selected"
        );


        const step =
          Number(stepElement.dataset.step);


        const value =
          option.dataset.profile ||
          option.dataset.answer ||
          option.innerText.trim();


        onboardingAnswers[
          "step" + step
        ] = value;


        setTimeout(function() {

          option.classList.remove(
            "selected"
          );


          if (step < 4) {

            showOnboardingStep(
              step + 1
            );

          } else {

            finishOnboarding();

          }

        }, 180);

      }
    );

  });

});


/* =====================================================
   ONBOARDING BACK
===================================================== */

if (onboardingBack) {

  onboardingBack.addEventListener(
    "click",
    function() {

      if (currentOnboardingStep > 1) {

        showOnboardingStep(
          currentOnboardingStep - 1
        );

      } else {

        closeOnboarding();

      }

    }
  );

}


/* =====================================================
   CLOSE ONBOARDING
===================================================== */

function closeOnboarding() {

  if (onboarding) {

    onboarding.classList.add(
      "hidden"
    );

  }

  currentOnboardingStep = 1;

  showOnboardingStep(1);

  returnToHome();

}


/* =====================================================
   FINISH ONBOARDING
===================================================== */

function finishOnboarding() {

  localStorage.setItem(
    "nexupOnboarding",
    JSON.stringify(
      onboardingAnswers
    )
  );


  if (onboarding) {

    onboarding.classList.add(
      "hidden"
    );

  }


  currentOnboardingStep = 1;

  showOnboardingStep(1);

  returnToHome();

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

  } catch (error) {

    onboardingAnswers = {};

  }

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showSection(sectionId, button) {

  const sections = [
    "gamesSection",
    "exploreSection",
    "historySection",
    "metricsSection",
    "decisionsSection"
  ];


  sections.forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add(
        "hidden"
      );

    }

  });


  const selected =
    document.getElementById(sectionId);


  if (selected) {

    selected.classList.remove(
      "hidden"
    );

  }


  const home =
    document.getElementById(
      "homeSection"
    );


  if (home) {

    home.classList.add(
      "hidden"
    );

  }


  const navigation =
    document.getElementById(
      "mainNavigation"
    );


  if (navigation) {

    navigation.classList.remove(
      "hidden"
    );

  }


  navButtons.forEach(function(navButton) {

    navButton.classList.remove(
      "active"
    );

  });


  if (button) {

    button.classList.add(
      "active"
    );

  } else {

    const matchingButton =
      document.querySelector(
        '#mainNavigation button[data-section="' +
        sectionId +
        '"]'
      );


    if (matchingButton) {

      matchingButton.classList.add(
        "active"
      );

    }

  }


  currentPage =
    sectionId;


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   OPEN HOME SECTION
===================================================== */

window.openHomeSection = function(
  sectionId,
  button
) {

  showSection(
    sectionId,
    null
  );


  const navButton =
    document.querySelector(
      '#mainNavigation button[data-section="' +
      sectionId +
      '"]'
    );


  navButtons.forEach(function(item) {

    item.classList.remove(
      "active"
    );

  });


  if (navButton) {

    navButton.classList.add(
      "active"
    );

  }


  currentPage =
    sectionId;

};


/* =====================================================
   RETURN TO HOME
===================================================== */

window.returnToHome = function() {

  const sections = [
    "gamesSection",
    "exploreSection",
    "historySection",
    "metricsSection",
    "decisionsSection"
  ];


  sections.forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add(
        "hidden"
      );

    }

  });


  const home =
    document.getElementById(
      "homeSection"
    );


  if (home) {

    home.classList.remove(
      "hidden"
    );

  }


  const navigation =
    document.getElementById(
      "mainNavigation"
    );


  if (navigation) {

    navigation.classList.add(
      "hidden"
    );

  }


  navButtons.forEach(function(navButton) {

    navButton.classList.remove(
      "active"
    );

  });


  currentPage =
    "homeSection";


  currentExplorePath =
    null;


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


/* =====================================================
   RETURN TO GAMES
===================================================== */

window.returnToGames = function() {

  showSection(
    "gamesSection",
    null
  );

};


/* =====================================================
   =====================================================
   NEXUP — 6 CAMINHOS
   =====================================================
===================================================== */


/*
   Cada caminho possui:

   - título
   - subtítulo
   - proposta
   - fundamentos
   - direção

   O conteúdo está estruturado para crescer
   depois sem precisar refazer a navegação.
*/


const nexupPaths = {

  iniciante: {

    icon: "🧭",

    title: "INICIANTE",

    subtitle:
      "COMECE PELO ENTENDIMENTO.",

    intro:
      "Antes de pensar em entrada, você precisa entender o jogo, o mercado e o motivo de uma decisão.",

    description:
      "O caminho INICIANTE foi criado para quem ainda está construindo sua base. Aqui, o objetivo não é acelerar sua operação. É construir uma leitura mais consciente.",

    topics: [
      "Como funciona o universo das apostas e do trading esportivo.",
      "Diferença entre aposta, trading e investimento.",
      "Mercado, odd, probabilidade e valor.",
      "Contexto de uma partida antes da entrada.",
      "Risco, banca e controle emocional.",
      "Como evitar decisões impulsivas."
    ],

    focus:
      "ENTENDER ANTES DE OPERAR."

  },


  punter: {

    icon: "🎯",

    title: "PUNTER",

    subtitle:
      "ENCONTRE VALOR ANTES DO JOGO.",

    intro:
      "O punter trabalha principalmente com a leitura pré-jogo e procura situações em que sua análise encontra valor.",

    description:
      "O caminho PUNTER organiza o pensamento antes da partida: contexto, estatísticas, escalações, mercado, preço e tese.",

    topics: [
      "Leitura pré-jogo.",
      "Análise de contexto.",
      "Forma recente e desempenho.",
      "Mandante e visitante.",
      "Desfalques e escalações.",
      "Mercados e precificação.",
      "Construção de uma tese.",
      "Registro da decisão."
    ],

    focus:
      "TESE ANTES DA ENTRADA."

  },


  trader: {

    icon: "📈",

    title: "TRADER",

    subtitle:
      "LEIA O MERCADO EM MOVIMENTO.",

    intro:
      "Trading exige acompanhar a relação entre jogo, mercado, preço e comportamento.",

    description:
      "O caminho TRADER é voltado para quem toma decisões durante o movimento do mercado e precisa separar leitura de impulso.",

    topics: [
      "Mercado pré-live e live.",
      "Movimento de odds.",
      "Momento do jogo.",
      "Pressão e domínio.",
      "Entrada e saída.",
      "Gestão da posição.",
      "Risco por operação.",
      "Registro da tese e do resultado."
    ],

    focus:
      "MOVIMENTO + CONTEXTO + DECISÃO."

  },


  prelive: {

    icon: "⏱️",

    title: "PRÉ-LIVE",

    subtitle:
      "PREPARE A LEITURA ANTES DO JOGO.",

    intro:
      "O jogo ainda não começou. É justamente nesse momento que você pode organizar a informação sem a pressão do movimento ao vivo.",

    description:
      "O caminho PRÉ-LIVE transforma a preparação em processo: selecionar partidas, estudar contexto e construir hipóteses.",

    topics: [
      "Seleção de jogos.",
      "Contexto da partida.",
      "Escalações prováveis.",
      "Forma e desempenho.",
      "Histórico relevante.",
      "Mercados disponíveis.",
      "Preço e probabilidade.",
      "Plano para o início do jogo."
    ],

    focus:
      "PREPARAÇÃO ANTES DA PRESSÃO."

  },


  live: {

    icon: "🔴",

    title: "LIVE",

    subtitle:
      "O JOGO MUDA. SUA LEITURA TAMBÉM.",

    intro:
      "No live, informação chega a todo momento. O desafio é distinguir mudança real de simples movimento.",

    description:
      "O caminho LIVE trabalha a leitura dinâmica: o que aconteceu, como o jogo respondeu e se a nova informação muda realmente a tese.",

    topics: [
      "Leitura de momento.",
      "Pressão e intensidade.",
      "Finalizações e oportunidades.",
      "Domínio territorial.",
      "Mudanças táticas.",
      "Eventos que alteram o jogo.",
      "Movimento do mercado.",
      "Entrada, saída ou espera."
    ],

    focus:
      "INFORMAÇÃO NOVA → NOVA DECISÃO."

  },


  metodo: {

    icon: "🧠",

    title: "MÉTODO & LEITURA",

    subtitle:
      "TRANSFORME EXPERIÊNCIA EM PROCESSO.",

    intro:
      "Método não é encontrar uma fórmula perfeita. É criar critérios que tornam suas decisões mais consistentes.",

    description:
      "Este é o caminho central do NEXUP: observar como você decide, registrar o processo e transformar histórico em aprendizado.",

    topics: [
      "Construção de critérios.",
      "Hipótese e tese.",
      "Confiança na leitura.",
      "Gestão de risco.",
      "Diário de decisões.",
      "Análise de resultados.",
      "Identificação de padrões.",
      "Evolução contínua."
    ],

    focus:
      "DECISÃO → REGISTRO → ANÁLISE → EVOLUÇÃO."

  }

};


/* =====================================================
   PATH — HTML
===================================================== */

function buildExplorePathHTML(path) {

  const topicsHTML =
    path.topics.map(function(topic) {

      return `
        <div class="metrics-placeholder">
          <div class="metrics-placeholder-title">
            ${escapeHtml(topic)}
          </div>
        </div>
      `;

    }).join("");


  return `

    <button
      type="button"
      class="back-home"
      onclick="returnToExplore()"
    >
      ← VOLTAR PARA EXPLORAR
    </button>


    <div class="section-heading-row">

      <div>

        <div class="onboarding-eyebrow">
          CAMINHO NEXUP
        </div>

        <h1 class="section-title">
          ${path.icon} ${escapeHtml(path.title)}
        </h1>

        <div class="section-subtitle">
          ${escapeHtml(path.subtitle)}
        </div>

      </div>

      <div class="section-kicker">
        NEXUP PATH
      </div>

    </div>


    <div class="panel">

      <div class="onboarding-eyebrow">
        ${escapeHtml(path.focus)}
      </div>

      <h2 class="section-title">
        ${escapeHtml(path.intro)}
      </h2>

      <div class="section-subtitle">

        ${escapeHtml(path.description)}

      </div>

    </div>


    <div class="panel">

      <div class="section-heading-row">

        <div>

          <h2 class="section-title">
            O QUE VOCÊ VAI ENCONTRAR
          </h2>

          <div class="section-subtitle">
            Uma estrutura construída para transformar
            informação em processo.
          </div>

        </div>

        <div class="section-kicker">
          CONTEÚDO
        </div>

      </div>


      <div class="quick-grid">

        ${topicsHTML}

      </div>

    </div>


    <div class="panel">

      <div class="section-title">
        PRÓXIMO PASSO
      </div>

      <div class="section-subtitle">

        Este caminho será expandido progressivamente
        com conteúdos, ferramentas, exemplos e
        experiências interativas do NEXUP.

        <br><br>

        O objetivo não é apenas mostrar informação.
        É ajudar você a construir uma forma melhor
        de tomar decisões.

      </div>


      <div class="metrics-placeholder">

        <div class="metrics-placeholder-title">
          NEXUP — DECISION INTELLIGENCE
        </div>

        <div class="metrics-placeholder-text">
          ESTE CAMINHO ESTÁ CONECTADO À EVOLUÇÃO
          DO SEU PERFIL E AO SEU HISTÓRICO.
        </div>

      </div>

    </div>

  `;

}


/* =====================================================
   OPEN PATH
===================================================== */

window.openExplorePath = function(pathKey) {

  const path =
    nexupPaths[pathKey];


  if (!path) {
    return;
  }


  const explore =
    document.getElementById(
      "exploreSection"
    );


  if (!explore) {
    return;
  }


  currentExplorePath =
    pathKey;


  /*
   * Guardamos o HTML original da página
   * de exploração apenas uma vez.
   */

  if (
    !explore.dataset.originalContent
  ) {

    explore.dataset.originalContent =
      explore.innerHTML;

  }


  explore.innerHTML =
    buildExplorePathHTML(path);


  /*
   * A navegação interna continua dentro
   * de EXPLORAR.
   */

  showSection(
    "exploreSection",
    null
  );


  /*
   * O botão EXPLORAR permanece ativo.
   */

  const exploreButton =
    document.querySelector(
      '#mainNavigation button[data-section="exploreSection"]'
    );


  navButtons.forEach(function(item) {

    item.classList.remove(
      "active"
    );

  });


  if (exploreButton) {

    exploreButton.classList.add(
      "active"
    );

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


/* =====================================================
   RETURN TO EXPLORE
===================================================== */

window.returnToExplore = function() {

  const explore =
    document.getElementById(
      "exploreSection"
    );


  if (!explore) {
    return;
  }


  /*
   * Restaura o EXPLORAR original.
   */

  if (
    explore.dataset.originalContent
  ) {

    explore.innerHTML =
      explore.dataset.originalContent;

  }


  currentExplorePath =
    null;


  /*
   * Reativa os caminhos.
   */

  bindExplorePaths();


  showSection(
    "exploreSection",
    null
  );


  const exploreButton =
    document.querySelector(
      '#mainNavigation button[data-section="exploreSection"]'
    );


  navButtons.forEach(function(item) {

    item.classList.remove(
      "active"
    );

  });


  if (exploreButton) {

    exploreButton.classList.add(
      "active"
    );

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


/* =====================================================
   BIND 6 PATH BUTTONS
===================================================== */

function bindExplorePaths() {

  const buttons =
    document.querySelectorAll(
      "#exploreSection .quick-button"
    );


  if (!buttons.length) {
    return;
  }


  buttons.forEach(function(button) {

    /*
     * Evita duplicar listeners quando
     * o conteúdo é restaurado.
     */

    if (
      button.dataset.nexupBound === "true"
    ) {

      return;

    }


    button.dataset.nexupBound =
      "true";


    button.addEventListener(
      "click",
      function() {

        const text =
          button.innerText
            .toUpperCase()
            .trim();


        let pathKey = null;


        if (
          text.includes("INICIANTE")
        ) {

          pathKey =
            "iniciante";

        } else if (
          text.includes("PUNTER")
        ) {

          pathKey =
            "punter";

        } else if (
          text.includes("TRADER")
        ) {

          pathKey =
            "trader";

        } else if (
          text.includes("PRÉ-LIVE") ||
          text.includes("PRE-LIVE")
        ) {

          pathKey =
            "prelive";

        } else if (
          text.includes("LIVE")
        ) {

          pathKey =
            "live";

        } else if (
          text.includes("MÉTODO") ||
          text.includes("METODO")
        ) {

          pathKey =
            "metodo";

        }


        if (pathKey) {

          openExplorePath(
            pathKey
          );

        }

      }
    );

  });

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
  document.getElementById(
    "gameSearch"
  );

const searchButton =
  document.getElementById(
    "searchButton"
  );

const searchResults =
  document.getElementById(
    "searchResults"
  );


if (searchButton) {

  searchButton.addEventListener(
    "click",
    performSearch
  );

}


if (searchInput) {

  searchInput.addEventListener(
    "keydown",
    function(event) {

      if (event.key === "Enter") {

        performSearch();

      }

    }
  );

}


function performSearch() {

  if (!searchInput || !searchResults) {
    return;
  }


  const query =
    searchInput.value.trim();


  if (!query) {

    searchResults.innerHTML = `
      <div class="search-empty">
        DIGITE UM JOGO, TIME OU CAMPEONATO.
      </div>
    `;

    return;

  }


  searchResults.innerHTML = `

    <div class="search-empty">

      PESQUISA:

      <strong>
        ${escapeHtml(query)}
      </strong>

      <br><br>

      NENHUM RESULTADO CONECTADO AINDA.

      <br><br>

      A INTEGRAÇÃO DOS DADOS
      ENTRA NESTA ETAPA.

    </div>

  `;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


/* =====================================================
   INITIAL GAMES
===================================================== */

function renderInitialGames() {

  const liveGames =
    document.getElementById(
      "liveGames"
    );

  const upcomingGames =
    document.getElementById(
      "upcomingGames"
    );


  /*
   * LIVE
   */

  if (liveGames) {

    liveGames.innerHTML = `

      <div class="game-card">

        <div class="game-top">

          <span class="live">
            ● LIVE
          </span>

          <span class="competition">
            AGUARDANDO DADOS
          </span>

        </div>


        <div class="teams">
          NEXUP DATA
        </div>


        <div class="scoreline">

          <span class="score">
            —
          </span>

          <span class="minute">
            LIVE
          </span>

        </div>


        <button
          class="select-game"
          type="button"
        >
          AGUARDANDO DADOS
        </button>

      </div>

    `;

  }


  /*
   * PRÓXIMOS
   */

  if (upcomingGames) {

    upcomingGames.innerHTML = `

      <div class="game-card">

        <div class="game-top">

          <span class="upcoming">
            PRÓXIMOS
          </span>

          <span class="competition">
            NEXUP
          </span>

        </div>


        <div class="teams">
          OS JOGOS APARECERÃO AQUI.
        </div>


        <div class="scoreline">

          <span class="score">
            —
          </span>

          <span class="minute">
            —
          </span>

        </div>

      </div>

    `;

  }

}


/* =====================================================
   UPDATE DASHBOARD OVERVIEW
===================================================== */

function updateDashboardOverview() {

  const liveGames =
    document.getElementById(
      "liveGames"
    );


  const overviewLive =
    document.getElementById(
      "overviewLive"
    );


  if (overviewLive && liveGames) {

    const liveCards =
      liveGames.querySelectorAll(
        ".game-card"
      );


    if (
      liveCards.length === 1 &&
      liveCards[0].innerText.includes(
        "AGUARDANDO DADOS"
      )
    ) {

      overviewLive.innerText =
        "0";

    } else {

      overviewLive.innerText =
        liveCards.length;

    }

  }


  const overviewReadings =
    document.getElementById(
      "overviewReadings"
    );


  if (overviewReadings) {

    overviewReadings.innerText =
      "0";

  }


  const overviewActive =
    document.getElementById(
      "overviewActive"
    );


  if (overviewActive) {

    overviewActive.innerText =
      "0";

  }


  const overviewProfit =
    document.getElementById(
      "overviewProfit"
    );


  if (overviewProfit) {

    overviewProfit.innerText =
      "R$ 0,00";

  }

}


/* =====================================================
   UPDATE METRICS
===================================================== */

function updateMetrics() {

  const saved =
    localStorage.getItem(
      "nexupHistory"
    );


  let history = [];


  if (saved) {

    try {

      history =
        JSON.parse(saved);

    } catch (error) {

      history = [];

    }

  }


  const decisions =
    document.getElementById(
      "metricDecisions"
    );


  const greens =
    document.getElementById(
      "metricGreens"
    );


  const losses =
    document.getElementById(
      "metricLosses"
    );


  const winRate =
    document.getElementById(
      "metricWinRate"
    );


  if (decisions) {

    decisions.innerText =
      history.length;

  }


  if (greens) {

    const greenCount =
      history.filter(function(item) {

        return (
          item.result === "GREEN" ||
          item.status === "GREEN"
        );

      }).length;


    greens.innerText =
      greenCount;

  }


  if (losses) {

    const lossCount =
      history.filter(function(item) {

        return (
          item.result === "LOSS" ||
          item.status === "LOSS" ||
          item.result === "RED" ||
          item.status === "RED"
        );

      }).length;


    losses.innerText =
      lossCount;

  }


  if (winRate) {

    if (history.length === 0) {

      winRate.innerText =
        "—";

    } else {

      const greenCount =
        history.filter(function(item) {

          return (
            item.result === "GREEN" ||
            item.status === "GREEN"
          );

        }).length;


      const rate =
        (
          greenCount /
          history.length
        ) * 100;


      winRate.innerText =
        rate.toFixed(1) + "%";

    }

  }

}


/* =====================================================
   INITIALIZE
===================================================== */

function initializeApp() {

  loadSavedOnboarding();

  showOnboardingStep(1);

  renderInitialGames();

  updateDashboardOverview();

  updateMetrics();

  /*
   * Começa na HOME.
   */

  returnToHome();


  /*
   * Conecta os seis caminhos
   * do EXPLORAR.
   */

  bindExplorePaths();

}


/* =====================================================
   START
===================================================== */

initializeApp();
