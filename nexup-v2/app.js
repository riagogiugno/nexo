/* =========================================================
   NEXUP V2 — APPLICATION ENGINE
   app.js
   ---------------------------------------------------------
   FRONTEND CORE
   - Navigation
   - State
   - Home
   - Sports
   - Forex
   - Markets
   - Crypto
   - News
   - Radar
   - NexUp AI
   - Profile
   - Mock data
   - API-ready architecture
========================================================= */


/* =========================================================
   01 — GLOBAL STATE
========================================================= */

const NexUpState = {

    currentPage: "home",

    search: "",

    user: {
        loggedIn: false,
        name: "Visitante",
        email: "",
        avatar: ""
    },

    preferences: {
        favoriteSports: [],
        favoriteMarkets: [],
        favoriteAssets: [],
        alerts: true
    },

    home: {
        heroIndex: 0
    },

    radar: {
        active: true
    },

    ai: {
        messages: []
    },

    data: {
        sports: [],
        forex: [],
        markets: [],
        crypto: [],
        news: [],
        economic: [],
        radar: []
    }

};


/* =========================================================
   02 — MOCK DATA
   ---------------------------------------------------------
   These structures are temporary.
   Later they can be replaced by real API responses without
   changing the frontend architecture.
========================================================= */


/* -------------------------
   WORLD FEED
------------------------- */

const WORLD_FEED = [

    {
        type: "SPORTS",
        title: "Flamengo x São Paulo",
        description: "Grande jogo movimenta a agenda esportiva de hoje.",
        status: "HOJE",
        icon: "⚽"
    },

    {
        type: "FOREX",
        title: "EUR/USD em movimento",
        description: "Mercado acompanha novos sinais sobre juros e inflação.",
        status: "MERCADO",
        icon: "💱"
    },

    {
        type: "MARKETS",
        title: "Mercados americanos",
        description: "Índices dos EUA entram no radar dos investidores.",
        status: "GLOBAL",
        icon: "📈"
    },

    {
        type: "CRYPTO",
        title: "Bitcoin",
        description: "BTC volta ao centro das atenções do mercado.",
        status: "CRYPTO",
        icon: "₿"
    },

    {
        type: "NEWS",
        title: "Trump movimenta o mercado",
        description: "Nova declaração repercute entre investidores.",
        status: "BREAKING",
        icon: "📰"
    }

];


/* -------------------------
   SPORTS
------------------------- */

const SPORTS_DATA = [

    {
        sport: "Futebol",
        competition: "Brasil",
        home: "Flamengo",
        away: "São Paulo",
        time: "21:30",
        status: "HOJE",
        market: "MATCH ODDS"
    },

    {
        sport: "Futebol",
        competition: "Brasil",
        home: "Palmeiras",
        away: "Grêmio",
        time: "19:00",
        status: "HOJE",
        market: "MATCH ODDS"
    },

    {
        sport: "Futebol",
        competition: "Europa",
        home: "Real Madrid",
        away: "Barcelona",
        time: "16:00",
        status: "PRÓXIMO",
        market: "MATCH ODDS"
    },

    {
        sport: "Tênis",
        competition: "ATP",
        home: "Jogador A",
        away: "Jogador B",
        time: "14:00",
        status: "AO VIVO",
        market: "MATCH ODDS"
    }

];


/* -------------------------
   FOREX
------------------------- */

const FOREX_DATA = [

    {
        pair: "EUR/USD",
        price: "1.1734",
        change: "+0.42%",
        trend: "UP"
    },

    {
        pair: "GBP/USD",
        price: "1.3581",
        change: "+0.18%",
        trend: "UP"
    },

    {
        pair: "USD/JPY",
        price: "148.72",
        change: "-0.31%",
        trend: "DOWN"
    },

    {
        pair: "USD/BRL",
        price: "5.39",
        change: "+0.27%",
        trend: "UP"
    }

];


/* -------------------------
   MARKETS
------------------------- */

