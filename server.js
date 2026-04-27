const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const radarCache = {
  updatedAt: null,
  items: [],
  error: null,
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
    headers: {
      "user-agent": "Ocean career radar (personal tracker; contact via site owner)",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
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
          ? "A current WDI role signal. Use its language to tune your Ocean portfolio."
          : "A Disney role signal that may reveal adjacent creative technology keywords.",
      };
    })
    .filter(Boolean)
    .filter((item) => /imagineering|audio|video|show|ride|creative|lighting|r&d|technology|designer|engineer/i.test(`${item.title} ${item.why}`))
    .slice(0, 5);
}

async function fetchArxivSignals() {
  const query = encodeURIComponent('all:"soft robotics" OR all:"morphing structures" OR all:"shape-changing interfaces" OR all:"haptics" OR all:"human robot interaction"');
  const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=6&sortBy=submittedDate&sortOrder=descending`;
  const xml = await fetchText(url);
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries.slice(0, 5).map((entry) => {
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
  }).filter((item) => item.title && item.url);
}

function staticSearchSignals() {
  return [
    {
      type: "Opportunity search",
      source: "Meta Careers",
      title: "Reality Labs / haptics / embodied interaction searches",
      date: "live search",
      location: "Meta",
      url: "https://www.metacareers.com/jobs/?q=Reality%20Labs%20haptics%20robotics",
      why: "Good adjacent path for soft robotics, haptics, embodied interaction, and hardware prototyping.",
    },
    {
      type: "Opportunity search",
      source: "Google Careers",
      title: "Robotics / research engineer / HCI searches",
      date: "live search",
      location: "Google",
      url: "https://www.google.com/about/careers/applications/jobs/results/?q=robotics%20research%20engineer",
      why: "Good adjacent path for robotic systems, human-centered AI, simulation, and interaction R&D.",
    },
    {
      type: "Research careers",
      source: "Google Research",
      title: "Google Research careers overview",
      date: "live page",
      location: "Google Research",
      url: "https://research.google/careers/",
      why: "Useful for positioning your PhD as research engineering with deployable prototypes.",
    },
  ];
}

async function refreshRadar() {
  try {
    const [disney, arxiv] = await Promise.allSettled([
      fetchDisneySignals(),
      fetchArxivSignals(),
    ]);
    const items = [
      ...(disney.status === "fulfilled" ? disney.value : []),
      ...(arxiv.status === "fulfilled" ? arxiv.value : []),
      ...staticSearchSignals(),
    ];
    radarCache.updatedAt = new Date().toISOString();
    radarCache.items = items;
    radarCache.error = null;
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
    const stale = !radarCache.updatedAt || Date.now() - new Date(radarCache.updatedAt).getTime() > radarRefreshMs;
    (stale ? refreshRadar() : Promise.resolve(radarCache))
      .then((radar) => sendJson(res, radar))
      .catch((error) => sendJson(res, { updatedAt: radarCache.updatedAt, items: radarCache.items, error: error.message }, 500));
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
