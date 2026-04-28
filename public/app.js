const storageKey = "oceanTrajectoryTracker.v1";

const statuses = ["Not Started", "In Progress", "Blocked", "Done"];
const projectStatuses = ["Idea", "Prototype", "Documented", "Polished", "Published"];
const networkStatuses = ["Not Started", "Contacted", "Replied", "Met", "Followed Up"];
const opportunityStatuses = ["Watch", "Apply", "Applied", "Archived"];
const updateTags = ["General", "Morphing Structures", "Prototype", "Research", "Portfolio", "Networking", "Opportunity", "Resume"];
let radarState = { loading: true, updatedAt: null, items: [], learningMoves: [], fieldLens: [], dailyPrompt: "", sourceStatus: [], error: null };

const defaultData = {
  profile: {
    name: "",
    targetRole: "Creative Technologist / Research Scientist / Postdoc",
    targetOrg: "Disney Imagineering and creative R&D first; Disney Research, robotics labs, HCI labs, and any place building amazing physical/digital systems if the fit is strong",
    targetLocation: "Glendale, Seattle, Bay Area, Boston, or remote/hybrid R&D",
    subdomain: "ocean.aolabs.io",
    phd: "PhD Mechanical Engineering, WPI, expected 2027",
    graduation: "Expected 2027",
    cv: "",
    linkedin: "",
    portfolio: "",
    technicalStrengths: "Soft robotics, metamaterials, morphing surfaces, nonlinear dynamics, HRI, pneumatic actuation, cable-driven robots, continuum robots, 3D printing, FEA, ROS2, MATLAB, Python, C/C++.",
    creativeStrengths: "Ocean-inspired motion, musical/ensemble collaboration, interactive embodied systems, playful guest-facing technology.",
    constraints: "",
    narrative: "I want to work on amazing creative R&D: morphing matter, robotics, haptics, animatronics, interactive environments, tools, and physical systems that feel alive.",
  },
  roadmap: [
    item("Portfolio", "One polished creative technology case study", "Project page with video, story goal, tech stack, build notes", 10, "Pick one existing project to polish"),
    item("Portfolio", "Three strong project case studies", "Three finished pages or videos, each with technical breakdown", 12, "List candidate projects"),
    item("Portfolio", "Demo reel or 90-second overview video", "Short reel showing interactive, physical, or immersive work", 8, "Collect existing clips"),
    item("Technical", "Real-time interactive prototype", "Unity, Unreal, TouchDesigner, web, or graphics demo with interaction", 8, "Scope a small interaction demo"),
    item("Technical", "Physical computing or sensor-based prototype", "Sensors, microcontroller, installation, or spatial interaction evidence", 8, "Choose a sensor concept"),
    item("Technical", "Morphing structures prototype", "Actuated, compliant, deployable, soft robotic, origami, tensegrity, or shape-changing demo with measured behavior", 10, "Define one morphing mechanism and build a small proof of concept"),
    item("Technical", "Morphing structures controls story", "Control approach, sensing, repeatability, failure modes, and safe interaction notes", 7, "Write a control and reliability plan for one morphing prototype"),
    item("Technical", "Reliability and operations story", "Notes on robustness, safety, maintainability, testing, or deployment", 6, "Add a reliability section to a project"),
    item("Story", "Guest-experience framing", "Each portfolio piece explains what the audience feels or does", 7, "Rewrite one project intro"),
    item("Story", "Experience-technology literacy", "Notes from WDI, Meta Reality Labs, Google, robotics, installation, museum, and HCI examples", 5, "Analyze one embodied experience or shape-changing system"),
    item("Research", "Publication or demo aligned with creative tech", "Conference paper, demo, poster, exhibit, or lab milestone", 8, "Map PhD work to creative-tech venues"),
    item("Research", "Clear PhD-to-Ocean narrative", "One paragraph connecting soft robotics, metamaterials, and morphing surfaces to future embodied experiences", 6, "Draft the paragraph"),
    item("Networking", "Five feedback conversations", "Names, dates, notes, follow-up action", 7, "Identify five people"),
    item("Networking", "One warm R&D-adjacent relationship", "Ongoing contact with WDI, Meta, Google, robotics, HCI, museum tech, or interaction design people", 5, "Ask for portfolio feedback"),
    item("Applications", "Role keyword map", "Current WDI, Meta, Google, robotics, HCI, and embodied AI keywords copied into tracker", 4, "Use monthly scan output"),
    item("Applications", "Tailored resume and LinkedIn", "Resume and profile aimed at creative technologist, soft robotics, morphing structures, and R&D roles", 4, "Paste LinkedIn into Profile and compare against CV"),
    item("Applications", "Interview story bank", "STAR stories for prototype, collaboration, ambiguity, failure, technical depth", 4, "Write one story"),
    item("Applications", "Apply when ready", "Shortlist of roles and tailored applications across WDI plus adjacent R&D labs", 8, "Track target roles monthly"),
  ],
  projects: [
    cvProject("Ocean morphing surface", "High-tech morphing structures", "A responsive surface that moves like a living wave, framed as a rigorous soft-robotics and experience-technology portfolio piece.", "Pneumatic/cable actuation, compliant mechanisms, sensing, controls, repeatability testing"),
    cvProject("Modular cable-driven soft robotic arm", "Soft robotics / field robotics", "A soft robotic arm concept connected to terrain navigation and exploration, adaptable into an embodied character or responsive structure demo.", "Cable-driven soft robotics, modular design, Mars surface exploration context"),
    cvProject("Pneumatically actuated Sarrus-linkage robotic material", "Metamaterials / morphing surfaces", "A tiled robotic material that can scale into shape-changing surfaces and high-tech scenic/interactive systems.", "3D printing, pneumatic actuation, Sarrus linkages, robotic materials"),
    cvProject("Concentric tube robot actuation platform", "Continuum robotics", "A precise continuum robot platform that demonstrates mechanical design, fabrication, controls, and validation.", "Continuum robots, open-source actuation, displacement validation"),
    project("High-tech morphing structures"),
    project("Compliant mechanisms / soft robotics"),
    project("Deployable or origami structures"),
    project("Interactive environment"),
    project("Real-time graphics / projection"),
    project("Sensors / responsive space"),
    project("Robotics / animated character"),
    project("XR / mixed reality"),
    project("AI for live experience"),
    project("Physical computing"),
    project("PhD research demo"),
  ],
  networking: [],
  opportunities: [
    {
      id: crypto.randomUUID(),
      date: "",
      team: "Walt Disney Imagineering",
      role: "Creative Technologist / R&D / Show systems",
      location: "Glendale, CA",
      link: "",
      keywords: "creative technology, R&D, interactive experiences, guest experience",
      fit: 0,
      action: "Track current postings and map keywords to morphing-systems portfolio",
      status: "Watch",
    },
    {
      id: crypto.randomUUID(),
      date: "",
      team: "Meta Reality Labs",
      role: "Research Scientist / Hardware prototyping / HCI / Soft robotics-adjacent R&D",
      location: "Bay Area, Seattle, Pittsburgh, or other RL sites",
      link: "",
      keywords: "embodied interaction, haptics, wearables, robotics, human-computer interaction, prototyping",
      fit: 0,
      action: "Look for roles where morphing surfaces, haptics, or soft robotic interaction are credible",
      status: "Watch",
    },
    {
      id: crypto.randomUUID(),
      date: "",
      team: "Google / X / DeepMind / AR hardware-adjacent teams",
      role: "Research Engineer / Prototyping / Robotics / Interaction R&D",
      location: "Bay Area, Seattle, Cambridge, or other R&D sites",
      link: "",
      keywords: "robotics, materials, human-centered AI, interactive systems, hardware prototyping, simulation",
      fit: 0,
      action: "Track roles that value robotics hardware plus creative HCI storytelling",
      status: "Watch",
    },
  ],
  current: {
    weeklyFocus: "Aim at Creative Technologist / Research Scientist roles by learning broadly and turning that learning into visible proof.",
    nextStep: "Pick one amazing signal, learn from it, and turn it into one small prototype, diagram, measurement, or portfolio note.",
    blockers: "",
    notes: "",
  },
  joy: {
    lastWin: "",
    winLog: [],
    anchors: "Ocean motion, music, soft robotics, beautiful mechanisms, playful technology, making something that feels alive.",
  },
  sources: {
    personalDocUrl: "",
    personalDocNotes: "Ocean should not replace the rough personal update stream. It should turn the trajectory into Disney-facing proof and next moves.",
    lastDocReviewAt: "",
    reviewRitual: "Ocean stays separate from the rough notes stream: it points the messy trajectory toward Disney R&D proof, people, and opportunities.",
  },
  autopilot: {
    enabled: true,
    supervision: "Suggest only. Never silently change the plan.",
    promise: "When I open Ocean, I should feel that this path is concrete, possible, and actively supported.",
  },
  northStar: {
    statement: "Work on amazing creative R&D: physical systems, robotics, morphing matter, haptics, animatronics, interactive tools, and experiences that feel alive.",
    thesis: "A strong creative technologist/researcher can move between mechanism, software, fabrication, sensing, control, story, and audience experience.",
    emotionalCore: "Ocean is about keeping the path alive: learning from serious labs, building small proofs, and becoming credible enough for Disney/WDI or another ambitious R&D home.",
    proofTrail: "Soft robotics, Sarrus linkage modules, cable-driven systems, continuum robots, wave/peristaltic motion, fabrication, HRI, controls, interactive prototypes, and any new frontier worth learning.",
    nearTermBets: "1. Study current R&D signals. 2. Pick one small proof. 3. Build or document it. 4. Measure or explain what changed. 5. Package it as Creative Technologist / Research Scientist evidence.",
  },
  updates: [],
};

