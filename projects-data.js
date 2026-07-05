/* ============================================================
   PROJECT DATA
   This is the only file you edit to add / change / reorder projects.
   script.js reads this array and builds the project cards.

   One object = one project. Fields:
     tag     : small label above the title (company · dates)
     title   : project name
     role    : your role / team size line
     reverse : true = media on the right, text on the left (alternate for a zig-zag layout)
     media   : array of images/videos shown as a thumbnail grid. Leave [] if none yet.
                 image -> { type: "image", src: "assets/images/xxx.jpg", alt: "..." }
                 video -> { type: "video", video: "<any YouTube link>", thumb: "assets/images/xxx.jpg", alt: "..." }
     placeholder : text shown in the media box while media is still empty (optional)
     bullets : array of achievement lines (HTML allowed, e.g. <strong>...</strong>)
     tech    : array of technology tags
     links   : array of buttons, e.g. { label: "▶ Demo", href: "https://..." } (optional)
   ============================================================ */

const PROJECTS = [
  {
    tag: "NSTAGE · 04/2026 – 06/2026",
    title: "Idle Berserker",
    role: "Unity Developer — team of 6",
    reverse: false,
    media: [
      { type: "video", video: "https://www.youtube.com/watch?v=zNDeF6_jXPo", alt: "Idle Berserker gameplay video" }
    ],
    bullets: [
      "Implemented the Magical Anvil mini-game per Game Designer requirements: gameplay logic, mini-game flow, UI, asset integration, localization, Firebase tracking, VFX and animation",
      "Applied practical design patterns — Template Method, Observer/event-driven logic, State Machine, Strategy with ScriptableObject, and Object Pooling — to keep the mini-game maintainable and extensible",
      "Used ScriptableObject to manage sword VFX variants by tier, driving visual changes through data instead of hard-coded logic"
    ],
    tech: ["Unity", "C#", "Git", "Jenkins", "ScriptableObject"],
    links: []
  },
  {
    tag: "Gameloft · 03/2024 – 04/2026",
    title: "Sniper Champions",
    role: "Unity / Game Developer — live-service mobile game, team of 20",
    reverse: true,
    media: [
      { type: "video", video: "https://youtube.com/shorts/ZK7w4bm4n3Q", thumb: "assets/images/sniper-champions-TLE.jpg", alt: "Sniper Champions Time-Limited Event video" }
    ],
    bullets: [
      "Collaborated with designers, artists, and QA to implement a new Time-Limited Event: gameplay logic, Unity UI flow, reward display, event configuration, and production bug fixing",
      "Built a remotely configurable IAP popup in Unity UI Canvas — templates, images, rewards and content updatable online without a full client release",
      "Integrated and maintained ads/analytics/attribution SDKs: MAX, IronSource, Singular, Firebase Analytics, Google Play Games Services",
      "Implemented and verified analytics tracking to help Product, LiveOps and BI teams monitor player actions and event behavior",
      "Automated parallel Android/iOS build workflows with Python + Jenkins, <strong>reducing total build time by ~50%</strong>"
    ],
    tech: ["Unity", "C#", "Python", "Jenkins", "Xcode", "Git"],
    links: []
  },
  {
    tag: "Gameloft · Netflix · 06/2023 – 03/2024",
    title: "LEGO Legacy: Heroes Unboxed",
    role: "Unity Developer — production game, team of 23",
    reverse: false,
    media: [
      { type: "video", video: "https://www.youtube.com/watch?v=0RgfF6SLTDE", alt: "LEGO Legacy: Heroes Unboxed trailer" }
    ],
    bullets: [
      "Contributed to gameplay and system features: achievement systems, wiki systems, shop mechanics, and event-related content",
      "Worked with the design team to tune campaign progression and improve content pacing for live updates",
      "Debugged and resolved gameplay and event-related issues across multiple platforms"
    ],
    tech: ["Phantom Engine", "C#", "C++", "SVN", "Git"]
  },
  {
    tag: "Personal Side Project · 03/2024 – 06/2024",
    title: "Dragon Slayer",
    role: "Solo Game Developer — 2D mobile game, end-to-end",
    reverse: true,
    media: [],
    placeholder: "🎮 Dragon Slayer gameplay video/GIF (add to assets/ or embed YouTube)",
    bullets: [
      "Developed and published a solo 2D mobile game on Google Play Beta",
      "Implemented core gameplay systems: enemies, traps, boss behavior, quests, achievements, and player skills",
      "Applied Unity animation, particle effects, physics, and Object Pooling to improve combat feel and reduce unnecessary object creation",
      "Integrated Google Play Games Services for leaderboards and player sign-in"
    ],
    tech: ["Unity", "C#", "Google Play Games Services"],
    links: [
      { label: "▶ Demo (Google Drive)", href: "https://drive.google.com/drive/folders/1t5Lkv2FxBpSlKloc6p7m4DaNYOD1uwIZ" }
    ]
  }
];
