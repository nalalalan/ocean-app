const app = document.getElementById("app");

const palette = ["#2f9d98", "#4f8290", "#c9796e", "#c98a53", "#df6a59", "#b95c76", "#7fb9a8"];

const sourceImages = {
  wdiCampus: "https://sites.disney.com/app/uploads/sites/55/2021/06/Avengers_Campus_DCA.jpg",
  wdiNeverland: "https://sites.disney.com/app/uploads/sites/55/2024/06/TDS_Neverland_01-scaled.jpg",
  wdiWebslingers: "https://sites.disney.com/app/uploads/sites/55/2021/06/AC_Webslingers_Art.jpg",
  wdiCulture: "https://sites.disney.com/app/uploads/sites/55/2019/10/WDAPL_2018_June_08_0342_FIX.jpg",
  disneyRig: "https://studios.disneyresearch.com/app/uploads/2026/03/CANRIG-Cross-Attention-Neural-Face-Rigging-with-Variable-Local-Control-Image-400x250.png",
  disneyAvatar: "https://studios.disneyresearch.com/app/uploads/2026/04/FastGHA-Generalized-Few-Shot-3D-Gaussian-Head-Avatars-with-Real-Time-Animation--400x250.png",
  disneyMotion: "https://studios.disneyresearch.com/app/uploads/2025/12/Shaping-Strands-with-Neural-Style-Transfer-Image-400x250.jpg",
  disneyDiffusion: "https://studios.disneyresearch.com/app/uploads/2026/04/HIGS-History-Guided-Sampling-for-Diffusion-Models-Image-400x250.jpg",
  disneyAutonomousHri: "https://la.disneyresearch.com/wp-content/uploads/autonomous_interaction_teaser-1024x517.jpg",
  disneyQuaternion: "https://la.disneyresearch.com/wp-content/uploads/A-Versatile-Quaternion-based-Constrained-Rigid-Body-Dynamics-Teaser-1024x299.jpg",
  disneyAmor: "https://la.disneyresearch.com/wp-content/uploads/AMOR-1-1024x211.png",
  disneyRobotMdm: "https://la.disneyresearch.com/wp-content/uploads/image-12-1024x333.png",
  disneyPneumatic: "https://la.disneyresearch.com/wp-content/uploads/papers_745s3-1024x683.jpg",
  disneyGaits: "https://la.disneyresearch.com/wp-content/uploads/Images_Interactive_Design_of_Stylized_Walking_Gaits_for_Robotic_Characters-4-1024x255.jpg",
  disneyBdx: "https://la.disneyresearch.com/wp-content/uploads/BDX-1024x683.png",
  chainmail: "https://tangpengbin.github.io/publications/DIM/project_files/images/teaser.png",
  metaTruss: "https://engineering.berkeley.edu/wp-content/uploads/2025/09/metatruss_feature_01.png",
  metaTrussVideo: "https://engineering.berkeley.edu/wp-content/uploads/2025/09/Screenshot_Metatruss_Video-scaled.jpg",
  metaTrussHelmet: "https://engineering.berkeley.edu/wp-content/uploads/2025/09/metatruss_12-1200x675.png",
  metaTrussBrace: "https://images.squarespace-cdn.com/content/v1/5fc1dbf8116eb00e3c52b568/a0208527-4e70-43b3-b970-5b442dd9443a/metatruss-19.jpg",
  morphingSkin: "https://engineering.berkeley.edu/wp-content/uploads/2025/11/MorphingSkin.gif",
  thermorph: "https://engineering.berkeley.edu/wp-content/uploads/2025/11/20250903_Yao_AVL_0352_K0-C1-400x185.png",
  selfBuryingSeed: "https://engineering.berkeley.edu/wp-content/uploads/2025/11/Self-burying1.gif",
  droneSeed: "https://engineering.berkeley.edu/wp-content/uploads/2025/11/Drone.gif",
  seedGermination: "https://engineering.berkeley.edu/wp-content/uploads/2025/11/Seed_06-1-400x530.jpg",
  morphingSkinProject: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/68e9d16965dae60265da9daf/1762409841080/morphingskin.jpg?format=1500w",
  morphingTrussProject: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/t/690c328e03d8727c4c7b62ee/1762407054309/metatruss_feature_03.png?format=1500w",
  compliantWearable: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/683ddd5efd1bc35a8caea5cc/1772519640066/wearable+1.JPG?format=1500w",
  thermorphProject: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/5fc1dde2f81c9a2a0ce5f89e/1645918833655/01.jpg?format=1500w",
  sustainflatable: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/643ee8628a6092511d2bfa84/1731171067654/sustainflatable.jpg?format=1500w",
  recompfig: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/t/626f47d8500f0529b6e7cf25/1651460071660/ReCompFig_kinematic_display_4.png?format=1500w",
  pneumesh: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/628d2a2f08f9bc038c770f08/1653714945326/Screen+Shot+2022-05-28+at+1.14.52+AM.jpg?format=1500w",
  underwaterBeads: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/6217c46d00e83412216f512b/1645918689929/underwater_morphing_beads_thumbnail.jpg?format=1500w",
  simulearn: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/5fde6aa0f5f6422656473d77/1645918854935/simuLearn-web-17.jpg?format=1500w",
  electrodermis: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/5fc20f46bc819f1cf4201749/1645918933977/ElectroDermis01.jpg?format=1500w",
  epomemory: "https://static1.squarespace.com/static/5fc1dbf8116eb00e3c52b568/5fc1dde2f81c9a2a0ce5f828/6444b75cc6ed9c0cbde7f4e4/1682225185661/Wearable+controller.png?format=1500w",
  northwesternTouch: "https://news.northwestern.edu/assets/Stories/2025/03/Backhand-resize__FocusFillMaxWyIwLjAwIiwiMC4wMCIsMTIwMCw2MzBd.jpg",
  ucsbHaptic: "https://news.ucsb.edu/sites/default/files/2025-11/haptic-graphics-opt.jpg",
  arrayTac: "https://arraytac.github.io/assets/figures/figure1.png",
  bristolEmg: "https://www.bristol.ac.uk/media-library/sites/news/2025/october/gymnast-main%20article%20image.jpg",
  nvidiaRoboticsWeek: "https://blogs.nvidia.com/wp-content/uploads/2026/04/robotics-tech-blog-nrw-rolling-blog-1280x680-1.jpg",
  starVoronoi: "https://crl.ethz.ch/images/pub/logan2025-2.png",
  inverseInterlocking: "https://crl.ethz.ch/images/pub/pangbing2025.png",
  mitInform: "https://dam-prod.media.mit.edu/thumb/files/Display/inform.jpg.1400x1400.jpg",
  cmuRobotics: "https://www.ri.cmu.edu/app/uploads/2021/12/iris-integrstion-still-1-scaled.jpg",
};

