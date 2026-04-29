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

function metaContent(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escaped}["'][^>]*>`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return htmlDecode(match[1]);
  }
  return "";
}

function normalizeUrl(value, baseUrl) {
  if (!value) return "";
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return "";
  }
}

async function fetchText(url, timeoutMs = 15000) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "user-agent": "Ocean career radar (personal tracker; contact via site owner)",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

async function fetchPagePreview(url) {
  const html = await fetchText(url, 5500);
  const image = normalizeUrl(
    metaContent(html, "og:image")
      || metaContent(html, "twitter:image")
      || html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1],
    url
  );
  return {
    image,
    description: metaContent(html, "og:description") || metaContent(html, "description"),
  };
}

async function enrichSignalImages(items) {
  const output = items.map((item) => ({ ...item }));
  const queue = output
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.image && item.url && !item.url.toLowerCase().endsWith(".pdf"));
  const workerCount = Math.min(10, queue.length);
  let cursor = 0;

  async function worker() {
    while (cursor < queue.length) {
      const { item, index } = queue[cursor];
      cursor += 1;
      try {
        const preview = await fetchPagePreview(item.url);
        if (preview.image) output[index].image = preview.image;
        if (!output[index].summary && preview.description) output[index].summary = preview.description.slice(0, 360);
      } catch {
        // Keep the signal even if a source refuses preview metadata.
      }
    }
  }

  await Promise.all(Array.from({ length: workerCount }, worker));
  return output;
}

function isAlignedDisneyRole(item) {
  const text = `${item.title || ""} ${item.location || ""}`.toLowerCase();
  const aligned = /imagineering|creative technolog|research scientist|research engineer|\br&d\b|research and development|prototype|prototyping|robotics|soft robotics|programmable matter|morphing|shape-changing|physical ai|mechatronics|animatronics|haptics|human[- ]robot|interactive technology|advanced development|show system|show control|ride system|special effects|fabricat|simulation|interactive|immersive|experience technolog|tools engineer|technical director/i;
  const misaligned = /intern|internship|summer|document control|costume|graphic|producer|coordinator|finance|marketing|public relations|culinary|retail|merchandise|operations|guest service|sales|human resources|legal|accounting/i;
  return aligned.test(text) && !misaligned.test(text);
}

