/* ============================================================
   Design studio: a dressmaker mini-game written as code.
   Pick a silhouette, fabric, colour and details; the config is
   shown live as TypeScript, "npm run sew" runs the tests and the
   avatar puts the dress on. The card can be downloaded as PNG.
   ============================================================ */
(function () {
  const root = document.getElementById("studio");
  if (!root) return;
  const $ = (s) => root.querySelector(s);
  const t = (k) => i18n.t(k), esc = JC.esc;

  const OPTIONS = {
    silhouette: [
      ["aline", { en: "A-line", es: "Línea A" }], ["swing", { en: "50s swing", es: "Swing años 50" }],
      ["ball", { en: "Ball gown", es: "De baile" }], ["mermaid", { en: "Mermaid", es: "Sirena" }], ["mini", { en: "Mini", es: "Mini" }],
    ],
    fabric: [
      ["polka", { en: "Polka dots", es: "Lunares" }], ["gingham", { en: "Gingham", es: "Vichy" }], ["floral", { en: "Floral", es: "Flores" }],
      ["stripes", { en: "Stripes", es: "Rayas" }], ["solid", { en: "Solid satin", es: "Satén liso" }],
    ],
    color: Object.keys(window.DRESS_COLORS).map((k) => [k, { en: k, es: k }]),
    details: [
      ["bow", { en: "Bow", es: "Moño" }], ["lace", { en: "Lace hem", es: "Encaje" }], ["puff", { en: "Puff sleeves", es: "Mangas abullonadas" }],
      ["belt", { en: "Belt", es: "Cinturón" }], ["buttons", { en: "Buttons", es: "Botones" }],
    ],
  };
  let cfg = { silhouette: "swing", fabric: "polka", color: "lilac", details: ["bow"] };
  let view = "mannequin", busy = false;

  /* ---------- mannequin (dress form) ---------- */
  function mannequinSVG() {
    const D = dressParts(cfg, "mq");
    return `<svg class="mannequin-svg" viewBox="0 0 200 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dress on a mannequin">
      <defs>${D.defs}<linearGradient id="form" x1="0" x2="1"><stop offset="0" stop-color="#F3E7D6"/><stop offset="1" stop-color="#D9C4A8"/></linearGradient></defs>
      <rect x="97" y="200" width="6" height="104" fill="#B38E66"/>
      <path d="M100 300L70 318M100 300L130 318M100 300V320" stroke="#8C6A48" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="100" cy="128" rx="8" ry="6" fill="#B38E66"/>
      <path d="M84 136H116V150Q138 154 138 172L134 212H66L62 172Q62 154 84 150Z" fill="url(#form)"/>
      <path d="M86 140Q100 146 114 140" stroke="#C7A27A" stroke-width="1" fill="none"/>
      ${D.skirt}${D.bodice}${D.front}
      <g class="seams">${D.seams}</g>
      <g class="tape-measure"><path d="M64 166Q100 178 136 166" stroke="#FFD66B" stroke-width="5" fill="none" opacity=".9"/></g>
    </svg>`;
  }

  function renderView() {
    const v = $("#studio-view");
    v.innerHTML = view === "mannequin" ? mannequinSVG() : avatarSVG("custom", "st", cfg);
  }

  /* ---------- options ---------- */
  function renderOptions() {
    root.querySelectorAll(".opts").forEach((box) => {
      const key = box.dataset.key, multi = box.hasAttribute("data-multi");
      box.innerHTML = OPTIONS[key].map(([id, label]) => {
        const on = multi ? cfg.details.includes(id) : cfg[key] === id;
        if (key === "color") {
          return `<button type="button" class="swatch-btn" data-id="${id}" aria-pressed="${on}" title="${id}" aria-label="${id}" style="--c:${window.DRESS_COLORS[id]}"></button>`;
        }
        return `<button type="button" class="opt" data-id="${id}" aria-pressed="${on}">${esc(i18n.pick(label))}</button>`;
      }).join("");
    });
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest(".opts button");
    if (!b || busy) return;
    const box = b.closest(".opts"), key = box.dataset.key, id = b.dataset.id;
    if (box.hasAttribute("data-multi")) {
      cfg.details = cfg.details.includes(id) ? cfg.details.filter((d) => d !== id) : [...cfg.details, id];
    } else cfg[key] = id;
    if (view !== "mannequin") { view = "mannequin"; $("#studio-download").disabled = true; }
    $("#studio-tests").textContent = "";
    renderOptions(); renderView(); renderCode();
  });

  /* ---------- live code ---------- */
  const s = (v) => `<span class="c-str">"${v}"</span>`;
  function renderCode() {
    $("#studio-code").innerHTML =
`<span class="c-kw">import</span> { Dress } <span class="c-kw">from</span> ${s("./atelier")};

<span class="c-kw">export const</span> <span class="c-var">dress</span>: <span class="c-type">Dress</span> = {
  silhouette: ${s(cfg.silhouette)},
  fabric: { pattern: ${s(cfg.fabric)}, color: ${s(window.DRESS_COLORS[cfg.color])} },
  details: [${cfg.details.map(s).join(", ")}],
  designer: ${s("Jhanina")},
};`;
  }

  /* ---------- sew: animation + tests ---------- */
  function sew() {
    if (busy) return;
    busy = true;
    view = "mannequin"; renderView();
    const stage = $(".studio-stage"), out = $("#studio-tests");
    stage.classList.add("sewing");
    out.textContent = "";
    const comfort = 90 + Math.floor(Math.random() * 10);
    const lines = [
      ["cmd", "$ npm run sew"],
      ["ok", `✓ ${t("studio.t1")} (${cfg.silhouette})`],
      ["ok", `✓ ${t("studio.t2")} (${cfg.fabric})`],
      ["ok", `✓ ${t("studio.t3")}`],
      ["ok", `✓ ${t("studio.t4")} ${comfort}%`],
      ["sum", `4 ${t("studio.passing")} (1.${Math.floor(Math.random() * 9)}s)`],
    ];
    lines.forEach(([cls, txt], i) => setTimeout(() => {
      const row = document.createElement("span");
      row.className = "t-" + cls; row.textContent = txt;
      out.appendChild(row);
      if (i === lines.length - 1) finish();
    }, JC.reduced ? 0 : 380 * (i + 1)));
    function finish() {
      setTimeout(() => {
        stage.classList.remove("sewing");
        view = "avatar";
        const v = $("#studio-view");
        v.classList.remove("dressing"); void v.offsetWidth; v.classList.add("dressing");
        setTimeout(renderView, 280);
        $("#studio-download").disabled = false;
        busy = false;
      }, JC.reduced ? 0 : 450);
    }
  }
  $("#sew-btn").addEventListener("click", sew);

  $("#studio-random").addEventListener("click", () => {
    if (busy) return;
    const pick = (k) => OPTIONS[k][Math.floor(Math.random() * OPTIONS[k].length)][0];
    cfg = { silhouette: pick("silhouette"), fabric: pick("fabric"), color: pick("color"),
            details: OPTIONS.details.map(([d]) => d).filter(() => Math.random() < 0.4) };
    view = "mannequin"; $("#studio-download").disabled = true; $("#studio-tests").textContent = "";
    renderOptions(); renderView(); renderCode();
  });

  /* ---------- download a PNG card ---------- */
  $("#studio-download").addEventListener("click", () => {
    const inner = avatarSVG("custom", "card", cfg).replace(/^\s*<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    const W = 600, H = 800;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs><linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3ECFF"/><stop offset="1" stop-color="#E6F2FF"/></linearGradient></defs>
      <rect width="${W}" height="${H}" rx="28" fill="url(#cbg)"/>
      <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="20" fill="none" stroke="#7B5CD6" stroke-opacity=".4" stroke-width="3" stroke-dasharray="12 8"/>
      <text x="${W / 2}" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#2B2140">${esc(t("studio.cardTitle"))}</text>
      <text x="${W / 2}" y="112" text-anchor="middle" font-family="'Courier New', monospace" font-size="15" fill="#7B5CD6">${cfg.silhouette} · ${cfg.fabric} · ${cfg.color}${cfg.details.length ? " · " + cfg.details.join(" · ") : ""}</text>
      <g transform="translate(150 130) scale(1.5)">${inner}</g>
      <text x="${W / 2}" y="${H - 40}" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#554B70">✂ jhanina03.github.io</text>
    </svg>`;
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = W * 2; c.height = H * 2;
      const ctx = c.getContext("2d"); ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = "my-atelier-design.png"; a.href = c.toDataURL("image/png"); a.click();
    };
    img.src = url;
  });

  function renderAll() { renderOptions(); renderView(); renderCode(); }
  document.addEventListener("langchange", renderOptions);
  renderAll();
})();
