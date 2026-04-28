const app = document.getElementById("app");

const palette = ["#74d4ff", "#80e0b1", "#f6c15b", "#d49dff", "#ff8fa3", "#9fb8ff", "#6fe6dd"];

const sourceImages = {
  wdiCampus: "https://sites.disney.com/app/uploads/sites/55/2021/06/Avengers_Campus_DCA.jpg",
  wdiNeverland: "https://sites.disney.com/app/uploads/sites/55/2024/06/TDS_Neverland_01-scaled.jpg",
  wdiWebslingers: "https://sites.disney.com/app/uploads/sites/55/2021/06/AC_Webslingers_Art.jpg",
  wdiCulture: "https://sites.disney.com/app/uploads/sites/55/2019/10/WDAPL_2018_June_08_0342_FIX.jpg",
  disneyResearchRig: "https://studios.disneyresearch.com/app/uploads/2026/03/CANRIG-Cross-Attention-Neural-Face-Rigging-with-Variable-Local-Control-Image-400x250.png",
  disneyResearchMotion: "https://studios.disneyresearch.com/app/uploads/2025/12/Shaping-Strands-with-Neural-Style-Transfer-Image-400x250.jpg",
  disneyResearchAvatar: "https://studios.disneyresearch.com/app/uploads/2026/04/FastGHA-Generalized-Few-Shot-3D-Gaussian-Head-Avatars-with-Real-Time-Animation--400x250.png",
  mitInform: "https://dam-prod.media.mit.edu/thumb/files/Display/inform.jpg.1400x1400.jpg",
  cmuRobotics: "https://www.ri.cmu.edu/app/uploads/2021/12/iris-integrstion-still-1-scaled.jpg",
};

