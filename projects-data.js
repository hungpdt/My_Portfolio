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
    role: "Unity Developer · Production team of 6",
    reverse: false,
    media: [
      { type: "video", video: "https://www.youtube.com/watch?v=zNDeF6_jXPo", alt: "Idle Berserker gameplay video" }
    ],
    bullets: [
      "Owned the implementation of the Magical Anvil mini-game from Game Designer requirements through production integration",
      "Built its gameplay flow, UI, asset integration, localization, Firebase tracking, VFX, and animation",
      "Structured the feature with event-driven logic, state and strategy patterns, and object pooling to keep its systems maintainable and extensible",
      "Used ScriptableObject data to configure sword VFX by tier instead of coupling visual variants to gameplay code"
    ],
    tech: ["Unity", "C#", "Git", "Jenkins", "ScriptableObject"],
    links: []
  },
  {
    tag: "Gameloft · 03/2024 – 04/2026",
    title: "Sniper Champions",
    role: "Unity / Game Developer · Live-service production team of 20",
    reverse: true,
    media: [
      { type: "video", video: "https://youtube.com/shorts/ZK7w4bm4n3Q", thumb: "assets/images/sniper-champions-TLE.jpg", alt: "Sniper Champions Time-Limited Event video" }
    ],
    bullets: [
      "Delivered a new Time-Limited Event with designers, artists, and QA, covering gameplay logic, Unity UI flow, rewards, configuration, and production bug fixing",
      "Built a remotely configurable IAP popup system whose templates, artwork, rewards, and content could be updated without a new client release",
      "Integrated and maintained MAX, IronSource, Singular, Firebase Analytics, and Google Play Games Services",
      "Implemented and validated analytics events used by Product, LiveOps, and BI teams to monitor player and event behavior",
      "Automated parallel Android/iOS build workflows with Python and Jenkins, <strong>reducing total build time by approximately 50%</strong>"
    ],
    tech: ["Unity", "C#", "Python", "Jenkins", "Xcode", "Git"],
    links: []
  },
  {
    tag: "Gameloft · Netflix · 06/2023 – 03/2024",
    title: "LEGO Legacy: Heroes Unboxed",
    role: "Unity Developer · Production team of 23",
    reverse: false,
    media: [
      { type: "video", video: "https://www.youtube.com/watch?v=0RgfF6SLTDE", alt: "LEGO Legacy: Heroes Unboxed trailer" }
    ],
    bullets: [
      "Implemented and maintained player-facing systems including achievements, the in-game wiki, shop mechanics, and event content",
      "Partnered with the design team to tune campaign progression and content pacing for live updates",
      "Investigated and resolved gameplay and event issues across supported platforms"
    ],
    tech: ["Phantom Engine", "C#", "C++", "SVN", "Git"]
  },
  {
    tag: "Personal Side Project · 03/2024 – 06/2024",
    title: "Dragon Slayer",
    role: "Solo Game Developer · 2D mobile game built end-to-end",
    reverse: true,
    media: [],
    placeholder: "Dragon Slayer — solo-developed 2D mobile game",
    bullets: [
      "Designed, developed, tested, and published a solo 2D mobile game through Google Play beta",
      "Built the core combat and progression systems, including enemies, traps, bosses, quests, achievements, and player skills",
      "Combined Unity animation, particle effects, and physics to shape combat feedback, using object pooling to reduce repeated object creation",
      "Integrated Google Play Games Services for player sign-in and leaderboards"
    ],
    tech: ["Unity", "C#", "Google Play Games Services"],
    links: [
      { label: "▶ Demo (Google Drive)", href: "https://drive.google.com/drive/folders/1t5Lkv2FxBpSlKloc6p7m4DaNYOD1uwIZ" }
    ]
  }
];
