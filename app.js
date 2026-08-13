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
  reading: "",
  thesis: "",
  market: "",
  odd: "",
  stake: ""
};

let history = JSON.parse(
  localStorage.getItem("nexoHistory") || "[]"
);


function renderGames() {

  liveContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  games.forEach(game => {

    const card = document.createElement("div");

    card.className = "game-card";

    if (game.status === "LIVE") {

      card.innerHTML = `
        <div class="game-top">
          <span class="live">🔴 AO VIVO</span>
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
          <span class="score">—</span>

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


function selectGame(id) {

  const game =
    games.find(item => item.id === id);

  if (!game) return;

  selectedGame.classList.remove("hidden");

  if (game.status === "LIVE") {

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
            · ${game.minute}
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
              min="1"
              placeholder="Ex: 1.80"
            >

            <label>
              STAKE
            </label>

            <input
              id="entryStake"
              type="number"
              step="0.01"
              min="0"
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

  } else {

    selectedGame.innerHTML = `

      <div class="selected-game">

        <div>

          <div class="selected-title">
            ${game.home} × ${game.away}
          </div>

          <div class="selected-info">
            ${game.competition}
            · ${game.time}
            · PRÉ-JOGO
          </div>

        </div>

        <div class="upcoming">
          ⏳ PRÓXIMO
        </div>

      </div>

    `;

  }

  selectedGame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


function chooseReading(value) {

  checkpoint.reading = value;

  document
    .getElementById("checkpointStep2")
    .classList.remove("hidden");

}


function chooseThesis(value) {

  checkpoint.thesis = value;

  document
    .getElementById("checkpointStep3")
    .classList.remove("hidden");

}


function chooseMarket(value) {

  checkpoint.market = value;

  document
    .getElementById("checkpointStep4")
    .classList.remove("hidden");

}


function startOperation() {

  const oddInput =
    document.getElementById("entryOdd");

  const stakeInput =
    document.getElementById("entryStake");

  const odd =
    parseFloat(oddInput.value);

  const stake =
    parseFloat(stakeInput.value);

  if (!odd || odd <= 1) {

    alert("Informe uma odd válida.");

    return;
  }

  if (!stake || stake <= 0) {

    alert("Informe uma stake válida.");

    return;
  }

  checkpoint.odd = odd;
  checkpoint.stake = stake;

  const operationPanel =
    document.getElementById("operationPanel");

  operationPanel.classList.remove("hidden");

  operationPanel.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        OPERAÇÃO ATIVA
      </h2>

      <div class="selected-info">
        ODD DE ENTRADA: ${odd.toFixed(2)}
      </div>

      <div class="selected-info">
        STAKE: R$ ${stake.toFixed(2)}
      </div>

      <div class="selected-info">
        EXPOSIÇÃO: R$ ${(
          stake * odd
        ).toFixed(2)}
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


function cashout() {

  const output =
    prompt(
      "Informe a odd de saída no cashout:"
    );

  const exitOdd =
    parseFloat(output);

  if (!exitOdd || exitOdd <= 1) {

    alert("Odd de saída inválida.");

    return;
  }

  const stake =
    Number(checkpoint.stake);

  const entryOdd =
    Number(checkpoint.odd);

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


function saveOperation(
  result,
  exitOdd,
  profit
) {

  const gameTitle =
    selectedGame.querySelector(
      ".selected-title"
    );

  const gameInfo =
    selectedGame.querySelector(
      ".selected-info"
    );

  const operation = {

    id: Date.now(),

    game:
      gameTitle
        ? gameTitle.textContent.trim()
        : "Jogo",

    info:
      gameInfo
        ? gameInfo.textContent.trim()
        : "",

    reading:
      checkpoint.reading,

    thesis:
      checkpoint.thesis,

    market:
      checkpoint.market,

    entryOdd:
      Number(checkpoint.odd),

    stake:
      Number(checkpoint.stake),

    exitOdd:
      exitOdd,

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

  const resultContainer =
    document.getElementById(
      "checkpointResult"
    );

  resultContainer.classList.remove(
    "hidden"
  );

  resultContainer.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        OPERAÇÃO ENCERRADA
      </h2>

      <div class="selected-info">
        RESULTADO: ${result}
      </div>

      <div class="selected-info">
        ODD DE ENTRADA:
        ${checkpoint.odd.toFixed(2)}
      </div>

      ${
        exitOdd
          ? `
            <div class="selected-info">
              ODD DE SAÍDA:
              ${exitOdd.toFixed(2)}
            </div>
          `
          : ""
      }

      <div class="selected-info">
        STAKE:
        R$ ${checkpoint.stake.toFixed(2)}
      </div>

      <div class="selected-info">
        P&L:
        R$ ${profit.toFixed(2)}
      </div>

      <div class="live"
           style="margin-top:15px;">
        ✓ OPERAÇÃO REGISTRADA
      </div>

    </div>

  `;

  renderHistory();

}


function renderHistory() {

  const historyContainer =
    document.getElementById(
      "historyContainer"
    );

  if (!historyContainer) return;

  if (history.length === 0) {

    historyContainer.innerHTML = `
      <div class="section-subtitle">
        Nenhuma operação registrada ainda.
      </div>
    `;

    return;
  }

  const entries =
    history.filter(
      item => item.decision === "ENTRAR"
    ).length;

  const totalProfit =
    history.reduce(
      (sum, item) =>
        sum + Number(item.profit || 0),
      0
    );

  historyContainer.innerHTML = `

    <div class="games-grid">

      <div class="game-card">

        <div class="competition">
          OPERAÇÕES
        </div>

        <div class="score">
          ${entries}
        </div>

      </div>

      <div class="game-card">

        <div class="competition">
          P&L
        </div>

        <div class="score">
          R$ ${totalProfit.toFixed(2)}
        </div>

      </div>

    </div>

    <div style="margin-top:20px;">

      ${history.map(item => `

        <div
          class="game-card"
          style="margin-bottom:12px;"
        >

          <div class="game-top">

            <span class="competition">
              ${item.date}
            </span>

            <span class="${
              item.result === "GREEN"
              || item.result === "CASHOUT"
                ? "live"
                : "upcoming"
            }">
              ${item.result}
            </span>

          </div>

          <div class="teams">
            ${item.game}
          </div>

          <div class="selected-info">
            ${item.info}
          </div>

          <div class="selected-info">
            LEITURA:
            ${item.reading}
          </div>

          <div class="selected-info">
            TESE:
            ${item.thesis}
          </div>

          <div class="selected-info">
            MERCADO:
            ${item.market}
          </div>

          <div class="selected-info">
            ENTRADA:
            ${item.entryOdd.toFixed(2)}
          </div>

          ${
            item.exitOdd
              ? `
                <div class="selected-info">
                  SAÍDA:
                  ${item.exitOdd.toFixed(2)}
                </div>
              `
              : ""
          }

          <div class="selected-info">
            STAKE:
            R$ ${item.stake.toFixed(2)}
          </div>

          <div class="selected-info">
            P&L:
            R$ ${item.profit.toFixed(2)}
          </div>

        </div>

      `).join("")}

    </div>
  `;

}


renderGames();

renderHistory();