const seedItems = [
  {
    id: "wdi-projects",
    title: "WDI project archive",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "built worlds",
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    image: sourceImages.wdiCampus,
    summary: "Attractions, physical storytelling, show systems, environments, character work, and public-scale invention.",
    tags: ["Disney", "Imagineering", "show systems", "physical worlds"],
    size: "feature",
  },
  {
    id: "wdi-culture",
    title: "Inside Imagineering",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "creative engineering",
    url: "https://sites.disney.com/waltdisneyimagineering/our-culture/",
    image: sourceImages.wdiCulture,
    summary: "The people, culture, and creative-technical language behind WDI work.",
    tags: ["Disney", "creative technology", "R&D", "teams"],
    size: "wide",
  },
  {
    id: "wdi-neverland",
    title: "Fantasy Springs / Never Land",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "immersive worlds",
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    image: sourceImages.wdiNeverland,
    summary: "Large-scale scenic systems, environmental design, and the technical work that disappears into wonder.",
    tags: ["Disney", "immersive design", "worldbuilding", "experience"],
    size: "tall",
  },
  {
    id: "wdi-webslingers",
    title: "WEB Slingers",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "interactive attraction",
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    image: sourceImages.wdiWebslingers,
    summary: "Gesture, sensing, ride media, interaction design, and guest-facing technical systems.",
    tags: ["Disney", "interaction", "sensing", "show tech"],
    size: "wide",
  },
  {
    id: "disney-research-publications",
    title: "Disney Research publications",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "research feed",
    url: "https://studios.disneyresearch.com/publications/",
    image: sourceImages.disneyResearchRig,
    summary: "Characters, animation, geometry, simulation, creative tools, and visual systems from a real studio research lab.",
    tags: ["Disney Research", "characters", "tools", "simulation"],
    size: "feature",
  },
  {
    id: "disney-research-motion",
    title: "Precise motion control",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "motion systems",
    url: "https://studios.disneyresearch.com/publications/",
    image: sourceImages.disneyResearchMotion,
    summary: "Motion models and control ideas that connect animation, robotics, timing, and expressive physical behavior.",
    tags: ["motion", "control", "characters", "simulation"],
    size: "standard",
  },
  {
    id: "disney-research-avatars",
    title: "Real-time animated avatars",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "characters",
    url: "https://studios.disneyresearch.com/publications/",
    image: sourceImages.disneyResearchAvatar,
    summary: "A reminder that creative R&D can be faces, performance, tools, robotics, graphics, or something between them.",
    tags: ["avatars", "animation", "tools", "performance"],
    size: "standard",
  },
  {
    id: "mit-inform",
    title: "inFORM shape display",
    source: "MIT Media Lab",
    board: "Tangible Interfaces",
    kind: "programmable matter",
    url: "https://www.media.mit.edu/projects/inform/overview/",
    image: sourceImages.mitInform,
    summary: "A physical display that changes shape. This is the exact kind of weird bridge between code, matter, and interaction worth studying.",
    tags: ["programmable matter", "shape display", "tangible media", "interaction"],
    size: "feature",
  },
  {
    id: "tangible-media",
    title: "Tangible Media Group",
    source: "MIT Media Lab",
    board: "Tangible Interfaces",
    kind: "lab",
    url: "https://tangible.media.mit.edu/",
    image: sourceImages.mitInform,
    summary: "A lab orbit for shape displays, interfaces, materials, and computationally expressive physical things.",
    tags: ["MIT", "interfaces", "materials", "design"],
    size: "wide",
  },
  {
    id: "cmu-ri",
    title: "CMU Robotics Institute",
    source: "Carnegie Mellon University",
    board: "Robotics Labs",
    kind: "robotics lab",
    url: "https://www.ri.cmu.edu/",
    image: sourceImages.cmuRobotics,
    summary: "A broad robotics feed for mechanisms, HRI, perception, field robots, manipulation, and applied research taste.",
    tags: ["robotics", "HRI", "mechanisms", "research"],
    size: "feature",
  },
  {
    id: "stanford-charm",
    title: "Stanford CHARM Lab",
    source: "Stanford",
    board: "Haptics",
    kind: "human-robot interaction",
    url: "https://charm.stanford.edu/",
    summary: "Haptics, physical interaction, touch, robot-human interfaces, and systems that make interaction feel real.",
    tags: ["haptics", "HRI", "touch", "interfaces"],
    size: "standard",
  },
  {
    id: "harvard-wyss",
    title: "Wyss soft robotic systems",
    source: "Harvard Wyss Institute",
    board: "Soft Robotics",
    kind: "bioinspired systems",
    url: "https://wyss.harvard.edu/technology/soft-robotic-exosuit/",
    summary: "Soft structures, wearable assistance, fabric-like actuation, and bioinspired design discipline.",
    tags: ["soft robotics", "wearables", "actuation", "bioinspired"],
    size: "standard",
  },
  {
    id: "jpl-robotics",
    title: "JPL robotics",
    source: "NASA JPL",
    board: "Robotics Labs",
    kind: "field systems",
    url: "https://www.jpl.nasa.gov/robotics-at-jpl/",
    summary: "Robots that survive messy reality: mechanisms, sensing, autonomy, testing, constraints, and reliability.",
    tags: ["robotics", "field systems", "autonomy", "mechanisms"],
    size: "wide",
  },
  {
    id: "rai-institute",
    title: "RAI Institute",
    source: "The AI Institute",
    board: "Robotics Labs",
    kind: "physical intelligence",
    url: "https://rai-inst.com/",
    summary: "A serious adjacent lane for learning embodied intelligence, robot learning, manipulation, and real-world systems.",
    tags: ["robotics", "embodied AI", "learning", "systems"],
    size: "standard",
  },
  {
    id: "meta-reality-labs",
    title: "Reality Labs research",
    source: "Meta",
    board: "XR + Haptics",
    kind: "interfaces",
    url: "https://www.metacareers.com/jobs/?q=Reality%20Labs%20robotics%20haptics%20research%20scientist",
    summary: "Useful for spatial computing, haptics, wearables, sensing, and human-centered hardware research.",
    tags: ["XR", "haptics", "wearables", "interfaces"],
    size: "standard",
  },
  {
    id: "learn-by-building",
    title: "Build the thing you wish existed",
    source: "Ocean lens",
    board: "Making",
    kind: "practice",
    summary: "One tiny prototype. One short clip. One measurement. One clearer page. Keep turning curiosity into visible artifacts.",
    tags: ["portfolio", "learning", "prototype", "practice"],
    size: "wide",
  },
];

let radar = {
  updatedAt: null,
  items: [],
  sourceStatus: [],
  error: null,
  loading: true,
};