function isAlignedResearchSignal(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  const aligned = /soft robot|soft robotic|morphing|shape-changing|shape changing|haptic|tactile|continuum robot|compliant|metamaterial|programmable matter|embodied interaction|wearable|actuat|mechanism|fabricat|origami|deployable|human[- ]robot|tangible interface|interactive fabrication|robotic material|physical interaction|embodied ai|animatronic|simulation|gesture|sensor|adaptive structure|design tool|robot learning|manipulation|dexterous|bioinspired|bio-inspired|mechatronic|material intelligence|physical intelligence|computational design|generative design|additive manufacturing|digital fabrication|interactive system|creative tool|computer graphics|spatial computing|xr/i;
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
  const query = encodeURIComponent('all:"soft robotics" OR all:"morphing structures" OR all:"shape-changing interfaces" OR all:"haptic interfaces" OR all:"tactile display" OR all:"continuum robot" OR all:"compliant mechanism" OR all:"programmable matter" OR all:"human robot interaction" OR all:"tangible interfaces" OR all:"interactive fabrication" OR all:"robotic materials" OR all:"embodied AI" OR all:"physical intelligence" OR all:"robot learning" OR all:"dexterous manipulation" OR all:"computational design" OR all:"digital fabrication" OR all:"animatronics" OR all:"computer graphics" OR all:"creative tools" OR all:"spatial computing"');
  const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=60&sortBy=submittedDate&sortOrder=descending`;
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
  }).filter((item) => item.title && item.url).filter(isAlignedResearchSignal).slice(0, 14);
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
    {
      type: "University source",
      board: "Robotics Labs",
      source: "MIT CSAIL",
      title: "CSAIL robotics research",
      date: "source board",
      location: "MIT",
      url: "https://www.csail.mit.edu/research/robotics",
      topics: ["MIT", "robotics", "AI", "systems"],
      why: "A broad MIT lens for robotics, AI, manipulation, perception, and research taste.",
    },
    {
      type: "University source",
      board: "Fabrication",
      source: "MIT Center for Bits and Atoms",
      title: "How to make almost anything",
      date: "source board",
      location: "MIT",
      url: "https://cba.mit.edu/",
      topics: ["digital fabrication", "materials", "machines", "learning"],
      why: "A source lane for fabrication, machines, physical computation, and the mindset of making strange things real.",
    },
    {
      type: "University source",
      board: "Tangible Interfaces",
      source: "MIT Media Lab",
      title: "Tangible Media Group",
      date: "source board",
      location: "MIT Media Lab",
      url: "https://tangible.media.mit.edu/",
      topics: ["tangible media", "shape displays", "interfaces", "materials"],
      why: "A deep source for physical-digital interfaces, shape displays, and computation becoming matter.",
    },
    {
      type: "University source",
      board: "Haptics",
      source: "Stanford CHARM Lab",
      title: "Haptics and human-robot systems",
      date: "source board",
      location: "Stanford",
      url: "https://charm.stanford.edu/Main/Research",
      topics: ["haptics", "touch", "HRI", "interfaces"],
      why: "Useful for learning how touch, interaction, robots, and humans become one technical problem.",
    },
    {
      type: "University source",
      board: "Computational Design",
      source: "Stanford Shape Lab",
      title: "Shape-changing interfaces and design tools",
      date: "source board",
      location: "Stanford",
      url: "https://shape.stanford.edu/",
      topics: ["shape change", "interfaces", "design tools", "HCI"],
      why: "Strong adjacent taste: interfaces, geometry, design systems, and physical interaction.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "UC Berkeley",
      title: "Berkeley Artificial Intelligence Research",
      date: "source board",
      location: "Berkeley",
      url: "https://bair.berkeley.edu/blog/",
      topics: ["robot learning", "AI", "manipulation", "research"],
      why: "A broad research feed for AI and robotics ideas that can transfer into physical systems.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "UC Berkeley",
      title: "Berkeley Automation Lab",
      date: "source board",
      location: "Berkeley",
      url: "https://automation.berkeley.edu/",
      topics: ["automation", "robotics", "manipulation", "systems"],
      why: "Useful for manipulation, autonomy, algorithms, and reliable robot behavior.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "Harvard Wyss Institute",
      title: "Soft robotics and bioinspired engineering",
      date: "source board",
      location: "Harvard",
      url: "https://wyss.harvard.edu/technology/soft-robotic-exosuit/",
      topics: ["soft robotics", "wearables", "actuation", "bioinspired"],
      why: "A practical source for soft structures, actuation, wearables, and research becoming real technology.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "EPFL",
      title: "Reconfigurable Robotics Lab",
      date: "source board",
      location: "EPFL",
      url: "https://www.epfl.ch/labs/rrl/",
      topics: ["reconfigurable robotics", "soft robotics", "origami", "mechanisms"],
      why: "A concentrated source for robots that change shape, reconfigure, fold, and adapt.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "ETH Zurich",
      title: "Soft Robotic Matter",
      date: "source board",
      location: "ETH Zurich",
      url: "https://softroboticmatter.ethz.ch/",
      topics: ["soft robotic matter", "materials", "actuation", "mechanisms"],
      why: "A material-first lane for soft robotics, structures, actuation, and embodied physical intelligence.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Max Planck Institute",
      title: "Intelligent Systems research",
      date: "source board",
      location: "Max Planck",
      url: "https://is.mpg.de/",
      topics: ["intelligent systems", "robotics", "materials", "learning"],
      why: "A high-prestige feed across robotics, control, materials, perception, and physical intelligence.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Georgia Tech",
      title: "Robotics and intelligent machines",
      date: "source board",
      location: "Georgia Tech",
      url: "https://research.gatech.edu/robotics",
      topics: ["robotics", "systems", "autonomy", "HRI"],
      why: "Good breadth for robotics systems, interaction, autonomy, and applied research.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Cornell",
      title: "Robotics and embodied intelligence",
      date: "source board",
      location: "Cornell",
      url: "https://robotics.cornell.edu/",
      topics: ["robotics", "embodied intelligence", "mechanisms", "learning"],
      why: "A strong university lane for robots, physical intelligence, mechanisms, and embodied systems.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "Soft Robotics Toolkit",
      title: "Soft Robotics Toolkit",
      date: "learning source",
      location: "open learning",
      url: "https://softroboticstoolkit.com/",
      topics: ["soft robotics", "fabrication", "actuation", "tutorials"],
      why: "A learning-heavy source for building, fabricating, and understanding soft robots.",
    },
    {
      type: "Learning source",
      board: "Robotics Labs",
      source: "MIT",
      title: "Underactuated Robotics",
      date: "course notes",
      location: "MIT",
      url: "https://underactuated.csail.mit.edu/",
      topics: ["robot dynamics", "control", "learning", "systems"],
      why: "A serious course/book for building the math taste behind robots that move in the real world.",
    },
    {
      type: "Learning source",
      board: "Computer Graphics",
      source: "SIGGRAPH",
      title: "Computer graphics and interactive techniques",
      date: "source board",
      location: "ACM SIGGRAPH",
      url: "https://www.siggraph.org/",
      topics: ["graphics", "simulation", "creative tools", "visual systems"],
      why: "Important adjacent knowledge for Disney Research, creative tools, simulation, animation, and visual invention.",
    },
    {
      type: "Learning source",
      board: "HCI",
      source: "ACM UIST",
      title: "User interface software and technology",
      date: "source board",
      location: "HCI research",
      url: "https://uist.acm.org/",
      topics: ["HCI", "interfaces", "interactive systems", "tools"],
      why: "A dense source for strange interfaces, interaction techniques, tools, fabrication, and future-feeling systems.",
    },
    {
      type: "Learning source",
      board: "HCI",
      source: "ACM CHI",
      title: "Human factors in computing systems",
      date: "source board",
      location: "HCI research",
      url: "https://chi.acm.org/",
      topics: ["HCI", "human systems", "interaction", "research"],
      why: "A broad source for understanding people, interfaces, social context, and interaction research.",
    },
    {
      type: "Lab source",
      board: "Disney",
      source: "Disney Research Studios",
      title: "Disney Research careers",
      date: "careers page",
      location: "creative R&D",
      url: "https://studios.disneyresearch.com/careers/",
      topics: ["Disney Research", "careers", "creative technology", "R&D"],
      why: "A direct source for the kind of role language and proof Disney Research values.",
    },
    {
      type: "Lab source",
      board: "Disney",
      source: "Walt Disney Imagineering",
      title: "Imagineering culture and projects",
      date: "source board",
      location: "WDI",
      url: "https://sites.disney.com/waltdisneyimagineering/",
      topics: ["Imagineering", "creative technology", "attractions", "systems"],
      why: "A broad source for how Disney frames creative technology, teamwork, and public-scale technical storytelling.",
    },
    {
      type: "University source",
      board: "HCI",
      source: "MIT Media Lab",
      title: "Fluid Interfaces",
      date: "source board",
      location: "MIT Media Lab",
      url: "https://www.media.mit.edu/groups/fluid-interfaces/overview/",
      topics: ["HCI", "wearables", "interfaces", "AI"],
      why: "A useful lane for future-feeling interfaces, personal systems, wearables, and weird prototypes.",
    },
    {
      type: "University source",
      board: "Biomechatronics",
      source: "MIT Media Lab",
      title: "Biomechatronics",
      date: "source board",
      location: "MIT Media Lab",
      url: "https://www.media.mit.edu/groups/biomechatronics/overview/",
      topics: ["biomechatronics", "prosthetics", "soft systems", "wearables"],
      why: "A strong source for physical human-machine systems, embodiment, actuation, and assistive hardware.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Stanford",
      title: "Stanford Robotics Center",
      date: "source board",
      location: "Stanford",
      url: "https://robotics.stanford.edu/",
      topics: ["robotics", "learning", "systems", "autonomy"],
      why: "A broad Stanford doorway into robotics labs, people, projects, and research directions.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "UPenn",
      title: "GRASP Laboratory",
      date: "source board",
      location: "University of Pennsylvania",
      url: "https://www.grasp.upenn.edu/",
      topics: ["robotics", "perception", "control", "systems"],
      why: "A high-density robotics lab source for perception, control, autonomy, and robot systems.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "University of Washington",
      title: "Personal Robotics Lab",
      date: "source board",
      location: "UW",
      url: "https://personalrobotics.cs.washington.edu/",
      topics: ["personal robots", "HRI", "manipulation", "AI"],
      why: "Useful for human-centered robotics, manipulation, assistance, and robots in everyday settings.",
    },
    {
      type: "University source",
      board: "Creative Machines",
      source: "Columbia University",
      title: "Creative Machines Lab",
      date: "source board",
      location: "Columbia",
      url: "https://www.creativemachineslab.com/",
      topics: ["creative machines", "robotics", "fabrication", "AI"],
      why: "A broad creative R&D source for robotics, fabrication, self-modeling systems, and invention.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "Yale",
      title: "Faboratory",
      date: "source board",
      location: "Yale",
      url: "https://www.eng.yale.edu/grablab/",
      topics: ["soft robotics", "fabrication", "grippers", "materials"],
      why: "A concrete soft robotics source for fabrication, grippers, materials, and physical prototypes.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "UC San Diego",
      title: "Contextual Robotics Institute",
      date: "source board",
      location: "UCSD",
      url: "https://contextualrobotics.ucsd.edu/",
      topics: ["robotics", "context", "autonomy", "HRI"],
      why: "A broad robotics source with real-world context, autonomy, sensing, and human environments.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "Harvard",
      title: "Microrobotics Lab",
      date: "source board",
      location: "Harvard",
      url: "https://micro.seas.harvard.edu/",
      topics: ["microrobotics", "bioinspired", "mechanisms", "fabrication"],
      why: "A precise source for tiny mechanisms, bioinspired robots, fabrication, and elegant physical systems.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Johns Hopkins",
      title: "Laboratory for Computational Sensing and Robotics",
      date: "source board",
      location: "Johns Hopkins",
      url: "https://lcsr.jhu.edu/",
      topics: ["robotics", "sensing", "medical robotics", "systems"],
      why: "A broad source for robotics systems, sensing, medical robotics, and precise hardware-software integration.",
    },
    {
      type: "University source",
      board: "Soft Robotics",
      source: "TU Delft",
      title: "Soft robotics and physical intelligence",
      date: "source board",
      location: "TU Delft",
      url: "https://www.tudelft.nl/en/3me/departments/bio-mechanical-engineering/research/soft-robotics",
      topics: ["soft robotics", "physical intelligence", "mechanisms", "bioinspired"],
      why: "A useful European source for soft robots, physical intelligence, and embodied design.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "Imperial College London",
      title: "Dyson Robotics Lab",
      date: "source board",
      location: "Imperial",
      url: "https://www.imperial.ac.uk/dyson-robotics-lab/",
      topics: ["robotics", "AI", "perception", "manipulation"],
      why: "A strong robotics source for robots that perceive, learn, manipulate, and operate in human spaces.",
    },
    {
      type: "University source",
      board: "Robotics Labs",
      source: "University of Tokyo",
      title: "JSK Robotics Laboratory",
      date: "source board",
      location: "University of Tokyo",
      url: "https://www.jsk.t.u-tokyo.ac.jp/",
      topics: ["robotics", "humanoids", "systems", "mechatronics"],
      why: "A deep robotics systems source across humanoids, perception, manipulation, and mechatronics.",
    },
    {
      type: "Industry source",
      board: "Robotics Labs",
      source: "Google Research",
      title: "Robotics research",
      date: "source board",
      location: "Google Research",
      url: "https://research.google/teams/robotics/",
      topics: ["robot learning", "AI", "manipulation", "generalist robots"],
      why: "A useful industry research source for robot learning, foundation models for action, and physical AI.",
    },
    {
      type: "Industry source",
      board: "Computer Graphics",
      source: "NVIDIA Research",
      title: "Graphics, simulation, and robotics research",
      date: "source board",
      location: "NVIDIA",
      url: "https://research.nvidia.com/",
      topics: ["simulation", "graphics", "robotics", "AI"],
      why: "Important adjacent knowledge for simulation, graphics, generative tools, robotics, and creative systems.",
    },
    {
      type: "Conference source",
      board: "Robotics Labs",
      source: "IEEE ICRA",
      title: "International Conference on Robotics and Automation",
      date: "source board",
      location: "robotics conference",
      url: "https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra",
      topics: ["robotics", "automation", "research", "systems"],
      why: "A core robotics conference source for the field's breadth: mechanisms, autonomy, manipulation, control, and HRI.",
    },
    {
      type: "Conference source",
      board: "Robotics Labs",
      source: "IEEE IROS",
      title: "Intelligent Robots and Systems",
      date: "source board",
      location: "robotics conference",
      url: "https://www.ieee-ras.org/conferences-workshops/financially-co-sponsored/iros",
      topics: ["robotics", "intelligent systems", "research", "field"],
      why: "Another core robotics field source, useful for broad taste and discovering what serious robotics groups are doing.",
    },
    {
      type: "Conference source",
      board: "Haptics",
      source: "IEEE Haptics Symposium",
      title: "Haptics Symposium",
      date: "source board",
      location: "haptics conference",
      url: "https://2026.hapticssymposium.org/",
      topics: ["haptics", "touch", "interfaces", "hardware"],
      why: "A concentrated source for touch, tactile feedback, wearable haptics, and physical interaction.",
    },
    {
      type: "Learning source",
      board: "Computer Graphics",
      source: "PBRT",
      title: "Physically Based Rendering",
      date: "book",
      location: "open textbook",
      url: "https://pbr-book.org/",
      topics: ["graphics", "simulation", "rendering", "math"],
      why: "A serious knowledge source for rendering, simulation, light, geometry, and technical visual thinking.",
    },
    {
      type: "Learning source",
      board: "Computer Graphics",
      source: "CMU",
      title: "Computer Graphics course notes",
      date: "course",
      location: "CMU",
      url: "https://15462.courses.cs.cmu.edu/fall2020/",
      topics: ["graphics", "geometry", "simulation", "creative systems"],
      why: "A practical technical base for graphics, simulation, geometry, and tools that connect to Disney Research.",
    },
    ...deepDiveSignals(),
  ];
}

function deepDiveSignals() {
  const rows = [
    ["University source", "Shape + Matter", "CMU Morphing Matter Lab", "Morphing Matter Lab", "source board", "Carnegie Mellon", "https://morphingmatter.cs.cmu.edu/", ["morphing matter", "fabrication", "HCI", "materials"], "A direct source for shape-changing materials, computational fabrication, and interactive physical systems."],
    ["University source", "Robotics Labs", "University of Michigan", "Michigan Robotics research", "source board", "Michigan Robotics", "https://robotics.umich.edu/research/", ["robotics", "autonomy", "HRI", "field systems"], "A broad robotics map across manipulation, autonomy, human-robot interaction, and physical systems."],
    ["University source", "Robotics Labs", "Northwestern", "Center for Robotics and Biosystems", "source board", "Northwestern", "https://robotics.northwestern.edu/", ["robotics", "biosystems", "soft systems", "mechanisms"], "A useful bridge between robotics, biology, materials, and systems that move."],
    ["University source", "Robotics Labs", "Caltech", "Center for Autonomous Systems and Technologies", "source board", "Caltech", "https://cast.caltech.edu/", ["autonomy", "robotics", "aerospace", "systems"], "A high-prestige source for autonomy, robotics, aerospace systems, and rigorous engineering taste."],
    ["University source", "Robotics Labs", "ETH Zurich", "Robotic Systems Lab", "source board", "ETH Zurich", "https://rsl.ethz.ch/", ["legged robots", "field robots", "control", "mechanisms"], "A serious source for robust robots, locomotion, control, field testing, and physical reliability."],
    ["University source", "Robotics Labs", "EPFL", "Biorobotics Laboratory", "source board", "EPFL", "https://www.epfl.ch/labs/biorob/", ["bioinspired", "locomotion", "soft robotics", "mechanisms"], "A strong bioinspired robotics lane for learning how animals, mechanisms, and controllers meet."],
    ["University source", "Soft Robotics", "WPI", "Soft robotics and robotics research", "source board", "WPI", "https://www.wpi.edu/academics/departments/robotics-engineering/research", ["robotics", "soft robotics", "WPI", "projects"], "A local academic lane for robotics research language, projects, and nearby collaborators."],
    ["University source", "Robotics Labs", "Maryland Robotics Center", "Robotics research", "source board", "University of Maryland", "https://robotics.umd.edu/", ["robotics", "autonomy", "sensing", "systems"], "A broad university source for robotics, autonomy, sensing, and physical systems."],
    ["University source", "HCI", "Brown University", "Human-Computer Interaction research", "source board", "Brown", "https://hci.cs.brown.edu/", ["HCI", "interfaces", "visualization", "interaction"], "Useful for thinking about people, interfaces, prototypes, and how technical systems land emotionally."],
    ["University source", "Haptics", "Rice University", "Mechatronics and Haptic Interfaces Lab", "source board", "Rice", "https://mahilab.rice.edu/", ["haptics", "mechatronics", "rehab robotics", "interfaces"], "A focused source for haptics, mechatronics, and human-centered robotic hardware."],
    ["University source", "HCI", "University of Colorado Boulder", "ATLAS Institute", "source board", "CU Boulder", "https://www.colorado.edu/atlas/", ["creative technology", "HCI", "fabrication", "art"], "A wider creative technology lane for work that mixes engineering, art, interaction, and physical making."],
    ["University source", "HCI", "NYU", "Future Reality Lab", "source board", "NYU", "https://frl.nyu.edu/", ["XR", "interfaces", "spatial computing", "graphics"], "A strong source for future-facing interfaces, spatial computing, graphics, and mixed reality systems."],
    ["University source", "Robotics Labs", "MIT", "Robot Locomotion Group", "source board", "MIT", "https://locomotion.csail.mit.edu/", ["robotics", "control", "locomotion", "learning"], "A deep source for dynamics, control, robot movement, and the math behind physical behavior."],
    ["University source", "Robotics Labs", "Stanford", "Interactive Perception and Robot Learning", "source board", "Stanford", "https://iprl.stanford.edu/", ["robot learning", "perception", "manipulation", "embodied AI"], "Useful for robot learning and manipulation ideas that connect AI to physical action."],
    ["Industry source", "Robotics Labs", "Boston Dynamics", "Atlas and robot platforms", "source board", "Boston Dynamics", "https://bostondynamics.com/atlas/", ["robotics", "locomotion", "hardware", "control"], "A visual source for physical credibility: movement, hardware constraints, control, and demo discipline."],
    ["Industry source", "Robotics Labs", "Toyota Research Institute", "Robotics research", "source board", "TRI", "https://www.tri.global/research/robotics", ["robotics", "robot learning", "manipulation", "human assistance"], "A practical industry R&D source for robots that learn, assist, and operate around people."],
    ["Industry source", "Robotics Labs", "SRI", "Robotics research", "source board", "SRI", "https://www.sri.com/research-development/robotics/", ["robotics", "sensing", "field systems", "hardware"], "A source for applied robotics, field systems, mechanisms, sensing, and mature R&D."],
    ["Industry source", "Creative Tools", "Autodesk Research", "Design and make research", "source board", "Autodesk", "https://www.research.autodesk.com/", ["design tools", "fabrication", "AI", "creative systems"], "A strong adjacent source for computational design, making, generative tools, and creative engineering."],
    ["Industry source", "Creative Tools", "Adobe Research", "Creative intelligence research", "source board", "Adobe", "https://research.adobe.com/", ["creative tools", "graphics", "AI", "media"], "Useful for seeing how creative software research becomes tools artists actually use."],
    ["Industry source", "Computer Graphics", "Pixar", "Pixar graphics research", "source board", "Pixar", "https://graphics.pixar.com/library/", ["graphics", "simulation", "animation", "rendering"], "A deep archive for animation, rendering, simulation, and production-quality creative technology."],
    ["Industry source", "Computer Graphics", "Epic Games", "Unreal Engine research and learning", "source board", "Epic", "https://dev.epicgames.com/community/learning", ["real-time graphics", "tools", "simulation", "worlds"], "Useful for real-time worlds, interactive systems, simulation, tools, and visual prototyping."],
    ["Learning source", "Robotics Labs", "Robotics Conference Videos", "Robotics talks and lectures", "source board", "YouTube", "https://www.youtube.com/results?search_query=robotics+research+lecture+soft+robotics+haptics+creative+technology", ["lectures", "robotics", "learning", "research"], "A broad doorway into talks when the right move is to watch serious builders explain their work."],
    ["Learning source", "Disney", "Imagineering in a Box", "Imagineering learning program", "course", "Disney / Khan Academy", "https://www.khanacademy.org/humanities/hass-storytelling/imagineering-in-a-box", ["Disney", "Imagineering", "experience design", "learning"], "A friendly but useful source for how Disney frames worlds, characters, story, and experience design."],
    ["Learning source", "Fabrication", "Fab Academy", "How to make almost anything globally", "course", "Fab Academy", "https://fabacademy.org/", ["fabrication", "electronics", "machines", "prototypes"], "A structured source for building physical capability across machines, electronics, materials, and proofs."],
    ["Learning source", "Computer Graphics", "Scratchapixel", "Computer graphics from first principles", "course", "Scratchapixel", "https://www.scratchapixel.com/", ["graphics", "math", "rendering", "simulation"], "A practical learning source for the visual math behind graphics, simulation, and creative systems."],
    ["Conference source", "HCI", "ACM TEI", "Tangible, Embedded, and Embodied Interaction", "source board", "ACM TEI", "https://tei.acm.org/", ["tangible interaction", "embodied interaction", "HCI", "physical interfaces"], "A concentrated field source for physical interfaces, embodied interaction, and experimental systems."],
    ["Conference source", "Creative Tools", "SIGGRAPH Emerging Technologies", "Emerging technologies", "source board", "SIGGRAPH", "https://s2026.siggraph.org/program/emerging-technologies/", ["emerging technology", "graphics", "interaction", "installation"], "A visual source for strange prototypes, installations, interaction, graphics, and future-facing demos."],
    ["Conference source", "Haptics", "IEEE World Haptics", "World Haptics conference", "source board", "IEEE", "https://2025.worldhaptics.org/", ["haptics", "touch", "wearables", "interfaces"], "A broad haptics source for touch, tactile displays, force feedback, wearables, and interaction hardware."],
    ["Conference source", "Robotics Labs", "RSS", "Robotics: Science and Systems", "source board", "RSS", "https://roboticsconference.org/", ["robotics", "science", "systems", "papers"], "A core robotics research source with high-signal papers, talks, and lab directions."],
    ["Conference source", "Creative Tools", "NeurIPS Creative AI", "AI for creativity and embodied systems", "source board", "NeurIPS", "https://neurips.cc/", ["AI", "tools", "robot learning", "research"], "A broad AI research source to scan selectively for creative tools, embodied AI, simulation, and robot learning."],
  ];

  return rows.map(([type, board, source, title, date, location, url, topics, why]) => ({
    type,
    board,
    source,
    title,
    date,
    location,
    url,
    topics,
    why,
  }));
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
    const curated = await enrichSignalImages(curatedTargetSignals());
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
      {
        source: "Ocean source map",
        ok: true,
        count: curated.length,
        detail: `${curated.filter((item) => item.image).length} visual sources across labs, universities, conferences, and learning paths`,
      },
    ];
    const items = [
      ...(disney.status === "fulfilled" ? disney.value : []),
      ...curated,
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
