const app = document.getElementById("app");

const palette = ["#64d8ff", "#7ee2b8", "#f5c45f", "#ca9cff", "#ff8da1", "#8fb7ff", "#76e6dd"];

const sourceImages = {
  wdiCampus: "https://sites.disney.com/app/uploads/sites/55/2021/06/Avengers_Campus_DCA.jpg",
  wdiNeverland: "https://sites.disney.com/app/uploads/sites/55/2024/06/TDS_Neverland_01-scaled.jpg",
  wdiWebslingers: "https://sites.disney.com/app/uploads/sites/55/2021/06/AC_Webslingers_Art.jpg",
  wdiCulture: "https://sites.disney.com/app/uploads/sites/55/2019/10/WDAPL_2018_June_08_0342_FIX.jpg",
  disneyRig: "https://studios.disneyresearch.com/app/uploads/2026/03/CANRIG-Cross-Attention-Neural-Face-Rigging-with-Variable-Local-Control-Image-400x250.png",
  disneyAvatar: "https://studios.disneyresearch.com/app/uploads/2026/04/FastGHA-Generalized-Few-Shot-3D-Gaussian-Head-Avatars-with-Real-Time-Animation--400x250.png",
  disneyMotion: "https://studios.disneyresearch.com/app/uploads/2025/12/Shaping-Strands-with-Neural-Style-Transfer-Image-400x250.jpg",
  disneyDiffusion: "https://studios.disneyresearch.com/app/uploads/2026/04/HIGS-History-Guided-Sampling-for-Diffusion-Models-Image-400x250.jpg",
  mitInform: "https://dam-prod.media.mit.edu/thumb/files/Display/inform.jpg.1400x1400.jpg",
  cmuRobotics: "https://www.ri.cmu.edu/app/uploads/2021/12/iris-integrstion-still-1-scaled.jpg",
};

