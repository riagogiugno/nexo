```javascript
/* =========================================================
   NEXUP
   O ponto entre a leitura e a decisão.
   V0.7 — núcleo operacional
========================================================= */


/* =========================================================
   DADOS DE TESTE
========================================================= */

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


/* =========================================================
   ELEMENTOS
========================================================= */

const liveContainer =
  document.getElementById("liveGames");

const upcomingContainer =
  document.getElementById("upcomingGames");

const selectedGame =
  document.getElementById("selectedGame");

const historyContainer =
  document.getElementById("historyContainer");


/* =========================================================
   ESTADO
========================================================= */

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

let activeOperationId =
  Number(
    localStorage.getItem("nexupActiveOperationId")
  ) || null;


/* =========================================================
   UTILITÁRIOS
========================================================= */

function formatMoney(value) {

  return Number(value || 0).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}


function formatNumber(value) {

  return Number(value || 0).toFixed(2);

}


function getGame(id) {

  return games.find(
    game => game.id === id
  );

}


function getActiveOperation() {

  if (!activeOperationId) {
    return null;
  }

  return history.find(
    item =>
      item.id === activeOperationId &&
      item.status === "ATIVA"
  ) || null;

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function showSection(sectionId) {

  const sections = [
    "gamesSection",
    "historySection",
    "metricsSection"
  ];

  sections.forEach(id => {

    const section =
      document.getElementById(id);

    if (section) {
      section.classList.add("hidden");
    }

  });


  const target =
    document.getElementById(sectionId);

  if (target) {
    target.classList.remove("hidden");
  }


  const navButtons =
    document.querySelectorAll(".nav button");

  navButtons.forEach(button => {

    button.classList.remove("active");

  });


  const buttonMap = {
    gamesSection: 0,
    historySection: 1,
    metricsSection: 2
  };

  const index =
    buttonMap[sectionId];

  if (
    index !== undefined &&
    navButtons[index]
  ) {

    navButtons[index]
      .classList.add("active");

  }


  if (sectionId === "historySection") {
    renderHistory();
  }

  if (sectionId === "metricsSection") {
    renderMetrics();
  }

}


/* =========================================================
   JOGOS
========================================================= */

function renderGames() {

  if (
    !liveContainer ||
    !upcomingContainer
  ) {
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


/* =========================================================
   SELEÇÃO DO JOGO
========================================================= */

function selectGame(id) {

  const game =
    getGame(id);

  if (
    !game ||
    !selectedGame
  ) {
    return;
  }


  checkpoint = {
    gameId: id,
    reading: "",
    thesis: "",
    market: "",
    odd: 0,
    stake: 0
  };


  selectedGame.classList.remove(
    "hidden"
  );


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
        Organize sua leitura antes de registrar uma operação.
      </div>


      <!-- LEITURA -->

      <h3 class="section-title">
        1. LEITURA
      </h3>

      <div class="quick-grid">

        <button
          class="quick-button"
          id="reading-FORTE"
          onclick="chooseReading('FORTE')">
          🟢 FORTE
        </button>

        <button
          class="quick-button"
          id="reading-NEUTRA"
          onclick="chooseReading('NEUTRA')">
          🟡 NEUTRA
        </button>

        <button
          class="quick-button"
          id="reading-FRACA"
          onclick="chooseReading('FRACA')">
          🔴 FRACA
        </button>

      </div>


      <!-- TESE -->

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


      <!-- MERCADO -->

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


      <!-- OPERAÇÃO -->

      <div
        id="checkpointStep4"
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
            placeholder="Ex: 20.00"
          >


          <button
            class="select-game"
            onclick="startOperation()">

            REGISTRAR ENTRADA

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


  const active =
    getActiveOperation();

  if (
    active &&
    active.gameId === id
  ) {

    showActiveOperation(active);

  }


  selectedGame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   CHECKPOINT — LEITURA
========================================================= */

function chooseReading(value) {

  checkpoint.reading =
    value;


  highlightChoice(
    value,
    "reading"
  );


  const step =
    document.getElementById(
      "checkpointStep2"
    );

  if (step) {
    step.classList.remove(
      "hidden"
    );
  }

}


/* =========================================================
   CHECKPOINT — TESE
========================================================= */

function chooseThesis(value) {

  checkpoint.thesis =
    value;


  const buttons =
    document.querySelectorAll(
      "#checkpointStep2 .quick-button"
    );

  buttons.forEach(button => {

    button.classList.remove(
      "selected"
    );

    if (
      button.textContent
        .trim()
        .includes(value)
    ) {

      button.classList.add(
        "selected"
      );

    }

  });


  const step =
    document.getElementById(
      "checkpointStep3"
    );

  if (step) {
    step.classList.remove(
      "hidden"
    );
  }

}


/* =========================================================
   CHECKPOINT — MERCADO
========================================================= */

function chooseMarket(value) {

  checkpoint.market =
    value;


  const buttons =
    document.querySelectorAll(
      "#checkpointStep3 .quick-button"
    );

  buttons.forEach(button => {

    button.classList.remove(
      "selected"
    );

    if (
      button.textContent
        .trim()
        .includes(value)
    ) {

      button.classList.add(
        "selected"
      );

    }

  });


  const step =
    document.getElementById(
      "checkpointStep4"
    );

  if (step) {
    step.classList.remove(
      "hidden"
    );
  }

}


/* =========================================================
   HIGHLIGHT
========================================================= */

function highlightChoice(
  value,
  type
) {

  const buttons =
    document.querySelectorAll(
      ".quick-button"
    );

  buttons.forEach(button => {

    button.classList.remove(
      "selected"
    );

  });


  const normalized =
    value
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      );


  buttons.forEach(button => {

    const text =
      button.textContent
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .trim();


    if (
      text.includes(normalized)
    ) {

      button.classList.add(
        "selected"
      );

    }

  });

}


/* =========================================================
   REGISTRAR ENTRADA
========================================================= */

function startOperation() {

  if (
    getActiveOperation()
  ) {

    alert(
      "Já existe uma operação ativa no NEXUP."
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


  if (
    !oddInput ||
    !stakeInput
  ) {
    return;
  }


  const odd =
    Number(
      oddInput.value
    );

  const stake =
    Number(
      stakeInput.value
    );


  if (
    !odd ||
    odd <= 1
  ) {

    alert(
      "Informe uma odd válida."
    );

    return;

  }


  if (
    !stake ||
    stake <= 0
  ) {

    alert(
      "Informe uma stake válida."
    );

    return;

  }


  if (
    !checkpoint.reading ||
    !checkpoint.thesis ||
    !checkpoint.market
  ) {

    alert(
      "Complete o checkpoint antes de registrar a entrada."
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

    id: Date.now(),

    gameId:
      checkpoint.gameId,

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
      )

  };


  history.unshift(
    operation
  );


  activeOperationId =
    operation.id;


  localStorage.setItem(
    "nexupActiveOperationId",
    String(operation.id)
  );


  saveHistory();


  showActiveOperation(
    operation
  );


  renderHistory();


  renderMetrics();

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
        🟡 EM ANDAMENTO
      </div>


      <div class="selected-info">
        ODD DE ENTRADA:
        ${formatNumber(operation.entryOdd)}
      </div>


      <div class="selected-info">
        STAKE:
        ${formatMoney(operation.stake)}
      </div>


      <div class="selected-info">
        EXPOSIÇÃO:
        ${formatMoney(
          operation.stake *
          operation.entryOdd
        )}
      </div>


      <div class="selected-info">
        LEITURA:
        ${operation.reading}
      </div>


      <div class="selected-info">
        TESE:
        ${operation.thesis}
      </div>


      <div class="selected-info">
        MERCADO:
        ${operation.market}
      </div>


      <h3 class="section-title"
          style="margin-top:24px;">
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


  if (
    output === null
  ) {
    return;
  }


  const exitOdd =
    Number(output);


  if (
    !exitOdd ||
    exitOdd <= 1
  ) {

    alert(
      "Odd de saída inválida."
    );

    return;

  }


  const profit =
    operation.stake *
    (
      operation.entryOdd /
      exitOdd - 1
    );


  closeOperation(
    operation,
    "CASHOUT",
    exitOdd,
    profit
  );

}


/* =========================================================
   GREEN / LOSS / VOID
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


  if (
    result === "GREEN"
  ) {

    profit =
      operation.stake *
      (
        operation.entryOdd - 1
      );

  }


  if (
    result === "LOSS"
  ) {

    profit =
      -operation.stake;

  }


  if (
    result === "VOID"
  ) {

    profit = 0;

  }


  closeOperation(
    operation,
    result,
    null,
    profit
  );

}


/* =========================================================
   ENCERRAR OPERAÇÃO
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


  activeOperationId =
    null;


  localStorage.removeItem(
    "nexupActiveOperationId"
  );


  saveHistory();


  showOperationResult(
    operation
  );


  renderHistory();


  renderMetrics();

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


  const positive =
    operation.profit >= 0;


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
        ${formatNumber(
          operation.entryOdd
        )}
      </div>


      ${
        operation.exitOdd !== null
          ? `
            <div class="selected-info">
              ODD DE SAÍDA:
              ${formatNumber(
                operation.exitOdd
              )}
            </div>
          `
          : ""
      }


      <div class="selected-info">
        STAKE:
        ${formatMoney(
          operation.stake
        )}
      </div>


      <div
        class="selected-info"
        style="
          color:
          ${positive
            ? "var(--green)"
            : "var(--red)"};
          font-weight:800;
          margin-top:12px;
        "
      >

        P&L:
        ${formatMoney(
          operation.profit
        )}

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

  if (!historyContainer) {
    return;
  }


  const operations =
    history.filter(
      item =>
        item &&
        item.entryOdd !== undefined
    );


  if (
    operations.length === 0
  ) {

    historyContainer.innerHTML = `

      <div class="panel">

        <div class="section-subtitle">
          Nenhuma operação registrada ainda.
        </div>

      </div>

    `;

    return;

  }


  const totalProfit =
    operations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.profit || 0
        ),
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

        <div
          class="score"
          style="
            color:
            ${totalProfit >= 0
              ? "var(--green)"
              : "var(--red)"};
          "
        >
          ${formatMoney(
            totalProfit
          )}
        </div>

      </div>


    </div>


    <div style="margin-top:22px;">

      ${operations.map(
        item => `

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
                item.status === "ATIVA"
                  ? "upcoming"
                  : item.result === "GREEN" ||
                    item.result === "CASHOUT"
                    ? "live"
                    : "upcoming"
              }"
            >

              ${
                item.status === "ATIVA"
                  ? "🟡 ATIVA"
                  : item.result
              }

            </span>

          </div>


          <div class="teams">
            ${item.game || "Jogo"}
          </div>


          <div class="selected-info">
            ${item.competition || ""}
            ${
              item.minute
                ? " · " + item.minute
                : ""
            }
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
            ${formatNumber(
              item.entryOdd
            )}
          </div>


          ${
            item.exitOdd !== null &&
            item.exitOdd !== undefined
              ? `
                <div class="selected-info">
                  ODD DE SAÍDA:
                  ${formatNumber(
                    item.exitOdd
                  )}
                </div>
              `
              : ""
          }


          <div class="selected-info">
            STAKE:
            ${formatMoney(
              item.stake
            )}
          </div>


          <div
            class="selected-info"
            style="
              color:
              ${
                Number(item.profit || 0) >= 0
                  ? "var(--green)"
                  : "var(--red)"
              };
              font-weight:800;
            "
          >

            P&L:
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
   MÉTRICAS
