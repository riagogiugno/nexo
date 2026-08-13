const games = [
  {
    id: 1,
    status: "LIVE",
    competition: "Libertadores",
    home: "Palmeiras",
    away: "Cerro Porteño",
    minute: "67'",
    score: "1 × 1"
  },
  {
    id: 2,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Cruzeiro",
    away: "Flamengo",
    minute: "34'",
    score: "0 × 0"
  },
  {
    id: 3,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Grêmio",
    away: "Internacional",
    minute: "71'",
    score: "2 × 0"
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

const liveContainer =
  document.getElementById("liveGames");

const upcomingContainer =
  document.getElementById("upcomingGames");

const selectedGame =
  document.getElementById("selectedGame");

let checkpoint = {
  gameId: null,
  reading: "",
  thesis: "",
  market: "",
  odd: 0,
  stake: 0
};

let history = JSON.parse(
  localStorage.getItem("nexoHistory") || "[]"
);


/* =========================
   JOGOS
========================= */

function renderGames() {

  if (!liveContainer || !upcomingContainer) {
    return;
  }

  liveContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  games.forEach(game => {

    const card =
      document.createElement("div");

    card.className = "game-card";

    if (game.status === "LIVE") {

      card.innerHTML = `
        <div class="game-top">
          <span class="live">
            🔴 AO VIVO
          </span>

          <span class="competition">
            ${game.competition}
          </span>
        </div>

        <div class="teams">
          ${game.home}<br>
          ${game.away}
        </div>

        <div class="scoreline">
          <span class="score">
            ${game.score}
          </span>

          <span class="minute">
            ${game.minute}
          </span>
        </div>

        <button
          class="select-game"
          onclick="selectGame(${game.id})">
          ACOMPANHAR JOGO
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
            ${game.competition}
          </span>
        </div>

        <div class="teams">
          ${game.home}<br>
          ${game.away}
        </div>

        <div class="scoreline">
          <span class="score">
            —
          </span>

          <span class="minute">
            ${game.time}
          </span>
        </div>

        <button
          class="select-game"
          onclick="selectGame(${game.id})">
          ACOMPANHAR JOGO
        </button>
      `;

      upcomingContainer.appendChild(card);
    }

  });

}


/* =========================
   SELECIONAR JOGO
========================= */

function selectGame(id) {

  const game =
    games.find(item => item.id === id);

  if (!game || !selectedGame) {
    return;
  }

  checkpoint.gameId = id;

  selectedGame.classList.remove("hidden");

  if (game.status !== "LIVE") {

    selectedGame.innerHTML = `

      <div class="selected-game">

        <div>

          <div class="selected-title">
            ${game.home}
            ×
            ${game.away}
          </div>

          <div class="selected-info">
            ${game.competition}
            ·
            ${game.time}
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
          ${game.home}
          ${game.score}
          ${game.away}
        </div>

        <div class="selected-info">
          ${game.competition}
          ·
          ${game.minute}
          · AO VIVO
        </div>

      </div>

      <div class="live">
        🔴 LIVE
      </div>

    </div>

    <div class="panel">

      <h2 class="section-title">
        CHECKPOINT
      </h2>

      <div class="section-subtitle">
        Registre rapidamente a leitura deste momento.
      </div>

      <h3 class="section-title">
        1. LEITURA
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

      <div id="checkpointStep2"
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

      <div id="checkpointStep3"
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

      <div id="checkpointStep4"
           class="hidden">

        <h3 class="section-title">
          4. OPERAÇÃO
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
            placeholder="Ex: 1.80"
          >

          <label>
            STAKE
          </label>

          <input
            id="entryStake"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Ex: 20.00"
          >

          <button
            class="select-game"
            onclick="startOperation()">
            REGISTRAR ENTRADA
          </button>

        </div>

      </div>

      <div id="operationPanel"
           class="hidden">
      </div>

      <div id="checkpointResult"
           class="hidden">
      </div>

    </div>
  `;

  selectedGame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================
   CHECKPOINT
========================= */

function chooseReading(value) {

  checkpoint.reading = value;

  const step =
    document.getElementById(
      "checkpointStep2"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


function chooseThesis(value) {

  checkpoint.thesis = value;

  const step =
    document.getElementById(
      "checkpointStep3"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


function chooseMarket(value) {

  checkpoint.market = value;

  const step =
    document.getElementById(
      "checkpointStep4"
    );

  if (step) {
    step.classList.remove("hidden");
  }

}


/* =========================
   ENTRADA
========================= */

function startOperation() {

  const oddInput =
    document.getElementById("entryOdd");

  const stakeInput =
    document.getElementById("entryStake");

  if (!oddInput || !stakeInput) {
    return;
  }

  const odd =
    Number(oddInput.value);

  const stake =
    Number(stakeInput.value);

  if (!odd || odd <= 1) {

    alert(
      "Informe uma odd válida."
    );

    return;
  }

  if (!stake || stake <= 0) {

    alert(
      "Informe uma stake válida."
    );

    return;
  }

  checkpoint.odd = odd;
  checkpoint.stake = stake;

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

      <div class="selected-info">
        ODD DE ENTRADA:
        ${odd.toFixed(2)}
      </div>

      <div class="selected-info">
        STAKE:
        R$ ${stake.toFixed(2)}
      </div>

      <div class="selected-info">
        EXPOSIÇÃO:
        R$ ${(stake * odd).toFixed(2)}
      </div>

      <h3 class="section-title">
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


/* =========================
   CASHOUT
========================= */

function cashout() {

  const output =
    prompt(
      "Informe a odd de saída no cashout:"
    );

  if (output === null) {
    return;
  }

  const exitOdd =
    Number(output);

  if (!exitOdd || exitOdd <= 1) {

    alert(
      "Odd de saída inválida."
    );

    return;
  }

  const entryOdd =
    Number(checkpoint.odd);

  const stake =
    Number(checkpoint.stake);

  /*
    Fórmula de cashout simplificada
    para back:
    lucro = stake × (entry / exit - 1)
  */

  const profit =
    stake *
    (
      entryOdd / exitOdd - 1
    );

  saveOperation(
    "CASHOUT",
    exitOdd,
    profit
  );

}


/* =========================
   GREEN / LOSS / VOID
========================= */

function finishOperation(result) {

  const stake =
    Number(checkpoint.stake);

  const odd =
    Number(checkpoint.odd);

  let profit = 0;

  if (result === "GREEN") {

    profit =
      stake * (odd - 1);

  }

  if (result === "LOSS") {

    profit =
      -stake;

  }

  if (result === "VOID") {

    profit = 0;

  }

  saveOperation(
    result,
    null,
    profit
  );

}


/* =========================
   SALVAR OPERAÇÃO
========================= */

function saveOperation(
  result,
  exitOdd,
  profit
) {

  const game =
    games.find(
      item =>
        item.id === checkpoint.gameId
    );

  const operation = {

    id: Date.now(),

    gameId:
      checkpoint.gameId,

    game:
      game
        ? `${game.home} ${game.score || ""} ${game.away}`
        : "Jogo",

    competition:
      game
        ? game.competition
        : "",

    minute:
      game
        ? game.minute || ""
        : "",

    reading:
      checkpoint.reading,

    thesis:
      checkpoint.thesis,

    market:
      checkpoint.market,

    entryOdd:
      Number(checkpoint.odd),

    exitOdd:
      exitOdd !== null
        ? Number(exitOdd)
        : null,

    stake:
      Number(checkpoint.stake),

    decision:
      "ENTRAR",

    result:
      result,

    profit:
      Number(profit.toFixed(2)),

    date:
      new Date().toLocaleString(
        "pt-BR"
      )

  };

  history.unshift(operation);

  localStorage.setItem(
    "nexoHistory",
    JSON.stringify(history)
  );

  showOperationResult(
    operation
  );

  renderHistory();

}


/* =========================
   RESULTADO DA OPERAÇÃO
========================= */

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

  resultContainer.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        OPERAÇÃO ENCERRADA
      </h2>

      <div class="selected-info">
        RESULTADO:
        ${operation.result}
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
        R$ ${operation.stake.toFixed(2)}
      </div>

      <div class="selected-info">
        P&L:
        R$ ${operation.profit.toFixed(2)}
      </div>

      <div
        class="live"
        style="margin-top:15px;"
      >
        ✓ OPERAÇÃO REGISTRADA
      </div>

    </div>
  `;

}


/* =========================
   HISTÓRICO
========================= */

function renderHistory() {

  const historyContainer =
    document.getElementById(
      "historyContainer"
    );

  if (!historyContainer) {
    return;
  }

  /*
    Aceita operações novas
    e ignora registros antigos
    que não possuem odd de entrada.
  */

  const operations =
    history.filter(
      item =>
        item &&
        item.entryOdd !== undefined
    );

  if (operations.length === 0) {

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
        sum + Number(item.profit || 0),
      0
    );

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
          ${totalProfit.toFixed(2)}
        </div>

      </div>

    </div>

    <div style="margin-top:20px;">

      ${operations.map(item => `

        <div
          class="game-card"
          style="margin-bottom:12px;"
        >

          <div class="game-top">

            <span class="competition">
              ${item.date || ""}
            </span>

            <span
              class="${
                item.result === "GREEN"
                || item.result === "CASHOUT"
                  ? "live"
                  : "upcoming"
              }"
            >
              ${item.result}
            </span>

          </div>

          <div class="teams">
            ${item.game || "Jogo"}
          </div>

          <div class="selected-info">
            ${item.competition || ""}
            ${item.minute ? " · " + item.minute : ""}
          </div>

          <div class="selected-info">
            LEITURA:
            ${item.reading || "-"}
          </div>

          <div class="selected-info">
            TESE:
            ${item.thesis || "-"}
          </div>

          <div class="selected-info">
            MERCADO:
            ${item.market || "-"}
          </div>

          <div class="selected-info">
            ODD DE ENTRADA:
            ${Number(item.entryOdd).toFixed(2)}
          </div>

          ${
            item.exitOdd !== null &&
            item.exitOdd !== undefined
              ? `
                <div class="selected-info">
                  ODD DE SAÍDA:
                  ${Number(item.exitOdd).toFixed(2)}
                </div>
              `
              : ""
          }

          <div class="selected-info">
            STAKE:
            R$ ${Number(item.stake).toFixed(2)}
          </div>

          <div class="selected-info">
            P&L:
            R$ ${Number(item.profit || 0).toFixed(2)}
          </div>

        </div>

      `).join("")}

    </div>
  `;

}


/* =========================
   INICIALIZAÇÃO
========================= */

renderGames();

renderHistory();
