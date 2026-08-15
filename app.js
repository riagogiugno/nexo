/* =====================================================
   NEXUP — APPLICATION
   APP.JS — COMPATÍVEL COM O INDEX.HTML ATUAL
===================================================== */


/* =====================================================
   STATE
===================================================== */

let currentOnboardingStep = 1;

let onboardingAnswers = {};

let currentPage = "homeSection";


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


        /*
         * O NEXUP avança automaticamente
         * após a escolha.
         */

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

  /*
   * Salva as respostas no navegador.
   */

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


  /*
   * Depois do questionário,
   * o usuário volta para a HOME.
   */

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


  /*
   * Esconde todas as páginas internas.
   */

  sections.forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add(
        "hidden"
      );

    }

  });


  /*
   * Mostra a página escolhida.
   */

  const selected =
    document.getElementById(sectionId);


  if (selected) {

    selected.classList.remove(
      "hidden"
    );

  }


  /*
   * Esconde a HOME.
   */

  const home =
    document.getElementById(
      "homeSection"
    );


  if (home) {

    home.classList.add(
      "hidden"
    );

  }


  /*
   * Mostra a navegação interna.
   */

  const navigation =
    document.getElementById(
      "mainNavigation"
    );


  if (navigation) {

    navigation.classList.remove(
      "hidden"
    );

  }


  /*
   * Atualiza botão ativo.
   */

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


  /*
   * O botão correspondente da navegação
   * fica ativo.
   */

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


  /*
   * Esconde todas as páginas internas.
   */

  sections.forEach(function(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.classList.add(
        "hidden"
      );

    }

  });


  /*
   * Mostra a HOME.
   */

  const home =
    document.getElementById(
      "homeSection"
    );


  if (home) {

    home.classList.remove(
      "hidden"
    );

  }


  /*
   * Esconde a navegação interna.
   */

  const navigation =
    document.getElementById(
      "mainNavigation"
    );


  if (navigation) {

    navigation.classList.add(
      "hidden"
    );

  }


  /*
   * Remove estado ativo dos botões.
   */

  navButtons.forEach(function(navButton) {

    navButton.classList.remove(
      "active"
    );

  });


  currentPage =
    "homeSection";


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


    /*
     * Por enquanto existe apenas
     * o placeholder de dados.
     */

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
   * A aplicação começa na HOME.
   */

  returnToHome();

}


/* =====================================================
   START
===================================================== */

initializeApp();
