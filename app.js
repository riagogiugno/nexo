/* =========================================================
   NEXUP
   O ponto entre a leitura e a decisão.
   V0.8 — CORE ANALYTICAL TERMINAL
========================================================= */


/* =========================================================
   JOGOS — MOCK DATA
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
    nexupScore: 78,
    temperature: "FORTE",
    pressure: 82,
    rhythm: 76,
    dominance: 79,
    danger: 74
  },

  {
    id: 2,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Cruzeiro",
    away: "Flamengo",
    minute: "34'",
    score: "0 × 0",
    nexupScore: 54,
    temperature: "MORNO",
    pressure: 51,
    rhythm: 48,
    dominance: 57,
    danger: 43
  },

  {
    id: 3,
    status: "LIVE",
    competition: "Brasileirão",
    home: "Grêmio",
    away: "Internacional",
    minute: "71'",
    score: "2 × 0",
    nexupScore: 86,
    temperature: "FORTE",
    pressure: 88,
    rhythm: 84,
    dominance: 91,
    danger: 81
  },

  {
    id: 4,
    status: "UPCOMING",
    competition: "Brasileirão",
    home: "São Paulo",
    away: "Santos",
    time: "21:30",
    nexupScore: 0,
    temperature: "PRÉ-LIVE"
  },

  {
    id: 5,
    status: "UPCOMING",
    competition: "Libertadores",
    home: "River Plate",
    away: "Boca Juniors",
    time: "22:00",
    nexupScore: 0,
    temperature: "PRÉ-LIVE"
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

const metricsContainer =
  document.getElementById("metricsContainer");


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


let activeOperationId = null;


/* =========================================================
   UTILITÁRIOS
========================================================= */

function money(value) {

  return Number(value || 0).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}


function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function showSection(sectionId, button) {

  const sections = [
    "gamesSection",
    "historySection",
    "metricsSection"
  ];

  sections.forEach(id => {

    const section =
      document.getElementById(id);

    if (!section) {
      return;
    }

    section.classList.toggle(
      "hidden",
      id !== sectionId
    );

  });


  document
    .querySelectorAll(".nav button")
    .forEach(item => {

      item.classList.remove("active");

    });


  if (button) {
    button.classList.add("active");
  }


  if (sectionId === "historySection") {
    renderHistory();
  }


  if (sectionId === "metricsSection") {
    renderMetrics();
  }

}


/* =========================================================
   DASHBOARD OVERVIEW
========================================================= */