function item(category, milestone, evidence, weight, nextAction) {
  return {
    id: crypto.randomUUID(),
    category,
    milestone,
    evidence,
    status: "Not Started",
    weight,
    nextAction,
    due: "",
  };
}

function cvProject(name, theme, experience, stack) {
  return {
    id: crypto.randomUUID(),
    name,
    theme,
    experience,
    stack,
    evidence: "",
    status: "Prototype",
    impact: 7,
    nextImprovement: "Add a short video or project page with measured behavior, failure modes, and the human/guest experience.",
    notes: "Seeded from CV. Replace or refine this with the strongest public-safe version of the work.",
  };
}

function project(theme) {
  return {
    id: crypto.randomUUID(),
    name: "",
    theme,
    experience: "",
    stack: "",
    evidence: "",
    status: "Idea",
    impact: 0,
    nextImprovement: "",
    notes: "",
  };
}

let state = loadState();
state = migrateState(state);
saveState();

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaultData);
  try {
    return { ...structuredClone(defaultData), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultData);
  }
}

function migrateState(data) {
  const merged = { ...structuredClone(defaultData), ...data };
  merged.profile = { ...structuredClone(defaultData.profile), ...(data.profile || {}) };
  merged.current = { ...structuredClone(defaultData.current), ...(data.current || {}) };
  merged.joy = { ...structuredClone(defaultData.joy), ...(data.joy || {}) };
  merged.joy.winLog = Array.isArray(data.joy?.winLog) ? data.joy.winLog : [];
  merged.sources = { ...structuredClone(defaultData.sources), ...(data.sources || {}) };
  merged.autopilot = { ...structuredClone(defaultData.autopilot), ...(data.autopilot || {}) };
  merged.northStar = { ...structuredClone(defaultData.northStar), ...(data.northStar || {}) };
  merged.updates = Array.isArray(data.updates) ? data.updates : [];
  merged.roadmap = Array.isArray(data.roadmap) ? data.roadmap : structuredClone(defaultData.roadmap);
  merged.projects = Array.isArray(data.projects) ? data.projects : structuredClone(defaultData.projects);
  merged.networking = Array.isArray(data.networking) ? data.networking : [];
  merged.opportunities = Array.isArray(data.opportunities) ? data.opportunities : structuredClone(defaultData.opportunities);

  ensureRoadmapItem(merged, "Morphing structures prototype", "Technical", "Actuated, compliant, deployable, soft robotic, origami, tensegrity, or shape-changing demo with measured behavior", 10, "Define one morphing mechanism and build a small proof of concept");
  ensureRoadmapItem(merged, "Morphing structures controls story", "Technical", "Control approach, sensing, repeatability, failure modes, and safe interaction notes", 7, "Write a control and reliability plan for one morphing prototype");
  ensureProjectTheme(merged, "High-tech morphing structures");
  ensureProjectTheme(merged, "Compliant mechanisms / soft robotics");
  ensureProjectTheme(merged, "Deployable or origami structures");
  return merged;
}

function ensureRoadmapItem(data, milestone, category, evidence, weight, nextAction) {
  if (data.roadmap.some((row) => row.milestone === milestone)) return;
  data.roadmap.splice(5, 0, {
    id: crypto.randomUUID(),
    category,
    milestone,
    evidence,
    status: "Not Started",
    weight,
    nextAction,
    due: "",
  });
}

