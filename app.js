/* =====================================================
   NEXUP — APPLICATION
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

const nexupApp =
  document.getElementById("nexupApp");

const onboardingBack =
  document.getElementById("onboardingBack");

const onboardingSteps =
  document.querySelectorAll(".onboarding-step");

const progressDots =
  document.querySelectorAll(".progress-dot");

const homeButtons =
  document.querySelectorAll(".home-card");

const navButtons =
  document.querySelectorAll(".nav button");


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


  if (step === 1) {

    onboardingBack.style.visibility =
      "hidden";

  } else {

    onboardingBack.style.visibility =
      "visible";

  }

}


/* =====================================================
   ONBOARDING OPTION
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


        onboardingAnswers[step] =
          option.innerText.trim();


        /*
         * AQUI ESTÁ A MUDANÇA PRINCIPAL:
         *
         * Não existe mais CONTINUAR.
         *
         * O clique na resposta avança
         * automaticamente.
         */

        setTimeout(function() {

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
   BACK
===================================================== */

onboardingBack.addEventListener(
  "click",
  function() {

    if (currentOnboardingStep > 1) {

      showOnboardingStep(
        currentOnboardingStep - 1
      );

    }

  }
);


/* =====================================================
   FINISH ONBOARDING
===================================================== */

function finishOnboarding() {

  /*
   * Guardamos as respostas localmente.
   * Depois podemos utilizar isso para
   * personalização real do NEXUP.
   */

  localStorage.setItem(
    "nexupOnboarding",
    JSON.stringify(
      onboardingAnswers
    )
  );


  onboarding.classList.add(
    "hidden"
  );


  nexupApp.classList.remove(
    "hidden"
  );


  /*
   * A última resposta agora leva
   * para a HOME.
   */

  showPage("homeSection");

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

  const pages =
    document.querySelectorAll(
      ".app-page, #homeSection"
    );


  pages.forEach(function(page) {

    page.classList.add(
      "hidden"
    );

  });


  const selected =
    document.getElementById(pageId);


  if (selected) {

    selected.classList.remove(
      "hidden"
    );

  }


  currentPage =
    pageId;


  /*
   * Atualiza a navegação superior.
   */

  navButtons.forEach(function(button) {

    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );

  });


  /*
   * Na Home não precisamos da barra
   * de navegação interna destacando nada.
   */

  if (pageId === "homeSection") {

    navButtons.forEach(function(button) {

      button.classList.remove(
        "active"
      );

    });

  }

}


/* =====================================================
   HOME BUTTONS
===================================================== */

homeButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {

      const page =
        button.dataset.page;


      if (page) {

        showPage(page);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }

    }
  );

});


/* =====================================================
   NAV BUTTONS
===================================================== */

navButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {

      const page =
        button.dataset.page;


      if (page) {

        showPage(page);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }

    }
  );

});


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

  const query =
    searchInput.value.trim();


  if (!query) {

    searchResults.innerHTML = `
      <div class="search-empty">
        Digite um jogo, time ou campeonato.
      </div>
    `;

    return;

  }


  /*
   * Por enquanto é apenas a interface.
   *
   * A API de jogos entra aqui depois.
   */

  searchResults.innerHTML = `

    <div class="search-empty">

      PESQUISA:

      <strong>
        ${escapeHtml(query)}
      </strong>

      <br><br>

      Nenhum resultado conectado ainda.
      A integração dos dados entra nesta etapa.

    </div>

  `;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* =====================================================
   INITIAL GAMES PLACEHOLDER
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
          Os jogos aparecerão aqui.
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
   INITIALIZE
===================================================== */

function initializeApp() {

  showOnboardingStep(1);

  renderInitialGames();

}


/* =====================================================
   START
===================================================== */

initializeApp();