========================================================= */

function renderMetrics() {

  const metricsSection =
    document.getElementById(
      "metricsSection"
    );


  if (!metricsSection) {
    return;
  }


  const operations =
    history.filter(
      item =>
        item &&
        item.entryOdd !== undefined &&
        item.status === "ENCERRADA"
    );


  const total =
    operations.length;


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


  const profit =
    operations.reduce(
      (sum, item) =>
        sum +
        Number(item.profit || 0),
      0
    );


  const decided =
    greens +
    losses +
    cashouts;


  const hitRate =
    decided > 0
      ? (
          (
            greens +
            cashouts
          ) /
          decided
        ) *
        100
      : 0;


  const averageProfit =
    total > 0
      ? profit / total
      : 0;


  metricsSection.innerHTML = `

    <h1 class="section-title">
      📈 MÉTRICAS
    </h1>


    <div class="section-subtitle">
      O NEXUP começa a transformar suas decisões registradas em dados.
    </div>


    <div class="games-grid">


      <div class="game-card">

        <div class="competition">
          DECISÕES
        </div>

        <div class="score">
          ${total}
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
          LOSS
        </div>

        <div class="score">
          ${losses}
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
          VOID
        </div>

        <div class="score">
          ${voids}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          TAXA DE ACERTO
        </div>

        <div class="score">
          ${hitRate.toFixed(1)}%
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          P&L TOTAL
        </div>

        <div
          class="score"
          style="
            color:
            ${
              profit >= 0
                ? "var(--green)"
                : "var(--red)"
            };
          "
        >
          ${formatMoney(profit)}
        </div>

      </div>


      <div class="game-card">

        <div class="competition">
          P&L MÉDIO
        </div>

        <div class="score">
          ${formatMoney(
            averageProfit
          )}
        </div>

      </div>


    </div>


    <div class="panel">

      <h2 class="section-title">
        LEITURA DO NEXUP
      </h2>

      <div class="section-subtitle">

        Quanto mais decisões forem registradas,
        mais dados teremos para identificar padrões
        de comportamento e tomada de decisão.

      </div>

    </div>

  `;

}


/* =========================================================
   PERSISTÊNCIA
========================================================= */

function saveHistory() {

  localStorage.setItem(
    "nexoHistory",
    JSON.stringify(history)
  );

}


/* =========================================================
   RECUPERAR OPERAÇÃO ATIVA
========================================================= */

function restoreActiveOperation() {

  const operation =
    getActiveOperation();


  if (!operation) {

    activeOperationId =
      null;

    localStorage.removeItem(
      "nexupActiveOperationId"
    );

    return;

  }


  const game =
    getGame(
      operation.gameId
    );


  if (!game) {
    return;
  }


  checkpoint = {

    gameId:
      operation.gameId,

    reading:
      operation.reading || "",

    thesis:
      operation.thesis || "",

    market:
      operation.market || "",

    odd:
      operation.entryOdd || 0,

    stake:
      operation.stake || 0

  };


  selectGame(
    operation.gameId
  );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderGames();

renderHistory();

renderMetrics();

restoreActiveOperation();
```
