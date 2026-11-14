/* ============================================================
   Home page: wardrobe game, buddy, sections, QA mini-game.
   ============================================================ */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const t = (k) => i18n.t(k), pk = (v) => i18n.pick(v), esc = JC.esc;
  const LOOK_COLORS = { sunny: "#F6C431", casual: "#FFB3D9", hoodie: "#B79CFF", designer: "#7B5CD6", labcoat: "#E9EEF8", blazer: "#4F6EDB", gala: "#9FC4FF", coat: "#E8BFD3", noir: "#3A3344" };
  const SECTION_LABEL = { about: "nav.about", skills: "nav.skills", projects: "nav.projects", experience: "nav.experience", certificates: "nav.certs", contact: "nav.contact" };

  /* ---------- state (per-browser convenience only) ---------- */
  let unlocked = ["sunny"];
  try {
    const s = JSON.parse(localStorage.getItem("jc-looks") || "[]");
    if (Array.isArray(s)) unlocked = [...new Set(["sunny", ...s.filter((id) => LOOKS.some((l) => l.id === id))])];
  } catch (e) {}
  let heroLook = unlocked[unlocked.length - 1] === "sunny" ? "sunny" : unlocked[unlocked.length - 1];
  const save = () => { try { localStorage.setItem("jc-looks", JSON.stringify(unlocked)); } catch (e) {} };

  /* ---------- avatars ---------- */
  const markup = (slotId, look) => avatarSVG(look, slotId) +
    (slotId === "hero-avatar" ? `<span class="hi-bubble">${i18n.lang === "es" ? "¡Hola! 👋" : "Hi! 👋"}</span>` : "");
  function dress(slotId, look, animate = true) {
    const slot = document.getElementById(slotId);
    if (!slot) return;
    if (slot.dataset.look === look) return;
    slot.dataset.look = look;
    if (animate && !JC.reduced && slot.innerHTML) {
      slot.classList.remove("dressing"); void slot.offsetWidth; slot.classList.add("dressing");
      clearTimeout(slot._t);
      slot._t = setTimeout(() => (slot.innerHTML = markup(slotId, slot.dataset.look)), 280);
    } else {
      clearTimeout(slot._t);
      slot.innerHTML = markup(slotId, look);
    }
  }
  // tap to wave on touch screens (hover covers mouse users)
  ["hero-avatar", "buddy-avatar"].forEach((sid) => {
    const el = document.getElementById(sid);
    el.addEventListener("click", () => {
      el.classList.remove("waving"); void el.offsetWidth; el.classList.add("waving");
      clearTimeout(el._w); el._w = setTimeout(() => el.classList.remove("waving"), 2900);
    });
  });
  document.addEventListener("langchange", () => {
    const b = document.querySelector("#hero-avatar .hi-bubble");
    if (b) b.textContent = i18n.lang === "es" ? "¡Hola! 👋" : "Hi! 👋";
  });
  dress("hero-avatar", heroLook, false);
  dress("qa-avatar", "hoodie", false);
  dress("buddy-avatar", heroLook, false);

  /* ---------- wardrobe rack ---------- */
  function renderRack() {
    $("#hangers").innerHTML = LOOKS.map((l) => {
      const open = unlocked.includes(l.id);
      const hint = l.section === "qa-game" ? `${t("rack.locked")}: QA`
        : l.section === "secret" ? t("rack.secret")
        : `${t("rack.locked")}: ${t(SECTION_LABEL[l.section] || "nav.about")}`;
      return `<li><button class="hanger" type="button" data-look="${l.id}" ${open ? "" : "disabled"}
        aria-pressed="${heroLook === l.id}" title="${esc(open ? pk(l.name) : hint)}" aria-label="${esc(open ? pk(l.name) : hint)}">
        <span class="cloth ${l.id === "gala" ? "dress" : ""}" style="--c:${LOOK_COLORS[l.id]}"></span>
        <span class="hname">${esc(open ? pk(l.name) : l.section === "secret" ? "✦ ✦ ✦" : "???")}</span></button></li>`;
    }).join("");
    $(".looks-count").textContent = `${unlocked.length}/${LOOKS.length}`;
  }
  renderRack();
  $("#hangers").addEventListener("click", (e) => {
    const b = e.target.closest(".hanger");
    if (!b || b.disabled) return;
    heroLook = b.dataset.look;
    dress("hero-avatar", heroLook);
    renderRack();
  });
  $(".rack-shuffle").addEventListener("click", () => {
    const options = unlocked.filter((id) => id !== heroLook);
    if (!options.length) { toast(`${t("rack.hint")}`); return; }
    heroLook = options[Math.floor(Math.random() * options.length)];
    dress("hero-avatar", heroLook);
    renderRack();
  });

  function unlock(id) {
    if (unlocked.includes(id)) return;
    unlocked.push(id);
    save();
    renderRack();
    const look = LOOKS.find((l) => l.id === id);
    toast(id === "noir"
      ? `<span class="pixel">SECRET</span> ${t("toast.secret")} <strong style="color:inherit">${esc(pk(look.name))}</strong>`
      : `<span class="pixel">NEW</span> ${t("toast.unlock")} <strong style="color:inherit">${esc(pk(look.name))}</strong>`);
    // the secret look appears once every other look is collected
    if (id !== "noir" && !unlocked.includes("noir") && LOOKS.every((l) => l.id === "noir" || unlocked.includes(l.id))) {
      setTimeout(() => unlock("noir"), 1400);
    }
    const stat = $(".hud-stat"); stat.classList.remove("bump"); void stat.offsetWidth; stat.classList.add("bump");
    const h = document.querySelector(`.hanger[data-look="${id}"]`);
    if (h) h.classList.add("just-unlocked");
    if (unlocked.length === LOOKS.length) setTimeout(() => { toast(t("toast.all")); confetti(); }, 900);
  }

  /* ---------- toasts & confetti ---------- */
  function toast(html) {
    const el = document.createElement("div");
    el.className = "toast"; el.innerHTML = html;
    $(".toasts").appendChild(el);
    setTimeout(() => el.remove(), 3700);
  }
  function confetti() {
    if (JC.reduced) return;
    const colors = ["#B79CFF", "#FF9ACB", "#A8D8FF", "#7B5CD6", "#FFD66B", "#8EE3E0"];
    for (let i = 0; i < 90; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.borderRadius = i % 3 ? "2px" : "50%";
      c.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      c.style.animationDelay = Math.random() * 0.6 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }
  }

  /* ---------- section tracking: unlocks, buddy, active nav ---------- */
  const buddy = $(".buddy"), bubble = $("#bubble");
  let bubbleTimer;
  function say(key) {
    bubble.textContent = t(key);
    bubble.classList.add("show");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 3200);
  }
  let current = "hero";
  const sectionLook = (sec) => {
    if (sec === "contact") return unlocked.includes("coat") ? "coat" : "sunny";
    if (sec === "qa") return unlocked.includes("labcoat") ? "labcoat" : "hoodie";
    const l = LOOKS.find((x) => x.section === sec);
    return l && unlocked.includes(l.id) ? l.id : heroLook;
  };
  function enter(sec) {
    if (sec === current) return;
    current = sec;
    const l = LOOKS.find((x) => x.section === sec);
    if (l) unlock(l.id);
    buddy.classList.toggle("show", sec !== "hero");
    if (sec !== "hero") { dress("buddy-avatar", sectionLook(sec)); say("bubble." + sec); }
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + sec));
  }
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) enter(en.target.dataset.section); });
  }, { rootMargin: "-45% 0px -45% 0px" });
  document.querySelectorAll("[data-section]").forEach((s) => secObserver.observe(s));

  /* ---------- skills ---------- */
  function renderSkills() {
    $("#spools").innerHTML = SKILLS.map((s, i) => `
      <article class="spool-card reveal" style="--c:${s.color};--d:${i * 0.07}s">
        <div class="spool-art" aria-hidden="true"><span></span><i></i></div>
        <div>
          <h3>${esc(pk(s.title))}</h3>
          <p class="hand">${esc(pk(s.note))}</p>
          <ul class="chips">${s.items.map((it, j) => `<li style="--i:${j}">${esc(it)}</li>`).join("")}</ul>
        </div>
      </article>`).join("");
  }

  /* ---------- projects ---------- */
  function renderProjects() {
    $("#featured").innerHTML = PROJECTS.filter((p) => p.featured).map((p, i) => JC.projectCard(p, i)).join("");
  }

  /* ---------- experience ---------- */
  function renderRunway() {
    $("#runway").innerHTML = EXPERIENCE.map((x, i) => `
      <li class="run reveal" style="--d:${i * 0.05}s">
        <div class="run-card">
          <span class="run-when">${esc(pk(x.when))}</span>
          <h3>${esc(pk(x.role))}</h3>
          <p class="run-org">${esc(pk(x.org))}</p>
          <ul>${pk(x.points).map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </li>`).join("");
  }

  /* ---------- certificates ---------- */
  function renderTags() {
    $("#tags").innerHTML = CERTS.map((c, i) => `
      <div class="tag-wrap reveal" style="--c:${c.color};--d:${i * 0.07}s">
        <div class="tag">
          <span class="postmark" aria-hidden="true">✓ VERIFIED</span>
          <span class="tag-year">${esc(c.year)}</span>
          <h3>${esc(pk(c.title))}</h3>
          <p>${esc(pk(c.issuer))}</p>
          ${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${t("certs.view")} ↗</a>` : ""}
        </div>
      </div>`).join("");
  }

  /* ---------- contact ---------- */
  const email = PROFILE.email;
  $("#email-link").href = "mailto:" + email;
  $("#socials").innerHTML = JC.socialsHTML();
  $("#copy-email").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(email);
      btn.textContent = t("contact.copied");
    } catch (err) {
      window.location.href = "mailto:" + email;
    }
    setTimeout(() => (btn.textContent = t("contact.copy")), 2000);
  });

  /* ---------- QA mini-game ---------- */
  const found = new Set();
  const card = $("#qa-card"), log = $("#qa-log");
  function logLine(html, cls = "") {
    const li = document.createElement("li");
    li.className = cls; li.innerHTML = html;
    log.appendChild(li);
  }
  function hit(el) {
    const id = el.dataset.bug;
    if (found.has(id)) return;
    found.add(id);
    el.classList.add("found");
    $("#bug-count").textContent = found.size;
    logLine(esc(t("qa.bug" + id)));
    if (found.size === 5) {
      card.classList.add("fixed");
      setTimeout(() => {
        $(".qa-price").textContent = "$34.90";
        $(".qa-stars").textContent = "★★★★★";
        $(".qa-btn").textContent = i18n.lang === "es" ? "Añadir al carrito" : "Add to cart";
        $(".qa-title").textContent = t("qa.product"); $(".qa-dup").textContent = "XL";
        document.querySelectorAll("[data-bug]").forEach((b) => b.classList.remove("found"));
        logLine(t("qa.win"), "win");
        unlock("labcoat");
        dress("qa-avatar", "labcoat");
        if (current === "qa") dress("buddy-avatar", "labcoat");
      }, 700);
    }
  }
  card.addEventListener("click", (e) => {
    if (found.size === 5) return;
    const bug = e.target.closest("[data-bug]");
    if (bug) { e.preventDefault(); hit(bug); return; }
    if (!log.querySelector(".miss")) logLine(esc(t("qa.miss")), "miss");
  });
  card.addEventListener("keydown", (e) => {
    const bug = e.target.closest("[data-bug]");
    if (bug && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); hit(bug); }
  });
  $("#qa-reset").addEventListener("click", () => {
    found.clear();
    card.classList.remove("fixed");
    document.querySelectorAll("[data-bug]").forEach((b) => b.classList.remove("found"));
    $("#bug-count").textContent = "0";
    log.innerHTML = "";
    $(".qa-price").textContent = "$NaN";
    $(".qa-stars").textContent = "★★★★★★";
    $(".qa-btn").textContent = t("qa.btn");
    $(".qa-title").textContent = t("qa.productBug"); $(".qa-dup").textContent = "L";
    dress("qa-avatar", "hoodie");
  });

  /* ---------- sewing buttons on the top thread ---------- */
  const BTN_COLORS = { about: "#FF9ACB", skills: "#B79CFF", projects: "#7B5CD6", qa: "#8EE3E0", studio: "#FF7AB8", experience: "#5B8DEF", certificates: "#FFB3D9", contact: "#FF5C9A" };
  const BTN_LABEL = { about: "nav.about", skills: "nav.skills", projects: "nav.projects", qa: "nav.qa", studio: "nav.studio", experience: "nav.experience", certificates: "nav.certs", contact: "nav.contact" };
  const btnWrap = $("#thread-buttons");
  const btnSections = [...document.querySelectorAll("section[data-section]")].filter((s) => s.id);
  function renderThreadButtons() {
    btnWrap.innerHTML = btnSections.map((s) =>
      `<button class="thread-btn" type="button" data-target="${s.id}" style="--c:${BTN_COLORS[s.id] || "#B79CFF"}" aria-label="${esc(t(BTN_LABEL[s.id]))}"><span class="tip">${esc(t(BTN_LABEL[s.id]))}</span></button>`
    ).join("");
    placeThreadButtons();
  }
  function placeThreadButtons() {
    const max = document.documentElement.scrollHeight - innerHeight;
    btnWrap.querySelectorAll(".thread-btn").forEach((b) => {
      const s = document.getElementById(b.dataset.target);
      const p = max > 0 ? Math.min(1, Math.max(0, (s.offsetTop - 80) / max)) : 0;
      b.style.left = `calc(${p * 100}% - ${p * 8}px)`;
      b.dataset.at = String(p);
    });
    sewButtons();
  }
  function sewButtons() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    btnWrap.querySelectorAll(".thread-btn").forEach((b) => b.classList.toggle("sewn", p + 0.002 >= Number(b.dataset.at)));
  }
  btnWrap.addEventListener("click", (e) => {
    const b = e.target.closest(".thread-btn");
    if (b) document.getElementById(b.dataset.target).scrollIntoView({ behavior: JC.reduced ? "auto" : "smooth" });
  });
  document.addEventListener("threadscroll", sewButtons);
  addEventListener("resize", placeThreadButtons);
  addEventListener("load", placeThreadButtons);


  /* ---------- button tin in the footer: click to spill buttons ---------- */
  const tin = document.querySelector(".button-tin");
  if (tin) tin.addEventListener("click", () => {
    tin.classList.remove("open"); void tin.offsetWidth; tin.classList.add("open");
    if (JC.reduced) return;
    const r = tin.getBoundingClientRect();
    const colors = ["#B79CFF", "#7B5CD6", "#8CC8FF", "#5B8DEF", "#FF9ACB", "#FF7AB8", "#FFFFFF"];
    for (let i = 0; i < 18; i++) {
      const b = document.createElement("i");
      b.className = "spill-btn";
      const size = 12 + Math.random() * 12;
      b.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + 10}px;width:${size}px;height:${size}px;--c:${colors[i % colors.length]}`;
      document.body.appendChild(b);
      const dx = (Math.random() - .5) * 420, up = 120 + Math.random() * 160, floor = innerHeight - r.top + 40;
      b.animate([
        { transform: "translate(-50%,0) rotate(0)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * .5}px), ${-up}px) rotate(${dx}deg)`, opacity: 1, offset: .35 },
        { transform: `translate(calc(-50% + ${dx}px), ${floor}px) rotate(${dx * 2}deg)`, opacity: .9 },
      ], { duration: 1300 + Math.random() * 600, easing: "cubic-bezier(.3,.6,.6,1)", fill: "forwards" }).onfinish = () => b.remove();
    }
  });

  /* ---------- render + re-render on language change ---------- */
  function renderAll() {
    renderSkills(); renderProjects(); renderRunway(); renderTags(); renderRack(); renderThreadButtons();
    document.querySelectorAll("#spools .reveal, #featured .reveal, #runway .reveal, #tags .reveal").forEach(JC.reveal);
  }
  renderAll();
  document.addEventListener("langchange", () => {
    renderAll();
    if (found.size === 5) { $(".qa-btn").textContent = i18n.lang === "es" ? "Añadir al carrito" : "Add to cart"; $(".qa-title").textContent = t("qa.product"); }
  });
})();

/* flip card: click, tap or Enter turns the avatar card to show the photo side */
(function () {
  const card = document.querySelector(".flip");
  if (!card) return;
  const flip = () => {
    const on = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(on));
    const stage = card.closest(".stage");
    if (stage) stage.classList.toggle("photo-side", on); // the wardrobe belongs to the avatar side
  };
  if (new URLSearchParams(location.search).has("flip")) flip(); // ?flip opens the photo side (handy for previews)
  card.addEventListener("click", (e) => { if (!e.target.closest("a")) flip(); });
  card.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && !e.target.closest("a")) { e.preventDefault(); flip(); }
  });
})();