function yt(id) {
  return `https://i.ytimg.com/vi/${id}/sddefault.jpg`;
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

const inspirationItems = [
  {
    id: "disney-olaf-2025",
    title: "Olaf in the physical world",
    source: "Disney Research Robotics",
    board: "Disney Research",
    kind: "2025 video",
    videoId: "-L8OFMTteOo",
    image: yt("-L8OFMTteOo"),
    url: "https://arxiv.org/abs/2512.16705",
    summary: "A recent free-roaming character robotics paper: animation references, reinforcement learning, thermal constraints, soft character surfaces, and believability under real-world physics.",
    tags: ["Disney Research", "robotics", "character control", "2025"],
    shape: "hero",
  },
  {
    id: "disney-falling-robots",
    title: "Robots that fall with character",
    source: "Moritz Baecher / Disney Research",
    board: "Disney Research",
    kind: "2025 video",
    videoId: "BXqpVMPk63A",
    image: yt("BXqpVMPk63A"),
    url: "https://www.baecher.info/publications/",
    summary: "A sharp reminder that physical characters need failure behavior too: recovery, damage reduction, end-pose control, and motion that still feels intentional.",
    tags: ["falling", "robot control", "Disney", "2025"],
    shape: "wide",
  },
  {
    id: "operator-imitation-hri",
    title: "Autonomous HRI via operator imitation",
    source: "Disney Research",
    board: "Disney Research",
    kind: "IROS 2025",
    videoId: "4U4etupwzhQ",
    image: sourceImages.disneyAutonomousHri,
    url: "https://la.disneyresearch.com/publication/autonomous-human-robot-interaction-via-operator-imitation/",
    summary: "Train autonomous robotic characters from expert operator data so interaction can retain social intuition instead of feeling like generic automation.",
    tags: ["HRI", "imitation", "robot characters", "2025"],
    shape: "hero",
  },
  {
    id: "amor-robot-character-control",
    title: "AMOR character control",
    source: "Disney Research",
    board: "Disney Research",
    kind: "SIGGRAPH 2025",
    videoId: "gQidYj-AKaA",
    image: sourceImages.disneyAmor,
    url: "https://la.disneyresearch.com/publication/amor-adaptive-character-control-through-multi-objective-reinforcement-learning/",
    summary: "Multi-objective RL for robotic characters: tune behavior after training instead of endlessly hand-tuning reward weights.",
    tags: ["reinforcement learning", "robotics", "characters", "SIGGRAPH"],
    shape: "wide",
  },
  {
    id: "quaternion-rbd-2025",
    title: "Quaternion constrained dynamics",
    source: "Disney Research",
    board: "Disney Research",
    kind: "SIGGRAPH 2025",
    videoId: "clHoSEbWjlQ",
    image: sourceImages.disneyQuaternion,
    url: "https://la.disneyresearch.com/publication/a-versatile-quaternion-based-constrained-rigid-body-dynamics/",
    summary: "A simulation engine tile for the part of robotics that is less glamorous and absolutely required: stable constrained rigid-body dynamics.",
    tags: ["simulation", "robotics", "dynamics", "2025"],
    shape: "wide",
  },
  {
    id: "robot-motion-diffusion",
    title: "Robot Motion Diffusion Model",
    source: "Disney Research",
    board: "Disney Research",
    kind: "SIGGRAPH Asia 2024",
    videoId: "eRXS98c_Suc",
    image: sourceImages.disneyRobotMdm,
    url: "https://la.disneyresearch.com/publication/robot-motion-diffusion-model-motion-generation-for-robotic-characters/",
    summary: "Text-conditioned motion generation connected to physics-based control: a useful bridge between generative AI and robots that actually move.",
    tags: ["motion diffusion", "robotics", "control", "characters"],
    shape: "hero",
  },
  {
    id: "vmp-physical-characters",
    title: "Motion priors for physical characters",
    source: "Moritz Baecher / Disney Research",
    board: "Disney Research",
    kind: "SCA 2024",
    videoId: "Q2I7u0tjlJs",
    image: yt("Q2I7u0tjlJs"),
    url: "https://www.baecher.info/publications/",
    summary: "Robustly track diverse motions on a physical bipedal character by learning useful priors instead of overfitting one canned demo.",
    tags: ["motion priors", "robots", "physical characters", "2024"],
    shape: "tall",
  },
  {
    id: "stylized-walking-gaits",
    title: "Stylized walking gaits",
    source: "Disney Research + WDI R&D",
    board: "Disney Research",
    kind: "SIGGRAPH 2024",
    videoId: "FDgW3983Cvc",
    image: sourceImages.disneyGaits,
    url: "https://la.disneyresearch.com/publication/interactive-design-of-stylized-walking-gaits-for-robotic-characters/",
    summary: "Artist-directed gait authoring for robotic characters: the exact overlap of animation taste, control, and hardware constraints.",
    tags: ["WDI R&D", "gaits", "animation", "robots"],
    shape: "hero",
  },
  {
    id: "bipedal-robotic-character",
    title: "Bipedal robotic character",
    source: "Disney Research + Walt Disney Imagineering",
    board: "Disney Research",
    kind: "RSS 2024",
    image: sourceImages.disneyBdx,
    url: "https://la.disneyresearch.com/publication/design-and-control-of-a-bipedal-robotic-character/",
    summary: "The core case study for a believable free-walking character: custom mechanics, animation-conditioned control, operator interface, and performance.",
    tags: ["Imagineering", "BDX", "character robot", "RSS"],
    shape: "wide",
  },
  {
    id: "soft-pneumatic-differentiable",
    title: "Soft pneumatic actuator design",
    source: "Disney Research",
    board: "Soft Robotics",
    kind: "SIGGRAPH 2024",
    image: sourceImages.disneyPneumatic,
    url: "https://la.disneyresearch.com/publication/soft-pneumatic-actuator-design-using-differentiable-simulation/",
    summary: "Differentiable simulation for soft robots that deform and push against the world. This is a direct lane from math to strange physical behavior.",
    tags: ["soft robotics", "differentiable simulation", "actuators"],
    shape: "wide",
  },
  {
    id: "spline-transformers",
    title: "Spline-based transformers",
    source: "Disney Research Studios",
    board: "Creative Tools",
    kind: "ECCV 2024",
    videoId: "AzolLlIbKhg",
    image: yt("AzolLlIbKhg"),
    url: "https://www.baecher.info/publications/",
    summary: "A creative-AI tile because Disney Research is not only robots: spline control points as an interaction handle for latent spaces.",
    tags: ["AI", "animation", "creative tools", "ECCV"],
    shape: "standard",
  },
  {
    id: "attention-map-locomotion",
    title: "Attention-map locomotion",
    source: "Disney Research",
    board: "Disney Research",
    kind: "2025 video",
    videoId: "GUgwB6WxcFo",
    image: yt("GUgwB6WxcFo"),
    url: "https://www.baecher.info/publications/",
    summary: "A current robotics signal around compact environment representation, attention, and legged motion through cluttered worlds.",
    tags: ["locomotion", "attention", "robotics", "2025"],
    shape: "standard",
  },
  {
    id: "thomaszewski-star-voronoi",
    title: "Star-shaped Voronoi metamaterials",
    source: "Bernhard Thomaszewski",
    board: "Computational Design",
    kind: "SIGGRAPH Asia 2025",
    image: sourceImages.starVoronoi,
    url: "https://crl.ethz.ch/papers/SSVDMetamaterials.pdf",
    summary: "A 2025 computational metamaterials direction: differentiable 3D Voronoi metrics for graded cellular structures and directional stiffness.",
    tags: ["metamaterials", "Voronoi", "optimization", "2025"],
    shape: "hero",
  },
  {
    id: "inverse-discrete-interlocking-materials",
    title: "Inverse design of interlocking materials",
    source: "Bernhard Thomaszewski + ETH",
    board: "Computational Design",
    kind: "SIGGRAPH 2025",
    image: sourceImages.inverseInterlocking,
    url: "https://tangpengbin.github.io/publications/InverseDIM/project_files/InverseDIM_SIGGRAPH2025_AuthorVersion.pdf",
    summary: "Design chainmail-like discrete interlocking materials for target mechanical behavior. This is exactly the kind of physical design taste worth studying.",
    tags: ["chainmail", "metamaterials", "inverse design", "SIGGRAPH"],
    shape: "wide",
  },
  {
    id: "beyond-chainmail",
    title: "Beyond Chainmail",
    source: "Pengbin Tang / Thomaszewski",
    board: "Computational Design",
    kind: "video",
    videoId: "e1h2C8uk6SU",
    image: "https://tangpengbin.github.io/publications/DIM/project_files/images/teaser.png",
    url: "https://tangpengbin.github.io/publications/DIM/DIM.html",
    summary: "Discrete interlocking materials as simulated and fabricated fabrics: anisotropic deformation limits, macro-scale models, and physical validation.",
    tags: ["mechanical materials", "simulation", "fabrication"],
    shape: "hero",
  },
  {
    id: "shape-morphing-metamaterials-2025",
    title: "Shape-morphing metamaterials",
    source: "Nature Reviews Materials",
    board: "Computational Design",
    kind: "2025 review",
    image: sourceImages.metaTrussBrace,
    url: "https://www.nature.com/articles/s41578-025-00828-9",
    summary: "A recent high-level map of morphing materials. Use it to find the vocabulary, mechanisms, and big open questions in the field.",
    tags: ["morphing matter", "metamaterials", "2025", "review"],
    shape: "wide",
  },
  {
    id: "metatruss-ai-robots",
    title: "MetaTruss morphing robots",
    source: "Morphing Matter Lab / UC Berkeley",
    board: "Shape + Matter",
    kind: "Nature Communications 2025",
    image: sourceImages.metaTruss,
    url: "https://engineering.berkeley.edu/news/2025/09/mighty-morphing-robots/",
    summary: "AI-optimized truss robots that morph into many body states with fewer control channels. Study this for the ambition level.",
    tags: ["morphing robots", "AI design", "MetaTruss", "2025"],
    shape: "hero",
  },
  {
    id: "metatruss-helmet",
    title: "Morphing helmet states",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "prototype",
    image: sourceImages.metaTrussHelmet,
    url: "https://engineering.berkeley.edu/news/2025/09/mighty-morphing-robots/",
    summary: "A concrete product-style example: morph the geometry to move protection where it is needed.",
    tags: ["wearables", "morphing", "design", "robotic matter"],
    shape: "wide",
  },
  {
    id: "compliant-metastructure",
    title: "Reconfigurable compliant metastructures",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "Nature Communications 2025",
    image: sourceImages.metaTrussBrace,
    url: "https://morphingmatter.org/projects/compliant-metastructures",
    summary: "Six-degree reconfigurability, stiffness tunability, wearable braces, and programmable joints. This is a direct inspiration source.",
    tags: ["compliant mechanisms", "metastructures", "wearables"],
    shape: "hero",
  },
  {
    id: "morphing-skin",
    title: "MorphingSkin tactile robots",
    source: "Morphing Matter Lab",
    board: "Soft Robotics",
    kind: "2025 visual research",
    image: sourceImages.morphingSkin,
    url: "https://engineering.berkeley.edu/news/2025/11/material-intelligence/",
    summary: "Soft robotic skin with surface nodes and suction-like behavior for grasping, climbing, wearables, and haptic guidance.",
    tags: ["soft robotics", "tactile", "robot skin", "2025"],
    shape: "hero",
  },
  {
    id: "thermorph-4d-printing",
    title: "Thermorph 4D printing",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "material intelligence",
    image: sourceImages.thermorph,
    url: "https://engineering.berkeley.edu/news/2025/11/material-intelligence/",
    summary: "Flat prints that self-transform into 3D objects. Study it for the link between fabrication constraints and magical behavior.",
    tags: ["4D printing", "programmable matter", "fabrication"],
    shape: "standard",
  },
  {
    id: "self-burying-seed",
    title: "Self-burying seed carriers",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "bio-inspired matter",
    image: sourceImages.seedGermination,
    url: "https://engineering.berkeley.edu/news/2025/11/material-intelligence/",
    summary: "Bio-inspired morphing matter that drills seeds into soil. Different domain, same question: how can material geometry do the work?",
    tags: ["bioinspired", "morphing", "sustainability", "materials"],
    shape: "tall",
  },
  {
    id: "mit-metamaterials-map",
    title: "Mapping the future of metamaterials",
    source: "MIT News",
    board: "Computational Design",
    kind: "2025 field map",
    image: sourceImages.metaTrussVideo,
    url: "https://news.mit.edu/2025/mapping-future-metamaterials-0327",
    summary: "A field-map tile for architected materials, fabrication, characterization, and where metamaterials are heading.",
    tags: ["metamaterials", "field map", "MIT", "2025"],
    shape: "standard",
  },
  {
    id: "creative-soft-robotics-course",
    title: "Creative Soft Robotics",
    source: "CMU Morphing Matter Lab",
    board: "Learning",
    kind: "Spring 2025",
    image: sourceImages.disneyPneumatic,
    url: "https://courses.ideate.cmu.edu/16-480/s2025/text/video/Morphing-Matter-Lab.html",
    summary: "A current course doorway into soft robotic materials, morphing mechanisms, actuation, and project taste.",
    tags: ["soft robotics", "course", "CMU", "2025"],
    shape: "standard",
  },
  {
    id: "rotational-3d-soft-robotic-matter",
    title: "Rotational 3D printed soft robotic matter",
    source: "arXiv",
    board: "Soft Robotics",
    kind: "2025 paper",
    image: sourceImages.disneyPneumatic,
    url: "https://arxiv.org/abs/2505.18095",
    summary: "Recent soft robotic matter: multi-material 3D printing, asymmetrical embedded pneumatics, shape morphing, and wearable device potential.",
    tags: ["soft robotic matter", "3D printing", "2025"],
    shape: "standard",
  },
  {
    id: "programmable-telescopic-soft-actuators",
    title: "Telescopic soft pneumatic actuators",
    source: "arXiv",
    board: "Soft Robotics",
    kind: "2025 paper",
    image: sourceImages.metaTrussBrace,
    url: "https://arxiv.org/abs/2511.06673",
    summary: "Recent deployable and shape-morphing soft robots. Good for learning how actuator architecture expands the design space.",
    tags: ["soft actuators", "deployable", "shape morphing"],
    shape: "standard",
  },
  {
    id: "whole-body-proprioceptive-morphing",
    title: "Whole-body proprioceptive morphing",
    source: "arXiv",
    board: "Soft Robotics",
    kind: "2025 paper",
    image: sourceImages.morphingSkin,
    url: "https://arxiv.org/abs/2510.27666",
    summary: "Octopus-inspired soft grasping: entire-body reconfiguration, sensing, and cross-scale manipulation.",
    tags: ["soft gripper", "proprioception", "morphing", "2025"],
    shape: "wide",
  },
  {
    id: "robotecture-shape-interface",
    title: "Robotecture shape-changing interface",
    source: "ACM TEI 2025",
    board: "Tangible",
    kind: "2025 paper",
    image: sourceImages.mitInform,
    url: "https://cs.unm.edu/~zhuwang/assets/pdf/RoboTerrain__TEI_2025.pdf",
    summary: "A modular shape-changing interface using actuated support beams. Tangible interfaces are still alive and still weird.",
    tags: ["shape-changing interface", "TEI", "tangible", "2025"],
    shape: "wide",
  },
  {
    id: "siggraph-emerging-tech-2026",
    title: "SIGGRAPH Emerging Technologies",
    source: "SIGGRAPH",
    board: "Creative Tools",
    kind: "2026 source",
    image: sourceImages.disneyDiffusion,
    url: "https://s2026.siggraph.org/program/emerging-technologies/",
    summary: "A standing source for demos that feel like the future: installations, interaction, graphics, haptics, robots, and experimental displays.",
    tags: ["emerging tech", "SIGGRAPH", "demos", "interaction"],
    shape: "standard",
  },
  {
    id: "rss-2026",
    title: "Robotics: Science and Systems",
    source: "RSS",
    board: "Robotics",
    kind: "conference source",
    image: sourceImages.cmuRobotics,
    url: "https://roboticsconference.org/",
    summary: "Read the accepted papers and ask: which work would make a physical character, tool, or interaction more believable?",
    tags: ["robotics", "conference", "papers", "systems"],
    shape: "standard",
  },
  {
    id: "icra-2026-watch",
    title: "ICRA robotics papers",
    source: "IEEE RAS",
    board: "Robotics",
    kind: "conference source",
    image: sourceImages.cmuRobotics,
    url: "https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra",
    summary: "Use ICRA as a scan for new mechanisms, soft robots, manipulation, control, HRI, and field systems.",
    tags: ["robotics", "ICRA", "mechanisms", "papers"],
    shape: "standard",
  },
  {
    id: "world-haptics-2025",
    title: "World Haptics",
    source: "IEEE World Haptics",
    board: "Haptics",
    kind: "conference source",
    image: sourceImages.wdiWebslingers,
    url: "https://2025.worldhaptics.org/",
    summary: "A concentrated stream for tactile displays, force feedback, wearable haptics, teleoperation, and physical interaction.",
    tags: ["haptics", "touch", "wearables", "interfaces"],
    shape: "standard",
  },
  {
    id: "haptics-symposium-2026",
    title: "Haptics Symposium",
    source: "IEEE Haptics Symposium",
    board: "Haptics",
    kind: "2026 source",
    image: sourceImages.wdiWebslingers,
    url: "https://2026.hapticssymposium.org/",
    summary: "A source to mine when you want physical feedback, tactile devices, and interaction that people can feel.",
    tags: ["haptics", "touch", "2026", "hardware"],
    shape: "standard",
  },
  {
    id: "autodesk-design-make",
    title: "Autodesk Research",
    source: "Autodesk Research",
    board: "Creative Tools",
    kind: "source board",
    image: sourceImages.metaTruss,
    url: "https://www.research.autodesk.com/",
    summary: "Computational design, fabrication, generative tools, and design-make workflows. Excellent adjacent taste for research work.",
    tags: ["design tools", "fabrication", "creative systems"],
    shape: "wide",
  },
  {
    id: "pixar-graphics-library",
    title: "Pixar graphics research",
    source: "Pixar",
    board: "Computer Graphics",
    kind: "source board",
    image: sourceImages.disneyMotion,
    url: "https://graphics.pixar.com/library/",
    summary: "A deep archive for production-grade simulation, rendering, animation, geometry, and technical taste.",
    tags: ["graphics", "simulation", "animation", "research"],
    shape: "standard",
  },
  {
    id: "nvidia-physical-ai",
    title: "NVIDIA physical AI",
    source: "NVIDIA Research",
    board: "Robotics",
    kind: "industry source",
    image: sourceImages.disneyRobotMdm,
    url: "https://research.nvidia.com/research-area/robotics",
    summary: "Simulation, robot learning, digital twins, and physical AI. Use it to track how industry is turning models into motion.",
    tags: ["physical AI", "simulation", "robotics", "industry"],
    shape: "standard",
  },
  {
    id: "google-robotics-research",
    title: "Google robotics research",
    source: "Google Research",
    board: "Robotics",
    kind: "industry source",
    image: sourceImages.cmuRobotics,
    url: "https://research.google/teams/robotics/",
    summary: "Robot learning, generalist manipulation, and embodied AI. Scan selectively for what transfers into physical prototyping.",
    tags: ["robot learning", "embodied AI", "manipulation"],
    shape: "standard",
  },
  {
    id: "make-one-proof",
    title: "Make one visible proof today",
    source: "Research motivation",
    board: "Momentum",
    kind: "build prompt",
    image: sourceImages.metaTruss,
    summary: "Do not wait for a perfect project. Make one short clip, one diagram, one measured prototype, one simulation, or one teardown that proves a taste for hard physical work.",
    tags: ["portfolio", "prototype", "practice"],
    shape: "hero",
  },
  {
    id: "read-like-builder",
    title: "Read papers like a builder",
    source: "Research motivation",
    board: "Momentum",
    kind: "research prompt",
    image: sourceImages.disneyQuaternion,
    summary: "For every paper: what is the mechanism, what constraint made it hard, what artifact proves it, and what would you build in seven days?",
    tags: ["research", "papers", "portfolio"],
    shape: "standard",
  },
  {
    id: "copy-the-energy",
    title: "Copy the energy, not the project",
    source: "Research motivation",
    board: "Momentum",
    kind: "taste prompt",
    image: sourceImages.disneyGaits,
    summary: "The goal is not to duplicate Olaf, MetaTruss, or inFORM. The goal is to match the ambition: visible behavior, real constraints, and a memorable interaction.",
    tags: ["taste", "ambition", "creative R&D"],
    shape: "wide",
  },
  {
    id: "weekly-research-sprint",
    title: "Weekly research sprint",
    source: "Research motivation",
    board: "Momentum",
    kind: "practice loop",
    image: sourceImages.morphingSkin,
    summary: "Pick one source, build one tiny derivative, film it, write the mechanism, write the failure, and publish the evidence. That is how the feed becomes a portfolio.",
    tags: ["sprint", "build", "publish", "practice"],
    shape: "standard",
  },
  {
    id: "physical-magic-standard",
    title: "Physical magic standard",
    source: "Research motivation",
    board: "Momentum",
    kind: "north star",
    image: sourceImages.disneyBdx,
    summary: "Great work in this lane feels alive, behaves reliably, and reveals technical depth when inspected. Build toward that bar.",
    tags: ["Disney", "physical systems", "north star"],
    shape: "standard",
  },
];

const researchExpansionItems = [
  {
    id: "nvidia-physical-ai-week-2026",
    title: "Physical AI robot wave",
    source: "NVIDIA Robotics Week",
    board: "Robotics",
    kind: "2026 video",
    image: sourceImages.nvidiaRoboticsWeek,
    videoUrl: "https://blogs.nvidia.com/wp-content/uploads/2026/04/GTC26-Robots_16x9_v3-2-1.mp4",
    url: "https://blogs.nvidia.com/blog/national-robotics-week-2026/",
    summary: "A moving source tile for the 2026 physical AI wave: robot foundation models, simulation, humanoids, and robots leaving demos for real environments.",
    tags: ["physical AI", "robotics", "2026", "video"],
    shape: "wide",
  },
  {
    id: "morphingskin-project",
    title: "MorphingSkin platform",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "UIST 2025",
    image: sourceImages.morphingSkinProject,
    url: "https://morphingmatter.org/projects/morphingskin",
    summary: "A skin-like surface with hydraulic actuators for force, shape, optical change, weight shift, robot skins, wearables, and tangible displays.",
    tags: ["MorphingSkin", "hydraulic actuators", "UIST", "2025"],
    shape: "hero",
  },
  {
    id: "morphing-truss-ai",
    title: "Morphing truss design with AI",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "2025 robot",
    image: sourceImages.morphingTrussProject,
    url: "https://morphingmatter.org/projects/morphing-truss",
    summary: "AI-assisted variable-geometry truss robots: helmets, walkers, grippers, tentacles, and the idea that structure can be computation.",
    tags: ["MetaTruss", "morphing robot", "AI design", "2025"],
    shape: "wide",
  },
  {
    id: "compliant-metastructure-wearable",
    title: "Compliant wearable metastructure",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "2025 project",
    image: sourceImages.compliantWearable,
    url: "https://morphingmatter.org/projects/compliant-metastructures",
    summary: "Reconfigurable compliant structures that shift stiffness and support body movement. Study it as a bridge from mechanism to wearable experience.",
    tags: ["compliant mechanisms", "wearables", "metastructures"],
    shape: "tall",
  },
  {
    id: "northwestern-touch-device",
    title: "Wearable touch that stretches skin",
    source: "Northwestern Engineering",
    board: "Haptics",
    kind: "2025 research",
    image: sourceImages.northwesternTouch,
    url: "https://news.northwestern.edu/stories/2025/03/feeling-the-future-new-wearable-device-mimics-the-complexity-of-human-touch",
    summary: "A compact wearable haptic actuator that can poke, stretch, vibrate, slide, and twist skin. This is the kind of interface detail worth obsessing over.",
    tags: ["haptics", "wearables", "touch", "2025"],
    shape: "wide",
  },
  {
    id: "ucsb-optotactile-display",
    title: "Graphics you can see and feel",
    source: "UC Santa Barbara",
    board: "Haptics",
    kind: "2025 display",
    image: sourceImages.ucsbHaptic,
    url: "https://news.ucsb.edu/2025/022254/new-haptic-display-technology-creates-3d-graphics-you-can-see-and-feel",
    summary: "Optically addressed haptic pixels turn light into tactile bumps, making graphics physical without wiring every pixel.",
    tags: ["haptic display", "tactile graphics", "optotactile", "2025"],
    shape: "wide",
  },
  {
    id: "bristol-emg-soft-robot",
    title: "Electro-morphing gel robot",
    source: "University of Bristol",
    board: "Soft Robotics",
    kind: "2025 breakthrough",
    image: sourceImages.bristolEmg,
    url: "https://www.bristol.ac.uk/news/2025/october/soft-robotics-breakthrough.html",
    summary: "A soft morphing robot moved by electric fields. Watch this for wireless soft actuation, body morphing, and strange locomotion.",
    tags: ["soft robotics", "morphing matter", "electric fields", "2025"],
    shape: "hero",
  },
  {
    id: "sustainflatable-morphing-interface",
    title: "Sustainflatable morphing interfaces",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "pneumatic interface",
    image: sourceImages.sustainflatable,
    url: "https://morphingmatter.org/projects/sustainflatable",
    summary: "Pneumatic morphing interfaces that harvest, store, and reuse ambient energy. Useful for thinking about low-power physical interaction.",
    tags: ["pneumatics", "sustainable design", "morphing interface"],
    shape: "standard",
  },
  {
    id: "recompfig-kinematic-display",
    title: "Reconfigurable kinematic devices",
    source: "Morphing Matter Lab",
    board: "Tangible",
    kind: "computational design",
    image: sourceImages.recompfig,
    url: "https://morphingmatter.org/projects/recompfig",
    summary: "A physical design tool for reconfigurable kinematic devices. Great for turning abstract mechanisms into something someone can touch.",
    tags: ["kinematics", "haptics", "design tools"],
    shape: "standard",
  },
  {
    id: "pneumesh-truss",
    title: "PneuMesh robotic truss",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "pneumatic robot",
    image: sourceImages.pneumesh,
    url: "https://morphingmatter.org/projects/pneumesh",
    summary: "Pneumatic-driven truss structures that make geometry move. Study this for mechanism vocabulary and physical design imagination.",
    tags: ["pneumatic truss", "robotic matter", "morphing"],
    shape: "wide",
  },
  {
    id: "underwater-morphing-beads",
    title: "Underwater morphing beads",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "ocean material",
    image: sourceImages.underwaterBeads,
    url: "https://morphingmatter.org/projects/underwater-morphing-beads",
    summary: "Material behavior as environmental interaction: underwater beads that morph as a design and sustainability system.",
    tags: ["morphing matter", "ocean", "sustainability"],
    shape: "standard",
  },
  {
    id: "simulearn-morphing-models",
    title: "Learning morphing simulations",
    source: "Morphing Matter Lab",
    board: "Computational Design",
    kind: "simulation",
    image: sourceImages.simulearn,
    url: "https://morphingmatter.org/projects/simulearn",
    summary: "Machine learning for morphing modeling and simulation. Useful for turning hands-on material behavior into design software.",
    tags: ["simulation", "machine learning", "morphing"],
    shape: "wide",
  },
  {
    id: "electrodermis-wearables",
    title: "ElectroDermis wearables",
    source: "Morphing Matter Lab",
    board: "Wearables",
    kind: "computational manufacturing",
    image: sourceImages.electrodermis,
    url: "https://morphingmatter.org/projects/electrodermis",
    summary: "Soft, body-worn interactive skins that turn fabrication, sensing, and identity into one design problem.",
    tags: ["wearables", "fabrication", "interactive skin"],
    shape: "tall",
  },
  {
    id: "epomemory-morphing-controller",
    title: "Multi-state shape memory control",
    source: "Morphing Matter Lab",
    board: "Shape + Matter",
    kind: "programmable interface",
    image: sourceImages.epomemory,
    url: "https://morphingmatter.org/projects/epomemory",
    summary: "Programmable morphing interfaces with multiple remembered states. A clean example of materials becoming interface logic.",
    tags: ["shape memory", "interfaces", "programmable matter"],
    shape: "standard",
  },
];

const staticItems = [...seedItems, ...inspirationItems, ...researchExpansionItems];

let radar = { updatedAt: null, items: [], error: null, loading: true };
let onlineResearch = { items: [], exhausted: false, loading: false };
let onlineSourceIndex = 0;

const onlineSources = [
  { query: "robotics laboratory robot", label: "Robotics Lab", board: "Robotics", kind: "online image", requireAny: ["robot", "robotics", "laboratory"] },
  { query: "humanoid robot research", label: "Humanoid Robotics", board: "Robotics", kind: "online image", requireAny: ["robot", "humanoid", "research"] },
  { query: "robot hand manipulation", label: "Robot Manipulation", board: "Robotics", kind: "online image", requireAny: ["robot", "hand", "manipulation"] },
  { query: "NASA robotics rover", label: "Field Robotics", board: "Robotics", kind: "online image", requireAny: ["nasa", "rover", "robot"] },
  { query: "soft robot actuator", label: "Soft Robotics", board: "Soft Robotics", kind: "online image", requireAny: ["soft", "robot", "actuator"] },
  { query: "pneumatic soft robot", label: "Pneumatic Robots", board: "Soft Robotics", kind: "online image", requireAny: ["pneumatic", "soft", "robot"] },
  { query: "wearable robot exoskeleton", label: "Wearable Robotics", board: "Wearables", kind: "online image", requireAny: ["wearable", "robot", "exoskeleton"] },
  { query: "haptic glove tactile interface", label: "Haptics", board: "Haptics", kind: "online image", requireAny: ["haptic", "tactile", "glove"] },
  { query: "virtual reality haptics glove", label: "Haptic Interfaces", board: "Haptics", kind: "online image", requireAny: ["haptic", "glove", "interface"] },
  { query: "shape display tangible media", label: "Tangible Media", board: "Tangible", kind: "online image", requireAny: ["shape", "display", "tangible"] },
  { query: "programmable matter metamaterial", label: "Programmable Matter", board: "Computational Design", kind: "online image", requireAny: ["programmable", "matter", "metamaterial"] },
  { query: "metamaterial lattice structure", label: "Metamaterials", board: "Computational Design", kind: "online image", requireAny: ["metamaterial", "lattice", "structure"] },
  { query: "computer graphics motion capture research", label: "Motion Capture", board: "Creative Tools", kind: "online image", requireAny: ["motion", "capture", "graphics"] },
  { query: "bipedal robot research", label: "Bipedal Robotics", board: "Robotics", kind: "online image", requireAny: ["bipedal", "robot"] },
  { query: "animatronic robot", label: "Animatronics", board: "Disney", kind: "online image", requireAny: ["animatronic", "robot"] },
];

const blockedOnlineTitleTerms = [
  "coat of arms",
  "diagram",
  "drawing",
  "flag",
  "icon",
  "illustration",
  "logo",
  "map",
  "poster",
  "symbol",
  "vector",
  "wikimedia",
];

function isBrowserReload() {
  const navigationEntry = performance.getEntriesByType?.("navigation")?.[0];
  if (navigationEntry?.type) return navigationEntry.type === "reload";
  return performance.navigation?.type === 1;
}

function removeItemParamFromUrl() {
  const params = new URLSearchParams(location.search);
  params.delete("item");
  const nextSearch = params.toString();
  const nextUrl = `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}${location.hash || ""}`;
  history.replaceState(null, "", nextUrl);
}

function initialSelectedId() {
  const id = new URLSearchParams(location.search).get("item");
  if (id && isBrowserReload()) {
    removeItemParamFromUrl();
    return null;
  }
  return id;
}

let selectedId = initialSelectedId();
let loadingMoreFeed = false;
let loadingMoreDetail = false;
const initialFeedPageCount = 4;
const feedPageSize = 24;
const initialDetailPageCount = 3;
let feedPageCount = initialFeedPageCount;
let detailPageCount = initialDetailPageCount;
let feedSessionSeed = makeFeedSeed();

function makeFeedSeed() {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0];
  }
  return Math.floor(Date.now() % 2147483647);
}

