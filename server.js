const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const radarCache = {
  updatedAt: null,
  items: [],
  learningMoves: [],
  fieldLens: [],
  dailyPrompt: "",
  error: null,
  sourceStatus: [],
};
const radarRefreshMs = 1000 * 60 * 30;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

function htmlDecode(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tagText(value) {
  return htmlDecode(String(value || "").replace(/<[^>]+>/g, " "));
}

async function fetchText(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: {
      "user-agent": "Ocean career radar (personal tracker; contact via site owner)",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

function isAlignedDisneyRole(item) {
  const text = `${item.title || ""} ${item.location || ""}`.toLowerCase();
  const aligned = /imagineering|creative technolog|research scientist|research engineer|\br&d\b|research and development|prototype|prototyping|robotics|soft robotics|programmable matter|morphing|shape-changing|physical ai|mechatronics|animatronics|haptics|human[- ]robot|interactive technology|advanced development|show system|show control|ride system|special effects|fabricat|simulation|interactive|immersive|experience technolog|tools engineer|technical director/i;
  const misaligned = /intern|internship|summer|document control|costume|graphic|producer|coordinator|finance|marketing|public relations|culinary|retail|merchandise|operations|guest service|sales|human resources|legal|accounting/i;
  return aligned.test(text) && !misaligned.test(text);
}

function isAlignedResearchSignal(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  const aligned = /soft robot|soft robotic|morphing|shape-changing|shape changing|haptic|tactile|continuum robot|compliant|metamaterial|programmable matter|embodied interaction|wearable|actuat|mechanism|fabricat|origami|deployable|human[- ]robot|tangible interface|interactive fabrication|robotic material|physical interaction|embodied ai|animatronic|simulation|gesture|sensor|adaptive structure|design tool/i;
  const misaligned = /governance|misinformation|social media|recommender|policy|survey of surveys|benchmark only/i;
  return aligned.test(text) && !misaligned.test(text);
}

async function fetchDisneySignals() {
  const url = "https://jobs.disneycareers.com/search-jobs?k=imagineering%20research%20development%20creative%20technology%20robotics%20animatronics";
  const html = await fetchText(url);
  const rows = html.match(/<tr>[\s\S]*?<\/tr>/g) || [];
  return rows
    .map((row) => {
      const href = row.match(/<a href="([^"]+)"/)?.[1];
      const title = tagText(row.match(/<h2>([\s\S]*?)<\/h2>/)?.[1]);
      const date = tagText(row.match(/class="job-date-posted">([\s\S]*?)<\/span>/)?.[1]);
      const brand = tagText(row.match(/class="job-brand[^"]*">([\s\S]*?)<\/span>/)?.[1]);
      const location = tagText(row.match(/class="job-location">([\s\S]*?)<\/span>/)?.[1]);
      if (!href || !title) return null;
      return {
        type: "Opportunity",
        source: "Disney Careers",
        title,
        date,
        location,
        url: new URL(href, "https://jobs.disneycareers.com").toString(),
        why: brand === "Walt Disney Imagineering"
          ? "Potentially aligned WDI signal. Mine the language for proof: prototypes, systems, interaction, reliability, show technology, tools, or physical experiences."
          : "Potentially aligned Disney technical/creative R&D signal. Check whether it teaches what to learn or build next.",
      };
    })
    .filter(Boolean)
    .filter(isAlignedDisneyRole)
    .slice(0, 5);
}

async function fetchArxivSignals() {
  const query = encodeURIComponent('all:"soft robotics" OR all:"morphing structures" OR all:"shape-changing interfaces" OR all:"haptic interfaces" OR all:"tactile display" OR all:"continuum robot" OR all:"compliant mechanism" OR all:"programmable matter" OR all:"human robot interaction" OR all:"tangible interfaces" OR all:"interactive fabrication" OR all:"robotic materials" OR all:"embodied AI" OR all:"computational design" OR all:"digital fabrication" OR all:"animatronics"');
  const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=28&sortBy=submittedDate&sortOrder=descending`;
  const xml = await fetchText(url);
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries.map((entry) => {
    const title = tagText(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
    const summary = tagText(entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]).slice(0, 360);
    const published = tagText(entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]).slice(0, 10);
    const link = entry.match(/<id>([\s\S]*?)<\/id>/)?.[1]?.trim();
    return {
      type: "Research signal",
      board: "Research Feed",
      source: "arXiv",
      title,
      date: published,
      location: "Research",
      url: link,
      summary,
      why: "Recent research signal near robotics, morphing structures, haptics, HRI, tangible interfaces, fabrication, or embodied systems.",
    };
  }).filter((item) => item.title && item.url).filter(isAlignedResearchSignal).slice(0, 5);
}

function curatedTargetSignals() {
  return [
    {
      type: "Visual source",
      board: "Disney",
      source: "Walt Disney Imagineering",
      title: "WDI project archive",
      date: "source board",
      location: "built worlds",
      url: "https://sites.disney.com/waltdisneyimagineering/our-projects/",
      image: "https://sites.disney.com/app/uploads/sites/55/2021/06/Avengers_Campus_DCA.jpg",
      topics: ["Disney", "Imagineering", "show systems", "physical worlds"],
      why: "A living source for how WDI turns technical systems into public experiences.",
    },
    {
      type: "Visual source",
      board: "Disney",
      source: "Disney Research Studios",
      title: "Disney Research publications",
      date: "source board",
      location: "creative R&D",
      url: "https://studios.disneyresearch.com/publications/",
      image: "https://studios.disneyresearch.com/app/uploads/2026/03/CANRIG-Cross-Attention-Neural-Face-Rigging-with-Variable-Local-Control-Image-400x250.png",
      topics: ["Disney Research", "characters", "tools", "simulation"],
      why: "Track what Disney Research is publishing across animation, geometry, interaction, tools, and creative systems.",
    },
    {
      type: "Target lane",
      board: "Disney",
      source: "Disney Careers",
      title: "WDI R&D / Creative Technologist / R&D Imagineer search",
      date: "live search",
      location: "Glendale or Disney R&D",
      url: "https://jobs.disneycareers.com/search-jobs?k=WDI%20Research%20Development%20Creative%20Technologist",
      why: "Primary target lane. Watch for anything involving R&D, prototyping, robotics, animatronics, show systems, creative tools, or physical interaction.",
    },
    {
      type: "Target lane",
      board: "Disney",
      source: "Disney Research Studios",
      title: "Research Scientist / Research Engineer in high-tech creative systems",
      date: "careers page",
      location: "Disney Research",
      url: "https://studios.disneyresearch.com/careers/",
      why: "Study how technical research turns into characters, tools, environments, visual systems, simulation, robotics, and audience-facing invention.",
    },
    {
      type: "Target lane",
      board: "XR + Haptics",
      source: "Meta Careers",
      title: "Reality Labs Research Scientist / Research Engineer",
      date: "live search",
      location: "Reality Labs",
      url: "https://www.metacareers.com/jobs/?q=Reality%20Labs%20robotics%20haptics%20research%20scientist",
      why: "Relevant when it teaches haptics, embodied interaction, sensors, wearables, spatial computing, hardware prototyping, or human-centered R&D.",
    },
    {
      type: "Target lane",
      board: "Robotics Labs",
      source: "RAI Institute",
      title: "Robotics Research Scientist",
      date: "careers page",
      location: "Boston / Cambridge robotics research",
      url: "https://rai-inst.com/careers/",
      why: "Good adjacent lane for deep robotics if the work sharpens physical intelligence, mechanisms, learning, or reliable embodied systems.",
    },
    {
      type: "Target lane",
      board: "Robotics Labs",
      source: "NASA JPL",
      title: "Robotics / mechanisms / autonomy research roles",
      date: "careers page",
      location: "JPL Robotics",
      url: "https://www.jpl.jobs/robotics-careers",
      why: "Useful for mechanisms, deployable structures, robotics, autonomy, field systems, and the discipline of building things that must work.",
    },
    {
      type: "Target lane",
      board: "University Labs",
      source: "MIT CSAIL",
      title: "Postdoc / research staff in robotics or programmable matter",
      date: "jobs page",
      location: "MIT CSAIL / Media Lab orbit",
      url: "https://www.csail.mit.edu/about/jobs-csail",
      why: "Relevant when a lab can make you stronger at robotics, HRI, fabrication, materials, AI for physical systems, or unusual interfaces.",
    },
    {
      type: "Target lane",
      board: "University Labs",
      source: "CMU Robotics Institute",
      title: "Postdoc / research staff in robotics, morphing systems, or HRI",
      date: "postdoc page",
      location: "Pittsburgh robotics research",
      url: "https://www.ri.cmu.edu/people/postdocs/",
      why: "Relevant if it strengthens the broader creative R&D trajectory: robotics depth, interaction, mechanisms, perception, or fieldable prototypes.",
    },
    {
      type: "Lab source",
      board: "Tangible Interfaces",
      source: "MIT Media Lab",
      title: "Tangible Media: inFORM and shape displays",
      date: "source board",
      location: "programmable physical interfaces",
      url: "https://www.media.mit.edu/projects/inform/overview/",
      image: "https://dam-prod.media.mit.edu/thumb/files/Display/inform.jpg.1400x1400.jpg",
      topics: ["tangible media", "shape display", "programmable matter", "interaction"],
      why: "A strong adjacent lane for turning computation into physical, visible, interactive matter.",
    },
    {
      type: "Lab source",
      board: "Robotics Labs",
      source: "CMU Robotics Institute",
      title: "CMU Robotics Institute research feed",
      date: "source board",
      location: "robotics research",
      url: "https://www.ri.cmu.edu/",
      image: "https://www.ri.cmu.edu/app/uploads/2021/12/iris-integrstion-still-1-scaled.jpg",
      topics: ["robotics", "field systems", "HRI", "mechanisms"],
      why: "Useful breadth for what strong robotics work looks like across labs, systems, and prototypes.",
    },
  ];
}

function learningMoves() {
  return [
    "Pick one signal and extract the nouns: tools, mechanisms, audiences, constraints, materials, sensors, and proof.",
    "Build one visible proof per week: a prototype clip, a diagram, a measurement, a teardown, or a mini case study.",
    "Study outside the obvious lane. Animatronics, show control, projection, fabrication, haptics, spatial computing, and robotics can all feed the same career direction.",
    "Translate every interesting role or paper into one skill to learn and one artifact to build.",
  ];
}

function fieldLens() {
  return [
    "Disney/WDI: creative technology, animatronics, show systems, guest experience, tools, reliability.",
    "Research labs: robotics, HRI, haptics, fabrication, simulation, materials, tangible interfaces.",
    "Portfolio: short videos, measured behavior, story of the audience experience, failure modes, and build notes.",
    "Daily move: learn one thing, make one thing clearer, or collect one signal worth acting on.",
  ];
}

function dailyPrompt() {
  const prompts = [
    "What would be amazing if it existed, and what is the smallest visible proof of it?",
    "What did a serious lab or creative technology team publish that you can learn from today?",
    "What part of your work could become more legible to Disney Imagineering or a top R&D lab?",
    "What would you build if the goal was wonder plus technical credibility?",
  ];
  const day = Math.floor(Date.now() / 86400000);
  return prompts[day % prompts.length];
}

async function refreshRadar() {
  try {
    const [disney, arxiv] = await Promise.allSettled([
      fetchDisneySignals(),
      fetchArxivSignals(),
    ]);
    const sourceStatus = [
      {
        source: "Disney Careers",
        ok: disney.status === "fulfilled",
        count: disney.status === "fulfilled" ? disney.value.length : 0,
        detail: disney.status === "fulfilled"
          ? `${disney.value.length} aligned live roles found`
          : disney.reason?.message || "Disney Careers fetch failed",
      },
      {
        source: "arXiv",
        ok: arxiv.status === "fulfilled",
        count: arxiv.status === "fulfilled" ? arxiv.value.length : 0,
        detail: arxiv.status === "fulfilled"
          ? `${arxiv.value.length} recent research signals found`
          : arxiv.reason?.message || "arXiv fetch failed",
      },
    ];
    const items = [
      ...(disney.status === "fulfilled" ? disney.value : []),
      ...curatedTargetSignals(),
      ...(arxiv.status === "fulfilled" ? arxiv.value : []),
    ];
    radarCache.updatedAt = new Date().toISOString();
    radarCache.items = items;
    radarCache.learningMoves = learningMoves();
    radarCache.fieldLens = fieldLens();
    radarCache.dailyPrompt = dailyPrompt();
    radarCache.sourceStatus = sourceStatus;
    radarCache.error = sourceStatus.some((row) => !row.ok)
      ? sourceStatus.filter((row) => !row.ok).map((row) => `${row.source}: ${row.detail}`).join("; ")
      : null;
  } catch (error) {
    radarCache.error = error.message;
    radarCache.learningMoves = learningMoves();
    radarCache.fieldLens = fieldLens();
    radarCache.dailyPrompt = dailyPrompt();
  }
  return radarCache;
}

function sendJson(res, value, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/health") {
    sendJson(res, { ok: true });
    return;
  }

  if (pathname === "/api/radar") {
    const force = url.searchParams.get("force") === "1";
    const stale = !radarCache.updatedAt || Date.now() - new Date(radarCache.updatedAt).getTime() > radarRefreshMs;
    (force || stale ? refreshRadar() : Promise.resolve(radarCache))
      .then((radar) => sendJson(res, radar))
      .catch((error) => sendJson(res, {
        updatedAt: radarCache.updatedAt,
        items: radarCache.items,
        learningMoves: radarCache.learningMoves,
        fieldLens: radarCache.fieldLens,
        dailyPrompt: radarCache.dailyPrompt,
        sourceStatus: radarCache.sourceStatus,
        error: error.message,
      }, 500));
    return;
  }

  if (pathname === "/") pathname = "/index.html";

  const filePath = path.normalize(path.join(publicDir, pathname));
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  sendFile(res, path.join(publicDir, "index.html"));
});

server.listen(port, () => {
  console.log(`Ocean board running on http://localhost:${port}`);
  refreshRadar();
});

setInterval(refreshRadar, radarRefreshMs).unref?.();