function yt(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

const seedItems = [
  {
    id: "wdi-robotics-video",
    title: "WDI robotics episode",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "video",
    videoId: "IuQPrGLo0QM",
    image: yt("IuQPrGLo0QM"),
    url: "https://disneyparksblog.com/disney-experiences/stories-in-motion-we-call-it-imagineering-episode-3-debuts/",
    summary: "Robotics, characters, control, motion, and the studio logic behind machines that feel alive.",
    tags: ["Disney", "robotics", "animatronics", "characters"],
    shape: "hero",
  },
  {
    id: "wdi-projects",
    title: "WDI project archive",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "built worlds",
    image: sourceImages.wdiCampus,
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    summary: "A source board for attractions, show systems, physical storytelling, ride media, and public-scale invention.",
    tags: ["Disney", "Imagineering", "show systems", "physical worlds"],
    shape: "wide",
  },
  {
    id: "imagineering-series",
    title: "We Call It Imagineering",
    source: "The Walt Disney Company",
    board: "Disney",
    kind: "video",
    videoId: "uof_fMbGyIM",
    image: yt("uof_fMbGyIM"),
    url: "https://thewaltdisneycompany.com/we-call-it-imagineering-disney-youtube-series/",
    summary: "A direct lane into how Disney frames creative technology, systems, and the people who build experiences.",
    tags: ["Disney", "creative technology", "WDI", "process"],
    shape: "tall",
  },
  {
    id: "animatronics-video",
    title: "Audio-Animatronics",
    source: "Disney Parks",
    board: "Disney",
    kind: "video",
    videoId: "1e1R2vUORGI",
    image: yt("1e1R2vUORGI"),
    url: "https://www.youtube.com/watch?v=1e1R2vUORGI",
    summary: "Physical characters, motion design, timing, mechanisms, and the hard engineering hidden inside performance.",
    tags: ["Disney", "animatronics", "mechanisms", "performance"],
    shape: "standard",
  },
  {
    id: "wdi-neverland",
    title: "Fantasy Springs / Never Land",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "immersive world",
    image: sourceImages.wdiNeverland,
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    summary: "Large-scale scenic systems, environmental design, and the technical work that disappears into wonder.",
    tags: ["Disney", "immersive design", "worldbuilding", "experience"],
    shape: "tall",
  },
  {
    id: "wdi-webslingers",
    title: "WEB Slingers",
    source: "Walt Disney Imagineering",
    board: "Disney",
    kind: "interactive attraction",
    image: sourceImages.wdiWebslingers,
    url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
    summary: "Gesture, sensing, media, interaction design, and guest-facing technical systems.",
    tags: ["Disney", "interaction", "sensing", "show tech"],
    shape: "wide",
  },
  {
    id: "disney-robotics-talk",
    title: "Disney robotics conversation",
    source: "TechCrunch Sessions",
    board: "Disney",
    kind: "video",
    videoId: "Ag9I-EstzXY",
    image: yt("Ag9I-EstzXY"),
    url: "https://www.youtube.com/watch?v=Ag9I-EstzXY",
    summary: "A useful outside view into Disney robotics: characters, believability, constraints, and interaction.",
    tags: ["Disney", "robotics", "characters", "R&D"],
    shape: "standard",
  },
  {
    id: "disney-publications",
    title: "Disney Research publications",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "research feed",
    image: sourceImages.disneyRig,
    url: "https://studios.disneyresearch.com/publications/",
    summary: "Characters, animation, geometry, simulation, creative tools, and visual systems from a real studio research lab.",
    tags: ["Disney Research", "characters", "tools", "simulation"],
    shape: "hero",
  },
  {
    id: "disney-avatar",
    title: "Real-time animated avatars",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "paper",
    image: sourceImages.disneyAvatar,
    url: "https://studios.disneyresearch.com/publications/",
    summary: "A reminder that creative R&D can be faces, performance, tools, graphics, robotics, or a weird overlap.",
    tags: ["avatars", "animation", "tools", "performance"],
    shape: "standard",
  },
  {
    id: "disney-motion",
    title: "Expressive motion systems",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "paper",
    image: sourceImages.disneyMotion,
    url: "https://studios.disneyresearch.com/publications/",
    summary: "Motion, timing, simulation, and control ideas that can translate into physical characters and interfaces.",
    tags: ["motion", "control", "simulation", "characters"],
    shape: "standard",
  },
  {
    id: "disney-generative",
    title: "Creative generation tools",
    source: "Disney Research Studios",
    board: "Disney Research",
    kind: "paper",
    image: sourceImages.disneyDiffusion,
    url: "https://studios.disneyresearch.com/publications/",
    summary: "Study how serious labs turn generative tools into production-quality creative systems.",
    tags: ["tools", "generation", "creative systems", "research"],
    shape: "wide",
  },
  {
    id: "mit-inform-video",
    title: "inFORM shape display",
    source: "MIT Media Lab",
    board: "Tangible",
    kind: "video",
    videoId: "lvtfD_rJ2hE",
    image: yt("lvtfD_rJ2hE"),
    url: "https://www.media.mit.edu/projects/inform/overview/",
    summary: "A dynamic shape display: computation made physical, visible, responsive, and strange.",
    tags: ["programmable matter", "shape display", "tangible media", "interaction"],
    shape: "hero",
  },
  {
    id: "mit-inform-image",
    title: "Tangible Media Group",
    source: "MIT Media Lab",
    board: "Tangible",
    kind: "lab",
    image: sourceImages.mitInform,
    url: "https://tangible.media.mit.edu/",
    summary: "A lab orbit for shape displays, materials, interfaces, and physical-digital systems.",
    tags: ["MIT", "interfaces", "materials", "design"],
    shape: "wide",
  },
  {
    id: "cmu-ri",
    title: "CMU Robotics Institute",
    source: "Carnegie Mellon University",
    board: "Robotics",
    kind: "lab",
    image: sourceImages.cmuRobotics,
    url: "https://www.ri.cmu.edu/",
    summary: "A broad robotics feed: mechanisms, HRI, manipulation, perception, field robots, and applied research taste.",
    tags: ["robotics", "HRI", "mechanisms", "research"],
    shape: "wide",
  },
  {
    id: "rai-institute",
    title: "Physical intelligence",
    source: "The AI Institute",
    board: "Robotics",
    kind: "lab",
    url: "https://rai-inst.com/",
    summary: "Robot learning, manipulation, physical intelligence, and the discipline of building systems that touch reality.",
    tags: ["robotics", "embodied AI", "learning", "systems"],
    shape: "standard",
  },
  {
    id: "jpl-robotics",
    title: "JPL robotics",
    source: "NASA JPL",
    board: "Robotics",
    kind: "field systems",
    url: "https://www.jpl.nasa.gov/robotics-at-jpl/",
    summary: "Robots that survive messy reality: mechanisms, sensing, autonomy, testing, constraints, and reliability.",
    tags: ["robotics", "field systems", "autonomy", "mechanisms"],
    shape: "standard",
  },
  {
    id: "stanford-charm",
    title: "Stanford CHARM Lab",
    source: "Stanford",
    board: "Haptics",
    kind: "lab",
    url: "https://charm.stanford.edu/",
    summary: "Haptics, physical interaction, touch, robot-human interfaces, and systems that make interaction feel real.",
    tags: ["haptics", "HRI", "touch", "interfaces"],
    shape: "tall",
  },
  {
    id: "harvard-wyss",
    title: "Soft robotic exosuit",
    source: "Harvard Wyss Institute",
    board: "Soft Robotics",
    kind: "soft robotics",
    url: "https://wyss.harvard.edu/technology/soft-robotic-exosuit/",
    summary: "Soft structures, wearable assistance, fabric-like actuation, and bioinspired design discipline.",
    tags: ["soft robotics", "wearables", "actuation", "bioinspired"],
    shape: "standard",
  },
  {
    id: "meta-rl",
    title: "Reality Labs research",
    source: "Meta",
    board: "Haptics",
    kind: "interfaces",
    url: "https://www.metacareers.com/jobs/?q=Reality%20Labs%20robotics%20haptics%20research%20scientist",
    summary: "Spatial computing, haptics, wearables, sensing, and human-centered hardware research.",
    tags: ["XR", "haptics", "wearables", "interfaces"],
    shape: "wide",
  },
  {
    id: "portfolio-proof",
    title: "Make one visible proof",
    source: "Ocean lens",
    board: "Labs",
    kind: "build prompt",
    summary: "One tiny prototype. One short clip. One measurement. One clearer page. Turn curiosity into evidence.",
    tags: ["portfolio", "prototype", "research scientist", "practice"],
    shape: "standard",
  },
];

let radar = { updatedAt: null, items: [], error: null, loading: true };
let selectedId = new URLSearchParams(location.search).get("item");

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slug(value) {
  return String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70) || "item";
}

