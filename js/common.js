/* ============================================================
   Shared behaviour for every page:
   theme, language, menu, loader, thread progress,
   stitch cursor, reveal-on-scroll, project cards, socials.
   ============================================================ */
(function () {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.JC = { reduced };

  /* ---------- theme ---------- */
  try {
    const t = localStorage.getItem("jc-theme");
    if (t === "dark" || t === "light") root.dataset.theme = t;
  } catch (e) {}
  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("jc-theme", next); } catch (err) {}
  });
  // make the icon match system preference on first load
  if (!root.dataset.theme && isDark()) root.dataset.theme = "dark";

  /* ---------- language ---------- */
  i18n.init();
  document.querySelectorAll(".lang-toggle [data-lang]").forEach((b) =>
    b.addEventListener("click", () => i18n.set(b.dataset.lang))
  );

  /* ---------- mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-toggle");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav a").forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- loader ---------- */
  const done = () => document.body.classList.add("loaded");
  if (new URLSearchParams(location.search).has("nointro")) done(); // ?nointro skips the intro
  setTimeout(done, reduced ? 0 : 3800); // matches the CSS intro (sewn tag + zipper)

  /* ---------- thread progress ---------- */
  const fg = document.querySelector(".thread-fg");
  const needle = document.querySelector(".thread-progress .needle");
  const spool = document.querySelector(".thread-spool");
  if (fg) {
    fg.style.strokeDasharray = "1000";
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      fg.style.strokeDashoffset = String(1000 - p * 1000);
      if (needle) needle.style.left = `calc(22px + (100% - 22px) * ${p})`;
      if (spool) spool.style.backgroundPosition = `${-scrollY / 6}px 0`; // the spool "unwinds"
      document.dispatchEvent(new CustomEvent("threadscroll"));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- stitch cursor (desktop only) ---------- */
  const canvas = document.querySelector(".stitch-cursor");
  if (canvas && !reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const ctx = canvas.getContext("2d");
    let pts = [], raf = null;
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    addEventListener("resize", size);
    addEventListener("pointermove", (e) => {
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (!raf) raf = requestAnimationFrame(draw);
    });
    function draw() {
      const now = performance.now();
      pts = pts.filter((p) => now - p.t < 520);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (pts.length > 1) {
        ctx.lineCap = "round";
        ctx.setLineDash([7, 6]);
        for (let i = 1; i < pts.length; i++) {
          const a = 1 - (now - pts[i].t) / 520;
          ctx.strokeStyle = `rgba(255, 92, 154, ${a * 0.85})`;
          ctx.lineWidth = 2.4 * a + 0.4;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
        }
      }
      raf = pts.length ? requestAnimationFrame(draw) : null;
      if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  window.JC.reveal = (el) => (io ? io.observe(el) : el.classList.add("in"));
  document.querySelectorAll(".reveal").forEach(window.JC.reveal);

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  window.JC.esc = esc;

  window.JC.projectCard = function (p, i = 0) {
    const t = (k) => i18n.t(k), pk = (v) => i18n.pick(v);
    const links = [];
    if (p.demo) links.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>`);
    if (p.repo) links.push(`<a href="${esc(p.repo)}" target="_blank" rel="noopener">${t("projects.code")} ↗</a>`);
    if (!links.length) links.push(`<span>${t("projects.private")}</span>`);
    return `
      <article class="pattern reveal" data-tags="${p.tags.join(" ")}" style="--c:${p.swatch};--d:${(i % 3) * 0.08}s;--i:${i}">
        <span class="scissors" aria-hidden="true">✂</span>
        <span class="pin" aria-hidden="true"></span>
        <div class="pattern-top">
          <span class="swatch" aria-hidden="true"></span>
          <span class="kicker">${esc(pk(p.kicker))}</span>
          <span class="year">${p.year}</span>
        </div>
        <h3>${esc(pk(p.title))}</h3>
        <p>${esc(pk(p.desc))}</p>
        <ul class="chips">${p.stack.map((s, j) => `<li style="--i:${j}">${esc(s)}</li>`).join("")}</ul>
        <div class="pattern-links">${links.join("")}</div>
      </article>`;
  };

  /* simple-icons style glyphs */
  const ICONS = {
    linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>',
    github: '<path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3Z"/>',
    steam: '<path d="M11.98 0C5.67 0 .5 4.86.02 11.04l6.44 2.66a3.4 3.4 0 0 1 2.14-.6l2.87-4.15v-.06a4.52 4.52 0 1 1 4.52 4.52h-.1l-4.08 2.92.01.16a3.39 3.39 0 0 1-6.73.56L.48 15.4A12 12 0 1 0 11.98 0ZM7.54 18.21l-1.47-.61a2.55 2.55 0 1 0 1.4-3.37l1.52.63a1.88 1.88 0 1 1-1.45 3.35Zm11.41-9.3a3.02 3.02 0 1 0-6.03 0 3.02 3.02 0 0 0 6.03 0Zm-5.27 0a2.27 2.27 0 1 1 4.54 0 2.27 2.27 0 0 1-4.54 0Z"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/>',
    facebook: '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07Z"/>',
    mail: '<path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.5l10 6.25L22 6.5V6H2Zm20 2.85-9.47 5.92a1 1 0 0 1-1.06 0L2 8.85V18h20V8.85Z"/>',
  };
  window.JC.socialsHTML = function () {
    const P = window.PROFILE;
    const items = [
      ["LinkedIn", P.linkedin, "linkedin"], ["GitHub", P.github, "github"], ["Steam", P.steam, "steam"],
      ["Instagram", P.instagram, "instagram"], ["Facebook", P.facebook, "facebook"],
    ];
    return items.map(([n, u, ic]) =>
      `<li><a href="${esc(u)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[ic]}</svg>${n}</a></li>`
    ).join("");
  };
  window.JC.ICONS = ICONS;

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
