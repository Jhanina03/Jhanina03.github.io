/* ============================================================
   Jhanina's avatar — hand-drawn SVG with swappable looks.
   Long dark hair with soft bangs, thin blonde face-framing
   streaks, big cat-eye glasses, red lips, heart necklace.
   The right arm waves only on hover/tap (see styles.css).
   ============================================================ */
(function () {
  const SKIN = "#EDC3A3", SKIN_D = "#DCA684", HAIR = "#2A1E27", HAIR_L = "#3D2C38", STREAK = "#E9D3A2";

  window.LOOKS = [
    { id: "sunny",    name: { en: "Sunny top",     es: "Top amarillo" },        section: "hero" },
    { id: "casual",   name: { en: "Heart tee",     es: "Blusa de corazones" }, section: "about" },
    { id: "hoodie",   name: { en: "Dev hoodie",    es: "Hoodie dev" },          section: "skills" },
    { id: "designer", name: { en: "Designer",      es: "Diseñadora" },          section: "projects" },
    { id: "labcoat",  name: { en: "QA lab coat",   es: "Bata de QA" },          section: "qa-game" },
    { id: "blazer",   name: { en: "Office blazer", es: "Blazer de oficina" },   section: "experience" },
    { id: "gala",     name: { en: "Gala gown",     es: "Vestido de gala" },     section: "certificates" },
    { id: "coat",     name: { en: "Pink coat",     es: "Abrigo rosado" },       section: "contact" },
    { id: "noir",     name: { en: "All black",     es: "Todo negro" },          section: "secret" },
  ];

  /* ---------- small drawing helpers ---------- */
  const heart = (x, y, s, c, outline = false) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 3C0 1 1.6 0 3 0s3 1.4 3 1.4S7.4 0 9 0s3 1 3 3c0 4-6 7-6 7S0 7 0 3Z" ${outline ? `fill="none" stroke="${c}" stroke-width="1.6"` : `fill="${c}"`}/>`;
  const sparkle = (x, y, s) =>
    `<path class="av-sparkle" transform="translate(${x} ${y}) scale(${s})" d="M0-6 1.4-1.4 6 0 1.4 1.4 0 6-1.4 1.4-6 0-1.4-1.4Z" fill="#fff"/>`;
  const MIRROR = 'transform="matrix(-1 0 0 1 200 0)"';
  const both = (svg) => `${svg}<g ${MIRROR}>${svg}</g>`; // draw left side, mirror for right

  const TORSO = "M64 160Q70 151 86 150L114 150Q130 151 136 160L139 226L61 226Z";

  const JEANS = (c = "#8DB4E8", d = "#6E98D4") => `
    <path d="M62 222H138L135 294H104.5L100 244L95.5 294H65Z" fill="${c}"/>
    <path d="M62 229H138" stroke="${d}" stroke-width="1.4"/>
    <path d="M100 229V244" stroke="${d}" stroke-width="1.2"/>
    ${both(`<path d="M67 230Q71 240 82 238" stroke="${d}" stroke-width="1.2" fill="none"/>
            <path d="M84 246L81 286" stroke="#fff" stroke-width=".9" stroke-dasharray="2 2" opacity=".55"/>
            <path d="M65.2 286H95.7L95.5 294H65Z" fill="${d}" opacity=".55"/>`)}`;
  const TROUSERS = (c, d) => `
    <path d="M62 222H138L135 294H104.5L100 244L95.5 294H65Z" fill="${c}"/>
    <path d="M62 229H138" stroke="${d}" stroke-width="1.4"/>
    ${both(`<path d="M80 232L80.5 292" stroke="${d}" stroke-width="1.1" opacity=".8"/>`)}`;
  const SNEAKERS = (c = "#FFFFFF", accent = "#B79CFF") => both(`
    <path d="M65.5 294Q65.5 288.5 73 288.5H85Q93.5 289.5 95 296V300H65.5Z" fill="${c}" stroke="#D9D3F0" stroke-width=".8"/>
    <path d="M65 299H95.5V302Q80 303.6 65 302Z" fill="#fff" stroke="#D9D3F0" stroke-width=".8"/>
    <path d="M73 291.5L79 294M75 290L81 292.5" stroke="${accent}" stroke-width="1.2" stroke-linecap="round"/>`);
  const LOAFERS = (c) => both(`<path d="M65.5 295Q65.5 290 73 290H86Q94 291 95.5 297V300.5H65.5Z" fill="${c}"/><path d="M70 293H82" stroke="#fff" stroke-width=".8" opacity=".35"/>`);
  const MARYJANES = (c) => both(`<path d="M76 290H86Q94 291 95.5 297V300.5H74Q70 300 72 294Z" fill="${c}"/><path d="M78 291.5Q84 288.5 92 292" stroke="${c}" stroke-width="2" fill="none"/><circle cx="90" cy="292" r="1" fill="#FFD66B"/>`);

  /* sleeve: drawn inside each arm group so it moves with the arm */
  const SLEEVE_PATH = (end) => `M51.5 168Q51.5 155 59.5 155Q67.5 155 68 166L66.6 ${end}H52.2Z`;
  const TIGHTS = both(`<rect x="81" y="246" width="15" height="48" rx="6" fill="#1B1620" opacity=".8"/>`);
  const BOOTS = both(`<path d="M78 279H97V295Q97 300 92 300H76Q72.5 300 73.5 295Z" fill="#141118"/>
    <rect x="72.5" y="298" width="25.5" height="5" rx="2" fill="#2A2530"/>
    <path d="M82 283.5h10M82 287.5h10M82 291.5h10" stroke="#fff" stroke-width=".8" opacity=".5"/>`);
  const LEATHER = "#1E1A24";
  const sleeveSVG = (s) => !s ? "" : `
    <path d="${s.path || SLEEVE_PATH(s.len || 216)}" fill="${s.fill}" ${s.stroke ? `stroke="${s.stroke}" stroke-width="1"` : ""}/>
    ${s.cuff ? `<rect x="51.6" y="${(s.len || 216) - 7}" width="15.2" height="8" rx="2" fill="${s.cuff}"/>` : ""}`;

  /* ---------- the looks ---------- */
  const looks = {
    sunny: {
      under: JEANS() + SNEAKERS("#FFFFFF", "#F6C431"),
      torso: `
        <path d="M70 168Q75 152 91 146L109 146Q125 152 130 168L134 222H66Z" fill="#F6C431"/>
        ${Array.from({ length: 10 }, (_, i) => `<path d="M${73 + i * 6} ${i === 0 || i === 9 ? 172 : 160}V221" stroke="#E5AE16" stroke-width="1.1" opacity=".55"/>`).join("")}
        <path d="M90 146Q100 150 110 146V157Q100 161 90 157Z" fill="#E8B21E"/>
        <path d="M66 214Q100 220 134 214" stroke="#E5AE16" stroke-width="1.4" fill="none"/>`,
      over: `
        <path d="M92 158Q100 172 108 158" stroke="#E2B65A" stroke-width="1.1" fill="none"/>
        <path d="M98 168.5A2 2 0 0 1 102 168.5V170" stroke="#E2B65A" stroke-width="1.2" fill="none"/>
        <rect x="97" y="170" width="6" height="5.6" rx="1.2" fill="#E2B65A"/>`,
      sleeve: null,
    },

    casual: {
      under: JEANS() + SNEAKERS("#FFFFFF", "#FF7AB8"),
      torso: `
        <defs><clipPath id="tc-$ID"><path d="${TORSO}"/></clipPath></defs>
        <path d="${TORSO}" fill="#FFF0F7"/>
        <g clip-path="url(#tc-$ID)">
          <circle cx="74" cy="176" r="14" fill="#FFC2DD" opacity=".75"/><circle cx="122" cy="168" r="12" fill="#BFE3FF" opacity=".7"/>
          <circle cx="102" cy="206" r="16" fill="#FFC2DD" opacity=".6"/><circle cx="132" cy="214" r="10" fill="#BFE3FF" opacity=".6"/>
          <circle cx="70" cy="214" r="10" fill="#D9CCFF" opacity=".6"/>
          ${heart(72, 186, 1.1, "#FF4F8B", true)}${heart(108, 168, 1, "#FF4F8B", true)}${heart(114, 198, 1.2, "#FF4F8B", true)}
          ${heart(84, 208, .9, "#FF4F8B", true)}${heart(92, 178, .7, "#FF4F8B")}${heart(124, 182, .7, "#FF4F8B")}
        </g>
        <path d="M82 151Q100 168 118 151" fill="${SKIN}"/>
        <path d="M82 151Q100 168 118 151" stroke="#FFC2DD" stroke-width="1.6" fill="none"/>`,
      over: "",
      sleeve: { fill: "#FFE6F2", cuff: "#FFC2DD" },
    },

    hoodie: {
      under: TROUSERS("#3B2A6B", "#2C1F52") + both(`<rect x="65" y="286" width="30.6" height="8" rx="2" fill="#2C1F52"/>`) + SNEAKERS("#FFFFFF", "#B79CFF"),
      torso: `
        <path d="M78 154Q76 140 100 138Q124 140 122 154Q112 162 100 162Q88 162 78 154Z" fill="#9A7BF0"/>
        <path d="${TORSO}" fill="#B79CFF"/>
        <path d="M86 151Q100 168 114 151Q110 162 100 165Q90 162 86 151Z" fill="#8A6AE6"/>
        <path d="M94 163V184M106 163V184" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <rect x="92.6" y="183" width="3" height="5" rx="1" fill="#E4DAFF"/><rect x="104.4" y="183" width="3" height="5" rx="1" fill="#E4DAFF"/>
        <text x="100" y="200" text-anchor="middle" font-family="monospace" font-weight="700" font-size="11" fill="#fff">&lt;/&gt;</text>
        <path d="M76 205Q78 201 84 201H116Q122 201 124 205L126 218H74Z" fill="#A98BFA" stroke="#9A7BF0" stroke-width="1"/>
        <path d="M61 218H139V226H61Z" fill="#9A7BF0"/>
        <path d="M64 219V225M70 219V225M76 219V225M82 219V225M88 219V225M94 219V225M100 219V225M106 219V225M112 219V225M118 219V225M124 219V225M130 219V225M136 219V225" stroke="#8A6AE6" stroke-width=".8"/>
        ${heart(118, 170, .55, "#FF9ACB")}`,
      over: "",
      sleeve: { fill: "#B79CFF", cuff: "#9A7BF0" },
    },

    designer: {
      under: `
        <path d="M64 214H136L148 262H52Z" fill="#FF8CC6"/>
        <path d="M74 220L64 261M87 220L83 262M100 220V262M113 220L117 262M126 220L136 261" stroke="#FF6FB4" stroke-width="1.3"/>
        ${MARYJANES("#7B5CD6")}`,
      torso: `
        <defs><pattern id="stripes-$ID" width="8" height="7" patternUnits="userSpaceOnUse"><rect width="8" height="7" fill="#fff"/><rect width="8" height="2.6" fill="#5B4BC4"/></pattern></defs>
        <path d="${TORSO}" fill="url(#stripes-$ID)"/>
        <path d="M80 151Q100 158 120 151" stroke="#fff" stroke-width="4" fill="none"/>
        <rect x="61" y="210" width="78" height="9" rx="2" fill="#3B2A6B"/>
        <rect x="95" y="209" width="10" height="11" rx="2" fill="none" stroke="#FFD66B" stroke-width="2"/>`,
      over: `
        <path d="M88 150Q82 186 78 214" stroke="#FFD66B" stroke-width="6" fill="none"/>
        <path d="M112 150Q118 186 122 208" stroke="#FFD66B" stroke-width="6" fill="none"/>
        <path d="M87 160l4 .6M86 168l4 .6M85 176l4 .6M84 184l4 .6M83 192l4 .6M82 200l4 .6M113 160l-4 .6M114 168l-4 .6M115 176l-4 .6M116 184l-4 .6M117 192l-4 .6M118 200l-4 .6" stroke="#7a5b00" stroke-width="1"/>
        <rect x="74.5" y="212" width="7" height="5" rx="1" fill="#C9C9D6"/><rect x="119" y="206" width="7" height="5" rx="1" fill="#C9C9D6"/>`,
      sleeve: { fill: "url(#stripes-$ID)", len: 192 },
      handL: `<circle cx="59" cy="212" r="5.4" fill="#FF5C9A"/><path d="M57 207l-2-4M60 206.6l.4-4.4M62.6 208l3-3" stroke="#9AA0B4" stroke-width="1"/><circle cx="55" cy="203" r="1" fill="#FFD66B"/><circle cx="60.4" cy="202" r="1" fill="#8EE3E0"/><circle cx="65.6" cy="205" r="1" fill="#B79CFF"/>`,
    },

    labcoat: {
      under: TROUSERS("#56628F", "#45507A") + LOAFERS("#3B2A6B"),
      torso: `
        <path d="${TORSO}" fill="#CDEBFF"/>
        <path d="M92 151L100 162L108 151" stroke="#A8D2F2" stroke-width="2" fill="none"/>
        ${both(`<path d="M64 160Q70 151 86 150L98 196L99 252H58Z" fill="#FFFFFF" stroke="#DCD6F2" stroke-width="1.2"/>
                <path d="M86 150L96 182L87 188L79 160Z" fill="#F3F0FB" stroke="#DCD6F2" stroke-width="1"/>
                <rect x="66" y="222" width="18" height="15" rx="2" fill="none" stroke="#DCD6F2" stroke-width="1.4"/>
                <circle cx="96" cy="206" r="1.6" fill="#C9C2E6"/><circle cx="96" cy="222" r="1.6" fill="#C9C2E6"/>`)}
        <rect x="113" y="178" width="14" height="12" rx="2" fill="none" stroke="#DCD6F2" stroke-width="1.4"/>
        <path d="M117 172V184" stroke="#7B5CD6" stroke-width="2.6" stroke-linecap="round"/><path d="M122 174V184" stroke="#FF7AB8" stroke-width="2.6" stroke-linecap="round"/>
        <rect x="70" y="182" width="17" height="11" rx="2" fill="#8EE3E0"/>
        <text x="78.5" y="190" text-anchor="middle" font-family="monospace" font-size="6.5" font-weight="700" fill="#2f6f6c">QA</text>`,
      over: "",
      sleeve: { fill: "#FFFFFF", stroke: "#DCD6F2", cuff: "#F3F0FB" },
      handR: `<g class="av-magnifier"><path d="M143 228L150 240" stroke="#3B2A6B" stroke-width="4" stroke-linecap="round"/><circle cx="155" cy="248" r="9" fill="#E8F6FF" stroke="#3B2A6B" stroke-width="3"/><path d="M151 244Q153 242 156 242" stroke="#fff" stroke-width="1.6" fill="none"/></g>`,
    },

    blazer: {
      under: TROUSERS("#2E3A6E", "#232D58") + LOAFERS("#1B1B2F"),
      torso: `
        <path d="${TORSO}" fill="#FFFFFF"/>
        <path d="M92 151Q100 158 108 151" stroke="#E8E4F5" stroke-width="2" fill="none"/>
        ${both(`<path d="M64 160Q70 151 86 150L100 198V226H61Z" fill="#4F6EDB"/>
                <path d="M86 150L95 177L87 182L83 174L77 163Z" fill="#3D58BE"/>
                <path d="M66 210H82" stroke="#3D58BE" stroke-width="1.6" stroke-linecap="round"/>`)}
        <circle cx="100" cy="206" r="2.3" fill="#FFD66B"/><circle cx="100" cy="216" r="2.3" fill="#FFD66B"/>
        <path d="M114 170L126 170L122 164L118 166Z" fill="#FF9ACB"/>`,
      over: "",
      sleeve: { fill: "#4F6EDB", cuff: "#3D58BE" },
    },

    gala: {
      under: `
        <defs><linearGradient id="gown-$ID" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B79CFF"/><stop offset=".55" stop-color="#9FC4FF"/><stop offset="1" stop-color="#FFB3D9"/></linearGradient></defs>
        <path d="M66 206Q30 258 22 302H178Q170 258 134 206Z" fill="#D9CCFF"/>
        <path d="M66 206Q42 260 36 302H164Q158 260 134 206Z" fill="url(#gown-$ID)"/>
        <path d="M58 300Q70 250 84 214M142 300Q130 250 116 214M100 216V300M78 302Q86 256 92 216M122 302Q114 256 108 216" stroke="#fff" stroke-width="1.1" fill="none" opacity=".4"/>
        <path d="M36 302Q60 294 82 302T126 302T164 302" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>
        ${sparkle(58, 272, .9)}${sparkle(140, 252, .7)}${sparkle(92, 286, .8)}${sparkle(120, 284, .6)}${sparkle(74, 240, .5)}`,
      torso: `
        <path d="M68 168Q75 158 86 164Q100 173 114 164Q125 158 132 168L134 210H66Z" fill="url(#gown-$ID)"/>
        <path d="M68 168Q75 158 86 164Q100 173 114 164Q125 158 132 168" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8"/>
        ${sparkle(104, 190, .55)}${sparkle(84, 182, .4)}`,
      over: `
        <path d="M100 210Q88 200 84 208Q86 216 100 211Q114 216 116 208Q112 200 100 210Z" fill="#FF9ACB"/>
        <path d="M98 211L92 226M102 211L108 226" stroke="#FF9ACB" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="100" cy="210" r="3" fill="#FF7AB8"/>`,
      sleeve: null,
    },
  };

  /* From her photo by the lake: dusty-pink cropped coat with a stand
     collar and bell sleeves, over a black top and leather skirt */
  looks.coat = {
    under: `
      <path d="M62 222H138L142 252H58Z" fill="${LEATHER}"/>
      <path d="M70 226L66 250M120 226L124 250" stroke="#fff" stroke-width="1" opacity=".15"/>
      ${TIGHTS}${BOOTS}`,
    torso: `
      <path d="${TORSO}" fill="${LEATHER}"/>
      ${both(`<path d="M64 160Q70 150 86 148L100 150V170L95 234H53Z" fill="#E8BFD3"/>
              <path d="M95 234L100 170" stroke="#D49BB7" stroke-width="1.2"/>
              <path d="M58 228Q66 200 64 172" stroke="#fff" stroke-width="1.4" fill="none" opacity=".25"/>`)}
      <path d="M83 136Q100 131 117 136L119 153Q100 159 81 153Z" fill="#E8BFD3" stroke="#D49BB7" stroke-width="1"/>
      <circle cx="106" cy="145" r="2.8" fill="#D9A7BF" stroke="#C48AA6" stroke-width=".8"/>
      <circle cx="106" cy="160" r="2.8" fill="#D9A7BF" stroke="#C48AA6" stroke-width=".8"/>`,
    over: "",
    sleeve: { fill: "#E8BFD3", stroke: "#D49BB7", path: "M51.5 168Q51.5 155 59.5 155Q67.5 155 68 166L73 214Q59 218 43 214Z" },
  };

  /* From her garden photo: black sleeveless mock-neck, leather mini skirt
     with belt and chain, sheer tights, chunky boots, silver necklace */
  looks.noir = {
    under: `
      <path d="M63 214H137L142 250H58Z" fill="${LEATHER}"/>
      <path d="M72 222L67 248M128 222L133 248" stroke="#fff" stroke-width="1" opacity=".18"/>
      <rect x="62" y="211" width="76" height="8" rx="2" fill="#0F0D13"/>
      <circle cx="100" cy="215" r="4.4" fill="none" stroke="#C9CBD6" stroke-width="1.8"/>
      <path d="M84 219Q81 236 86 252" stroke="#C9CBD6" stroke-width="1.6" stroke-dasharray="2 1.6" fill="none"/>
      ${TIGHTS}${BOOTS}`,
    torso: `
      <path d="M70 168Q75 152 91 146L109 146Q125 152 130 168L134 216H66Z" fill="${LEATHER}"/>
      <path d="M90 139Q100 142 110 139V152Q100 156 90 152Z" fill="#26212D"/>
      <path d="M92 141V151M96 142V152M100 142V153M104 142V152M108 141V151" stroke="#35303D" stroke-width=".8"/>`,
    over: `
      <path d="M92 153Q100 184 108 153" stroke="#C9CBD6" stroke-width="1" fill="none"/>
      <path d="M100 174L97 179H103Z" fill="#C9CBD6"/>`,
    sleeve: null,
  };

  /* Accessories drawn on top of the head per look */
  const headwear = {
    designer: `<g transform="rotate(-14 100 44) translate(0 -4)"><ellipse cx="96" cy="46" rx="40" ry="11" fill="#7B5CD6"/><path d="M62 46Q66 22 98 22Q130 24 132 46Z" fill="#7B5CD6"/><circle cx="98" cy="20" r="4" fill="#5A3FB0"/></g>`,
    gala: `<path d="M84 50L88 40L94 48L100 36L106 48L112 40L116 50Z" fill="#FFD66B" stroke="#E9B949" stroke-width="1"/><circle cx="100" cy="42" r="2.4" fill="#FF9ACB"/><circle cx="88" cy="41" r="1.4" fill="#A8D8FF"/><circle cx="112" cy="41" r="1.4" fill="#A8D8FF"/>`,
  };
  const HEART_NECKLACE = ["casual", "blazer", "gala"];

  /* ---------- custom dress from the design-studio mini-game ----------
     cfg = { silhouette, fabric, color, details[] } — shared by the
     mannequin view and the avatar ("custom" look). */
  const DRESS_COLORS = { lilac: "#B79CFF", purple: "#7B5CD6", sky: "#8CC8FF", blue: "#5B8DEF", pink: "#FF9ACB", rose: "#FF7AB8", white: "#F7F3FF" };
  const SKIRTS = {
    mini:    "M66 208Q50 234 47 252H153Q150 234 134 208Z",
    swing:   "M66 208Q34 246 30 272Q100 286 170 272Q166 246 134 208Z",
    aline:   "M66 208Q48 256 42 296H158Q152 256 134 208Z",
    ball:    "M66 206Q26 252 18 302H182Q174 252 134 206Z",
    mermaid: "M66 208Q62 240 73 268Q56 290 46 302H154Q144 290 127 268Q138 240 134 208Z",
  };
  const HEMS = { mini: [47, 153, 252], swing: [30, 170, 274], aline: [42, 158, 296], ball: [18, 182, 302], mermaid: [46, 154, 302] };
  function dressParts(cfg, uid) {
    const c = DRESS_COLORS[cfg.color] || cfg.color || "#B79CFF";
    const ink = cfg.color === "white" ? "#B79CFF" : "#FFFFFF";
    const pat = {
      solid: "",
      polka: `<circle cx="4" cy="4" r="2.1" fill="${ink}" opacity=".85"/><circle cx="12" cy="12" r="2.1" fill="${ink}" opacity=".85"/>`,
      gingham: `<rect width="16" height="5" fill="${ink}" opacity=".35"/><rect width="5" height="16" fill="${ink}" opacity=".35"/>`,
      floral: `<g fill="${ink}" opacity=".9"><circle cx="5" cy="3.4" r="1.5"/><circle cx="6.8" cy="5" r="1.5"/><circle cx="6" cy="7" r="1.5"/><circle cx="4" cy="7" r="1.5"/><circle cx="3.2" cy="5" r="1.5"/></g><circle cx="5" cy="5.4" r="1.1" fill="#FFD66B"/><circle cx="13" cy="13" r="1.2" fill="${ink}" opacity=".6"/>`,
      stripes: `<rect width="4" height="16" fill="${ink}" opacity=".45"/>`,
    }[cfg.fabric] || "";
    const fill = `url(#fab-${uid})`;
    const defs = `<pattern id="fab-${uid}" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="${c}"/>${pat}</pattern>
      <linearGradient id="dshade-${uid}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1B1530" stop-opacity=".18"/></linearGradient>`;
    const sk = SKIRTS[cfg.silhouette] || SKIRTS.aline;
    const has = (d) => (cfg.details || []).includes(d);
    const [hx0, hx1, hy] = HEMS[cfg.silhouette] || HEMS.aline;
    let skirt = "";
    if (cfg.silhouette === "swing") skirt += `<path d="M40 268Q100 286 160 268L166 278Q100 292 34 278Z" fill="#fff" opacity=".9"/>`; // petticoat
    skirt += `<path d="${sk}" fill="${fill}"/><path d="${sk}" fill="url(#dshade-${uid})"/>`;
    if (has("lace")) {
      const n = Math.round((hx1 - hx0) / 9), w = (hx1 - hx0) / n;
      let d = `M${hx0} ${hy}`;
      for (let i = 0; i < n; i++) d += `a${w / 2} ${w / 2.4} 0 0 0 ${w} 0`;
      skirt += `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="1"/>`;
      for (let i = 0; i < n; i++) skirt += `<circle cx="${hx0 + w * i + w / 2}" cy="${hy + w / 4.4}" r="1" fill="${c}"/>`;
    }
    const bodicePath = "M70 162Q78 154 90 156Q100 162 110 156Q122 154 130 162L134 212H66Z";
    let bodice = `<path d="${bodicePath}" fill="${fill}"/><path d="${bodicePath}" fill="url(#dshade-${uid})"/>
      <path d="M70 162Q78 154 90 156Q100 162 110 156Q122 154 130 162" stroke="#fff" stroke-width="1.3" fill="none" opacity=".7"/>`;
    let front = "";
    if (has("puff")) front += `<ellipse cx="66" cy="166" rx="11" ry="9" fill="${fill}"/><ellipse cx="134" cy="166" rx="11" ry="9" fill="${fill}"/><path d="M58 170Q66 176 74 170M126 170Q134 176 142 170" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/>`;
    if (has("belt")) front += `<rect x="65" y="204" width="70" height="8" rx="2" fill="#3B2A6B"/><rect x="95" y="203" width="10" height="10" rx="2" fill="none" stroke="#FFD66B" stroke-width="2"/>`;
    if (has("buttons")) front += [172, 184, 196].map((y) => `<circle cx="100" cy="${y}" r="2.6" fill="#fff" stroke="${c}" stroke-width=".8"/><path d="M99 ${y - 1}l2 2M101 ${y - 1}l-2 2" stroke="${c}" stroke-width=".6"/>`).join("");
    if (has("bow")) front += `<path d="M100 210Q87 199 83 208Q86 217 100 211Q114 217 117 208Q113 199 100 210Z" fill="#FF7AB8"/><path d="M98 211L92 226M102 211L108 226" stroke="#FF7AB8" stroke-width="2.4" stroke-linecap="round"/><circle cx="100" cy="210" r="3" fill="#FF5C9A"/>`;
    const seams = `<path class="seam" d="M66 210H134" pathLength="100"/><path class="seam" d="M70 162Q78 154 90 156Q100 162 110 156Q122 154 130 162" pathLength="100"/><path class="seam" d="M${hx0} ${hy - 2}H${hx1}" pathLength="100"/>`;
    return { defs, skirt, bodice, front, seams };
  }
  window.dressParts = dressParts;
  window.DRESS_COLORS = DRESS_COLORS;

  function avatarSVG(look = "casual", uid = "a", cfg = null) {
    let L = looks[look] || looks.casual;
    if (look === "custom" && cfg) {
      const D = dressParts(cfg, uid);
      const long = ["ball", "mermaid"].includes(cfg.silhouette);
      L = { under: `<defs>${D.defs}</defs>${long ? "" : both(`<path d="M76 291H86Q94 292 95.5 297V300.5H74Q70 300 72 295Z" fill="#7B5CD6"/>`)}${D.skirt}`, torso: D.bodice, over: D.front, sleeve: null, noShade: true };
    }
    const id = (s) => (s || "").replaceAll("$ID", uid);
    const sleeve = L.sleeve ? { ...L.sleeve, fill: id(L.sleeve.fill) } : null;
    return `
<svg class="avatar-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated avatar of Jhanina">
  <defs>
    <linearGradient id="streak-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HAIR_L}"/><stop offset=".2" stop-color="${STREAK}"/><stop offset="1" stop-color="${STREAK}" stop-opacity=".6"/></linearGradient>
    <linearGradient id="shade-${uid}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2B2140" stop-opacity=".13"/></linearGradient>
    <radialGradient id="face-${uid}" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#F3CDB0"/><stop offset="1" stop-color="${SKIN}"/></radialGradient>
  </defs>
  <!-- hair back, soft waves at the ends -->
  <path d="M50 92Q46 38 100 36Q154 38 150 92L156 198Q161 213 149 218Q138 221 132 208L128 128H72L68 208Q62 221 51 218Q39 213 44 198Z" fill="${HAIR}"/>
  <!-- legs -->
  <rect x="81" y="226" width="15" height="70" rx="7" fill="${SKIN}"/>
  <rect x="104" y="226" width="15" height="70" rx="7" fill="${SKIN}"/>
  <!-- neck -->
  <path d="M92 132H108V156Q100 160 92 156Z" fill="${SKIN_D}"/>
  <!-- outfit -->
  <g class="av-outfit">${id(L.under)}${id(L.torso)}${L.noShade ? "" : `<path d="${TORSO}" fill="url(#shade-${uid})"/>`}</g>
  <!-- arms (sleeves move with them) -->
  <g class="av-arm-l"><rect x="53" y="158" width="13" height="66" rx="6.5" fill="${SKIN}"/><ellipse cx="59" cy="224" rx="6.5" ry="7" fill="${SKIN}"/>${sleeveSVG(sleeve)}${id(L.handL)}</g>
  <g class="av-arm-r"><g ${MIRROR}><rect x="53" y="158" width="13" height="66" rx="6.5" fill="${SKIN}"/><ellipse cx="59" cy="224" rx="6.5" ry="7" fill="${SKIN}"/>${sleeveSVG(sleeve)}</g>${id(L.handR)}</g>
  <g class="av-over">${id(L.over)}</g>
  ${HEART_NECKLACE.includes(look) ? `<path d="M91 150Q100 164 109 150" stroke="#E2B65A" stroke-width="1.1" fill="none"/>${heart(97.2, 160.5, .48, "#E2B65A", true)}` : ""}
  <!-- front locks with thin blonde streaks -->
  <path d="M60 100Q50 160 58 212Q66 218 74 206Q66 160 72 108Z" fill="${HAIR_L}"/>
  <path d="M67 108Q61.5 152 66.5 198L70 196Q66 152 71.5 110Z" fill="url(#streak-${uid})"/>
  <path d="M140 100Q150 160 142 212Q134 218 126 206Q134 160 128 108Z" fill="${HAIR_L}"/>
  <path d="M133 108Q138.5 152 133.5 198L130 196Q134 152 128.5 110Z" fill="url(#streak-${uid})"/>
  <!-- face: soft oval -->
  <path d="M62 92Q62 50 100 50Q138 50 138 92Q138 121 120 134Q110 140 100 140Q90 140 80 134Q62 121 62 92Z" fill="url(#face-${uid})"/>
  <circle cx="63.5" cy="112" r="2" fill="#FFD66B"/><circle cx="136.5" cy="112" r="2" fill="#FFD66B"/>
  <!-- soft wispy bangs -->
  <path d="M56 98Q50 44 100 44Q150 44 144 98Q142 88 137 82Q135 90 130 92Q127 82 120 78Q118 88 112 90Q107 80 100 78Q94 88 88 90Q83 80 78 80Q75 90 70 92Q67 84 63 82Q60 90 56 98Z" fill="${HAIR}"/>
  <path d="M78 54Q100 45 122 55" stroke="#5A4553" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M86 62Q89 72 87 84M114 62Q112 72 115 86" stroke="${HAIR_L}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8"/>
  <!-- eyes: big and expressive, with lashes -->
  <g class="av-eyes">
    <ellipse cx="84" cy="105" rx="6.6" ry="7.2" fill="#fff"/>
    <ellipse cx="84.5" cy="105.8" rx="5.2" ry="6.2" fill="#4A2C1E"/><ellipse cx="84.5" cy="106.4" rx="3.6" ry="4.4" fill="#2A170F"/>
    <circle cx="86.6" cy="103.2" r="1.9" fill="#fff"/><circle cx="82.4" cy="108.6" r=".9" fill="#fff" opacity=".9"/>
    <ellipse cx="116" cy="105" rx="6.6" ry="7.2" fill="#fff"/>
    <ellipse cx="115.5" cy="105.8" rx="5.2" ry="6.2" fill="#4A2C1E"/><ellipse cx="115.5" cy="106.4" rx="3.6" ry="4.4" fill="#2A170F"/>
    <circle cx="117.6" cy="103.2" r="1.9" fill="#fff"/><circle cx="113.4" cy="108.6" r=".9" fill="#fff" opacity=".9"/>
  </g>
  <path d="M76.8 101.6Q84 96.4 91.6 100.6M108.4 100.6Q116 96.4 123.2 101.6" stroke="#1D1418" stroke-width="2.1" fill="none" stroke-linecap="round"/>
  <path d="M76.8 101.6L74.2 99.6M78.4 99.8L76.4 97.4M123.2 101.6L125.8 99.6M121.6 99.8L123.6 97.4" stroke="#1D1418" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M79 111.4Q84 113 89 111.4M111 111.4Q116 113 121 111.4" stroke="#8C6A5C" stroke-width=".8" fill="none" opacity=".6"/>
  <!-- cat-eye glasses like hers: thin black browline on top, fine clear rim below -->
  <g fill="rgba(210,235,255,.12)" stroke="#C3C7D2" stroke-width="1">
    <path d="M71 98Q84 93 97 97Q97 111 85.5 114.4Q72.5 113.4 71 98Z"/>
    <path d="M103 97Q116 93 129 98Q127.5 113.4 114.5 114.4Q103 111 103 97Z"/>
  </g>
  <path d="M70 98.4Q84 92 97.6 96.6M102.4 96.6Q116 92 130 98.4" stroke="#1D1720" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M70 98.4L67.8 95.8M130 98.4L132.2 95.8" stroke="#1D1720" stroke-width="1.9" stroke-linecap="round"/>
  <path d="M97 98Q100 96 103 98" stroke="#C3C7D2" stroke-width="1.2" fill="none"/>
  <path d="M74.5 100.5L78.5 105.5M107 100L109.6 103.4" stroke="#fff" stroke-width="1.1" opacity=".45" stroke-linecap="round"/>
  <!-- nose, blush, lips -->
  <path d="M100.5 112q-2 4.6 1 5.6" stroke="${SKIN_D}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="76" cy="119" rx="6.4" ry="3.6" fill="#FF8FB8" opacity=".38"/><ellipse cx="124" cy="119" rx="6.4" ry="3.6" fill="#FF8FB8" opacity=".38"/>
  <path d="M93 125Q96.5 122.4 100 124Q103.5 122.4 107 125Q104 130.4 100 130.6Q96 130.4 93 125Z" fill="#B42E3D"/>
  <path d="M93.6 125.2Q100 127.4 106.4 125.2" stroke="#86202C" stroke-width=".8" fill="none"/>
  <ellipse cx="102" cy="128.4" rx="2" ry=".8" fill="#fff" opacity=".35"/>
  ${headwear[look] || ""}
</svg>`;
  }

  window.avatarSVG = avatarSVG;
})();