function accentFor(item, index) {
  const text = `${item.board || ""} ${item.source || ""} ${item.title || ""}`.toLowerCase();
  if (text.includes("disney")) return "#75f0d0";
  if (text.includes("robot")) return "#73b8ff";
  if (text.includes("haptic") || text.includes("tactile")) return "#f5c45f";
  if (text.includes("soft") || text.includes("material")) return "#ff91a8";
  if (text.includes("tangible")) return "#b69cff";
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

function imageForLiveItem(item, index) {
  const text = `${item.source || ""} ${item.title || ""}`.toLowerCase();
  if (text.includes("disney research")) return [sourceImages.disneyRig, sourceImages.disneyAvatar, sourceImages.disneyMotion, sourceImages.disneyDiffusion][index % 4];
  if (text.includes("disney") || text.includes("imagineering")) return [sourceImages.wdiCampus, sourceImages.wdiWebslingers, sourceImages.wdiNeverland, sourceImages.wdiCulture][index % 4];
  if (text.includes("mit") || text.includes("tangible") || text.includes("shape")) return sourceImages.mitInform;
  if (text.includes("cmu") || text.includes("robot")) return sourceImages.cmuRobotics;
  return [sourceImages.mitInform, sourceImages.cmuRobotics, sourceImages.disneyRig, sourceImages.wdiCulture][index % 4];
}

function normalizeRemoteItem(item, index) {
  const tags = Array.isArray(item.topics) ? item.topics : inferTags(item);
  const title = item.title || "Live research signal";
  const source = item.source || item.type || "Live source";
  const text = `${source} ${title} ${tags.join(" ")}`.toLowerCase();
  let board = item.board || "Labs";
  if (text.includes("disney") || text.includes("wdi")) board = "Disney";
  if (text.includes("haptic") || text.includes("tactile")) board = "Haptics";
  if (text.includes("soft robot") || text.includes("material")) board = "Soft Robotics";
  if (text.includes("robot") && !text.includes("soft robot")) board = "Robotics";
  if (text.includes("tangible") || text.includes("shape")) board = "Tangible";
  const hasOriginalImage = Boolean(item.image);
  const isStrongOpportunity = (
    text.includes("disney careers")
    || text.includes("imagineering")
    || text.includes("creative technolog")
    || text.includes("research scientist")
    || text.includes("research engineer")
  );
  return {
    id: `live-${slug(title)}-${index}`,
    title,
    source,
    board,
    kind: item.type || "live signal",
    date: item.date || "",
    url: item.url || "",
    image: item.image || imageForLiveItem(item, index),
    summary: item.summary || item.why || "Fresh signal from the live Ocean feed.",
    tags: tags.length ? tags.slice(0, 5) : inferTags(item),
    shape: index % 7 === 0 ? "wide" : "standard",
    live: true,
    originalImage: hasOriginalImage,
    showInWall: hasOriginalImage || isStrongOpportunity,
  };
}

function allItems() {
  const seedKeys = new Set(seedItems.map((item) => `${item.url || ""}|${item.title}`.toLowerCase()));
  const usedImages = new Set();
  const imageCounts = new Map();
  const remote = (radar.items || [])
    .map(normalizeRemoteItem)
    .filter((item) => item.showInWall && item.originalImage)
    .filter((item) => {
      const key = `${item.url || ""}|${item.title}`.toLowerCase();
      if (seedKeys.has(key)) return false;
      const imageKey = item.image || "";
      const prior = imageCounts.get(imageKey) || 0;
      if (imageKey && prior >= 1) return false;
      imageCounts.set(imageKey, prior + 1);
      return true;
    })
    .slice(0, 6);
  const seen = new Set();
  return [...seedItems, ...remote].filter((item) => {
    if (!item.image && !item.videoId) return false;
    const key = `${item.url || ""}|${item.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    const imageKey = item.image || "";
    if (imageKey && usedImages.has(imageKey)) return false;
    if (imageKey) usedImages.add(imageKey);
    return true;
  }).map((item, index) => ({
    ...item,
    accent: item.accent || accentFor(item, index),
  }));
}

function visibleItems() {
  return allItems();
}

function findItem(id) {
  return allItems().find((item) => item.id === id);
}

function mediaMarkup(item, mode = "tile") {
  const image = item.image || "";
  const fallback = `<div class="generated-media"><span>${esc((item.board || item.source || "O").slice(0, 2).toUpperCase())}</span></div>`;
  const poster = image
    ? `<img src="${esc(image)}" alt="" loading="${mode === "tile" ? "lazy" : "eager"}" onerror="this.remove();">`
    : fallback;
  if (!item.videoId) return poster;
  if (mode === "tile" || mode === "detail") return `${poster}<span class="video-badge">video</span>`;
  const controls = mode === "detail" ? "1" : "0";
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.videoId)}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${encodeURIComponent(item.videoId)}&controls=${controls}&modestbranding=1&rel=0&iv_load_policy=3`;
  return `
    ${poster}
    <iframe class="video-frame" src="${src}" title="${esc(item.title)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  `;
}

function shapeFor(item, index) {
  if (item.shape) return item.shape;
  if (item.videoId) return index % 2 ? "wide" : "hero";
  return ["standard", "tall", "wide", "standard", "small"][index % 5];
}

function renderTile(item, index, compact = false) {
  return `
    <article class="media-card shape-${esc(shapeFor(item, index))} ${compact ? "is-compact" : ""}" data-action="open" data-id="${esc(item.id)}" role="button" tabindex="0" style="--accent:${esc(item.accent)}">
      <div class="media-frame">${mediaMarkup(item)}</div>
      <div class="media-gradient"></div>
      <div class="media-label">
        <span>${esc(item.source)}</span>
        <strong>${esc(item.title)}</strong>
      </div>
    </article>
  `;
}

function overlapScore(a, b) {
  const aTags = new Set([a.board, ...(a.tags || [])].map((tag) => String(tag).toLowerCase()));
  return [b.board, ...(b.tags || [])].reduce((score, tag) => score + (aTags.has(String(tag).toLowerCase()) ? 1 : 0), 0);
}

function similarItems(item) {
  return allItems()
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({ candidate, score: overlapScore(item, candidate) }))
    .sort((a, b) => b.score - a.score)
    .map((row) => row.candidate)
    .slice(0, 18);
}

function selectedItem() {
  return selectedId ? findItem(selectedId) : null;
}

function renderDetail(item) {
  if (!item) return "";
  const related = similarItems(item);
  const visit = item.url
    ? `<a class="visit-button" href="${esc(item.url)}" target="_blank" rel="noopener">Visit</a>`
    : "";
  return `
    <aside class="detail-panel" aria-label="Selected media" style="--accent:${esc(item.accent)}">
      <div class="detail-top">
        <button class="icon-button close-button" data-action="close" aria-label="Close">x</button>
        <div class="source-avatar">${esc((item.source || "O").slice(0, 1).toUpperCase())}</div>
        <div class="detail-title">
          <span>${esc(item.source)}</span>
          <strong>${esc(item.title)}</strong>
        </div>
      </div>
      <div class="detail-media">${mediaMarkup(item, "detail")}</div>
      <div class="result-info">
        <div>
          <strong>${esc(item.title)}</strong>
          <span>${esc(item.source)}</span>
        </div>
        ${visit}
      </div>
      <div class="detail-actions">
        <button class="action-pill" data-action="share" data-id="${esc(item.id)}">Share</button>
      </div>
      <section class="similar-grid">
        ${related.map((entry, index) => renderTile(entry, index, true)).join("")}
      </section>
    </aside>
  `;
}

function makeFocusFlyer(tile) {
  if (!tile) return null;
  const rect = tile.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const frame = tile.querySelector(".media-frame");
  const flyer = document.createElement("div");
  flyer.className = "focus-flyer";
  flyer.style.left = `${rect.left}px`;
  flyer.style.top = `${rect.top}px`;
  flyer.style.width = `${rect.width}px`;
  flyer.style.height = `${rect.height}px`;
  flyer.style.setProperty("--accent", getComputedStyle(tile).getPropertyValue("--accent") || "#64d8ff");
  flyer.style.setProperty("--start-radius", getComputedStyle(tile).borderRadius || "7px");
  if (frame) flyer.appendChild(frame.cloneNode(true));
  document.body.appendChild(flyer);
  return { flyer, rect };
}

function formatUpdated(value) {
  if (!value) return radar.loading ? "refreshing" : "offline";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "updated" : date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function render() {
  const items = visibleItems();
  document.documentElement.classList.toggle("detail-open", Boolean(selectedId));
  document.body.classList.toggle("detail-open", Boolean(selectedId));
  app.innerHTML = `
    <main class="media-app ${selectedId ? "has-detail" : ""}">
      <section class="media-wall" aria-label="Ocean media results">
        ${items.map((item, index) => renderTile(item, index)).join("")}
      </section>
      ${items.length === 0 ? '<section class="empty-state">Nothing loaded yet.</section>' : ""}
      ${radar.error ? '<div class="source-warning">Live sources are partly rate-limited; curated media is still loaded.</div>' : ""}
      ${renderDetail(selectedItem())}
    </main>
  `;
}

function animateFocusFrom(flight) {
  requestAnimationFrame(() => {
    const media = document.querySelector(".detail-media");
    const panel = document.querySelector(".detail-panel");
    if (!media || !flight?.flyer || !flight?.rect) {
      panel?.animate([{ opacity: 0.86 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
      return;
    }
    const { flyer, rect: startRect } = flight;
    const endRect = media.getBoundingClientRect();
    if (!endRect.width || !endRect.height) {
      flyer.remove();
      return;
    }
    media.classList.add("is-transition-target");
    const animation = flyer.animate([
      {
        transformOrigin: "top left",
        transform: "translate3d(0, 0, 0) scale(1)",
        borderRadius: getComputedStyle(flyer).getPropertyValue("--start-radius") || "7px",
      },
      {
        transformOrigin: "top left",
        transform: `translate3d(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px, 0) scale(${endRect.width / startRect.width}, ${endRect.height / startRect.height})`,
        borderRadius: getComputedStyle(media).borderRadius,
      },
    ], {
      duration: 430,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    panel?.animate([
      { opacity: 0.9 },
      { opacity: 1 },
    ], {
      duration: 260,
      easing: "ease-out",
    });
    animation.finished.finally(() => {
      media.classList.remove("is-transition-target");
      flyer.remove();
    });
  });
}

function openItem(id, sourceElement) {
  const activeTile = sourceElement || document.querySelector(`[data-id="${CSS.escape(id)}"]`);
  const flight = makeFocusFlyer(activeTile);
  selectedId = id;
  history.replaceState(null, "", `?item=${encodeURIComponent(id)}`);
  render();
  animateFocusFrom(flight);
}

function closeDetail() {
  selectedId = null;
  history.replaceState(null, "", location.pathname);
  render();
}

async function shareItem(id) {
  const item = findItem(id);
  if (!item) return;
  const url = item.url || location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: item.title, text: item.summary || item.source, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      location.href = url;
    }
  } catch {
    return;
  }
  render();
}

async function loadRadar(force = false) {
  radar = { ...radar, loading: true };
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
  selectedId = null;
  history.replaceState(null, "", location.pathname);
  render();
}

document.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "open") openItem(target.dataset.id, target);
  if (action === "close") closeDetail();
  if (action === "share") shareItem(target.dataset.id);
  if (action === "refresh") loadRadar(true);
  if (action === "home") home();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && selectedId) {
    closeDetail();
    return;
  }
  const target = event.target.closest("[data-action='open']");
  if (!target) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openItem(target.dataset.id, target);
  }
});

render();
loadRadar();
setInterval(() => loadRadar(true), 1000 * 60 * 30);