function mixNumber(value) {
  let mixed = value >>> 0;
  mixed ^= mixed << 13;
  mixed ^= mixed >>> 17;
  mixed ^= mixed << 5;
  return mixed >>> 0;
}

function refreshFeedLayout() {
  feedSessionSeed = makeFeedSeed();
  feedPageCount = initialFeedPageCount;
  detailPageCount = initialDetailPageCount;
}

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
  if (text.includes("disney")) return "#c98a53";
  if (text.includes("robot")) return "#2f9d98";
  if (text.includes("haptic") || text.includes("tactile")) return "#4f8290";
  if (text.includes("soft") || text.includes("material")) return "#df6a59";
  if (text.includes("tangible")) return "#b95c76";
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
  const extra = Array.isArray(item.topics)
    ? item.topics.join(" ")
    : Array.isArray(item.tags)
      ? item.tags.join(" ")
      : "";
  const text = `${item.source || ""} ${item.title || ""} ${item.type || ""} ${item.board || ""} ${item.summary || ""} ${item.why || ""} ${extra}`.toLowerCase();
  if (text.includes("arraytac") || (text.includes("tactile") && (text.includes("friction") || text.includes("stiffness")))) return sourceImages.arrayTac;
  if (text.includes("haptic") || text.includes("tactile") || text.includes("palpation") || text.includes("touch")) return [sourceImages.ucsbHaptic, sourceImages.northwesternTouch, sourceImages.mitInform][index % 3];
  if (text.includes("puffybot") || text.includes("untethered") || text.includes("amphibious")) return [sourceImages.bristolEmg, sourceImages.pneumesh, sourceImages.morphingTrussProject][index % 3];
  if (text.includes("wearable") || text.includes("garment") || text.includes("fashion") || text.includes("body-worn")) return [sourceImages.compliantWearable, sourceImages.electrodermis, sourceImages.northwesternTouch][index % 3];
  if (text.includes("olaf") || text.includes("character control") || text.includes("robotic character")) return [sourceImages.disneyBdx, sourceImages.disneyAmor, sourceImages.disneyRobotMdm][index % 3];
  if (text.includes("metamaterial") || text.includes("interlocking") || text.includes("chainmail") || text.includes("voronoi")) return [sourceImages.chainmail, sourceImages.metaTruss, sourceImages.metaTrussHelmet][index % 3];
  if (text.includes("morphing") || text.includes("compliant") || text.includes("shape-changing")) return [sourceImages.metaTruss, sourceImages.metaTrussBrace, sourceImages.morphingSkin][index % 3];
  if (text.includes("disney research")) return [sourceImages.disneyRig, sourceImages.disneyAvatar, sourceImages.disneyMotion, sourceImages.disneyDiffusion][index % 4];
  if (text.includes("disney") || text.includes("imagineering")) return [sourceImages.wdiCampus, sourceImages.wdiWebslingers, sourceImages.wdiNeverland, sourceImages.wdiCulture][index % 4];
  if (text.includes("mit") || text.includes("tangible") || text.includes("shape")) return sourceImages.mitInform;
  if (text.includes("cmu") || text.includes("robot")) return sourceImages.cmuRobotics;
  return [
    sourceImages.mitInform,
    sourceImages.cmuRobotics,
    sourceImages.disneyRig,
    sourceImages.wdiCulture,
    sourceImages.wdiNeverland,
    sourceImages.disneyAvatar,
    sourceImages.disneyMotion,
    sourceImages.wdiWebslingers,
    sourceImages.metaTruss,
    sourceImages.disneyAmor,
    sourceImages.morphingSkin,
  ][index % 11];
}

