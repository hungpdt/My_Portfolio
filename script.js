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
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
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
      + `allow="autoplay; fullscreen" allowfullscreen></iframe></div>`;
  }
  return `<img src="${el.getAttribute("src")}" alt="${el.getAttribute("alt") || ""}">`;
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightboxContent");
  if (!lightbox || !content) return;

  const open = (el) => {
    content.innerHTML = buildLightboxHTML(el);
    lightbox.classList.add("visible");
  };
  const close = () => {
    lightbox.classList.remove("visible");
    content.innerHTML = ""; // clear so a playing video stops
  };

  // Every clickable media tile (image or video); the video's inner <img> is not a .media-item
  document.querySelectorAll(".media-item").forEach(el => {
    el.addEventListener("click", () => open(el));
  });

  document.getElementById("lightboxClose").addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ============================================================
   Render project cards from the PROJECTS array (projects-data.js)
   ============================================================ */

// One clickable media tile (image or video), marked with .media-item for the lightbox.
function buildMediaItem(m) {
  if (m.type === "video") {
    const thumb = m.thumb || youTubeThumb(m.video);
    const vClass = isVerticalVideo(m.video) ? " vertical" : "";
    return `<div class="media-item gallery-video${vClass}" data-video="${m.video}">`
      + `<img src="${thumb}" alt="${m.alt || ""}">`
      + `<span class="play-badge">▶</span></div>`;
  }
  return `<img class="media-item" src="${m.src}" alt="${m.alt || ""}">`;
}

// Build the media area: a large featured item + a strip of the rest, or a placeholder if empty.
function buildMedia(project) {
  if (!project.media || project.media.length === 0) {
    const text = project.placeholder || "";
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
  const tech = project.tech.map(t => `<span>${t}</span>`).join("");
  const links = (project.links && project.links.length)
    ? `<div class="project-links">`
      + project.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener" class="link-badge">${l.label}</a>`).join("")
      + `</div>`
    : "";

  return `<div class="project-card${project.reverse ? " reverse" : ""}">`
    + `<div class="project-media">${buildMedia(project)}</div>`
    + `<div class="project-info">`
    + `<span class="project-tag">${project.tag}</span>`
    + `<h3>${project.title}</h3>`
    + `<p class="project-role">${project.role}</p>`
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
  renderProjects();  // must run before initLightbox so the gallery elements exist
  initLightbox();
}

init();
