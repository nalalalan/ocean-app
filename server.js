const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const radarCache = {
  updatedAt: null,
  items: [],
  error: null,
  sourceStatus: [],
};
const radarRefreshMs = 1000 * 60 * 60 * 6;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
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
  const aligned = /creative technolog|research scientist|research engineer|\br&d\b|research and development|prototype|prototyping|robotics|soft robotics|programmable matter|morphing|shape-changing|physical ai|mechatronics|animatronics|haptics|human[- ]robot|interactive technology|advanced development/i;
  const misaligned = /intern|internship|summer|lighting|theme lighting|designer sr|project hire|document control|audio|video|ride control|costume|graphic|producer|coordinator|manager|finance|marketing|public relations|culinary|retail|stage|construction|architecture|architectural|interior design|set design|scenic|merchandise|operations/i;
  return aligned.test(text) && !misaligned.test(text);
}

function isAlignedResearchSignal(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  const aligned = /soft robot|soft robotic|morphing|shape-changing|shape changing|haptic|tactile|continuum robot|compliant|metamaterial|programmable matter|embodied interaction|wearable|actuat|mechanism|fabricat|origami|deployable/i;
  const misaligned = /human-ai|human ai|language model|\bllm\b|large language|governance|misinformation|social media|recommender|policy/i;
  return aligned.test(text) && !misaligned.test(text);
}

async function fetchDisneySignals() {
  const url = "https://jobs.disneycareers.com/search-jobs?k=imagineering%20creative%20technologist&l=Glendale%2C%20CA";
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
          ? "Potentially aligned WDI technical R&D signal. Use its language only if it fits morphing structures, robotics, interaction, or show-control proof."
          : "Potentially aligned Disney technical R&D signal.",
      };
    })
    .filter(Boolean)
    .filter(isAlignedDisneyRole)
    .slice(0, 5);
}

async function fetchArxivSignals() {
  const query = encodeURIComponent('all:"soft robotics" OR all:"morphing structures" OR all:"shape-changing interfaces" OR all:"haptics" OR all:"tactile" OR all:"continuum robot" OR all:"compliant mechanism" OR all:"programmable matter"');
  const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=12&sortBy=submittedDate&sortOrder=descending`;
  const xml = await fetchText(url);
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries.map((entry) => {
    const title = tagText(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
    const summary = tagText(entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]).slice(0, 360);
    const published = tagText(entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]).slice(0, 10);
    const link = entry.match(/<id>([\s\S]*?)<\/id>/)?.[1]?.trim();
    return {
      type: "Research signal",
      source: "arXiv",
      title,
      date: published,
      location: "Research",
      url: link,
      summary,
      why: "Recent research signal near soft robotics, morphing structures, haptics, HRI, or shape-changing interfaces.",
    };
  }).filter((item) => item.title && item.url).filter(isAlignedResearchSignal).slice(0, 5);
}

function curatedTargetSignals() {
  return [
    {
      type: "Target lane",
      source: "Disney Careers",
      title: "WDI R&D / Creative Technologist / R&D Imagineer search",
      date: "live search",
      location: "Glendale or Disney R&D",
      url: "https://jobs.disneycareers.com/search-jobs?k=WDI%20Research%20Development%20Creative%20Technologist",
      why: "Primary target lane. Only worth attention when the role involves R&D, prototyping, robotics, creative technology, or physical interactive systems.",
    },
    {
      type: "Target lane",
      source: "Disney Research Studios",
      title: "Research Scientist / Research Engineer in high-tech creative systems",
      date: "careers page",
      location: "Disney Research",
      url: "https://studios.disneyresearch.com/careers/",
      why: "Strong Disney-adjacent lane when the work touches physical simulation, robotics, interaction, fabrication, or creative tools.",
    },
    {
      type: "Target lane",
      source: "Meta Careers",
      title: "Reality Labs Research Scientist / Research Engineer",
      date: "live search",
      location: "Reality Labs",
      url: "https://www.metacareers.com/jobs/?q=Reality%20Labs%20robotics%20haptics%20research%20scientist",
      why: "Only relevant when it is robotics, haptics, physical interaction, embodied AI, or hardware prototyping.",
    },
    {
      type: "Target lane",
      source: "RAI Institute",
      title: "Robotics Research Scientist",
      date: "careers page",
      location: "Boston / Cambridge robotics research",
      url: "https://rai-inst.com/careers/",
      why: "Great adjacent lane for deep robotics research if the role values physical intelligence, mechanisms, or embodied systems.",
    },
    {
      type: "Target lane",
      source: "NASA JPL",
      title: "Robotics / mechanisms / autonomy research roles",
      date: "careers page",
      location: "JPL Robotics",
      url: "https://www.jpl.jobs/robotics-careers",
      why: "Relevant when the role involves robotics, mechanisms, deployable systems, autonomy, or fieldable physical prototypes.",
    },
    {
      type: "Target lane",
      source: "MIT CSAIL",
      title: "Postdoc / research staff in robotics or programmable matter",
      date: "jobs page",
      location: "MIT CSAIL / Media Lab orbit",
      url: "https://www.csail.mit.edu/about/jobs-csail",
      why: "Relevant as a postdoc lane if it helps you become known for programmable matter, morphing systems, robotics, or HRI.",
    },
    {
      type: "Target lane",
      source: "CMU Robotics Institute",
      title: "Postdoc / research staff in robotics, morphing systems, or HRI",
      date: "postdoc page",
      location: "Pittsburgh robotics research",
      url: "https://www.ri.cmu.edu/people/postdocs/",
      why: "Relevant only when the lab strengthens the programmable-matter or creative robotics trajectory.",
    },
  ];
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
    radarCache.sourceStatus = sourceStatus;
    radarCache.error = sourceStatus.some((row) => !row.ok)
      ? sourceStatus.filter((row) => !row.ok).map((row) => `${row.source}: ${row.detail}`).join("; ")
      : null;
  } catch (error) {
    radarCache.error = error.message;
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
  console.log(`Ocean tracker running on http://localhost:${port}`);
  refreshRadar();
});

setInterval(refreshRadar, radarRefreshMs).unref?.();