function isGenericSourcePreviewImage(image, item = {}) {
  if (!image) return false;
  const imageText = normalizedMediaUrl(image);
  const sourceText = `${item.source || ""} ${item.url || ""}`.toLowerCase();
  const host = (() => {
    try {
      return new URL(image, location.href).hostname.toLowerCase();
    } catch {
      return "";
    }
  })();
  const genericName = /(^|[/_-])(favicon|logo|logomark|wordmark|brand|icon|site-header|header|social-card|default-og)([/_.-]|$)/i.test(imageText);
  if (sourceText.includes("arxiv") && (imageText.includes("arxiv") || genericName)) return true;
  if (host.includes("arxiv.org")) return true;
  if (sourceText.includes("acm") && genericName) return true;
  if (sourceText.includes("ieee") && genericName) return true;
  if (sourceText.includes("nature.com") && genericName) return true;
  return false;
}

function normalizeRemoteItem(item, index) {
  const tags = Array.isArray(item.topics) ? item.topics : inferTags(item);
  const title = item.title || "Live research signal";
  const source = item.source || item.type || "Live source";
  const text = `${source} ${title} ${item.type || ""} ${item.board || ""} ${item.summary || ""} ${item.why || ""} ${tags.join(" ")}`.toLowerCase();
  let board = item.board || "Labs";
  if (text.includes("disney") || text.includes("wdi")) board = "Disney";
  if (text.includes("haptic") || text.includes("tactile")) board = "Haptics";
  if (text.includes("soft robot") || text.includes("material")) board = "Soft Robotics";
  if (text.includes("robot") && !text.includes("soft robot")) board = "Robotics";
  if (text.includes("tangible") || text.includes("shape")) board = "Tangible";
  const sourceImage = item.image || "";
  const hasOriginalImage = Boolean(sourceImage && !isGenericSourcePreviewImage(sourceImage, item));
  const displayImage = hasOriginalImage ? sourceImage : imageForLiveItem(item, index);
  const isStrongOpportunity = (
    text.includes("disney careers")
    || text.includes("imagineering")
    || text.includes("creative technolog")
    || text.includes("research scientist")
    || text.includes("research engineer")
  );
  const isLearningSource = (
    text.includes("university source")
    || text.includes("learning source")
    || text.includes("lab source")
    || text.includes("visual source")
    || text.includes("source board")
  );
  const isResearchSignal = (
    text.includes("research signal")
    || text.includes("arxiv")
    || text.includes("paper")
    || text.includes("proceedings")
    || text.includes("conference source")
    || text.includes("nature ")
  );
  return {
    id: `live-${slug(title)}-${index}`,
    title,
    source,
    board,
    kind: item.type || "live signal",
    date: item.date || "",
    url: item.url || "",
    image: displayImage,
    videoId: item.videoId || "",
    videoUrl: item.videoUrl || "",
    summary: item.summary || item.why || "Fresh signal from the live Ocean feed.",
    tags: tags.length ? tags.slice(0, 5) : inferTags(item),
    shape: index % 7 === 0 ? "wide" : "standard",
    live: true,
    originalImage: hasOriginalImage,
    showInWall: Boolean(displayImage) && (hasOriginalImage || isStrongOpportunity || isLearningSource || isResearchSignal),
  };
}

function normalizedMediaUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value, location.href);
    url.hash = "";
    const search = url.searchParams;
    ["format", "height", "utm_campaign", "utm_content", "utm_medium", "utm_source", "width", "w", "h"].forEach((param) => search.delete(param));
    url.search = search.toString();
    return url.toString().replace(/^http:/, "https:").toLowerCase();
  } catch {
    return String(value).split("#")[0].toLowerCase();
  }
}

function normalizeKeyText(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch {
    return String(value || "");
  }
}

function canonicalSourceId(value) {
  return normalizeKeyText(value)
    .replace(/^file:/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function mediaKey(item) {
  if (item.sourceId) return `source:${canonicalSourceId(item.sourceId)}`;
  if (item.videoUrl) return `video-url:${normalizedMediaUrl(item.videoUrl)}`;
  if (item.videoId) return `youtube:${item.videoId}`;
  if (item.image) return `image:${normalizedMediaUrl(item.image)}`;
  return "";
}

function cleanOnlineTitle(title) {
  return normalizeKeyText(title || "")
    .replace(/^file:/i, "")
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isBlockedOnlineTitle(title) {
  const lower = title.toLowerCase();
  return blockedOnlineTitleTerms.some((term) => lower.includes(term));
}

function hasRequiredOnlineTerms(title, source) {
  if (!source.requireAny || !source.requireAny.length) return true;
  const lower = title.toLowerCase();
  return source.requireAny.some((term) => lower.includes(term));
}

function commonsFileUrl(fileName) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;
}

function shapeFromDimensions(width, height, fallback = "standard") {
  const ratio = width / Math.max(height, 1);
  if (ratio >= 1.8) return "wide";
  if (ratio >= 1.18) return "wide";
  if (ratio <= 0.62) return "tall";
  if (ratio <= 0.85) return "tall";
  return fallback;
}

function commonsSearchUrl(source) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: source.query,
    gsrlimit: "24",
    prop: "imageinfo",
    iiprop: "url|mime|size",
    iiurlwidth: "1800",
    format: "json",
    origin: "*",
  });

  if (source.offset) params.set("gsroffset", String(source.offset));
  return `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
}

function onlineItemFromCommonsPage(source, page) {
  const info = page.imageinfo && page.imageinfo[0];
  if (!info) return null;

  const title = cleanOnlineTitle(page.title);
  const lowerTitle = title.toLowerCase();
  const width = Number(info.width) || 0;
  const height = Number(info.height) || 0;
  const mime = String(info.mime || "").toLowerCase();
  const ratio = width / Math.max(height, 1);

  if (!/^image\/(jpeg|png|webp)$/.test(mime)) return null;
  if (width < 800 || height < 500 || width * height < 650000) return null;
  if (ratio < 0.38 || ratio > 2.9) return null;
  if (!hasRequiredOnlineTerms(lowerTitle, source)) return null;
  if (isBlockedOnlineTitle(lowerTitle)) return null;

  const fileName = String(page.title || "").replace(/^File:/i, "");
  const id = `online-${slug(source.label)}-${slug(fileName)}`;
  return {
    id,
    title: title || source.label,
    source: source.label,
    board: source.board || "Labs",
    kind: source.kind || "online source",
    image: info.thumburl || info.url,
    url: commonsFileUrl(fileName),
    sourceId: fileName,
    summary: `Fresh online image source for ${source.label.toLowerCase()}.`,
    tags: [source.board || "Labs", source.label].filter(Boolean),
    shape: shapeFromDimensions(width, height, source.board === "Robotics" ? "wide" : "standard"),
    online: true,
  };
}

function nextOnlineSource() {
  for (let index = 0; index < onlineSources.length; index += 1) {
    const source = onlineSources[onlineSourceIndex % onlineSources.length];
    onlineSourceIndex += 1;
    if (!source.exhausted) return source;
  }
  return null;
}

async function fetchOnlineSource(source) {
  const response = await fetch(commonsSearchUrl(source), { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Commons returned ${response.status}`);

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Commons returned a rate-limit page");
  }

  const pages = Object.values((data.query && data.query.pages) || {})
    .sort((a, b) => (a.index || 0) - (b.index || 0));

  if (data.continue && data.continue.gsroffset) {
    source.offset = data.continue.gsroffset;
  } else {
    source.exhausted = true;
  }

  return pages
    .map((page) => onlineItemFromCommonsPage(source, page))
    .filter(Boolean);
}