function renderOverview() {

  const live =
    games.filter(
      game => game.status === "LIVE"
    ).length;


  const readings =
    history.filter(
      item => item.reading
    ).length;


  const active =
    history.filter(
      item => item.status === "ATIVA"
    ).length;


  const pnl =
    history.reduce(
      (sum, item) =>
        sum + Number(item.profit || 0),
      0
    );


  const liveElement =
    document.getElementById(
      "overviewLive"
    );

  const readingsElement =
    document.getElementById(
      "overviewReadings"
    );

  const activeElement =
    document.getElementById(
      "overviewActive"
    );

  const pnlElement =
    document.getElementById(
      "overviewPnl"
    );


  if (liveElement) {
    liveElement.textContent = live;
  }


  if (readingsElement) {
    readingsElement.textContent = readings;
  }


  if (activeElement) {
    activeElement.textContent = active;
  }


  if (pnlElement) {

    pnlElement.textContent =
      money(pnl);

    pnlElement.classList.remove(
      "positive",
      "negative"
    );


    if (pnl > 0) {
      pnlElement.classList.add(
        "positive"
      );
    }


    if (pnl < 0) {
      pnlElement.classList.add(
        "negative"
      );
    }

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
      document.createElement("article");


    card.className =
      "game-card";


    if (game.status === "LIVE") {

      card.innerHTML = `

        <div class="game-top">

          <span class="live">
            ● AO VIVO
          </span>

          <span class="competition">
            ${escapeHTML(game.competition)}
          </span>

        </div>


        <div class="teams">

          ${escapeHTML(game.home)}

          <span class="match-score">
            ${escapeHTML(game.score)}
          </span>

          ${escapeHTML(game.away)}

        </div>


        <div class="scoreline">

          <span class="minute">
            ${escapeHTML(game.minute)}
          </span>

          <span
            class="temperature
              ${game.temperature === "FORTE"
                ? "temperature-strong"
                : "temperature-warm"}"
          >
            ${escapeHTML(game.temperature)}
          </span>

        </div>


        <div class="nexup-mini">

          <span>
            NEXUP SCORE
          </span>

          <strong>
            ${game.nexupScore}
          </strong>

        </div>


        <button
          class="select-game"
          onclick="selectGame(${game.id})"
        >
          ANALISAR JOGO
        </button>

      `;


      liveContainer.appendChild(card);

    }


    else {

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

          <span class="vs">
            ×
          </span>

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
          onclick="selectGame(${game.id})"
        >
          VER PRÉ-LIVE
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

  const game =
    games.find(
      item => item.id === id
    );


  if (!game || !selectedGame) {
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

      <div class="analysis-panel">

        <div class="analysis-header">

          <div>

            <div class="eyebrow">
              PRÉ-LIVE
            </div>

            <div class="selected-title">
              ${escapeHTML(game.home)}
              <span>×</span>
              ${escapeHTML(game.away)}
            </div>

            <div class="selected-info">
              ${escapeHTML(game.competition)}
              ·
              ${escapeHTML(game.time)}
            </div>

          </div>

          <div class="upcoming">
            ⏳ PRÓXIMO
          </div>

        </div>


        <div class="prelive-message">

          <strong>
            ANÁLISE PRÉ-LIVE
          </strong>

          <p>
            O jogo ainda não começou.
            O NEXUP pode organizar a leitura
            antes da partida, mas a decisão
            continua sendo do trader.
          </p>

        </div>

      </div>

    `;


    selectedGame.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    return;
  }


  selectedGame.innerHTML = `

    <div class="analysis-panel">

      <!-- HEADER -->

      <div class="analysis-header">

        <div>

          <div class="eyebrow">
            ${escapeHTML(game.competition)}
            · AO VIVO
          </div>

          <div class="selected-title">

            ${escapeHTML(game.home)}

            <span>
              ${escapeHTML(game.score)}
            </span>

            ${escapeHTML(game.away)}

          </div>

          <div class="selected-info">
            ${escapeHTML(game.minute)}
          </div>

        </div>


        <div class="live-indicator">
          <span></span>
          LIVE
        </div>

      </div>


      <!-- SCORE -->

      <div class="score-zone">

        <div class="score-ring">

          <div class="score-number">
            ${game.nexupScore}
          </div>

          <div class="score-label">
            NEXUP SCORE
          </div>

        </div>


        <div class="temperature-box">

          <div class="eyebrow">
            ESTADO DO JOGO
          </div>

          <strong>
            ${game.temperature}
          </strong>

          <p>
            O NEXUP informa.
            O trader interpreta.
          </p>

        </div>

      </div>


      <!-- INDICADORES -->

      <div class="indicators">

        ${indicator(
          "PRESSÃO",
          game.pressure
        )}

        ${indicator(
          "RITMO",
          game.rhythm
        )}

        ${indicator(
          "DOMÍNIO",
          game.dominance
        )}

        ${indicator(
          "PERIGO",
          game.danger
        )}

      </div>


      <!-- FLUXO -->

      <div class="decision-flow">

        <div class="flow-step active">
          01<br>
          <span>OBSERVAÇÃO</span>
        </div>

        <div class="flow-line"></div>

        <div class="flow-step">
          02<br>
          <span>LEITURA</span>
        </div>

        <div class="flow-line"></div>

        <div class="flow-step">
          03<br>
          <span>TESE</span>
        </div>

        <div class="flow-line"></div>

        <div class="flow-step">
          04<br>
          <span>MERCADO</span>
        </div>

        <div class="flow-line"></div>

        <div class="flow-step">
          05<br>
          <span>DECISÃO</span>
        </div>

      </div>


      <!-- CHECKPOINT -->

      <div class="panel">

        <div class="eyebrow">
          CHECKPOINT
        </div>

        <h2 class="section-title">
          MINHA LEITURA
        </h2>

        <p class="section-subtitle">
          Como você classifica este momento?
        </p>


        <div class="quick-grid">

          <button
            class="quick-button"
            onclick="chooseReading('FORTE')"
          >
            FORTE
          </button>

          <button
            class="quick-button"
            onclick="chooseReading('NEUTRA')"
          >
            NEUTRA
          </button>

          <button
            class="quick-button"
            onclick="chooseReading('FRACA')"
          >
            FRACA
          </button>

        </div>


        <div
          id="checkpointStep2"
          class="hidden"
        >

          <h2 class="section-title">
            TESE
          </h2>

          <div class="quick-grid">

            <button
              class="quick-button"
              onclick="chooseThesis('PRÓXIMO GOL')"
            >
              PRÓXIMO GOL
            </button>

            <button
              class="quick-button"
              onclick="chooseThesis('ESCANTEIO')"
            >
              ESCANTEIO
            </button>

            <button
              class="quick-button"
              onclick="chooseThesis('CARTÃO')"
            >
              CARTÃO
            </button>

            <button
              class="quick-button"
              onclick="chooseThesis('MOVIMENTO DE ODD')"
            >
              MOVIMENTO DE ODD
            </button>

            <button
              class="quick-button"
              onclick="chooseThesis('OUTRO')"
            >
              OUTRO
            </button>

          </div>

        </div>


        <div
          id="checkpointStep3"
          class="hidden"
        >

          <h2 class="section-title">
            MERCADO
          </h2>

          <div class="quick-grid">

            <button
              class="quick-button"
              onclick="chooseMarket('OVER / UNDER')"
            >
              OVER / UNDER
            </button>

            <button
              class="quick-button"
              onclick="chooseMarket('MATCH ODDS')"
            >
              MATCH ODDS
            </button>

            <button
              class="quick-button"
              onclick="chooseMarket('ESCANTEIOS')"
            >
              ESCANTEIOS
            </button>

            <button
              class="quick-button"
              onclick="chooseMarket('CARTÕES')"
            >
              CARTÕES
            </button>

          </div>

        </div>


        <div
          id="checkpointStep4"
          class="hidden"
        >

          <h2 class="section-title">
            DECISÃO
          </h2>

          <p class="section-subtitle">
            O NEXUP organiza.
            O TRADER DECIDE.
          </p>


          <div class="operation-form">

            <label>
              ODD DE ENTRADA
            </label>

            <input
              id="entryOdd"
              type="number"
              step="0.01"
              min="1.01"
              placeholder="1.50"
            >


            <label>
              STAKE
            </label>

            <input
              id="entryStake"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="20.00"
            >


            <button
              class="primary-action"
              onclick="startOperation()"
            >
              REGISTRAR OPERAÇÃO
            </button>

          </div>

        </div>


        <div
          id="operationPanel"
          class="hidden"
        ></div>


        <div
          id="checkpointResult"
          class="hidden"
        ></div>

      </div>

    </div>

  `;


  selectedGame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   INDICADOR
========================================================= */

function indicator(label, value) {

  return `

    <div class="indicator">

      <div class="indicator-head">

        <span>
          ${label}
        </span>

        <strong>
          ${value}
        </strong>

      </div>

      <div class="indicator-track">

        <div
          class="indicator-fill"
          style="width:${value}%"
        ></div>

      </div>

    </div>

  `;

}


/* =========================================================
   LEITURA
========================================================= */

function chooseReading(value) {

  checkpoint.reading = value;


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
   TESE
========================================================= */

function chooseThesis(value) {

  checkpoint.thesis = value;


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
   MERCADO
========================================================= */

function chooseMarket(value) {

  checkpoint.market = value;


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
   REGISTRAR OPERAÇÃO
========================================================= */

function startOperation() {

  const oddInput =
    document.getElementById(
      "entryOdd"
    );

  const stakeInput =
    document.getElementById(
      "entryStake"
    );


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


  const game =
    games.find(
      item =>
        item.id === checkpoint.gameId
    );


  if (!game) {
    return;
  }


  checkpoint.odd =
    odd;

  checkpoint.stake =
    stake;


  const operation = {

    id: Date.now(),

    gameId:
      game.id,

    game:
      `${game.home} ${game.score || ""} ${game.away}`,

    competition:
      game.competition,

    minute:
      game.minute || "",

    nexupScore:
      game.nexupScore || 0,

    temperature:
      game.temperature || "",

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
      ),

    startedAt:
      Date.now()

  };


  history.unshift(
    operation
  );


  activeOperationId =
    operation.id;


  saveHistory();


  showActiveOperation(
    operation
  );


  renderOverview();

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

    <div class="active-operation">

      <div class="eyebrow">
        OPERAÇÃO ATIVA
      </div>

      <div class="active-status">
        <span></span>
        EM OPERAÇÃO
      </div>


      <div class="active-grid">

        <div>
          <small>MATCH</small>
          <strong>
            ${escapeHTML(operation.game)}
          </strong>
        </div>

        <div>
          <small>ODD</small>
          <strong>
            ${operation.entryOdd.toFixed(2)}
          </strong>
        </div>

        <div>
          <small>STAKE</small>
          <strong>
            ${money(operation.stake)}
          </strong>
        </div>

        <div>
          <small>EXPOSIÇÃO</small>
          <strong>
            ${money(
              operation.stake *
              operation.entryOdd
            )}
          </strong>
        </div>

      </div>


      <div class="eyebrow operation-output-title">
        SAÍDA
      </div>


      <div class="quick-grid">

        <button
          class="quick-button"
          onclick="cashout()"
        >
          CASHOUT
        </button>

        <button
          class="quick-button success-button"
          onclick="finishOperation('GREEN')"
        >
          GREEN
        </button>

        <button
          class="quick-button danger-button"
          onclick="finishOperation('LOSS')"
        >
          LOSS
        </button>

        <button
          class="quick-button"
          onclick="finishOperation('VOID')"
        >
          VOID
        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   CASHOUT
========================================================= */

function cashout() {

  if (!activeOperationId) {
    return;
  }


  const output =
    prompt(
      "Informe a odd de saída:"
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


  const operation =
    history.find(
      item =>
        item.id === activeOperationId
    );


  if (!operation) {
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

function finishOperation(result) {

  if (!activeOperationId) {
    return;
  }


  const operation =
    history.find(
      item =>
        item.id === activeOperationId
    );


  if (!operation) {
    return;
  }


  let profit = 0;


  if (result === "GREEN") {

    profit =
      operation.stake *
      (
        operation.entryOdd - 1
      );

  }


  if (result === "LOSS") {

    profit =
      -operation.stake;

  }


  if (result === "VOID") {

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


  operation.duration =
    operation.startedAt
      ? Date.now() -
        operation.startedAt
      : 0;


  saveHistory();


  activeOperationId =
    null;


  showOperationResult(
    operation
  );


  renderOverview();

  renderHistory();

  renderMetrics();

}


/* =========================================================
   RESULTADO
========================================================= */

function showOperationResult(
  operation
) {

  const container =
    document.getElementById(
      "checkpointResult"
    );


  if (!container) {
    return;
  }


  container.classList.remove(
    "hidden"
  );


  const positive =
    operation.profit >= 0;


  container.innerHTML = `

    <div class="operation-result">

      <div class="eyebrow">
        OPERAÇÃO ENCERRADA
      </div>

      <div class="
        result-value
        ${positive
          ? "positive"
          : "negative"}
      ">

        ${operation.profit >= 0
          ? "+"
          : ""}

        ${money(
          operation.profit
        )}

      </div>


      <div class="selected-info">

        RESULTADO:
        ${escapeHTML(
          operation.result
        )}

      </div>


      <div class="selected-info">

        ODD:
        ${operation.entryOdd.toFixed(2)}

      </div>


      <div class="selected-info">

        STAKE:
        ${money(
          operation.stake
        )}

      </div>


      <div class="success-message">

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

      <div class="empty-state">

        <strong>
          NENHUMA OPERAÇÃO
        </strong>

        <span>
          O histórico aparecerá aqui.
        </span>

      </div>

    `;

    return;
  }


  const total =
    operations.length;


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


  const pnl =
    operations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.profit || 0
        ),
      0
    );


  historyContainer.innerHTML = `

    <div class="history-summary">

      ${summaryCard(
        "OPERAÇÕES",
        total
      )}

      ${summaryCard(
        "ATIVAS",
        active
      )}

      ${summaryCard(
        "GREEN",
        greens
      )}

      ${summaryCard(
        "LOSS",
        losses
      )}

      ${summaryCard(
        "CASHOUT",
        cashouts
      )}

      ${summaryCard(
        "VOID",
        voids
      )}

      ${summaryCard(
        "P&L",
        money(pnl),
        pnl > 0
          ? "positive"
          : pnl < 0
            ? "negative"
            : ""
      )}

    </div>


    <div class="history-list">

      ${operations.map(
        operation =>
          historyRow(
            operation
          )
      ).join("")}

    </div>

  `;

}


/* =========================================================
   CARD RESUMO
========================================================= */

function summaryCard(
  label,
  value,
  className = ""
) {

  return `

    <div class="summary-card">

      <span>
        ${label}
      </span>

      <strong
        class="${className}"
      >
        ${value}
      </strong>

    </div>

  `;

}


/* =========================================================
   LINHA HISTÓRICO
========================================================= */

function historyRow(
  operation
) {

  const resultClass =
    operation.result === "GREEN"
      || operation.result === "CASHOUT"
        ? "positive"
        : operation.result === "LOSS"
          ? "negative"
          : "";


  return `

    <div class="history-row">

      <div class="history-main">

        <div class="eyebrow">
          ${escapeHTML(
            operation.date || ""
          )}
        </div>

        <strong>
          ${escapeHTML(
            operation.game || "Jogo"
          )}
        </strong>

        <span>
          ${escapeHTML(
            operation.competition || ""
          )}

          ${
            operation.minute
              ? " · " +
                escapeHTML(
                  operation.minute
                )
              : ""
          }

        </span>

      </div>


      <div class="history-data">

        <span>
          LEITURA
          <b>
            ${escapeHTML(
              operation.reading || "-"
            )}
          </b>
        </span>

        <span>
          TESE
          <b>
            ${escapeHTML(
              operation.thesis || "-"
            )}
          </b>
        </span>

        <span>
          MERCADO
          <b>
            ${escapeHTML(
              operation.market || "-"
            )}
          </b>
        </span>

        <span>
          ODD
          <b>
            ${Number(
              operation.entryOdd
            ).toFixed(2)}
          </b>
        </span>

        <span>
          STAKE
          <b>
            ${money(
              operation.stake
            )}
          </b>
        </span>

      </div>


      <div class="history-result">

        <span
          class="${resultClass}"
        >
          ${
            operation.status === "ATIVA"
              ? "ATIVA"
              : operation.result
          }
        </span>

        <strong
          class="${resultClass}"
        >
          ${
            operation.profit >= 0
              ? "+"
              : ""
          }

          ${money(
            operation.profit
          )}

        </strong>

      </div>

    </div>

  `;

}


/* =========================================================
   MÉTRICAS
========================================================= */

function renderMetrics() {

  if (!metricsContainer) {
    return;
  }


  const operations =
    history.filter(
      item =>
        item &&
        item.entryOdd !== undefined
    );


  const closed =
    operations.filter(
      item =>
        item.status === "ENCERRADA"
    );


  const greens =
    closed.filter(
      item =>
        item.result === "GREEN"
        ||
        item.result === "CASHOUT"
          && Number(item.profit) > 0
    ).length;


  const pnl =
    closed.reduce(
      (sum, item) =>
        sum +
        Number(
          item.profit || 0
        ),
      0
    );


  const winRate =
    closed.length
      ? (
          greens /
          closed.length *
          100
        )
      : 0;


  const avgOdd =
    operations.length
      ? operations.reduce(
          (sum, item) =>
            sum +
            Number(
              item.entryOdd || 0
            ),
          0
        ) /
        operations.length
      : 0;


  const avgStake =
    operations.length
      ? operations.reduce(
          (sum, item) =>
            sum +
            Number(
              item.stake || 0
            ),
          0
        ) /
        operations.length
      : 0;


  metricsContainer.innerHTML = `

    <div class="metrics-grid">

      ${metricCard(
        "P&L TOTAL",
        money(pnl),
        pnl >= 0
          ? "positive"
          : "negative"
      )}

      ${metricCard(
        "WIN RATE",
        `${winRate.toFixed(1)}%`
      )}

      ${metricCard(
        "DECISÕES",
        operations.length
      )}

      ${metricCard(
        "ODD MÉDIA",
        avgOdd
          ? avgOdd.toFixed(2)
          : "—"
      )}

      ${metricCard(
        "STAKE MÉDIA",
        money(avgStake)
      )}

      ${metricCard(
        "OPERAÇÕES FECHADAS",
        closed.length
      )}

    </div>


    <div class="metrics-panel">

      <div class="eyebrow">
        QUALIDADE DA DECISÃO
      </div>

      <h2 class="section-title">
        NEXUP Decision Intelligence
      </h2>

      <p class="section-subtitle">
        A métrica não deve olhar apenas
        para o resultado financeiro.
        O objetivo é entender a qualidade
        do processo que levou à decisão.
      </p>


      <div class="quality-grid">

        ${qualityMetric(
          "LEITURAS FORTES",
          percentageByField(
            operations,
            "reading",
            "FORTE"
          )
        )}

        ${qualityMetric(
          "LEITURAS NEUTRAS",
          percentageByField(
            operations,
            "reading",
            "NEUTRA"
          )
        )}

        ${qualityMetric(
          "LEITURAS FRACAS",
          percentageByField(
            operations,
            "reading",
            "FRACA"
          )
        )}

      </div>

    </div>


    <div class="metrics-panel">

      <div class="eyebrow">
        P&L EVOLUTION
      </div>

      <div class="pnl-list">

        ${
          closed.length === 0
            ? `
              <div class="empty-state">
                Ainda não existem dados
                suficientes para o gráfico.
              </div>
            `
            : buildPnlBars(
                closed
              )
        }

      </div>

    </div>

  `;

}


/* =========================================================
   MÉTRICA
========================================================= */

function metricCard(
  label,
  value,
  className = ""
) {

  return `

    <div class="metric-card">

      <span>
        ${label}
      </span>

      <strong
        class="${className}"
      >
        ${value}
      </strong>

    </div>

  `;

}


/* =========================================================
   QUALIDADE
========================================================= */

function qualityMetric(
  label,
  value
) {

  return `

    <div class="quality-item">

      <div>

        <span>
          ${label}
        </span>

        <strong>
          ${value.toFixed(1)}%
        </strong>

      </div>

      <div class="indicator-track">

        <div
          class="indicator-fill"
          style="width:${value}%"
        ></div>

      </div>

    </div>

  `;

}


/* =========================================================
   PERCENTUAL POR CAMPO
========================================================= */

function percentageByField(
  operations,
  field,
  value
) {

  if (!operations.length) {
    return 0;
  }


  const count =
    operations.filter(
      item =>
        item[field] === value
    ).length;


  return (
    count /
    operations.length *
    100
  );

}


/* =========================================================
   P&L BARS
========================================================= */

function buildPnlBars(
  operations
) {

  let cumulative = 0;


  return operations
    .slice()
    .reverse()
    .map(operation => {

      cumulative +=
        Number(
          operation.profit || 0
        );


      const width =
        Math.min(
          Math.abs(cumulative) * 5,
          100
        );


      return `

        <div class="pnl-row">

          <span>
            ${escapeHTML(
              operation.result
            )}
          </span>

          <div class="pnl-track">

            <div
              class="
                pnl-bar
                ${
                  cumulative >= 0
                    ? "positive-bar"
                    : "negative-bar"
                }
              "
              style="
                width:
                ${Math.max(
                  width,
                  3
                )}%;
              "
            ></div>

          </div>

          <strong>
            ${money(
              cumulative
            )}
          </strong>

        </div>

      `;

    })
    .join("");

}


/* =========================================================
   SALVAR
========================================================= */

function saveHistory() {

  localStorage.setItem(
    "nexoHistory",
    JSON.stringify(
      history
    )
  );

}


/* =========================================================
   RECUPERAR OPERAÇÃO ATIVA
========================================================= */

function restoreActiveOperation() {

  const active =
    history.find(
      item =>
        item.status === "ATIVA"
    );


  if (!active) {
    return;
  }


  activeOperationId =
    active.id;

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

restoreActiveOperation();

renderGames();

renderOverview();

renderHistory();

renderMetrics();


/* =========================================================
   EXPOSIÇÃO GLOBAL
   Necessário porque os botões usam onclick.
========================================================= */

window.showSection =
  showSection;

window.selectGame =
  selectGame;

window.chooseReading =
  chooseReading;

window.chooseThesis =
  chooseThesis;

window.chooseMarket =
  chooseMarket;

window.startOperation =
  startOperation;

window.cashout =
  cashout;

window.finishOperation =
  finishOperation;
