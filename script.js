/* ============================================================
   Portfolio scripts
   Each feature is its own small function; init() at the bottom
   wires them up once the page is ready.
   ============================================================ */

/* ---- Footer: show the current year ---- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---- Navbar: smooth-scroll to in-page sections ---- */
function initSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });
}

/* ---- Mobile navigation ---- */
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  links.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      close();
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) close();
  });
}

/* ============================================================
   Lightbox (enlarge a gallery image or play a YouTube video)
   ============================================================ */

// Extract the 11-char video id from any YouTube link form (watch?v=, youtu.be/, /embed/, /shorts/).
function youTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Build an embeddable URL. YouTube blocks watch?v= inside an iframe
// ("refused to connect"), so the src must be /embed/<id>.
function toYouTubeEmbed(url) {
  const id = youTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

// Fallback thumbnail auto-fetched from YouTube when a video has no custom thumb.
function youTubeThumb(url) {
  const id = youTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

// Shorts are vertical (9:16); everything else is treated as landscape (16:9).
function isVerticalVideo(url) {
  return /\/shorts\//.test(url);
}

// Build the HTML shown inside the lightbox for a clicked element.
function buildLightboxHTML(el) {
  const videoUrl = el.getAttribute("data-video");
  if (videoUrl) {
    const orientation = isVerticalVideo(videoUrl) ? " vertical" : "";
    return `<div class="lb-video${orientation}">`
      + `<iframe src="${toYouTubeEmbed(videoUrl)}?autoplay=1" `
      + `title="${escapeHTML(el.getAttribute("data-alt") || "Project video")}" `
      + `referrerpolicy="strict-origin-when-cross-origin" `
      + `allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  }
  return `<img src="${escapeHTML(el.getAttribute("data-image") || "")}" `
    + `alt="${escapeHTML(el.getAttribute("data-alt") || "")}">`;
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightboxContent");
  const closeButton = document.getElementById("lightboxClose");
  if (!lightbox || !content || !closeButton) return;

  let trigger = null;

  const open = (el) => {
    trigger = el;
    content.innerHTML = buildLightboxHTML(el);
    lightbox.classList.add("visible");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };
  const close = () => {
    if (!lightbox.classList.contains("visible")) return;
    lightbox.classList.remove("visible");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    content.innerHTML = ""; // clear so a playing video stops
    if (trigger) trigger.focus();
  };

  // Every clickable media tile (image or video); the video's inner <img> is not a .media-item
  document.querySelectorAll(".media-item").forEach(el => {
    el.addEventListener("click", () => open(el));
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("visible")) return;
    if (e.key === "Escape") close();

    if (e.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button, iframe, [href], [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ============================================================
   Render project cards from the PROJECTS array (projects-data.js)
   ============================================================ */

// Escape dynamic text before inserting it into generated markup.
function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// One keyboard-accessible media tile, marked with .media-item for the lightbox.
function buildMediaItem(m) {
  const alt = escapeHTML(m.alt || "Open project media");

  if (m.type === "video") {
    const thumb = m.thumb || youTubeThumb(m.video);
    const vClass = isVerticalVideo(m.video) ? " vertical" : "";
    return `<button type="button" class="media-item gallery-video${vClass}" `
      + `data-video="${escapeHTML(m.video)}" data-alt="${alt}" aria-label="Play ${alt}">`
      + `<img src="${escapeHTML(thumb)}" alt="" loading="lazy" decoding="async" `
      + `onerror="this.onerror=null;this.src='assets/video-placeholder.svg'">`
      + `<span class="play-badge" aria-hidden="true">▶</span></button>`;
  }
  return `<button type="button" class="media-item gallery-image" `
    + `data-image="${escapeHTML(m.src)}" data-alt="${alt}" aria-label="Enlarge ${alt}">`
    + `<img src="${escapeHTML(m.src)}" alt="" loading="lazy" decoding="async"></button>`;
}

// Build the media area: a large featured item + a strip of the rest, or a placeholder if empty.
function buildMedia(project) {
  if (!project.media || project.media.length === 0) {
    const text = escapeHTML(project.placeholder || "");
    return `<div class="media-placeholder">${text}</div>`;
  }
  const [first, ...rest] = project.media;
  const main = `<div class="gallery-main">${buildMediaItem(first)}</div>`;
  const strip = rest.length
    ? `<div class="gallery-strip">${rest.map(buildMediaItem).join("")}</div>`
    : "";
  return `<div class="gallery">${main}${strip}</div>`;
}

// Build one full project card.
function buildProjectCard(project) {
  const bullets = project.bullets.map(b => `<li>${b}</li>`).join("");
  const tech = project.tech.map(t => `<span>${escapeHTML(t)}</span>`).join("");
  const links = (project.links && project.links.length)
    ? `<div class="project-links">`
      + project.links.map(l => `<a href="${escapeHTML(l.href)}" target="_blank" rel="noopener noreferrer" class="link-badge">${escapeHTML(l.label)}</a>`).join("")
      + `</div>`
    : "";

  return `<div class="project-card${project.reverse ? " reverse" : ""}">`
    + `<div class="project-media">${buildMedia(project)}</div>`
    + `<div class="project-info">`
    + `<span class="project-tag">${escapeHTML(project.tag)}</span>`
    + `<h3>${escapeHTML(project.title)}</h3>`
    + `<p class="project-role">${escapeHTML(project.role)}</p>`
    + `<ul>${bullets}</ul>`
    + `<div class="project-tech">${tech}</div>`
    + links
    + `</div></div>`;
}

function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list || typeof PROJECTS === "undefined") return;
  list.innerHTML = PROJECTS.map(buildProjectCard).join("");
}

/* ---- Start everything ---- */
function init() {
  initFooterYear();
  initSmoothScroll();
  initMobileMenu();
  renderProjects();  // must run before initLightbox so the gallery elements exist
  initLightbox();
}

init();