const MARKETS_DATA = [

    {
        name: "Ibovespa",
        value: "137.842",
        change: "+0.74%",
        region: "B3"
    },

    {
        name: "S&P 500",
        value: "6.421",
        change: "+0.38%",
        region: "USA"
    },

    {
        name: "NASDAQ",
        value: "21.448",
        change: "+0.51%",
        region: "USA"
    },

    {
        name: "DAX",
        value: "24.112",
        change: "-0.12%",
        region: "EUROPA"
    },

    {
        name: "Nikkei",
        value: "43.182",
        change: "+0.22%",
        region: "ÁSIA"
    }

];


/* -------------------------
   CRYPTO
------------------------- */

const CRYPTO_DATA = [

    {
        asset: "Bitcoin",
        symbol: "BTC",
        price: "$118,420",
        change: "+2.31%"
    },

    {
        asset: "Ethereum",
        symbol: "ETH",
        price: "$4,312",
        change: "+1.72%"
    },

    {
        asset: "Solana",
        symbol: "SOL",
        price: "$186",
        change: "+3.12%"
    },

    {
        asset: "BNB",
        symbol: "BNB",
        price: "$812",
        change: "-0.42%"
    }

];


/* -------------------------
   NEWS
------------------------- */

const NEWS_DATA = [

    {
        category: "ECONOMIA",
        title: "Mercados acompanham novas decisões sobre juros",
        source: "NexUp News",
        time: "Agora"
    },

    {
        category: "POLÍTICA",
        title: "Nova declaração de Trump repercute nos mercados",
        source: "NexUp Global",
        time: "12 min"
    },

    {
        category: "FOREX",
        title: "Dólar ganha atenção antes de novos indicadores",
        source: "NexUp Markets",
        time: "28 min"
    },

    {
        category: "CRYPTO",
        title: "Bitcoin volta a ganhar força",
        source: "NexUp Crypto",
        time: "41 min"
    }

];


/* -------------------------
   ECONOMIC CALENDAR
------------------------- */

const ECONOMIC_DATA = [

    {
        time: "09:30",
        country: "🇺🇸",
        event: "Indicador de inflação",
        impact: "ALTO"
    },

    {
        time: "14:00",
        country: "🇺🇸",
        event: "Discurso do FED",
        impact: "ALTO"
    },

    {
        time: "16:00",
        country: "🇪🇺",
        event: "Indicador econômico",
        impact: "MÉDIO"
    }

];


/* -------------------------
   RADAR
------------------------- */

const RADAR_DATA = [

    {
        category: "SPORTS",
        title: "Jogo importante se aproxima",
        detail: "Flamengo x São Paulo",
        level: "HIGH"
    },

    {
        category: "FOREX",
        title: "Movimento relevante",
        detail: "EUR/USD",
        level: "MEDIUM"
    },

    {
        category: "CRYPTO",
        title: "Volatilidade detectada",
        detail: "BTC",
        level: "HIGH"
    },

    {
        category: "MARKETS",
        title: "Índice em destaque",
        detail: "S&P 500",
        level: "MEDIUM"
    }

];


/* =========================================================
   03 — DATA STORE
========================================================= */

NexUpState.data.sports = SPORTS_DATA;
NexUpState.data.forex = FOREX_DATA;
NexUpState.data.markets = MARKETS_DATA;
NexUpState.data.crypto = CRYPTO_DATA;
NexUpState.data.news = NEWS_DATA;
NexUpState.data.economic = ECONOMIC_DATA;
NexUpState.data.radar = RADAR_DATA;


/* =========================================================
   04 — DOM HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function setHTML(id, html) {

    const element = $(id);

    if (!element) return;

    element.innerHTML = html;
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   05 — PAGE MANAGEMENT
========================================================= */

function getPageIds() {

    return [

        "homePage",
        "sportsPage",
        "forexPage",
        "marketsPage",
        "cryptoPage",
        "newsPage",
        "radarPage",
        "aiPage",
        "profilePage"

    ];

}


function showPage(page) {

    const pages = getPageIds();

    pages.forEach(pageId => {

        const element = $(pageId);

        if (!element) return;

        element.classList.remove("active");

    });


    const target = $(page + "Page");

    if (target) {

        target.classList.add("active");

    }


    NexUpState.currentPage = page;


    updateNavigation(page);

}