function ensureProjectTheme(data, theme) {
  if (data.projects.some((row) => row.theme === theme)) return;
  data.projects.unshift(project(theme));
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function scoreForStatus(status, weight) {
  if (status === "Done") return weight;
  if (status === "In Progress") return weight * 0.5;
  if (status === "Blocked") return weight * 0.2;
  return 0;
}

function totals() {
  const total = state.roadmap.reduce((sum, row) => sum + Number(row.weight || 0), 0);
  const earned = state.roadmap.reduce((sum, row) => sum + scoreForStatus(row.status, Number(row.weight || 0)), 0);
  const byCategory = {};
  for (const row of state.roadmap) {
    byCategory[row.category] ||= { earned: 0, total: 0 };
    byCategory[row.category].earned += scoreForStatus(row.status, Number(row.weight || 0));
    byCategory[row.category].total += Number(row.weight || 0);
  }
  return { earned, total, pct: total ? Math.round((earned / total) * 100) : 0, byCategory };
}

function nextAction() {
  const row = state.roadmap.find((candidate) => candidate.status !== "Done");
  return row?.nextAction || "Maintain momentum and keep evidence current.";
}

function route() {
  const hash = window.location.hash.replace("#", "");
  return hash || "dashboard";
}

window.addEventListener("hashchange", render);

function setValue(path, value) {
  const parts = path.split(".");
  let target = state;
  while (parts.length > 1) target = target[parts.shift()];
  target[parts[0]] = value;
  saveState();
  render();
}

function setArrayValue(arrayName, id, field, value) {
  const row = state[arrayName].find((candidate) => candidate.id === id);
  if (!row) return;
  row[field] = field === "weight" || field === "impact" || field === "fit" ? Number(value || 0) : value;
  saveState();
  render();
}

function addRow(arrayName, template) {
  state[arrayName].push({ id: crypto.randomUUID(), ...template });
  saveState();
  render();
}

function removeRow(arrayName, id) {
  state[arrayName] = state[arrayName].filter((row) => row.id !== id);
  saveState();
  render();
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statusClass(value) {
  return String(value || "").toLowerCase().replaceAll(" ", "-").replaceAll("/", "");
}

function input(path, value, placeholder = "") {
  return `<input value="${esc(value)}" placeholder="${esc(placeholder)}" onchange="setValue('${path}', this.value)">`;
}

function area(path, value, placeholder = "") {
  return `<textarea placeholder="${esc(placeholder)}" onchange="setValue('${path}', this.value)">${esc(value)}</textarea>`;
}

function cellInput(array, row, field, placeholder = "") {
  return `<input value="${esc(row[field])}" placeholder="${esc(placeholder)}" onchange="setArrayValue('${array}', '${row.id}', '${field}', this.value)">`;
}

function cellArea(array, row, field, placeholder = "") {
  return `<textarea placeholder="${esc(placeholder)}" onchange="setArrayValue('${array}', '${row.id}', '${field}', this.value)">${esc(row[field])}</textarea>`;
}

function select(array, row, field, options) {
  return `<select onchange="setArrayValue('${array}', '${row.id}', '${field}', this.value)">
    ${options.map((option) => `<option ${row[field] === option ? "selected" : ""}>${esc(option)}</option>`).join("")}
  </select>`;
}

function badge(value) {
  return `<span class="pill ${statusClass(value)}">${esc(value)}</span>`;
}

function suggestionForUpdate(update) {
  const text = `${update.title || ""} ${update.body || ""} ${update.tag || ""}`.toLowerCase();
  const suggestions = [];

  if (text.includes("morph") || text.includes("compliant") || text.includes("soft robot") || text.includes("origami") || text.includes("tensegrity") || text.includes("deployable")) {
    suggestions.push("Turn this into a morphing-structures portfolio artifact: mechanism, actuation, sensing, control loop, measured behavior, and guest-facing story.");
    suggestions.push("Next step: capture one diagram or short video showing the shape change, then record what input causes it and how repeatable it is.");
  }
  if (text.includes("screenshot") || update.image) {
    suggestions.push("Add a one-sentence caption explaining why this screenshot matters and what decision it supports.");
  }
  if (text.includes("paper") || text.includes("research") || text.includes("publication")) {
    suggestions.push("Map this to the Research roadmap: what claim, demo, or conference-ready artifact does it support?");
  }
  if (text.includes("project") || text.includes("prototype") || text.includes("demo")) {
    suggestions.push("Update the Projects section with status, evidence link, and the next improvement.");
  }
  if (text.includes("resume") || text.includes("cv") || text.includes("linkedin")) {
    suggestions.push("Translate this into resume language: action verb, technical method, measurable result, and creative outcome.");
  }
  if (text.includes("wdi") || text.includes("imagineering") || text.includes("disney") || text.includes("meta") || text.includes("google") || text.includes("job")) {
    suggestions.push("Extract role keywords and add them to Opportunities so the portfolio can mirror current job language.");
  }

  if (!suggestions.length) {
    suggestions.push("Decide whether this belongs in Projects, Resume, Research, or Networking, then attach one concrete next action.");
  }

  return suggestions;
}

function updateImpactLabel(update) {
  const text = `${update.title || ""} ${update.body || ""} ${update.tag || ""}`.toLowerCase();
  if (text.includes("morph") || text.includes("prototype") || text.includes("demo")) return "Portfolio";
  if (text.includes("paper") || text.includes("research")) return "Research";
  if (text.includes("resume") || text.includes("linkedin") || text.includes("cv")) return "Resume";
  if (text.includes("job") || text.includes("posting") || text.includes("opportunity")) return "Opportunity";
  return "General";
}

function actionReason(update) {
  const impact = updateImpactLabel(update);
  if (impact === "Portfolio") return "Because visible proof is what makes the WDI/R&D path believable.";
  if (impact === "Research") return "Because your research only helps your future if it becomes a clear claim, demo, or paper.";
  if (impact === "Resume") return "Because your story needs to be legible to people who do not know you yet.";
  if (impact === "Opportunity") return "Because role language tells you what evidence to build next.";
  return "Because one small concrete action is better than trying to organize your whole life.";
}

function currentCareerMove() {
  const saved = String(state.current.nextStep || "").trim();
  const blockedTerms = ["paste", "copy", ["phd", "organization"].join(" "), ["phd", "doc"].join(" "), ["google", "doc"].join(" ")];
  const alignedCareer = /amazing|creative|r&d|research|technologist|imagineering|disney|robot|morph|matter|haptic|animatronic|interactive|prototype|fabricat|mechanism|tool|lab|learn|build|proof/i;
  if (saved && alignedCareer.test(saved) && !blockedTerms.some((term) => saved.toLowerCase().includes(term))) return saved;
  return defaultData.current.nextStep;
}

function recommendedOpportunity() {
  return radarState.items.find((item) => item.type === "Opportunity" && /creative technolog|research|r&d|robotics|morph|programmable|prototype|animatronics|haptics|mechatronics|show system|interactive|fabrication|simulation/i.test(`${item.title} ${item.why}`));
}

function currentSignal() {
  return radarState.items.find((item) => item.type === "Opportunity")
    || radarState.items.find((item) => item.type === "Research signal")
    || radarState.items.find((item) => item.type === "Target lane")
    || null;
}

function liveItems() {
  return radarState.items.filter((item) => item.type !== "Target lane");
}

function currentInfoMove() {
  if (radarState.loading) return "Checking current roles and research signals now.";
  const signal = currentSignal();
  if (!signal) return radarState.dailyPrompt || currentCareerMove();
  if (signal.type === "Research signal") {
    return `Use this current research signal as a keyword check: ${signal.title}`;
  }
  return `Compare your next proof against this current lane: ${signal.title}`;
}

function radarTimeLabel() {
  if (!radarState.updatedAt) return "not refreshed yet";
  return `refreshed ${new Date(radarState.updatedAt).toLocaleString()}`;
}

function careerSignalMarkup() {
  if (radarState.loading) {
    return `<div class="signal-line"><span>Checking current info</span><strong>Ocean is refreshing roles and research signals.</strong></div>`;
  }
  const opportunity = recommendedOpportunity();
  if (!opportunity) {
    return `<div class="signal-line"><span>No high-fit live role found</span><strong>Do not pivot randomly. Keep learning and building proof unless a signal clearly points to R&D, prototyping, robotics, interaction, haptics, fabrication, tools, or show technology.</strong></div>`;
  }
  return `
    <div class="signal-line">
      <span>Worth looking at</span>
      <a href="${esc(opportunity.url)}" target="_blank" rel="noreferrer">${esc(opportunity.title)}</a>
    </div>
  `;
}

function currentInfoMarkup() {
  const items = liveItems().slice(0, 3);
  const moves = (radarState.learningMoves || []).slice(0, 3);
  const lenses = (radarState.fieldLens || []).slice(0, 4);
  const sourceRows = (radarState.sourceStatus || []).map((row) => `
    <span class="${row.ok ? "ok" : "issue"}">${esc(row.source)}: ${esc(row.detail || "")}</span>
  `).join("");
  return `
    <section class="current-info">
      <div class="current-head">
        <div>
          <span class="tiny-label">Current info</span>
          <strong>${esc(radarTimeLabel())}</strong>
        </div>
        <button class="compact" onclick="refreshRadar()">Refresh</button>
      </div>
      ${radarState.loading ? `<div class="empty">Checking current sources...</div>` : ""}
      ${radarState.error ? `<div class="empty">Some sources had issues. Showing whatever did refresh.</div>` : ""}
      ${items.length ? `
        <div class="current-list">
          ${items.map((item, index) => `
            <article class="current-item">
              <span>${esc(item.type || "Signal")} / ${esc(item.source || "source")}${item.date ? ` / ${esc(item.date)}` : ""}</span>
              <a href="${esc(item.url || "#")}" target="_blank" rel="noreferrer">${esc(item.title || "Untitled signal")}</a>
              <p>${esc(item.why || item.summary || "")}</p>
              <button class="compact" onclick="adoptRadarItem(${radarState.items.indexOf(item)})">Track</button>
            </article>
          `).join("")}
        </div>
      ` : (!radarState.loading ? `<div class="empty">No fresh role or research items found. Target lanes still stay available in the deeper tracker.</div>` : "")}
      ${moves.length ? `
        <div class="learning-moves">
          <strong>Learning moves</strong>
          ${moves.map((move) => `<span>${esc(move)}</span>`).join("")}
        </div>
      ` : ""}
      ${lenses.length ? `
        <div class="field-lens">
          ${lenses.map((lens) => `<span>${esc(lens)}</span>`).join("")}
        </div>
      ` : ""}
      ${sourceRows ? `<div class="source-status">${sourceRows}</div>` : ""}
    </section>
  `;
}

function targetLanesMarkup() {
  const lanes = [
    "Disney Imagineering R&D",
    "Disney Research",
    "Meta Reality Labs",
    "RAI / Boston Dynamics",
    "NASA JPL Robotics",
    "Elite postdoc labs: MIT, CMU, Stanford, Cornell, ETH",
  ];
  return `<div class="target-lanes">${lanes.map((lane) => `<span>${esc(lane)}</span>`).join("")}</div>`;
}

async function loadRadar(force = false) {
  if (!force && radarState.items.length && radarState.updatedAt) return;
  radarState = { ...radarState, loading: true };
  try {
    const response = await fetch(`/api/radar${force ? "?force=1" : ""}`, { cache: "no-store" });
    const radar = await response.json();
    radarState = {
      loading: false,
      updatedAt: radar.updatedAt || null,
      items: Array.isArray(radar.items) ? radar.items : [],
      learningMoves: Array.isArray(radar.learningMoves) ? radar.learningMoves : [],
      fieldLens: Array.isArray(radar.fieldLens) ? radar.fieldLens : [],
      dailyPrompt: radar.dailyPrompt || "",
      sourceStatus: Array.isArray(radar.sourceStatus) ? radar.sourceStatus : [],
      error: radar.error || null,
    };
  } catch (error) {
    radarState = { loading: false, updatedAt: null, items: [], learningMoves: [], fieldLens: [], dailyPrompt: "", sourceStatus: [], error: error.message };
  }
  renderMinimalDashboard();
}

function radarCard(item, index) {
  return `
    <article class="radar-card">
      <div>
        <span class="radar-type">${esc(item.type || "Signal")}</span>
        <strong>${esc(item.title || "Untitled signal")}</strong>
        <p>${esc(item.why || item.summary || "")}</p>
        <span class="muted">${esc(item.source || "")}${item.date ? ` Â· ${esc(item.date)}` : ""}${item.location ? ` Â· ${esc(item.location)}` : ""}</span>
      </div>
      <div class="actions">
        ${item.url ? `<button class="compact" onclick="window.open('${esc(item.url)}','_blank')">Open</button>` : ""}
        <button class="compact primary" onclick="adoptRadarItem(${index})">Track</button>
      </div>
    </article>
  `;
}

function dailySpark() {
  const sparks = [
    "Learn one serious thing. Build one visible proof.",
    "Amazing work is allowed to be rigorous, strange, useful, and emotionally clear.",
    "A single clean demo can change how people understand your trajectory.",
    "You do not need a normal path. You need evidence, taste, and repetition.",
    "The lane is broader than morphing matter: robotics, tools, haptics, animatronics, interaction, and physical systems all count.",
    "Today does not need to solve your future. It needs to produce one useful signal.",
    "Wonder is an engineering requirement here, but proof is what makes it believable.",
  ];
  const day = Math.floor(Date.now() / 86400000);
  return sparks[day % sparks.length];
}

function recentWins() {
  return [...(state.joy.winLog || [])]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 3);
}

function layout(title, subtitle, body) {
  const isHome = route() === "dashboard";
  const tabs = [
    ["dashboard", "Today"],
    ["updates", "Inbox"],
    ["projects", "Projects"],
    ["northstar", "North Star"],
    ["more", "More"],
  ];

  document.getElementById("app").innerHTML = `
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <strong>Ocean</strong>
          <span>${esc(state.profile.subdomain || "ocean.aolabs.io")}</span>
        </div>
        <nav class="nav">
          ${tabs.map(([id, label]) => `<button class="${route() === id ? "active" : ""}" onclick="location.hash='${id}'">${label}</button>`).join("")}
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <div>
            <h1>${esc(title)}</h1>
            ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
          </div>
          <div class="actions ${isHome ? "home-actions" : ""}">
            <button onclick="location.hash='updates'">Add Update</button>
            <button class="primary" onclick="location.hash='next'">Next Step</button>
          </div>
        </header>
        <section class="content">${body}</section>
      </main>
    </div>
  `;
}

function renderNorthStar() {
  layout(
    "North Star",
    "Ambition, learning direction, proof, and where it points.",
    `
      <div class="grid cols-2">
        <section class="panel">
          <h2>Core Statement</h2>
          <div class="field">
            <label>What this is really about</label>
            ${area("northStar.statement", state.northStar.statement)}
          </div>
        </section>
        <section class="panel">
          <h2>Research Thesis</h2>
          <div class="field">
            <label>Technical claim</label>
            ${area("northStar.thesis", state.northStar.thesis)}
          </div>
        </section>
      </div>

      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel">
          <h2>Emotional Core</h2>
          <div class="field">
            <label>Why Ocean matters</label>
            ${area("northStar.emotionalCore", state.northStar.emotionalCore)}
          </div>
        </section>
        <section class="panel">
          <h2>Proof Trail</h2>
          <div class="field">
            <label>Evidence already present</label>
            ${area("northStar.proofTrail", state.northStar.proofTrail)}
          </div>
        </section>
      </div>

      <section class="panel" style="margin-top:16px">
        <h2>Near-Term Bets</h2>
        <div class="field">
          <label>What to turn into progress</label>
          ${area("northStar.nearTermBets", state.northStar.nearTermBets)}
        </div>
      </section>

      <section class="panel" style="margin-top:16px">
        <h2>Translation To Roles</h2>
        <div class="role-grid">
          <div><strong>WDI / themed R&D</strong><span>living scenic systems, expressive robotics, show technology, guest-facing morphing surfaces</span></div>
          <div><strong>Meta Reality Labs</strong><span>haptics, embodied interaction, soft wearable or tangible interfaces, human-centered prototyping</span></div>
          <div><strong>Google / X / robotics</strong><span>robotic materials, interactive hardware, simulation, human-centered AI and physical systems</span></div>
          <div><strong>NASA / national labs</strong><span>deployable structures, soft robotics, field systems, reliable mechanisms in constrained environments</span></div>
        </div>
      </section>
    `,
  );
}

function renderDashboard() {
  const t = totals();
  const projectEvidence = state.projects.filter((row) => row.evidence.trim()).length;
  const recentUpdates = [...state.updates].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 3);
  const wins = recentWins();
  const lastDocReview = state.sources.lastDocReviewAt ? new Date(state.sources.lastDocReviewAt).toLocaleString() : "Not reviewed yet";
  const radarItems = radarState.items.slice(0, 5);
  const categoryRows = Object.entries(t.byCategory).slice(0, 4)
    .map(([category, row]) => {
      const pct = row.total ? Math.round((row.earned / row.total) * 100) : 0;
      return `
        <div class="score-row">
          <strong>${esc(category)}</strong>
          <div class="progress-track"><div class="progress-fill" style="--pct:${pct}%"></div></div>
          <span>${pct}%</span>
        </div>
      `;
    })
    .join("");

  layout(
    "Today",
    "Current signals, learning, and proof.",
    `
      <section class="panel focus-panel">
        <span class="eyebrow">This is possible</span>
        <h2>${esc(state.current.nextStep || nextAction())}</h2>
        <p>${esc(state.current.weeklyFocus)}</p>
        <p class="muted">Ocean keeps the path practical: learn from current labs and roles, then convert that signal into one visible proof.</p>
        <div class="sparkline">
          <span>Daily spark</span>
          <strong>${esc(dailySpark())}</strong>
        </div>
        <div class="actions">
          <button class="primary" onclick="location.hash='updates'">Add a messy update</button>
          <button onclick="location.hash='projects'">Touch a project</button>
        </div>
      </section>

      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel lift-panel">
          <span class="eyebrow">Open this when you need lift</span>
          <h2>Keep the dream attached to evidence.</h2>
          <p>When the path feels too large, the next move is small: study one signal, build one proof, make one project easier to understand.</p>
          <div class="field">
            <label>One small win</label>
            <input id="winInput" placeholder="I printed a part, wrote a paragraph, tested a module, rested, asked for help">
          </div>
          <div class="actions" style="margin-top:10px">
            <button class="primary" onclick="recordWin()">Record win</button>
            <button onclick="gentleReset()">Gentle reset</button>
          </div>
          ${wins.length ? `<div class="win-list">${wins.map((win) => `<div><strong>${esc(win.text)}</strong><span>${esc(new Date(win.createdAt).toLocaleDateString())}</span></div>`).join("")}</div>` : `<p class="footer-note">No wins recorded here yet. Tiny wins count.</p>`}
        </section>
        <section class="panel autopilot-panel">
          <span class="eyebrow">Autopilot under supervision</span>
          <h2>Ocean watches the horizon. You approve the moves.</h2>
          <div class="compass-list">
            <div><strong>Background radar</strong><span>Refreshes research and opportunity signals from official/searchable sources.</span></div>
            <div><strong>Career translation</strong><span>Turns rough notes into one concrete action.</span></div>
            <div><strong>Portfolio pressure</strong><span>Keeps asking for visible proof: demo, video, measurement, story, reliability, and what the audience feels.</span></div>
          </div>
        </section>
      </div>

      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel possibility-panel">
          <span class="eyebrow">Why the path is real</span>
          <h2>Evidence you already have</h2>
          <div class="proof-list">
            <span>PhD in Mechanical Engineering</span>
            <span>Soft robotics + morphing surfaces</span>
            <span>NASA / field robotics signal</span>
            <span>WPI soft robotics competition win</span>
            <span>Sarrus linkage robotic material</span>
            <span>HRI + creative technology narrative</span>
          </div>
        </section>
      </div>

      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel doc-pipeline">
          <span class="eyebrow">Notes Pipeline</span>
          <h2>Your rough notes stay messy. Ocean turns one chunk into movement.</h2>
          <ol class="ritual-list">
            <li>Copy only the newest useful section.</li>
            <li>Paste it here and translate it into one action.</li>
          </ol>
          <div class="field">
            <label>Label</label>
            <input id="quickUpdateTitle" placeholder="latest note, paper thought, prototype result">
          </div>
          <div class="field" style="margin-top:10px">
            <label>Paste from rough notes</label>
            <textarea id="quickUpdateBody" placeholder="Paste the newest rough chunk. Do not organize it first."></textarea>
          </div>
          <div class="actions" style="margin-top:10px">
            <button class="primary" onclick="addQuickUpdate()">Translate to next action</button>
          </div>
          <p class="footer-note">Last doc review: ${esc(lastDocReview)}</p>
        </section>

        <section class="panel">
          <h2>Career Compass</h2>
          <div class="compass-list">
            <div><strong>Dream role</strong><span>Creative technologist / R&D for ambitious physical and digital experiences.</span></div>
            <div><strong>Adjacent paths</strong><span>Disney/WDI, Disney Research, Reality Labs, Google/X, robotics labs, NASA/national labs, HCI, embodied AI, museums, and interactive studios.</span></div>
            <div><strong>Technical bet</strong><span>Build taste plus proof: mechanisms, sensing, control, fabrication, software, story, and reliability.</span></div>
          </div>
        </section>
      </div>

      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel radar-panel">
          <div class="panel-head">
            <div>
              <h2>Live Radar</h2>
              <p class="muted">${radarState.updatedAt ? `Updated ${new Date(radarState.updatedAt).toLocaleString()}` : "Checking current signals..."}</p>
            </div>
            <button class="compact" onclick="refreshRadar()">Refresh</button>
          </div>
          ${radarState.loading ? `<div class="empty">Ocean is checking research and opportunity signals.</div>` : ""}
          ${radarState.error ? `<div class="empty">Radar issue: ${esc(radarState.error)}</div>` : ""}
          ${radarItems.length ? `<div class="radar-list">${radarItems.map((item, index) => radarCard(item, index)).join("")}</div>` : (!radarState.loading ? `<div class="empty">No radar items yet. Try refreshing.</div>` : "")}
        </section>
        <section class="panel">
          <h2>Progress, Quietly</h2>
          <div class="kpi-value calm-score">${t.pct}%</div>
          <div class="progress-track"><div class="progress-fill" style="--pct:${t.pct}%"></div></div>
          <p class="muted">${projectEvidence} portfolio items have evidence. Scores are secondary; proof is what matters.</p>
          <div class="score-list compact-progress">${categoryRows}</div>
        </section>
        <section class="panel">
          <h2>Recent Inbox</h2>
          ${recentUpdates.length ? recentUpdates.map((update) => `
            <div class="mini-update">
              <strong>${esc(update.title || "Untitled update")}</strong>
              <span>${esc(suggestionForUpdate(update)[0])}</span>
            </div>
          `).join("") : `<div class="empty">No updates yet. The first useful action is to capture one messy note.</div>`}
        </section>
        <section class="panel">
          <h2>Ocean North Star</h2>
          <p>${esc(state.northStar.statement)}</p>
          <button onclick="location.hash='northstar'">Read the distilled version</button>
        </section>
      </div>
    `,
  );
}

