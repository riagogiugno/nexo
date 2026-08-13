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

const liveContainer = document.getElementById("liveGames");
const upcomingContainer = document.getElementById("upcomingGames");
const selectedGame = document.getElementById("selectedGame");

let checkpoint = {
  reading: "",
  thesis: "",
  market: ""
};

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
          <span class="competition">${game.competition}</span>
        </div>

        <div class="teams">
          ${game.home}<br>
          ${game.away}
        </div>

        <div class="scoreline">
          <span class="score">${game.score}</span>
          <span class="minute">${game.minute}</span>
        </div>

        <button class="select-game" onclick="selectGame(${game.id})">
          ACOMPANHAR JOGO
        </button>
      `;

      liveContainer.appendChild(card);

    } else {

      card.innerHTML = `
        <div class="game-top">
          <span class="upcoming">⏳ PRÓXIMO</span>
          <span class="competition">${game.competition}</span>
        </div>

        <div class="teams">
          ${game.home}<br>
          ${game.away}
        </div>

        <div class="scoreline">
          <span class="score">—</span>
          <span class="minute">${game.time}</span>
        </div>

        <button class="select-game" onclick="selectGame(${game.id})">
          ACOMPANHAR JOGO
        </button>
      `;

      upcomingContainer.appendChild(card);
    }

  });

}

function selectGame(id) {

  const game = games.find(item => item.id === id);

  if (!game) return;

  selectedGame.classList.remove("hidden");

  if (game.status === "LIVE") {

    selectedGame.innerHTML = `

      <div class="selected-game">

        <div>

          <div class="selected-title">
            ${game.home} ${game.score} ${game.away}
          </div>

          <div class="selected-info">
            ${game.competition} · ${game.minute} · AO VIVO
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

          <button class="quick-button" onclick="chooseReading('FORTE')">
            🟢 FORTE
          </button>

          <button class="quick-button" onclick="chooseReading('NEUTRA')">
            🟡 NEUTRA
          </button>

          <button class="quick-button" onclick="chooseReading('FRACA')">
            🔴 FRACA
          </button>

        </div>

        <div id="checkpointStep2" class="hidden">

          <h3 class="section-title">
            2. TESE
          </h3>

          <div class="quick-grid">

            <button class="quick-button" onclick="chooseThesis('PRÓXIMO GOL')">
              ⚽ PRÓXIMO GOL
            </button>

            <button class="quick-button" onclick="chooseThesis('ESCANTEIO')">
              🚩 ESCANTEIO
            </button>

            <button class="quick-button" onclick="chooseThesis('CARTÃO')">
              🟨 CARTÃO
            </button>

            <button class="quick-button" onclick="chooseThesis('MOVIMENTO DE ODD')">
              📈 MOVIMENTO DE ODD
            </button>

            <button class="quick-button" onclick="chooseThesis('OUTRO')">
              OUTRO
            </button>

          </div>

        </div>

        <div id="checkpointStep3" class="hidden">

          <h3 class="section-title">
            3. MERCADO
          </h3>

          <div class="quick-grid">

            <button class="quick-button" onclick="chooseMarket('OVER / UNDER')">
              OVER / UNDER
            </button>

            <button class="quick-button" onclick="chooseMarket('MATCH ODDS')">
              MATCH ODDS
            </button>

            <button class="quick-button" onclick="chooseMarket('CORRECT SCORE')">
              CORRECT SCORE
            </button>

            <button class="quick-button" onclick="chooseMarket('ESCANTEIOS')">
              ESCANTEIOS
            </button>

            <button class="quick-button" onclick="chooseMarket('CARTÕES')">
              CARTÕES
            </button>

          </div>

        </div>

        <div id="checkpointStep4" class="hidden">

          <h3 class="section-title">
            4. DECISÃO
          </h3>

          <div class="quick-grid">

            <button class="quick-button" onclick="registerCheckpoint('ENTRAR')">
              🟢 ENTRAR
            </button>

            <button class="quick-button" onclick="registerCheckpoint('AGUARDAR')">
              🟡 AGUARDAR
            </button>

            <button class="quick-button" onclick="registerCheckpoint('ABSTER')">
              🔴 ABSTER
            </button>

          </div>

        </div>

        <div id="checkpointResult" class="hidden"></div>

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
            ${game.competition} · ${game.time} · PRÉ-JOGO
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

function registerCheckpoint(decision) {

  const result = document.getElementById("checkpointResult");

  result.classList.remove("hidden");

  result.innerHTML = `

    <div class="panel">

      <h2 class="section-title">
        CHECKPOINT REGISTRADO
      </h2>

      <div class="selected-info">
        LEITURA: ${checkpoint.reading}
      </div>

      <div class="selected-info">
        TESE: ${checkpoint.thesis}
      </div>

      <div class="selected-info">
        MERCADO: ${checkpoint.market}
      </div>

      <div class="selected-info">
        DECISÃO: ${decision}
      </div>

      <div class="live" style="margin-top: 15px;">
        ✓ REGISTRO REALIZADO
      </div>

    </div>

  `;

}

renderGames();