function updateNavigation(page) {

    document
        .querySelectorAll("[data-page]")
        .forEach(button => {

            button.classList.remove("active");

            if (button.dataset.page === page) {

                button.classList.add("active");

            }

        });

}


/* =========================================================
   06 — NAVIGATION
========================================================= */

function navigateTo(page) {

    if (!page) return;

    showPage(page);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function setupNavigation() {

    document
        .querySelectorAll("[data-page]")
        .forEach(element => {

            element.addEventListener("click", event => {

                event.preventDefault();

                navigateTo(element.dataset.page);

            });

        });


    const quickButtons = document.querySelectorAll(
        "[data-navigate]"
    );


    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            navigateTo(button.dataset.navigate);

        });

    });

}


/* =========================================================
   07 — HOME HERO
========================================================= */

function renderHero() {

    const item =
        WORLD_FEED[NexUpState.home.heroIndex];

    if (!item) return;


    const heroTitle = $("heroTitle");
    const heroDescription = $("heroDescription");
    const heroCategory = $("heroCategory");
    const heroStatus = $("heroStatus");


    if (heroTitle) {

        heroTitle.textContent =
            `${item.icon} ${item.title}`;

    }


    if (heroDescription) {

        heroDescription.textContent =
            item.description;

    }


    if (heroCategory) {

        heroCategory.textContent =
            item.type;

    }


    if (heroStatus) {

        heroStatus.textContent =
            item.status;

    }

}


function nextHero() {

    NexUpState.home.heroIndex++;

    if (
        NexUpState.home.heroIndex >=
        WORLD_FEED.length
    ) {

        NexUpState.home.heroIndex = 0;

    }

    renderHero();

}


function startHeroRotation() {

    setInterval(() => {

        nextHero();

    }, 5000);

}


/* =========================================================
   08 — HOME / NEXUP NOW
========================================================= */

function renderNexUpNow() {

    const container = $("nexupNowGrid");

    if (!container) return;


    container.innerHTML = WORLD_FEED
        .slice(0, 5)
        .map(item => `

            <article class="nexup-card">

                <div class="card-icon">
                    ${item.icon}
                </div>

                <div class="card-category">
                    ${escapeHTML(item.type)}
                </div>

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <span class="card-status">
                    ${escapeHTML(item.status)}
                </span>

            </article>

        `)
        .join("");

}


/* =========================================================
   09 — MARKET SNAPSHOT
========================================================= */

function renderMarketStrip() {

    const container = $("marketStrip");

    if (!container) return;


    container.innerHTML = MARKETS_DATA
        .map(market => `

            <div class="market-item">

                <span class="market-name">
                    ${escapeHTML(market.name)}
                </span>

                <strong>
                    ${escapeHTML(market.value)}
                </strong>

                <span class="market-change">
                    ${escapeHTML(market.change)}
                </span>

            </div>

        `)
        .join("");

}


/* =========================================================
   10 — SPORTS
========================================================= */

function renderSports() {

    const container = $("sportsPreview");

    if (!container) return;


    container.innerHTML = SPORTS_DATA
        .map(game => `

            <article class="sport-card">

                <div class="sport-meta">

                    <span>
                        ${escapeHTML(game.sport)}
                    </span>

                    <span>
                        ${escapeHTML(game.status)}
                    </span>

                </div>

                <div class="sport-teams">

                    <strong>
                        ${escapeHTML(game.home)}
                    </strong>

                    <span>×</span>

                    <strong>
                        ${escapeHTML(game.away)}
                    </strong>

                </div>

                <div class="sport-footer">

                    <span>
                        ${escapeHTML(game.time)}
                    </span>

                    <span>
                        ${escapeHTML(game.market)}
                    </span>

                </div>

            </article>

        `)
        .join("");

}


/* =========================================================
   11 — FOREX
========================================================= */

