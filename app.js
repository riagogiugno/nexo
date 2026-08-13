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

      <div class="quick-grid">

        <button class="quick-button">
          🟢 LEITURA FORTE
        </button>

        <button class="quick-button">
          🟡 LEITURA NEUTRA
        </button>

        <button class="quick-button">
          🔴 LEITURA FRACA
        </button>

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

renderGames();