let boardStack = [{
  title: "Ocean",
  subtitle: "Disney Imagineering, research labs, robotics, haptics, soft materials, tangible interfaces, and other work worth learning.",
  filter: "All",
  focusId: null,
}];

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slug(value) {
  return String(value || "item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70) || "item";
}

function pickAccent(item, index) {
  if (item.accent) return item.accent;
  const text = `${item.board || ""} ${item.source || ""} ${item.title || ""}`.toLowerCase();
  if (text.includes("disney")) return "#86e7d4";
  if (text.includes("robot")) return "#75baff";
  if (text.includes("haptic") || text.includes("tactile")) return "#f2c263";
  if (text.includes("soft") || text.includes("material")) return "#ff9fb2";
  return palette[index % palette.length];
}

function inferTags(item) {
  const text = `${item.title || ""} ${item.summary || ""} ${item.why || ""} ${item.source || ""}`.toLowerCase();
  const tags = [];
  [
    ["disney", "Disney"],
    ["imagineering", "WDI"],
    ["robot", "robotics"],
    ["haptic", "haptics"],
    ["tactile", "tactile"],
    ["soft", "soft robotics"],
    ["fabricat", "fabrication"],
    ["shape", "shape change"],
    ["matter", "matter"],
    ["animation", "animation"],
    ["avatar", "characters"],
    ["human", "HRI"],
    ["interface", "interfaces"],
    ["mechanism", "mechanisms"],
    ["simulation", "simulation"],
  ].forEach(([needle, tag]) => {
    if (text.includes(needle) && !tags.includes(tag)) tags.push(tag);
  });
  return tags.slice(0, 5);
}

function normalizeRemoteItem(item, index) {
  const title = item.title || "Untitled signal";
  const source = item.source || item.type || "Live source";
  const tags = Array.isArray(item.topics) ? item.topics : inferTags(item);
  const text = `${source} ${title} ${tags.join(" ")}`.toLowerCase();
  let board = item.board || "Research Feed";
  if (text.includes("disney") || text.includes("wdi")) board = "Disney";
  if (text.includes("arxiv")) board = "Research Feed";
  if (text.includes("haptic") || text.includes("tactile")) board = "Haptics";
  if (text.includes("soft robot") || text.includes("material")) board = "Soft Robotics";
  if (text.includes("robot") && !text.includes("soft robot")) board = "Robotics Labs";
  return {
    id: `live-${slug(title)}-${index}`,
    title,
    source,
    board,
    kind: item.type || "live signal",
    date: item.date || "",
    location: item.location || "",
    url: item.url || "",
    image: item.image || imageForLiveItem(item, index),
    summary: item.summary || item.why || "Fresh signal from the live Ocean feed.",
    tags: tags.length ? tags.slice(0, 5) : inferTags(item),
    size: index % 5 === 0 ? "wide" : "standard",
    live: true,
  };
}

function imageForLiveItem(item, index) {
  const text = `${item.source || ""} ${item.title || ""}`.toLowerCase();
  if (text.includes("disney research")) return [sourceImages.disneyResearchRig, sourceImages.disneyResearchAvatar, sourceImages.disneyResearchMotion][index % 3];
  if (text.includes("disney") || text.includes("imagineering")) return [sourceImages.wdiCampus, sourceImages.wdiWebslingers, sourceImages.wdiNeverland][index % 3];
  if (text.includes("mit") || text.includes("tangible")) return sourceImages.mitInform;
  if (text.includes("cmu") || text.includes("robot")) return sourceImages.cmuRobotics;
  return "";
}

function allItems() {
  const remote = (radar.items || []).map(normalizeRemoteItem);
  const seen = new Set();
  return [...remote, ...seedItems].filter((item) => {
    const key = `${item.url || ""}|${item.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((item, index) => ({
    ...item,
    accent: pickAccent(item, index),
  }));
}

function currentBoard() {
  return boardStack[boardStack.length - 1];
}

function filteredItems() {
  const board = currentBoard();
  const items = allItems();
  if (board.items) return board.items;
  if (!board.filter || board.filter === "All") return items;
  return items.filter((item) => {
    const haystack = `${item.board} ${item.source} ${item.title} ${(item.tags || []).join(" ")}`.toLowerCase();
    return haystack.includes(board.filter.toLowerCase());
  });
}

function findItem(id) {
  return allItems().find((item) => item.id === id) || boardStack.flatMap((board) => board.items || []).find((item) => item.id === id);
}

function overlapScore(a, b) {
  const aTags = new Set([a.board, ...(a.tags || [])].map((tag) => String(tag).toLowerCase()));
  const bTags = [b.board, ...(b.tags || [])].map((tag) => String(tag).toLowerCase());
  return bTags.reduce((score, tag) => score + (aTags.has(tag) ? 1 : 0), 0);
}

function lensCards(item) {
  const baseTags = item.tags || [];
  return [
    {
      id: `lens-mechanisms-${item.id}`,
      title: `${item.title}: mechanisms`,
      source: "Ocean lens",
      board: item.board,
      kind: "study path",
      summary: "Look for actuators, sensors, constraints, controls, fabrication choices, and what makes the system reliable.",
      tags: ["mechanisms", "controls", ...baseTags].slice(0, 5),
      size: "standard",
      accent: "#f2c263",
    },
    {
      id: `lens-portfolio-${item.id}`,
      title: `${item.title}: portfolio angle`,
      source: "Ocean lens",
      board: "Making",
      kind: "build prompt",
      summary: "Turn the idea into a small visible artifact: a clip, a prototype, a teardown, a measurement, or a clean one-page note.",
      tags: ["portfolio", "prototype", ...baseTags].slice(0, 5),
      size: "wide",
      accent: "#80e0b1",
    },
    {
      id: `lens-people-${item.id}`,
      title: `${item.title}: who does this work`,
      source: "Ocean lens",
      board: item.board,
      kind: "career map",
      summary: "Map the roles around it: research scientist, creative technologist, show systems engineer, technical artist, roboticist, designer.",
      tags: ["career", "roles", ...baseTags].slice(0, 5),
      size: "standard",
      accent: "#d49dff",
    },
  ];
}

function relatedBoard(item) {
  const items = allItems()
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({ candidate, score: overlapScore(item, candidate) }))
    .sort((a, b) => b.score - a.score)
    .map((row) => row.candidate);
  return [...lensCards(item), ...items].slice(0, 18);
}

function formatUpdated(value) {
  if (!value) return radar.loading ? "refreshing" : "local board";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "updated";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function tileMedia(item, index) {
  const fallback = `<div class="generated-art" aria-hidden="true"><span>${esc((item.board || item.source || "Ocean").slice(0, 2).toUpperCase())}</span></div>`;
  if (!item.image) return fallback;
  return `<img src="${esc(item.image)}" alt="" loading="lazy" onerror="if (this.parentElement) this.parentElement.classList.add('media-failed'); this.remove();">`;
}

function renderTags(tags = []) {
  return tags.slice(0, 4).map((tag) => `<span>${esc(tag)}</span>`).join("");
}

function renderTile(item, index) {
  const size = item.size || (index % 9 === 0 ? "wide" : index % 7 === 0 ? "tall" : "standard");
  const date = item.date ? `<span>${esc(item.date)}</span>` : "";
  const sourceLink = item.url
    ? `<a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">source</a>`
    : "";
  return `
    <article class="tile tile-${esc(size)}" data-action="open" data-id="${esc(item.id)}" role="button" tabindex="0" style="--accent:${esc(item.accent)}">
      <div class="tile-media">
        ${tileMedia(item, index)}
        <div class="tile-wash"></div>
        <div class="tile-kind">${esc(item.kind || item.board || "signal")}</div>
      </div>
      <div class="tile-body">
        <div class="tile-source">
          <span>${esc(item.source || "Ocean")}</span>
          ${date}
        </div>
        <h2>${esc(item.title)}</h2>
        <p>${esc(item.summary || "")}</p>
        <div class="tile-bottom">
          <div class="tag-row">${renderTags(item.tags)}</div>
          ${sourceLink}
        </div>
      </div>
    </article>
  `;
}

function renderFocus(item) {
  const source = item.url
    ? `<a class="focus-source" href="${esc(item.url)}" target="_blank" rel="noopener">Open source</a>`
    : "";
  return `
    <section class="focus-card" style="--accent:${esc(item.accent || "#74d4ff")}">
      <div class="focus-media">
        ${tileMedia(item, 0)}
      </div>
      <div class="focus-copy">
        <div class="eyebrow">${esc(item.source || item.board || "Ocean")}</div>
        <h1>${esc(item.title)}</h1>
        <p>${esc(item.summary || "")}</p>
        <div class="tag-row">${renderTags(item.tags)}</div>
        ${source}
      </div>
    </section>
  `;
}

function renderBoardNav() {
  const filters = ["All", "Disney", "Disney Research", "Robotics", "Haptics", "Soft Robotics", "Tangible", "Making"];
  return filters.map((filter) => {
    const active = currentBoard().filter === filter && boardStack.length === 1;
    return `<button class="nav-chip ${active ? "is-active" : ""}" data-action="filter" data-filter="${esc(filter)}">${esc(filter)}</button>`;
  }).join("");
}

function renderBreadcrumbs() {
  return boardStack.map((board, index) => {
    const isLast = index === boardStack.length - 1;
    return `<button class="crumb ${isLast ? "is-current" : ""}" data-action="jump" data-index="${index}">${esc(board.title)}</button>`;
  }).join("");
}

function render() {
  const board = currentBoard();
  const focus = board.focusId ? findItem(board.focusId) : null;
  const items = filteredItems();
  app.innerHTML = `
    <main class="ocean-shell">
      <header class="topbar">
        <div class="brand-block">
          <button class="brand-mark" data-action="home" aria-label="Ocean home">O</button>
          <div>
            <div class="brand-title">ocean.aolabs.io</div>
            <div class="crumb-row">${renderBreadcrumbs()}</div>
          </div>
        </div>
        <nav class="filter-row" aria-label="Boards">
          ${renderBoardNav()}
        </nav>
        <div class="top-actions">
          <span class="update-pill">${esc(formatUpdated(radar.updatedAt))}</span>
          <button class="refresh-button" data-action="refresh">${radar.loading ? "Refreshing" : "Refresh"}</button>
        </div>
      </header>

      <section class="board-heading">
        <div>
          <p class="eyebrow">${esc(board.filter || focus?.board || "Ocean")}</p>
          <h1>${esc(board.title)}</h1>
        </div>
        <p>${esc(board.subtitle || "Visual sources for learning what is possible in creative R&D.")}</p>
      </section>

      ${focus ? renderFocus(focus) : ""}

      <section class="mosaic" aria-label="Research board">
        ${items.map(renderTile).join("")}
      </section>

      ${radar.error ? `<div class="feed-note">Some live sources are rate-limited right now. The curated board is still available.</div>` : ""}
    </main>
  `;
}

function openTile(id) {
  const item = findItem(id);
  if (!item) return;
  boardStack.push({
    title: item.title,
    subtitle: item.summary || "Related sources and next things to study.",
    filter: item.board || "All",
    focusId: item.id,
    items: relatedBoard(item),
  });
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setFilter(filter) {
  boardStack = [{
    title: filter === "All" ? "Ocean" : filter,
    subtitle: filter === "All"
      ? "Disney Imagineering, research labs, robotics, haptics, soft materials, tangible interfaces, and other work worth learning."
      : `A focused board for ${filter.toLowerCase()} signals.`,
    filter,
    focusId: null,
  }];
  render();
}

function jumpTo(index) {
  const target = Number(index);
  if (Number.isNaN(target)) return;
  boardStack = boardStack.slice(0, Math.max(1, target + 1));
  render();
}

async function loadRadar(force = false) {
  radar.loading = true;
  render();
  try {
    const response = await fetch(`/api/radar${force ? "?force=1" : ""}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Radar returned ${response.status}`);
    const data = await response.json();
    radar = { ...data, loading: false };
  } catch (error) {
    radar = { ...radar, loading: false, error: error.message };
  }
  render();
}

function home() {
  boardStack = [boardStack[0]];
  boardStack[0] = {
    title: "Ocean",
    subtitle: "Disney Imagineering, research labs, robotics, haptics, soft materials, tangible interfaces, and other work worth learning.",
    filter: "All",
    focusId: null,
  };
  render();
}

document.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "open") openTile(target.dataset.id);
  if (action === "filter") setFilter(target.dataset.filter);
  if (action === "jump") jumpTo(target.dataset.index);
  if (action === "home") home();
  if (action === "refresh") loadRadar(true);
});

document.addEventListener("keydown", (event) => {
  const target = event.target.closest("[data-action='open']");
  if (!target) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openTile(target.dataset.id);
  }
});

render();
loadRadar();
setInterval(() => loadRadar(true), 1000 * 60 * 30);