async function loadMoreOnlineItems(targetCount = feedPageSize * 2) {
  if (onlineResearch.loading || onlineResearch.exhausted) return [];
  onlineResearch = { ...onlineResearch, loading: true };
  const seen = new Set(allItems().map(contentKey));
  const collected = [];
  let attempts = 0;

  while (collected.length < targetCount && attempts < onlineSources.length * 2) {
    const source = nextOnlineSource();
    if (!source) break;
    attempts += 1;

    try {
      const items = await fetchOnlineSource(source);
      items.forEach((item) => {
        const key = contentKey(item);
        if (seen.has(key)) return;
        seen.add(key);
        collected.push(item);
      });
    } catch {
      source.failures = (source.failures || 0) + 1;
      if (source.failures >= 2) source.exhausted = true;
    }
  }

  onlineResearch = {
    ...onlineResearch,
    items: [...onlineResearch.items, ...collected],
    exhausted: onlineSources.every((source) => source.exhausted),
    loading: false,
  };

  return collected;
}

function allItems() {
  const seedKeys = new Set(staticItems.map((item) => `${item.url || ""}|${item.title}`.toLowerCase()));
  const usedMedia = new Set();
  const remoteMedia = new Set();
  const remote = (radar.items || [])
    .map(normalizeRemoteItem)
    .filter((item) => item.showInWall && item.image)
    .filter((item) => {
      const key = `${item.url || ""}|${item.title}`.toLowerCase();
      if (seedKeys.has(key)) return false;
      const keyMedia = mediaKey(item);
      if (keyMedia && remoteMedia.has(keyMedia)) return false;
      if (keyMedia) remoteMedia.add(keyMedia);
      return true;
    })
    .slice(0, 220);
  const seen = new Set();
  const seenTitles = new Set();
  return [...staticItems, ...remote, ...onlineResearch.items].filter((item) => {
    if (!item.image && !item.videoId && !item.videoUrl) return false;
    const key = `${item.url || ""}|${item.title}`.toLowerCase();
    const titleKey = slug(item.title);
    if (seen.has(key) || seenTitles.has(titleKey)) return false;
    seen.add(key);
    seenTitles.add(titleKey);
    const keyMedia = mediaKey(item);
    if (keyMedia && usedMedia.has(keyMedia)) return false;
    if (keyMedia) usedMedia.add(keyMedia);
    return true;
  }).map((item, index) => ({
    ...item,
    accent: item.accent || accentFor(item, index),
  }));
}