function renderMinimalDashboard() {
  const answer = currentInfoMove();
  const prompt = radarState.dailyPrompt || "What would be amazing if it existed, and what is the smallest visible proof of it?";
  document.getElementById("app").innerHTML = `
    <main class="one-page">
      <section class="ocean-card">
        <div class="wave-mark" aria-hidden="true"></div>
        <p class="tiny-label">Ocean's job</p>
        <h1>Work on something amazing.</h1>
        <div class="answer-box">
          <span>Target</span>
          <strong>Creative Technologist / Research Scientist</strong>
          <p>Find ambitious creative R&D worth learning for: Disney/WDI, labs, robotics, physical interaction, haptics, animatronics, tools, morphing matter, and other frontier systems that feel alive.</p>
        </div>

        <div class="answer-box">
          <span>Today</span>
          <strong>${esc(answer)}</strong>
          <p>${esc(prompt)}</p>
        </div>

        ${targetLanesMarkup()}

        <div class="one-actions">
          <button class="primary" onclick="gentleReset()">Smaller proof</button>
          <button onclick="refreshRadar()">Refresh current info</button>
        </div>

        ${careerSignalMarkup()}
        ${currentInfoMarkup()}
      </section>
    </main>
  `;
}

function renderNext() {
  const pending = state.roadmap.filter((row) => row.status !== "Done").slice(0, 5);
  layout(
    "Next Steps",
    "Keep the plan small enough to actually use.",
    `
      <section class="panel">
        <h2>This Week</h2>
        <div class="field">
          <label>Weekly focus</label>
          ${area("current.weeklyFocus", state.current.weeklyFocus)}
        </div>
        <div class="field" style="margin-top:12px">
          <label>Immediate next step</label>
          ${area("current.nextStep", state.current.nextStep)}
        </div>
      </section>
      <section class="panel" style="margin-top:16px">
        <h2>Priority Queue</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Milestone</th><th>Status</th><th>Next Action</th><th>Due</th></tr></thead>
            <tbody>
              ${pending.map((row) => `
                <tr>
                  <td><strong>${esc(row.milestone)}</strong><br><span class="muted">${esc(row.category)}</span></td>
                  <td>${badge(row.status)}</td>
                  <td>${esc(row.nextAction)}</td>
                  <td>${esc(row.due || "")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `,
  );
}

function renderTrajectory() {
  layout(
    "Trajectory",
    "The full readiness roadmap. Updating status here moves the progress score.",
    `
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Category</th><th>Milestone</th><th>Evidence</th><th>Status</th><th>Weight</th><th>Next Action</th><th>Due</th><th></th></tr></thead>
            <tbody>
              ${state.roadmap.map((row) => `
                <tr>
                  <td>${cellInput("roadmap", row, "category")}</td>
                  <td>${cellArea("roadmap", row, "milestone")}</td>
                  <td>${cellArea("roadmap", row, "evidence")}</td>
                  <td>${select("roadmap", row, "status", statuses)}</td>
                  <td>${cellInput("roadmap", row, "weight")}</td>
                  <td>${cellArea("roadmap", row, "nextAction")}</td>
                  <td>${cellInput("roadmap", row, "due")}</td>
                  <td><button class="compact danger" onclick="removeRow('roadmap','${row.id}')">Remove</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="primary" onclick="addRow('roadmap', {category:'Portfolio', milestone:'', evidence:'', status:'Not Started', weight:4, nextAction:'', due:''})">Add Milestone</button>
        </div>
      </section>
    `,
  );
}

function renderProjects() {
  layout(
    "Projects",
    "Track proof, not intentions. Evidence links are what make this useful.",
    `
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>Theme</th><th>Audience Experience</th><th>Tech Stack</th><th>Evidence Link</th><th>Status</th><th>Impact</th><th>Next Improvement</th><th></th></tr></thead>
            <tbody>
              ${state.projects.map((row) => `
                <tr>
                  <td>${cellInput("projects", row, "name", "Project name")}</td>
                  <td>${cellInput("projects", row, "theme")}</td>
                  <td>${cellArea("projects", row, "experience")}</td>
                  <td>${cellArea("projects", row, "stack")}</td>
                  <td>${cellInput("projects", row, "evidence", "https://")}</td>
                  <td>${select("projects", row, "status", projectStatuses)}</td>
                  <td>${cellInput("projects", row, "impact")}</td>
                  <td>${cellArea("projects", row, "nextImprovement")}</td>
                  <td><button class="compact danger" onclick="removeRow('projects','${row.id}')">Remove</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="primary" onclick="addRow('projects', {name:'', theme:'Other', experience:'', stack:'', evidence:'', status:'Idea', impact:0, nextImprovement:'', notes:''})">Add Project</button>
        </div>
      </section>
    `,
  );
}

function renderCurrent() {
  layout(
    "Current Work",
    "Use this as the daily landing page when the rest feels too large.",
    `
      <div class="grid cols-2">
        <section class="panel">
          <h2>Focus</h2>
          <div class="field"><label>This week</label>${area("current.weeklyFocus", state.current.weeklyFocus)}</div>
          <div class="field" style="margin-top:12px"><label>Next step</label>${area("current.nextStep", state.current.nextStep)}</div>
        </section>
        <section class="panel">
          <h2>Friction</h2>
          <div class="field"><label>Blockers</label>${area("current.blockers", state.current.blockers, "What is slowing you down?")}</div>
          <div class="field" style="margin-top:12px"><label>Notes</label>${area("current.notes", state.current.notes)}</div>
        </section>
      </div>
    `,
  );
}

function renderResume() {
  layout(
    "Resume and Profile",
    "Paste rough material here. Polish comes later.",
    `
      <div class="grid cols-2">
        <section class="panel grid">
          <div class="field"><label>Name</label>${input("profile.name", state.profile.name)}</div>
          <div class="field"><label>Target role</label>${input("profile.targetRole", state.profile.targetRole)}</div>
          <div class="field"><label>Target organization</label>${input("profile.targetOrg", state.profile.targetOrg)}</div>
          <div class="field"><label>Target location</label>${input("profile.targetLocation", state.profile.targetLocation)}</div>
          <div class="field"><label>PhD / program</label>${input("profile.phd", state.profile.phd)}</div>
          <div class="field"><label>Graduation timeline</label>${input("profile.graduation", state.profile.graduation)}</div>
          <div class="field"><label>LinkedIn</label>${input("profile.linkedin", state.profile.linkedin, "https://linkedin.com/in/...")}</div>
          <div class="field"><label>Portfolio</label>${input("profile.portfolio", state.profile.portfolio, "https://...")}</div>
        </section>
        <section class="panel grid">
          <div class="field"><label>Positioning narrative</label>${area("profile.narrative", state.profile.narrative)}</div>
          <div class="field"><label>Technical strengths</label>${area("profile.technicalStrengths", state.profile.technicalStrengths)}</div>
          <div class="field"><label>Creative strengths</label>${area("profile.creativeStrengths", state.profile.creativeStrengths)}</div>
          <div class="field"><label>Constraints</label>${area("profile.constraints", state.profile.constraints)}</div>
        </section>
      </div>
      <section class="panel" style="margin-top:16px">
        <h2>CV Pastebin</h2>
        ${area("profile.cv", state.profile.cv, "Paste your CV text here when ready.")}
      </section>
    `,
  );
}

function renderNetwork() {
  layout(
    "Network",
    "Ask for portfolio feedback first. Referrals come later.",
    `
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Person</th><th>Role / Org</th><th>Why Them</th><th>Date Contacted</th><th>Status</th><th>Feedback</th><th>Follow-up</th><th></th></tr></thead>
            <tbody>
              ${state.networking.map((row) => `
                <tr>
                  <td>${cellInput("networking", row, "person")}</td>
                  <td>${cellInput("networking", row, "role")}</td>
                  <td>${cellArea("networking", row, "why")}</td>
                  <td>${cellInput("networking", row, "date")}</td>
                  <td>${select("networking", row, "status", networkStatuses)}</td>
                  <td>${cellArea("networking", row, "feedback")}</td>
                  <td>${cellArea("networking", row, "followup")}</td>
                  <td><button class="compact danger" onclick="removeRow('networking','${row.id}')">Remove</button></td>
                </tr>
              `).join("") || `<tr><td colspan="8"><div class="empty">No contacts yet. Add one person whose feedback would improve a specific project.</div></td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="primary" onclick="addRow('networking', {person:'', role:'', why:'', date:'', status:'Not Started', feedback:'', followup:''})">Add Contact</button>
        </div>
      </section>
    `,
  );
}

function renderOpportunities() {
  layout(
    "Opportunities",
    "Use monthly scans to keep current role language and openings here.",
    `
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Team</th><th>Role</th><th>Location</th><th>Link</th><th>Keywords</th><th>Fit</th><th>Action</th><th>Status</th><th></th></tr></thead>
            <tbody>
              ${state.opportunities.map((row) => `
                <tr>
                  <td>${cellInput("opportunities", row, "date")}</td>
                  <td>${cellInput("opportunities", row, "team")}</td>
                  <td>${cellInput("opportunities", row, "role")}</td>
                  <td>${cellInput("opportunities", row, "location")}</td>
                  <td>${cellInput("opportunities", row, "link")}</td>
                  <td>${cellArea("opportunities", row, "keywords")}</td>
                  <td>${cellInput("opportunities", row, "fit")}</td>
                  <td>${cellArea("opportunities", row, "action")}</td>
                  <td>${select("opportunities", row, "status", opportunityStatuses)}</td>
                  <td><button class="compact danger" onclick="removeRow('opportunities','${row.id}')">Remove</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="primary" onclick="addRow('opportunities', {date:'', team:'', role:'', location:'', link:'', keywords:'', fit:0, action:'', status:'Watch'})">Add Opportunity</button>
        </div>
      </section>
    `,
  );
}

function renderUpdates() {
  const sorted = [...state.updates].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  layout(
    "Updates",
    "Drop in random notes or screenshots. The app turns them into tracker suggestions.",
    `
      <div class="grid cols-2">
        <section class="panel">
          <h2>New Update</h2>
          <div class="field">
            <label>Title</label>
            <input id="updateTitle" placeholder="Lab note, screenshot, idea, paper, prototype result">
          </div>
          <div class="field" style="margin-top:12px">
            <label>Type</label>
            <select id="updateTag">
              ${updateTags.map((tag) => `<option>${esc(tag)}</option>`).join("")}
            </select>
          </div>
          <div class="field" style="margin-top:12px">
            <label>Text</label>
            <textarea id="updateBody" placeholder="Paste thoughts, observations, links, meeting notes, job keywords, or what the screenshot shows."></textarea>
          </div>
          <div class="field" style="margin-top:12px">
            <label>Screenshot or image</label>
            <input id="updateImage" type="file" accept="image/*">
          </div>
          <div class="actions" style="margin-top:12px">
            <button class="primary" onclick="addUpdate()">Save Update</button>
          </div>
          <p class="footer-note">Images are stored in this browser. Export JSON from Settings if you want a backup.</p>
        </section>
        <section class="panel">
          <h2>Creative R&D Focus</h2>
          <p>Use morphing structures as one strong lane, not the whole world. Also watch robotics, haptics, tools, animatronics, physical interfaces, interactive environments, fabrication, and simulation.</p>
          <div class="score-list">
            <div class="score-row"><strong>Physical</strong><span class="muted">mechanisms, robotics, actuation, materials, fabrication</span><span></span></div>
            <div class="score-row"><strong>Interactive</strong><span class="muted">sensors, haptics, tools, interfaces, spatial systems</span><span></span></div>
            <div class="score-row"><strong>Experience</strong><span class="muted">audience feeling, story purpose, play, surprise, clarity</span><span></span></div>
            <div class="score-row"><strong>Proof</strong><span class="muted">video, measurements, failure modes, repeatability, notes</span><span></span></div>
          </div>
        </section>
      </div>

      <section class="panel" style="margin-top:16px">
        <h2>Update Log</h2>
        ${sorted.length ? `
          <div class="update-list">
            ${sorted.map((update) => `
              <article class="update-card">
                <div class="update-head">
                  <div>
                    <strong>${esc(update.title || "Untitled update")}</strong>
                    <div class="muted">${esc(new Date(update.createdAt).toLocaleString())} Â· ${badge(update.tag || "General")} Â· ${esc(updateImpactLabel(update))}</div>
                  </div>
                  <div class="actions">
                    <button class="compact" onclick="applyUpdateToTracker('${update.id}')">Apply Suggestions</button>
                    <button class="compact danger" onclick="removeRow('updates','${update.id}')">Remove</button>
                  </div>
                </div>
                ${update.image ? `<img class="update-image" src="${update.image}" alt="Uploaded update image">` : ""}
                ${update.body ? `<p>${esc(update.body)}</p>` : ""}
                <div class="suggestions">
                  <strong>Suggested next steps</strong>
                  <ul>${suggestionForUpdate(update).map((suggestion) => `<li>${esc(suggestion)}</li>`).join("")}</ul>
                </div>
              </article>
            `).join("")}
          </div>
        ` : `<div class="empty">No updates yet. Add any thought, screenshot, paper, prototype result, or job posting keyword.</div>`}
      </section>
    `,
  );
}

async function addUpdate() {
  const title = document.getElementById("updateTitle")?.value.trim() || "";
  const body = document.getElementById("updateBody")?.value.trim() || "";
  const tag = document.getElementById("updateTag")?.value || "General";
  const file = document.getElementById("updateImage")?.files?.[0];

  if (!title && !body && !file) {
    alert("Add text, a title, or an image first.");
    return;
  }

  const image = file ? await readImageAsDataUrl(file) : "";
  state.updates.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title,
    body,
    tag,
    image,
  });
  saveState();
  render();
}

function addQuickUpdate() {
  const titleEl = document.getElementById("quickUpdateTitle");
  const bodyEl = document.getElementById("quickUpdateBody");
  const title = titleEl?.value.trim() || "";
  const body = bodyEl?.value.trim() || "";

  if (!title && !body) {
    alert("Write or paste one rough thing first.");
    return;
  }

  state.updates.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title,
    body,
    tag: "Research",
    image: "",
  });
  state.current.weeklyFocus = title || "New Ocean update";
  state.current.nextStep = suggestionForUpdate(state.updates[0])[0];
  state.sources.lastDocReviewAt = new Date().toISOString();
  saveState();
  render();
}

function recordWin() {
  const input = document.getElementById("winInput");
  const text = input?.value.trim() || "";
  if (!text) {
    alert("Write one tiny win first.");
    return;
  }
  state.joy.winLog.unshift({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  });
  state.joy.lastWin = text;
  saveState();
  render();
}

function gentleReset() {
  state.current.weeklyFocus = "Make the creative R&D path small enough to act on today.";
  state.current.nextStep = "Smallest proof: study one serious signal, then make one tiny artifact, sketch, measurement, or prototype from it.";
  saveState();
  render();
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function applyUpdateToTracker(id) {
  const update = state.updates.find((row) => row.id === id);
  if (!update) return;
  const suggestions = suggestionForUpdate(update);
  const impact = updateImpactLabel(update);

  state.current.weeklyFocus = update.title || `${impact} update`;
  state.current.nextStep = suggestions[0] || "Convert this update into one concrete tracker action.";

  if (impact === "Portfolio") {
    const projectRow = state.projects.find((row) => !row.name && row.theme.includes("morph")) || state.projects[0];
    if (projectRow) {
      projectRow.name ||= update.title || "Morphing structures prototype";
      projectRow.status = projectRow.status === "Idea" ? "Prototype" : projectRow.status;
      projectRow.notes = [projectRow.notes, update.body].filter(Boolean).join("\n\n");
      projectRow.nextImprovement = suggestions[1] || projectRow.nextImprovement;
    }
  }

  if (impact === "Research") {
    const row = state.roadmap.find((candidate) => candidate.milestone.includes("Publication"));
    if (row && row.status === "Not Started") row.status = "In Progress";
  }

  if (impact === "Resume") {
    state.profile.cv = [state.profile.cv, update.body].filter(Boolean).join("\n\n");
  }

  saveState();
  location.hash = "dashboard";
  render();
}

function adoptRadarItem(index) {
  const item = radarState.items[index];
  if (!item) return;
  const body = [
    item.why,
    item.summary,
    item.url ? `Source: ${item.url}` : "",
  ].filter(Boolean).join("\n\n");
  state.updates.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title: item.title || "Radar signal",
    body,
    tag: item.type?.includes("Opportunity") ? "Opportunity" : "Research",
    image: "",
  });
  state.current.weeklyFocus = item.title || "New radar signal";
  state.current.nextStep = suggestionForUpdate(state.updates[0])[0];
  saveState();
  render();
}

function refreshRadar() {
  radarState = { ...radarState, loading: true, error: null };
  render();
  loadRadar(true);
}

function renderSettings() {
  layout(
    "Settings",
    "Backup, restore, and deployment naming.",
    `
      <div class="grid cols-2">
        <section class="panel">
          <h2>Update Source</h2>
          <div class="field"><label>External notes URL</label>${input("sources.personalDocUrl", state.sources.personalDocUrl)}</div>
          <div class="field" style="margin-top:12px"><label>How Ocean should treat it</label>${area("sources.personalDocNotes", state.sources.personalDocNotes)}</div>
          <div class="field" style="margin-top:12px"><label>Review ritual</label>${area("sources.reviewRitual", state.sources.reviewRitual)}</div>
        </section>
        <section class="panel">
          <h2>Autopilot</h2>
          <div class="field"><label>Mode</label>${area("autopilot.supervision", state.autopilot.supervision)}</div>
          <div class="field" style="margin-top:12px"><label>Promise</label>${area("autopilot.promise", state.autopilot.promise)}</div>
          <div class="field" style="margin-top:12px"><label>Joy anchors</label>${area("joy.anchors", state.joy.anchors)}</div>
        </section>
        <section class="panel">
          <h2>Subdomain</h2>
          <div class="field"><label>Preferred URL</label>${input("profile.subdomain", state.profile.subdomain)}</div>
          <p class="footer-note">Current choice: ocean.aolabs.io. Other usable options: wave.aolabs.io, morph.aolabs.io, trajectory.aolabs.io.</p>
        </section>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <section class="panel">
          <h2>Data Backup</h2>
          <div class="actions">
            <button class="primary" onclick="exportData()">Export JSON</button>
            <button onclick="document.getElementById('importFile').click()">Import JSON</button>
            <button class="danger" onclick="resetData()">Reset</button>
          </div>
          <input id="importFile" type="file" accept="application/json" hidden onchange="importData(this.files[0])">
          <p class="footer-note">The app saves in this browser. Export JSON before switching browsers or devices.</p>
        </section>
      </div>
    `,
  );
}

function renderMore() {
  layout(
    "More",
    "The deeper tracker is still here, just out of the way.",
    `
      <div class="grid cols-3">
        <section class="panel">
          <h2>Next Steps</h2>
          <p class="muted">A short queue of what to do next.</p>
          <button onclick="location.hash='next'">Open</button>
        </section>
        <section class="panel">
          <h2>Roadmap</h2>
          <p class="muted">The full progress scoring system.</p>
          <button onclick="location.hash='trajectory'">Open</button>
        </section>
        <section class="panel">
          <h2>Resume</h2>
          <p class="muted">Profile, CV pastebin, strengths, positioning.</p>
          <button onclick="location.hash='resume'">Open</button>
        </section>
        <section class="panel">
          <h2>Network</h2>
          <p class="muted">Feedback conversations and contacts.</p>
          <button onclick="location.hash='network'">Open</button>
        </section>
        <section class="panel">
          <h2>Opportunities</h2>
          <p class="muted">WDI, Meta, Google, NASA, labs, and role keywords.</p>
          <button onclick="location.hash='opportunities'">Open</button>
        </section>
        <section class="panel">
          <h2>Settings</h2>
          <p class="muted">External notes source, domain, backup, import/export.</p>
          <button onclick="location.hash='settings'">Open</button>
        </section>
        <section class="panel">
          <h2>Radar</h2>
          <p class="muted">Current research signals and opportunity searches.</p>
          <button onclick="location.hash='dashboard'; setTimeout(refreshRadar, 0)">Refresh Radar</button>
        </section>
      </div>
    `,
  );
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ocean-tracker.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(file) {
  if (!file) return;
  state = migrateState(JSON.parse(await file.text()));
  saveState();
  render();
}

function resetData() {
  if (!confirm("Reset tracker data in this browser?")) return;
  state = structuredClone(defaultData);
  saveState();
  render();
}

function render() {
  renderMinimalDashboard();
}

Object.assign(window, {
  setValue,
  setArrayValue,
  addRow,
  removeRow,
  addQuickUpdate,
  addUpdate,
  applyUpdateToTracker,
  recordWin,
  gentleReset,
  adoptRadarItem,
  refreshRadar,
  exportData,
  importData,
  resetData,
});

render();
loadRadar();
setInterval(() => loadRadar(true), 1000 * 60 * 30);
