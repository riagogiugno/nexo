/* =========================================================
   NEXUP — CORE ENGINE
   Decision Intelligence Terminal
========================================================= */

const games = [
  {
    id: 1,
    status: "LIVE",
    competition: "Libertadores",
    home: "Palmeiras",
    away: "Cerro Porteño",
    minute: "67'",
    score: "1 × 1",
    nexupScore: 78
  },
  {
    id: 2,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Cruzeiro",
    away: "Flamengo",
    minute: "34'",
    score: "0 × 0",
    nexupScore: 64
  },
  {
    id: 3,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Grêmio",
    away: "Internacional",
    minute: "71'",
    score: "2 × 0",
    nexupScore: 86
  },
  {
    id: 4,
    status: "UPCOMING",
    competition: "Brasileirão",
    home: "São Paulo",
    away: "Santos",
    time: "21:30"
  },
  {
    id: 5,
    status: "UPCOMING",
    competition: "Libertadores",
    home: "River Plate",
    away: "Boca Juniors",
    time: "22:00"
  }
];


/* =========================================================
   DOM
========================================================= */

const liveContainer =
  document.getElementById("liveGames");

const upcomingContainer =
  document.getElementById("upcomingGames");

const selectedGame =
  document.getElementById("selectedGame");


/* =========================================================
   STATE
========================================================= */

let checkpoint = {
  gameId: null,
  reading: "",
  thesis: "",
  market: "",
  odd: 0,
  stake: 0
};

let history = loadHistory();

let activeOperationId =
  Number(
    localStorage.getItem("nexupActiveOperation")
  ) || null;


/* =========================================================
   STORAGE
========================================================= */

function loadHistory() {

  try {

    const stored =
      localStorage.getItem("nexoHistory");

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.error(
      "Erro ao carregar histórico:",
      error
    );

    return [];

  }

}


function saveHistory() {

  localStorage.setItem(
    "nexoHistory",
    JSON.stringify(history)
  );

}


function saveActiveOperation() {

  if (activeOperationId) {

    localStorage.setItem(
      "nexupActiveOperation",
      String(activeOperationId)
    );

  } else {

    localStorage.removeItem(
      "nexupActiveOperation"
    );

  }

}


/* =========================================================
   HELPERS
========================================================= */

function getGame(id) {

  return games.find(
    game => game.id === Number(id)
  );

}


function getActiveOperation() {

  if (!activeOperationId) {
    return null;
  }

  return history.find(
    operation =>
      operation.id === activeOperationId &&
      operation.status === "ATIVA"
  ) || null;

}


function formatMoney(value) {

  return Number(value || 0)
    .toFixed(2)
    .replace(".", ",");

}