function pageOrder(length, page) {
  return Array.from({ length }, (_, index) => index)
    .sort((a, b) => mixNumber(a * 1009 + page * 9176 + feedSessionSeed) - mixNumber(b * 1009 + page * 9176 + feedSessionSeed));
}

function isVideoItem(item) {
  return Boolean(item.videoId || item.videoUrl || String(item.kind || "").toLowerCase().includes("video"));
}

function videoForwardItems(items) {
  const videos = [];
  const rest = [];
  items.forEach((item) => (isVideoItem(item) ? videos : rest).push(item));
  const mixed = [];
  let videoIndex = 0;
  let restIndex = 0;
  while (videoIndex < videos.length || restIndex < rest.length) {
    const shouldPlaceVideo = videoIndex < videos.length && (mixed.length < 12 ? mixed.length % 2 === 0 : mixed.length % 3 === 1);
    if (shouldPlaceVideo || restIndex >= rest.length) {
      mixed.push(videos[videoIndex]);
      videoIndex += 1;
    } else {
      mixed.push(rest[restIndex]);
      restIndex += 1;
    }
  }
  return mixed.filter(Boolean);
}

function contentKey(item) {
  return mediaKey(item) || `${item.url || ""}|${item.title || ""}`.toLowerCase();
}

function visibleItems() {
  const baseItems = allItems();
  if (baseItems.length === 0) return [];
  const targetCount = feedPageCount * feedPageSize;
  const paperItems = baseItems.filter((item) => !item.live && !item.online && isPaperLikeItem(item));
  const staticFeedItems = baseItems.filter((item) => !item.live && !item.online && !isPaperLikeItem(item));
  const liveItems = baseItems.filter((item) => item.live && !item.online);
  const onlineItems = baseItems.filter((item) => item.online);
  const orderedGroup = (items, page) => pageOrder(items.length, page).map((orderedIndex) => items[orderedIndex]);
  return [
    ...videoForwardItems(orderedGroup(paperItems, 0)),
    ...videoForwardItems(orderedGroup(staticFeedItems, 1)),
    ...videoForwardItems(orderedGroup(liveItems, 2)),
    ...videoForwardItems(orderedGroup(onlineItems, 3)),
  ].slice(0, targetCount);
}

function findItem(id) {
  return allItems().find((item) => item.id === id);
}

function youtubeWatchUrl(item) {
  return item?.videoId ? `https://www.youtube.com/watch?v=${encodeURIComponent(item.videoId)}` : "";
}

function mediaMarkup(item, mode = "tile") {
  const image = item.image || "";
  const fallback = `<div class="generated-media"><span>${esc((item.board || item.source || "O").slice(0, 2).toUpperCase())}</span></div>`;
  const poster = image
    ? `
      <img class="media-backdrop" src="${esc(image)}" alt="" loading="${mode === "tile" ? "lazy" : "eager"}" onerror="this.remove();">
      <img class="media-primary" src="${esc(image)}" alt="" loading="${mode === "tile" ? "lazy" : "eager"}" onerror="this.remove();">
    `
    : fallback;
  if (item.videoUrl) {
    return `
      <video class="video-frame" src="${esc(item.videoUrl)}" ${image ? `poster="${esc(image)}"` : ""} autoplay muted loop playsinline preload="${mode === "tile" ? "metadata" : "auto"}"></video>
      <span class="video-badge">video</span>
    `;
  }
  if (item.videoId) {
    return `
      ${poster}
      <span class="video-badge">video</span>
    `;
  }
  return poster;
}

function tileRatioFor(item, index) {
  if (item.videoId || item.videoUrl) return "16 / 9";
  const shape = shapeFor(item, index);
  if (shape === "wide") return "16 / 9";
  if (shape === "hero") return "4 / 3";
  if (shape === "small") return "4 / 3";
  if (shape === "tall") return "3 / 4";
  return "1 / 1";
}

function shapeFor(item, index) {
  if (item.shape) return item.shape;
  if (item.videoId) return index % 2 ? "wide" : "hero";
  return ["standard", "tall", "wide", "standard", "small"][index % 5];
}

function renderTile(item, index, compact = false) {
  const ratio = tileRatioFor(item, index);
  return `
    <article class="media-card shape-${esc(shapeFor(item, index))} ${compact ? "is-compact" : ""}" data-action="open" data-id="${esc(item.id)}" data-feed-id="${esc(item.feedId || item.id)}" data-video="${item.videoId || item.videoUrl ? "true" : "false"}" role="button" tabindex="0" style="--accent:${esc(item.accent)};--media-ratio:${esc(ratio)}">
      <div class="media-frame">${mediaMarkup(item)}</div>
      <div class="media-gradient"></div>
      <div class="media-label">
        <span>${esc(item.source)}</span>
        <strong>${esc(item.title)}</strong>
      </div>
    </article>
  `;
}

function ratioValue(item, index) {
  const [wide, tall] = tileRatioFor(item, index).split("/").map((part) => Number(part.trim()));
  if (!Number.isFinite(wide) || !Number.isFinite(tall) || tall === 0) return 1;
  return wide / tall;
}

function wallColumnCount() {
  const width = window.innerWidth || 1200;
  if (width <= 760) return 1;
  if (width <= 1200) return 2;
  const detailWidth = selectedId ? Math.min(536, width * 0.42 + 24) : 0;
  const available = Math.max(360, width - detailWidth);
  return Math.max(2, Math.floor(available / 340));
}