function renderForex() {

    const container = $("forexPageContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>FOREX</span>

            <h2>
                MERCADO CAMBIAL
            </h2>

            <p>
                Principais pares acompanhados pelo NexUp.
            </p>

        </div>

        <div class="data-grid">

            ${FOREX_DATA.map(pair => `

                <article class="data-card">

                    <span class="data-label">
                        ${escapeHTML(pair.pair)}
                    </span>

                    <strong class="data-value">
                        ${escapeHTML(pair.price)}
                    </strong>

                    <span class="data-change">
                        ${escapeHTML(pair.change)}
                    </span>

                </article>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   12 — MARKETS
========================================================= */

function renderMarkets() {

    const container = $("marketsPageContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>MARKETS</span>

            <h2>
                MERCADOS GLOBAIS
            </h2>

            <p>
                B3, Estados Unidos, Europa e Ásia.
            </p>

        </div>

        <div class="data-grid">

            ${MARKETS_DATA.map(market => `

                <article class="data-card">

                    <span class="data-label">
                        ${escapeHTML(market.region)}
                    </span>

                    <h3>
                        ${escapeHTML(market.name)}
                    </h3>

                    <strong class="data-value">
                        ${escapeHTML(market.value)}
                    </strong>

                    <span class="data-change">
                        ${escapeHTML(market.change)}
                    </span>

                </article>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   13 — CRYPTO
========================================================= */

function renderCrypto() {

    const container = $("cryptoPageContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>CRYPTO</span>

            <h2>
                DIGITAL ASSETS
            </h2>

            <p>
                Principais ativos digitais em destaque.
            </p>

        </div>

        <div class="data-grid">

            ${CRYPTO_DATA.map(asset => `

                <article class="data-card">

                    <span class="data-label">
                        ${escapeHTML(asset.symbol)}
                    </span>

                    <h3>
                        ${escapeHTML(asset.asset)}
                    </h3>

                    <strong class="data-value">
                        ${escapeHTML(asset.price)}
                    </strong>

                    <span class="data-change">
                        ${escapeHTML(asset.change)}
                    </span>

                </article>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   14 — NEWS
========================================================= */

function renderNews() {

    const container = $("newsPageContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>NEWS</span>

            <h2>
                O QUE ESTÁ ACONTECENDO?
            </h2>

            <p>
                Notícias e acontecimentos que podem
                movimentar o mundo.
            </p>

        </div>

        <div class="news-grid">

            ${NEWS_DATA.map(news => `

                <article class="news-card">

                    <span class="news-category">
                        ${escapeHTML(news.category)}
                    </span>

                    <h3>
                        ${escapeHTML(news.title)}
                    </h3>

                    <div class="news-meta">

                        <span>
                            ${escapeHTML(news.source)}
                        </span>

                        <span>
                            ${escapeHTML(news.time)}
                        </span>

                    </div>

                </article>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   15 — ECONOMIC CALENDAR
========================================================= */

function renderEconomicCalendar() {

    const container = $("economicPreview");

    if (!container) return;


    container.innerHTML = ECONOMIC_DATA
        .map(event => `

            <div class="economic-item">

                <strong>
                    ${escapeHTML(event.time)}
                </strong>

                <span>
                    ${escapeHTML(event.country)}
                </span>

                <span>
                    ${escapeHTML(event.event)}
                </span>

                <small>
                    ${escapeHTML(event.impact)}
                </small>

            </div>

        `)
        .join("");

}


/* =========================================================
   16 — RADAR
========================================================= */

function renderRadar() {

    const container = $("radarPageContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>RADAR</span>

            <h2>
                O QUE MERECE SUA ATENÇÃO?
            </h2>

            <p>
                O NexUp monitora diferentes universos
                para encontrar acontecimentos relevantes.
            </p>

        </div>

        <div class="radar-grid">

            ${RADAR_DATA.map(item => `

                <article class="radar-card">

                    <div class="radar-top">

                        <span>
                            ${escapeHTML(item.category)}
                        </span>

                        <span>
                            ${escapeHTML(item.level)}
                        </span>

                    </div>

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p>
                        ${escapeHTML(item.detail)}
                    </p>

                </article>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   17 — NEXUP AI
========================================================= */

function renderAI() {

    const container = $("aiWorkspace");

    if (!container) return;


    container.innerHTML = `

        <div class="ai-header">

            <span>NEXUP IA/EA</span>

            <h2>
                CONSELHEIRO PERITO
            </h2>

            <p>
                O melhor amigo do trader.
            </p>

        </div>

        <div class="ai-chat" id="aiChat">

            <div class="ai-message ai-message-system">

                <strong>NEXUP AI</strong>

                <p>
                    Estou conectado ao universo NexUp.
                    Pergunte sobre mercados, esportes,
                    notícias ou movimentos relevantes.
                </p>

            </div>

        </div>

        <form class="ai-input-area" id="aiForm">

            <input
                id="aiInput"
                type="text"
                placeholder="Pergunte ao NexUp..."
                autocomplete="off"
            />

            <button type="submit">
                ENVIAR
            </button>

        </form>

    `;


    const form = $("aiForm");

    if (form) {

        form.addEventListener("submit", handleAIMessage);

    }

}


function handleAIMessage(event) {

    event.preventDefault();


    const input = $("aiInput");

    const chat = $("aiChat");

    if (!input || !chat) return;


    const question =
        input.value.trim();


    if (!question) return;


    chat.insertAdjacentHTML(
        "beforeend",
        `

        <div class="ai-message ai-message-user">

            <strong>VOCÊ</strong>

            <p>
                ${escapeHTML(question)}
            </p>

        </div>

        `
    );


    const response =
        generateAIResponse(question);


    chat.insertAdjacentHTML(
        "beforeend",
        `

        <div class="ai-message ai-message-system">

            <strong>NEXUP AI</strong>

            <p>
                ${escapeHTML(response)}
            </p>

        </div>

        `
    );


    input.value = "";


    chat.scrollTop =
        chat.scrollHeight;

}


function generateAIResponse(question) {

    const text =
        question.toLowerCase();


    if (
        text.includes("forex") ||
        text.includes("eur") ||
        text.includes("dólar")
    ) {

        return "O mercado Forex está no radar. O NexUp deve cruzar preço, calendário econômico e notícias antes de interpretar um movimento.";

    }


    if (
        text.includes("jogo") ||
        text.includes("futebol") ||
        text.includes("flamengo")
    ) {

        return "O universo esportivo está no radar. O NexUp pode combinar agenda, mercado, odds e acontecimentos ao vivo quando as APIs estiverem conectadas.";

    }


    if (
        text.includes("bitcoin") ||
        text.includes("btc") ||
        text.includes("crypto")
    ) {

        return "Crypto está no radar. O próximo estágio será conectar dados reais de preço, volume, volatilidade e notícias.";

    }


    if (
        text.includes("mercado") ||
        text.includes("ações") ||
        text.includes("bolsa")
    ) {

        return "O NexUp acompanha mercados globais. A inteligência deve interpretar o contexto antes de transformar dados em informação útil.";

    }


    return "Entendido. O NexUp deve cruzar dados, contexto e notícias antes de apresentar uma leitura. Esta é a camada inicial do Conselheiro NexUp.";

}


/* =========================================================
   18 — PROFILE
========================================================= */

function renderProfile() {

    const container = $("profileContent");

    if (!container) return;


    container.innerHTML = `

        <div class="section-heading">

            <span>PROFILE</span>

            <h2>
                MEU NEXUP
            </h2>

            <p>
                Personalize sua experiência dentro da plataforma.
            </p>

        </div>

        <div class="profile-card">

            <div class="profile-avatar">
                👤
            </div>

            <div>

                <h3>
                    ${escapeHTML(NexUpState.user.name)}
                </h3>

                <p>
                    ${NexUpState.user.loggedIn
                        ? "Usuário conectado"
                        : "Visitante"}
                </p>

            </div>

        </div>

        <div class="profile-options">

            <div>
                <strong>Mercados favoritos</strong>
                <span>Em breve</span>
            </div>

            <div>
                <strong>Alertas</strong>
                <span>
                    ${NexUpState.preferences.alerts
                        ? "Ativos"
                        : "Desativados"}
                </span>
            </div>

            <div>
                <strong>Google Login</strong>
                <span>Integração futura</span>
            </div>

        </div>

    `;

}


/* =========================================================
   19 — SEARCH
========================================================= */

function setupSearch() {

    const input =
        document.querySelector(
            "[data-search]"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        event => {

            NexUpState.search =
                event.target.value
                    .trim()
                    .toLowerCase();

        }
    );

}


/* =========================================================
   20 — BUTTONS / ACTIONS
========================================================= */

function setupActions() {

    document
        .querySelectorAll("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    handleAction(action);

                }
            );

        });

}


function handleAction(action) {

    switch (action) {

        case "next-hero":

            nextHero();

            break;


        case "radar":

            navigateTo("radar");

            break;


        case "ai":

            navigateTo("ai");

            break;


        case "profile":

            navigateTo("profile");

            break;


        default:

            console.log(
                "NexUp action:",
                action
            );

    }

}


/* =========================================================
   21 — API LAYER
   ---------------------------------------------------------
   Future real integrations enter here.
========================================================= */

const NexUpAPI = {


    async sports() {

        return SPORTS_DATA;

    },


    async forex() {

        return FOREX_DATA;

    },


    async markets() {

        return MARKETS_DATA;

    },


    async crypto() {

        return CRYPTO_DATA;

    },


    async news() {

        return NEWS_DATA;

    },


    async economicCalendar() {

        return ECONOMIC_DATA;

    },


    async radar() {

        return RADAR_DATA;

    }


};


/* =========================================================
   22 — LOAD DATA
========================================================= */

async function loadNexUpData() {

    try {

        NexUpState.data.sports =
            await NexUpAPI.sports();

        NexUpState.data.forex =
            await NexUpAPI.forex();

        NexUpState.data.markets =
            await NexUpAPI.markets();

        NexUpState.data.crypto =
            await NexUpAPI.crypto();

        NexUpState.data.news =
            await NexUpAPI.news();

        NexUpState.data.economic =
            await NexUpAPI.economicCalendar();

        NexUpState.data.radar =
            await NexUpAPI.radar();

    }

    catch (error) {

        console.error(
            "NexUp data loading error:",
            error
        );

    }

}


/* =========================================================
   23 — RENDER ALL
========================================================= */

function renderAll() {

    renderHero();

    renderNexUpNow();

    renderMarketStrip();

    renderSports();

    renderEconomicCalendar();

    renderForex();

    renderMarkets();

    renderCrypto();

    renderNews();

    renderRadar();

    renderAI();

    renderProfile();

}


/* =========================================================
   24 — SYSTEM STATUS
========================================================= */

function setSystemOnline() {

    const elements =
        document.querySelectorAll(
            "[data-system-status]"
        );


    elements.forEach(element => {

        element.textContent =
            "SYSTEM ONLINE";

        element.classList.add(
            "online"
        );

    });

}


/* =========================================================
   25 — START APPLICATION
========================================================= */

async function initNexUp() {

    console.log(
        "NEXUP V2 — INITIALIZING"
    );


    await loadNexUpData();


    setupNavigation();

    setupActions();

    setupSearch();


    renderAll();


    showPage(
        NexUpState.currentPage
    );


    setSystemOnline();


    startHeroRotation();


    console.log(
        "NEXUP V2 — READY"
    );

}


/* =========================================================
   26 — DOM READY
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initNexUp
    );

}
else {

    initNexUp();

}


/* =========================================================
   27 — GLOBAL EXPORTS
   ---------------------------------------------------------
   Makes the core accessible for future modules.
========================================================= */

window.NexUp = {

    state: NexUpState,

    api: NexUpAPI,

    navigate: navigateTo,

    render: renderAll,

    nextHero,

    ai: {

        ask: generateAIResponse

    }

};


/* =========================================================
   END — NEXUP V2
========================================================= */