function escapeHTML(value) {

  if (value === null ||
      value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   RESET CHECKPOINT
========================================================= */

function resetCheckpoint(gameId) {

  checkpoint = {

    gameId:
      Number(gameId),

    reading: "",

    thesis: "",

    market: "",

    odd: 0,

    stake: 0

  };

}


/* =========================================================
   RENDER JOGOS
========================================================= */

function renderGames() {

  if (!liveContainer ||
      !upcomingContainer) {
    return;
  }

  liveContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  games.forEach(game => {

    const card =
      document.createElement("div");

    card.className =
      "game-card";

    if (game.status === "LIVE") {

      card.innerHTML = `

        <div class="game-top">

          <span class="live">
            🔴 AO VIVO
          </span>

          <span class="competition">
            ${escapeHTML(game.competition)}
          </span>

        </div>

        <div class="teams">

          ${escapeHTML(game.home)}
          <br>
          ${escapeHTML(game.away)}

        </div>

        <div class="scoreline">

          <span class="score">
            ${escapeHTML(game.score)}
          </span>

          <span class="minute">
            ${escapeHTML(game.minute)}
          </span>

        </div>

        <button
          class="select-game"
          onclick="selectGame(${game.id})">

          ANALISAR JOGO

        </button>

      `;

      liveContainer.appendChild(card);

    } else {

      card.innerHTML = `

        <div class="game-top">

          <span class="upcoming">
            ⏳ PRÓXIMO
          </span>

          <span class="competition">
            ${escapeHTML(game.competition)}
          </span>

        </div>

        <div class="teams">

          ${escapeHTML(game.home)}
          <br>
          ${escapeHTML(game.away)}

        </div>

        <div class="scoreline">

          <span class="score">
            —
          </span>

          <span class="minute">
            ${escapeHTML(game.time)}
          </span>

        </div>

        <button
          class="select-game"
          onclick="selectGame(${game.id})">

          ANALISAR PRÉ-JOGO

        </button>

      `;

      upcomingContainer.appendChild(card);

    }

  });

}


/* =========================================================
   SELECIONAR JOGO
========================================================= */

function selectGame(id) {

  const game = getGame(id);

  if (!game || !selectedGame) {
    return;
  }

  resetCheckpoint(game.id);

  selectedGame.classList.remove("hidden");

  const activeOperation =
    getActiveOperation();

  /*
    Se existe uma operação ativa,
    recuperamos ela.
  */

  if (
    activeOperation &&
    activeOperation.gameId === game.id
  ) {

    checkpoint.gameId =
      game.id;

    showSelectedGame(
      game,
      true
    );

    showActiveOperation(
      activeOperation
    );

  } else {

    showSelectedGame(
      game,
      false
    );

  }

  selectedGame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   TELA DO JOGO
========================================================= */

function showSelectedGame(
  game,
  hasActiveOperation = false
) {

  if (!selectedGame) {
    return;
  }

  if (game.status !== "LIVE") {

    selectedGame.innerHTML = `

      <div class="selected-game">

        <div>

          <div class="selected-title">

            ${escapeHTML(game.home)}
            ×
            ${escapeHTML(game.away)}

          </div>

          <div class="selected-info">

            ${escapeHTML(game.competition)}
            ·
            ${escapeHTML(game.time)}
            · PRÉ-JOGO

          </div>

        </div>

        <div class="upcoming">
          ⏳ PRÓXIMO
        </div>

      </div>

    `;

    return;
  }


  selectedGame.innerHTML = `

    <div class="selected-game">

      <div>

        <div class="selected-title">

          ${escapeHTML(game.home)}
          &nbsp;
          ${escapeHTML(game.score)}
          &nbsp;
          ${escapeHTML(game.away)}

        </div>

        <div class="selected-info">

          ${escapeHTML(game.competition)}
          ·
          ${escapeHTML(game.minute)}
          · AO VIVO

        </div>

      </div>

      <div class="live">
        🔴 LIVE
      </div>

    </div>

    <div class="panel">

      <h2 class="section-title">
        NEXUP SCORE
      </h2>

      <div
        class="score"
        style="font-size:48px; margin-bottom:6px;"
      >
        ${game.nexupScore || "--"}
      </div>

      <div class="section-subtitle">

        Índice analítico do momento.
        O NEXUP informa. O trader decide.

      </div>

      <h3 class="section-title">
        CHECKPOINT
      </h3>

      <div class="section-subtitle">

        OBSERVAÇÃO →
        LEITURA →
        TESE →
        MERCADO →
        DECISÃO

      </div>

      <h3 class="section-title">
        1. MINHA LEITURA
      </h3>

      <div class="quick-grid">

        <button
          class="quick-button"
          onclick="chooseReading('FORTE')">

          🟢 FORTE

        </button>

        <button
          class="quick-button"
          onclick="chooseReading('NEUTRA')">

          🟡 NEUTRA

        </button>

        <button
          class="quick-button"
          onclick="chooseReading('FRACA')">

          🔴 FRACA

        </button>

      </div>


      <div
        id="checkpointStep2"
        class="hidden">

        <h3 class="section-title">
          2. TESE
        </h3>

        <div class="quick-grid">

          <button
            class="quick-button"
            onclick="chooseThesis('PRÓXIMO GOL')">

            ⚽ PRÓXIMO GOL

          </button>

          <button
            class="quick-button"
            onclick="chooseThesis('ESCANTEIO')">

            🚩 ESCANTEIO

          </button>

          <button
            class="quick-button"
            onclick="chooseThesis('CARTÃO')">

            🟨 CARTÃO

          </button>

          <button
            class="quick-button"
            onclick="chooseThesis('MOVIMENTO DE ODD')">

            📈 MOVIMENTO DE ODD

          </button>

          <button
            class="quick-button"
            onclick="chooseThesis('OUTRO')">

            OUTRO

          </button>

        </div>

      </div>


      <div
        id="checkpointStep3"
        class="hidden">

        <h3 class="section-title">
          3. MERCADO
        </h3>

        <div class="quick-grid">

          <button
            class="quick-button"
            onclick="chooseMarket('OVER / UNDER')">

            OVER / UNDER

          </button>

          <button
            class="quick-button"
            onclick="chooseMarket('MATCH ODDS')">

            MATCH ODDS

          </button>

          <button
            class="quick-button"
            onclick="chooseMarket('CORRECT SCORE')">

            CORRECT SCORE

          </button>

          <button
            class="quick-button"
            onclick="chooseMarket('ESCANTEIOS')">

            ESCANTEIOS

          </button>

          <button
            class="quick-button"
            onclick="chooseMarket('CARTÕES')">

            CARTÕES

          </button>

        </div>

      </div>


      <div
        id="checkpointStep4"
        class="hidden">

        <h3 class="section-title">
          4. DECISÃO
        </h3>

        <div class="operation-form">

          <label>
            ODD DE ENTRADA
          </label>

          <input
            id="entryOdd"
            type="number"
            step="0.01"
            min="1.01"
            placeholder="Ex: 1.50"
          >

          <label>
            STAKE
          </label>

          <input
            id="entryStake"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Ex: 5.00"
          >

          <button
            class="select-game"
            onclick="startOperation()">

            REGISTRAR OPERAÇÃO

          </button>

        </div>

      </div>


      <div
        id="operationPanel"
        class="hidden">
      </div>


      <div
        id="checkpointResult"
        class="hidden">
      </div>

    </div>

  `;

}


/* =========================================================
   LEITURA
========================================================= */

function chooseReading(value) {

  checkpoint.reading =
    value;

  const step =
    document.getElementById(
      "checkpointStep2"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


/* =========================================================
   TESE
========================================================= */

function chooseThesis(value) {

  checkpoint.thesis =
    value;

  const step =
    document.getElementById(
      "checkpointStep3"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


/* =========================================================
   MERCADO
========================================================= */

function chooseMarket(value) {

  checkpoint.market =
    value;

  const step =
    document.getElementById(
      "checkpointStep4"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


/* =========================================================
   REGISTRAR OPERAÇÃO
========================================================= */

function startOperation() {

  /*
    Não permitimos duas operações simultâneas
    nesta primeira arquitetura.
  */

  const existing =
    getActiveOperation();

  if (existing) {

    alert(
      "Existe uma operação ativa no NEXUP."
    );

    return;

  }


  if (!checkpoint.gameId) {

    alert(
      "Selecione um jogo."
    );

    return;

  }


  if (!checkpoint.reading) {

    alert(
      "Registre sua leitura antes de continuar."
    );

    return;

  }


  if (!checkpoint.thesis) {

    alert(
      "Selecione uma tese."
    );

    return;

  }


  if (!checkpoint.market) {

    alert(
      "Selecione um mercado."
    );

    return;

  }


  const oddInput =
    document.getElementById(
      "entryOdd"
    );

  const stakeInput =
    document.getElementById(
      "entryStake"
    );


  if (!oddInput ||
      !stakeInput) {

    return;

  }


  const odd =
    Number(oddInput.value);

  const stake =
    Number(stakeInput.value);


  if (!Number.isFinite(odd) ||
      odd <= 1) {

    alert(
      "Informe uma odd válida."
    );

    return;

  }


  if (!Number.isFinite(stake) ||
      stake <= 0) {

    alert(
      "Informe uma stake válida."
    );

    return;

  }


  const game =
    getGame(
      checkpoint.gameId
    );


  if (!game) {
    return;
  }


  const operation = {

    id:
      Date.now(),

    gameId:
      game.id,

    game:
      `${game.home} ${game.score || ""} ${game.away}`,

    competition:
      game.competition,

    minute:
      game.minute || "",

    reading:
      checkpoint.reading,

    thesis:
      checkpoint.thesis,

    market:
      checkpoint.market,

    entryOdd:
      odd,

    exitOdd:
      null,

    stake:
      stake,

    exposure:
      Number(
        (stake * odd).toFixed(2)
      ),

    decision:
      "ENTRAR",

    status:
      "ATIVA",

    result:
      "PENDENTE",

    profit:
      0,

    date:
      new Date().toLocaleString(
        "pt-BR"
      ),

    createdAt:
      new Date().toISOString(),

    closedAt:
      null

  };


  history.unshift(
    operation
  );

  activeOperationId =
    operation.id;


  saveHistory();
  saveActiveOperation();


  showActiveOperation(
    operation
  );

  renderHistory();

}


/* =========================================================
   OPERAÇÃO ATIVA
========================================================= */

function showActiveOperation(
  operation
) {

  const operationPanel =
    document.getElementById(
      "operationPanel"
    );

  if (!operationPanel) {
    return;
  }


  operationPanel.classList.remove(
    "hidden"
  );


  operationPanel.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        OPERAÇÃO ATIVA
      </h2>

      <div
        class="upcoming"
        style="margin-bottom:16px;"
      >
        🟡 EM OPERAÇÃO
      </div>

      <div class="selected-info">

        JOGO:
        ${escapeHTML(operation.game)}

      </div>

      <div class="selected-info">

        LEITURA:
        ${escapeHTML(operation.reading)}

      </div>

      <div class="selected-info">

        TESE:
        ${escapeHTML(operation.thesis)}

      </div>

      <div class="selected-info">

        MERCADO:
        ${escapeHTML(operation.market)}

      </div>

      <div class="selected-info">

        ODD DE ENTRADA:
        ${operation.entryOdd.toFixed(2)}

      </div>

      <div class="selected-info">

        STAKE:
        R$ ${formatMoney(operation.stake)}

      </div>

      <div class="selected-info">

        EXPOSIÇÃO:
        R$ ${formatMoney(operation.exposure)}

      </div>

      <h3
        class="section-title"
        style="margin-top:24px;"
      >
        SAÍDA
      </h3>

      <div class="quick-grid">

        <button
          class="quick-button"
          onclick="cashout()">

          💰 CASHOUT

        </button>

        <button
          class="quick-button"
          onclick="finishOperation('GREEN')">

          🟢 GREEN

        </button>

        <button
          class="quick-button"
          onclick="finishOperation('LOSS')">

          🔴 LOSS

        </button>

        <button
          class="quick-button"
          onclick="finishOperation('VOID')">

          ⚪ VOID

        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   CASHOUT
========================================================= */

function cashout() {

  const operation =
    getActiveOperation();

  if (!operation) {
    return;
  }


  const output =
    prompt(
      "Informe a odd de saída no cashout:"
    );


  if (output === null) {
    return;
  }


  const exitOdd =
    Number(output);


  if (!Number.isFinite(exitOdd) ||
      exitOdd <= 1) {

    alert(
      "Odd de saída inválida."
    );

    return;

  }


  /*
    Em back exchange:

    lucro =
    stake × (entrada / saída - 1)
  */

  const profit =
    operation.stake *
    (
      operation.entryOdd /
      exitOdd -
      1
    );


  closeOperation(
    operation,
    "CASHOUT",
    exitOdd,
    profit
  );

}


/* =========================================================
   FINALIZAR
========================================================= */

function finishOperation(
  result
) {

  const operation =
    getActiveOperation();

  if (!operation) {
    return;
  }


  let profit = 0;


  switch (result) {

    case "GREEN":

      profit =
        operation.stake *
        (
          operation.entryOdd -
          1
        );

      break;


    case "LOSS":

      profit =
        -operation.stake;

      break;


    case "VOID":

      profit = 0;

      break;


    default:

      return;

  }


  closeOperation(
    operation,
    result,
    null,
    profit
  );

}


/* =========================================================
   ENCERRAR
========================================================= */

function closeOperation(
  operation,
  result,
  exitOdd,
  profit
) {

  operation.status =
    "ENCERRADA";

  operation.result =
    result;

  operation.exitOdd =
    exitOdd;

  operation.profit =
    Number(
      profit.toFixed(2)
    );

  operation.closedAt =
    new Date().toLocaleString(
      "pt-BR"
    );


  saveHistory();


  activeOperationId =
    null;

  saveActiveOperation();


  showOperationResult(
    operation
  );


  renderHistory();

}


/* =========================================================
   RESULTADO
========================================================= */

function showOperationResult(
  operation
) {

  const resultContainer =
    document.getElementById(
      "checkpointResult"
    );

  if (!resultContainer) {
    return;
  }


  resultContainer.classList.remove(
    "hidden"
  );


  const resultClass =
    operation.result === "GREEN" ||
    operation.result === "CASHOUT"
      ? "live"
      : "upcoming";


  resultContainer.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        OPERAÇÃO ENCERRADA
      </h2>

      <div class="${resultClass}">
        ✓ ${escapeHTML(operation.result)}
      </div>

      <div class="selected-info">

        ODD DE ENTRADA:
        ${operation.entryOdd.toFixed(2)}

      </div>

      ${
        operation.exitOdd !== null
          ? `

            <div class="selected-info">

              ODD DE SAÍDA:
              ${operation.exitOdd.toFixed(2)}

            </div>

          `
          : ""
      }

      <div class="selected-info">

        STAKE:
        R$ ${formatMoney(operation.stake)}

      </div>

      <div
        class="selected-info"
        style="margin-top:10px;"
      >

        P&L:

        <strong>

          R$
          ${formatMoney(operation.profit)}

        </strong>

      </div>

      <div
        class="live"
        style="margin-top:16px;"
      >

        ✓ OPERAÇÃO REGISTRADA

      </div>

    </div>

  `;

}


/* =========================================================
   HISTÓRICO
========================================================= */

function renderHistory() {

  const historyContainer =
    document.getElementById(
      "historyContainer"
    );

  if (!historyContainer) {
    return;
  }


  const operations =
    history.filter(
      item =>
        item &&
        item.entryOdd !== undefined
    );


  if (!operations.length) {

    historyContainer.innerHTML = `

      <div class="section-subtitle">

        Nenhuma operação registrada ainda.

      </div>

    `;

    return;

  }


  const totalProfit =
    operations.reduce(
      (sum, item) =>
        sum +
        Number(item.profit || 0),
      0
    );


  const active =
    operations.filter(
      item =>
        item.status === "ATIVA"
    ).length;


  const greens =
    operations.filter(
      item =>
        item.result === "GREEN"
    ).length;


  const losses =
    operations.filter(
      item =>
        item.result === "LOSS"
    ).length;


  const cashouts =
    operations.filter(
      item =>
        item.result === "CASHOUT"
    ).length;


  const voids =
    operations.filter(
      item =>
        item.result === "VOID"
    ).length;


  historyContainer.innerHTML = `

    <div class="games-grid">

      <div class="game-card">

        <div class="competition">
          OPERAÇÕES
        </div>

        <div class="score">
          ${operations.length}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          ATIVAS
        </div>

        <div class="score">
          ${active}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          GREEN
        </div>

        <div class="score">
          ${greens}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          CASHOUT
        </div>

        <div class="score">
          ${cashouts}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          LOSS
        </div>

        <div class="score">
          ${losses}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          VOID
        </div>

        <div class="score">
          ${voids}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          P&L
        </div>

        <div class="score">

          R$
          ${formatMoney(totalProfit)}

        </div>

      </div>

    </div>


    <div style="margin-top:20px;">

      ${operations.map(
        item => `

          <div
            class="game-card"
            style="margin-bottom:12px;"
          >

            <div class="game-top">

              <span class="competition">

                ${escapeHTML(
                  item.date || ""
                )}

              </span>

              <span
                class="${
                  item.status === "ATIVA"
                    ? "upcoming"
                    : (
                        item.result === "GREEN" ||
                        item.result === "CASHOUT"
                      )
                        ? "live"
                        : "upcoming"
                }"
              >

                ${
                  item.status === "ATIVA"
                    ? "🟡 ATIVA"
                    : escapeHTML(
                        item.result
                      )
                }

              </span>

            </div>


            <div class="teams">

              ${escapeHTML(
                item.game || "Jogo"
              )}

            </div>


            <div class="selected-info">

              ${escapeHTML(
                item.competition || ""
              )}

              ${
                item.minute
                  ? " · " +
                    escapeHTML(
                      item.minute
                    )
                  : ""
              }

            </div>


            <div class="selected-info">

              LEITURA:
              ${escapeHTML(
                item.reading || "-"
              )}

            </div>


            <div class="selected-info">

              TESE:
              ${escapeHTML(
                item.thesis || "-"
              )}

            </div>


            <div class="selected-info">

              MERCADO:
              ${escapeHTML(
                item.market || "-"
              )}

            </div>


            <div class="selected-info">

              ODD DE ENTRADA:
              ${Number(
                item.entryOdd
              ).toFixed(2)}

            </div>


            ${
              item.exitOdd !== null &&
              item.exitOdd !== undefined
                ? `

                  <div class="selected-info">

                    ODD DE SAÍDA:
                    ${Number(
                      item.exitOdd
                    ).toFixed(2)}

                  </div>

                `
                : ""
            }


            <div class="selected-info">

              STAKE:
              R$
              ${formatMoney(
                item.stake
              )}

            </div>


            <div class="selected-info">

              P&L:
              R$
              ${formatMoney(
                item.profit
              )}

            </div>

          </div>

        `
      ).join("")}

    </div>

  `;

}


/* =========================================================
   RESTAURAR OPERAÇÃO APÓS RELOAD
========================================================= */

function restoreActiveOperation() {

  const operation =
    getActiveOperation();

  if (!operation) {

    activeOperationId =
      null;

    saveActiveOperation();

    return;

  }


  const game =
    getGame(
      operation.gameId
    );


  if (!game) {
    return;
  }


  checkpoint.gameId =
    game.id;


  if (selectedGame) {

    selectedGame.classList.remove(
      "hidden"
    );

    showSelectedGame(
      game,
      true
    );

    showActiveOperation(
      operation
    );

    selectedGame.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* =========================================================
   INIT
========================================================= */

renderGames();

renderHistory();

restoreActiveOperation();
/* =========================================================
   NEXUP — DASHBOARD DATA
========================================================= */

function updateDashboard() {

  const operations = history.filter(
    item =>
      item &&
      item.entryOdd !== undefined
  );


  /* =======================================================
     OVERVIEW
  ====================================================== */

  const liveGames =
    games.filter(
      game =>
        game.status === "LIVE"
    ).length;


  const readings =
    operations.filter(
      operation =>
        operation.reading
    ).length;


  const active =
    operations.filter(
      operation =>
        operation.status === "ATIVA"
    ).length;


  const profit =
    operations.reduce(
      (total, operation) =>
        total +
        Number(operation.profit || 0),
      0
    );


  const overviewLive =
    document.getElementById(
      "overviewLive"
    );

  const overviewReadings =
    document.getElementById(
      "overviewReadings"
    );

  const overviewActive =
    document.getElementById(
      "overviewActive"
    );

  const overviewProfit =
    document.getElementById(
      "overviewProfit"
    );


  if (overviewLive) {

    overviewLive.textContent =
      liveGames;

  }


  if (overviewReadings) {

    overviewReadings.textContent =
      readings;

  }


  if (overviewActive) {

    overviewActive.textContent =
      active;

  }


  if (overviewProfit) {

    overviewProfit.textContent =
      `R$ ${formatMoney(profit)}`;

    overviewProfit.style.color =
      profit > 0
        ? "var(--green)"
        : profit < 0
          ? "var(--red)"
          : "var(--text)";

  }


  /* =======================================================
     NEXUP SCORE NOS CARDS
  ====================================================== */

  const liveCards =
    document.querySelectorAll(
      "#liveGames .game-card"
    );


  const liveGamesList =
    games.filter(
      game =>
        game.status === "LIVE"
    );


  liveCards.forEach(
    (card, index) => {

      const game =
        liveGamesList[index];

      if (!game) {
        return;
      }


      const existing =
        card.querySelector(
          ".nexup-score"
        );


      if (existing) {
        return;
      }


      const scoreBox =
        document.createElement(
          "div"
        );

      scoreBox.className =
        "nexup-score";


      scoreBox.innerHTML = `

        <div>

          <div class="nexup-score-label">
            NEXUP SCORE
          </div>

          <div class="nexup-score-value">
            ${game.nexupScore ?? "--"}
          </div>

        </div>

        <div
          class="nexup-score-label"
          style="text-align:right;"
        >
          DECISION<br>
          INTELLIGENCE
        </div>

      `;


      const button =
        card.querySelector(
          ".select-game"
        );


      if (button) {

        button.before(
          scoreBox
        );

      } else {

        card.appendChild(
          scoreBox
        );

      }

    }
  );


  /* =======================================================
     MÉTRICAS
  ====================================================== */

  const metricDecisions =
    document.getElementById(
      "metricDecisions"
    );

  const metricGreens =
    document.getElementById(
      "metricGreens"
    );

  const metricLosses =
    document.getElementById(
      "metricLosses"
    );

  const metricWinRate =
    document.getElementById(
      "metricWinRate"
    );


  const greens =
    operations.filter(
      operation =>
        operation.result === "GREEN"
    ).length;


  const losses =
    operations.filter(
      operation =>
        operation.result === "LOSS"
    ).length;


  const finished =
    greens + losses;


  const winRate =
    finished > 0
      ? (
          greens /
          finished *
          100
        )
          .toFixed(1)
      : "0.0";


  if (metricDecisions) {

    metricDecisions.textContent =
      operations.length;

  }


  if (metricGreens) {

    metricGreens.textContent =
      greens;

  }


  if (metricLosses) {

    metricLosses.textContent =
      losses;

  }


  if (metricWinRate) {

    metricWinRate.textContent =
      `${winRate}%`;

  }


  /* =======================================================
     ATIVIDADE RECENTE
  ====================================================== */

  const activityContainer =
    document.getElementById(
      "recentActivityContainer"
    );


  if (!activityContainer) {
    return;
  }


  if (operations.length === 0) {

    activityContainer.innerHTML = `

      <div class="activity-empty">

        Nenhuma atividade registrada ainda.

      </div>

    `;

    return;

  }


  const recent =
    operations.slice(0, 5);


  activityContainer.innerHTML =
    recent.map(
      operation => {

        const resultClass =
          operation.status === "ATIVA"
            ? "upcoming"
            : operation.result === "GREEN"
              || operation.result === "CASHOUT"
                ? "live"
                : "upcoming";


        const resultLabel =
          operation.status === "ATIVA"
            ? "🟡 ATIVA"
            : operation.result;


        return `

          <div
            class="game-card"
            style="padding:15px;"
          >

            <div class="game-top">

              <span class="competition">
                ${escapeHTML(
                  operation.date || ""
                )}
              </span>

              <span class="${resultClass}">
                ${escapeHTML(
                  resultLabel
                )}
              </span>

            </div>


            <div class="teams">

              ${escapeHTML(
                operation.game || "Jogo"
              )}

            </div>


            <div class="selected-info">

              ${escapeHTML(
                operation.thesis || "-"
              )}

              ·

              ${escapeHTML(
                operation.market || "-"
              )}

            </div>


            <div class="selected-info">

              ODD
              ${Number(
                operation.entryOdd || 0
              ).toFixed(2)}

              ·

              STAKE
              R$
              ${formatMoney(
                operation.stake
              )}

              ·

              P&L
              R$
              ${formatMoney(
                operation.profit
              )}

            </div>

          </div>

        `;

      }
    ).join("");

}


/* =========================================================
   DASHBOARD INIT
========================================================= */

updateDashboard();


/*
  Mantém os indicadores sincronizados
  caso uma operação seja registrada,
  encerrada ou o histórico seja alterado.
*/

setInterval(
  updateDashboard,
  1000
);