function chooseColumn(columns, item) {
  const key = contentKey(item);
  const packedCount = columns.reduce((sum, column) => sum + column.items.length, 0);
  const recentLimit = Math.max(36, Math.min(120, Math.ceil((packedCount + columns.length) / columns.length)));
  const ranked = columns
    .map((column, index) => ({ column, index }))
    .sort((a, b) => a.column.height - b.column.height);
  const unseenColumn = ranked.find(({ column }) => !column.keys.has(key));
  if (unseenColumn) return unseenColumn;
  const scored = ranked.map((entry) => {
    let distance = Infinity;
    for (let index = entry.column.items.length - 1; index >= 0; index -= 1) {
      if (contentKey(entry.column.items[index].item) === key) {
        distance = entry.column.items.length - index;
        break;
      }
    }
    return { ...entry, distance };
  });
  const recentSafe = scored.filter(({ distance }) => distance > recentLimit);
  if (recentSafe.length) return recentSafe.sort((a, b) => a.column.height - b.column.height)[0];
  return scored.sort((a, b) => b.distance - a.distance || a.column.height - b.column.height)[0];
}

function packColumns(items, count) {
  const columns = Array.from({ length: count }, () => ({ height: 0, items: [], keys: new Set() }));
  items.forEach((item, index) => {
    const target = chooseColumn(columns, item);
    target.column.items.push({ item, index });
    target.column.keys.add(contentKey(item));
    target.column.height += 1 / ratioValue(item, index);
  });
  return columns;
}

function renderColumns(items, className, compact = false, count = wallColumnCount()) {
  const columns = packColumns(items, count);
  return `
    <section class="${className}" aria-label="Ocean media results" style="--column-count:${columns.length}">
      ${columns.map((column) => `
        <div class="media-column">
          ${column.items.map(({ item, index }) => renderTile(item, index, compact)).join("")}
        </div>
      `).join("")}
    </section>
  `;
}

function updateTileRatioFromImage(image) {
  if (!image?.naturalWidth || !image?.naturalHeight) return;
  const card = image.closest?.(".media-card");
  if (!card || card.dataset.video === "true") return;
  card.style.setProperty("--media-ratio", `${image.naturalWidth} / ${image.naturalHeight}`);
}

function applyLoadedTileRatios() {
  const images = document.querySelectorAll?.(".media-card .media-primary") || [];
  images.forEach((image) => {
    if (image.complete) updateTileRatioFromImage(image);
  });
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

function focusedItems(item) {
  const baseItems = allItems()
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({ candidate, score: overlapScore(item, candidate) }))
    .sort((a, b) => b.score - a.score)
    .map((row) => row.candidate);
  if (baseItems.length === 0) return [];
  const targetCount = detailPageCount * feedPageSize;
  return videoForwardItems(baseItems).slice(0, targetCount);
}

function selectedItem() {
  return selectedId ? findItem(selectedId) : null;
}

function renderDetail(item) {
  if (!item) return "";
  const related = focusedItems(item);
  const relatedColumnCount = (window.innerWidth || 1200) <= 760 ? 1 : 2;
  const primaryUrl = youtubeWatchUrl(item) || item.url;
  const visitLabel = item.videoId ? "YouTube" : "Website";
  const visit = primaryUrl
    ? `<a class="visit-button" href="${esc(primaryUrl)}" target="_blank" rel="noopener">${visitLabel}</a>`
    : "";
  const sourceLink = item.videoId && item.url && item.url !== primaryUrl
    ? `<a class="action-pill" href="${esc(item.url)}" target="_blank" rel="noopener">Source</a>`
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
        ${sourceLink}
      </div>
      ${renderColumns(related, "similar-grid", true, relatedColumnCount)}
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

function isPaperLikeItem(item) {
  const text = `${item.kind || ""} ${item.url || ""} ${item.board || ""} ${item.source || ""}`.toLowerCase();
  return /\.pdf\b|arxiv|publication|\b(siggraph|iros|icra|rss|uist|sca|eccv|paper|papers)\b|science robotics|nature communications|nature reviews/.test(text);
}

function render() {
  const items = visibleItems();
  document.documentElement.classList.toggle("detail-open", Boolean(selectedId));
  document.body.classList.toggle("detail-open", Boolean(selectedId));
  app.innerHTML = `
    <main class="media-app ${selectedId ? "has-detail" : ""}">
      ${renderColumns(items, "media-wall")}
      ${items.length === 0 ? '<section class="empty-state">Nothing loaded yet.</section>' : ""}
      ${radar.error ? '<div class="source-warning">Live sources are partly rate-limited; curated media is still loaded.</div>' : ""}
      ${renderDetail(selectedItem())}
    </main>
  `;
  const detailPanel = typeof app.querySelector === "function" ? app.querySelector(".detail-panel") : null;
  detailPanel?.addEventListener("scroll", () => extendDetailIfNeeded(detailPanel), { passive: true });
  applyLoadedTileRatios();
}

async function extendFeedIfNeeded() {
  if (loadingMoreFeed) return;
  const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  if (remaining > Math.max(window.innerHeight * 1.8, 900)) return;
  loadingMoreFeed = true;
  feedPageCount += 2;
  const scrollTop = window.scrollY;
  try {
    const shouldFetchOnline = feedPageCount * feedPageSize > allItems().length - feedPageSize;
    if (shouldFetchOnline) {
      await loadMoreOnlineItems(feedPageSize * 2);
    }
    render();
  } finally {
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
      loadingMoreFeed = false;
    });
  }
}

function extendDetailIfNeeded(panel) {
  if (!selectedId || loadingMoreDetail || !panel) return;
  const remaining = panel.scrollHeight - panel.clientHeight - panel.scrollTop;
  if (remaining > Math.max(panel.clientHeight * 1.5, 720)) return;
  loadingMoreDetail = true;
  detailPageCount += 2;
  const scrollTop = panel.scrollTop;
  render();
  requestAnimationFrame(() => {
    const nextPanel = document.querySelector(".detail-panel");
    if (nextPanel) nextPanel.scrollTop = scrollTop;
    loadingMoreDetail = false;
  });
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
    const targetRadius = getComputedStyle(media).borderRadius;
    const animation = flyer.animate([
      {
        left: `${startRect.left}px`,
        top: `${startRect.top}px`,
        width: `${startRect.width}px`,
        height: `${startRect.height}px`,
        borderRadius: getComputedStyle(flyer).getPropertyValue("--start-radius") || "7px",
      },
      {
        left: `${endRect.left}px`,
        top: `${endRect.top}px`,
        width: `${endRect.width}px`,
        height: `${endRect.height}px`,
        borderRadius: targetRadius,
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
  if (selectedId !== id) detailPageCount = initialDetailPageCount;
  const activeTile = sourceElement || document.querySelector(`[data-id="${CSS.escape(id)}"]`);
  const shouldAnimateFocus = (window.innerWidth || 1200) <= 1200;
  const flight = shouldAnimateFocus ? makeFocusFlyer(activeTile) : null;
  selectedId = id;
  history.replaceState(null, "", `?item=${encodeURIComponent(id)}`);
  render();
  if (shouldAnimateFocus) animateFocusFrom(flight);
}

function closeDetail() {
  selectedId = null;
  detailPageCount = initialDetailPageCount;
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

async function loadRadar(force = false, reshuffle = false) {
  if (reshuffle) refreshFeedLayout();
  radar = { ...radar, loading: true };
  if (reshuffle) render();
  try {
    const response = await fetch(`/api/radar${force ? "?force=1" : ""}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Radar returned ${response.status}`);
    const data = await response.json();
    feedPageCount = Math.max(feedPageCount, initialFeedPageCount);
    radar = { ...data, loading: false };
  } catch (error) {
    radar = { ...radar, loading: false, error: error.message };
  }
  if (allItems().length < feedPageCount * feedPageSize) {
    await loadMoreOnlineItems(feedPageSize * 2);
  }
  render();
}

function home() {
  selectedId = null;
  detailPageCount = initialDetailPageCount;
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
  if (action === "refresh") loadRadar(true, true);
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

document.addEventListener("load", (event) => {
  if (event.target?.matches?.(".media-card .media-primary")) {
    updateTileRatioFromImage(event.target);
  }
}, true);

window.addEventListener("scroll", extendFeedIfNeeded, { passive: true });
window.addEventListener("resize", extendFeedIfNeeded);

render();
loadRadar(true);
setInterval(() => loadRadar(true), 1000 * 60 * 30);
