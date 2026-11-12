/* ============================================================
   Jhanina's avatar — hand-drawn SVG with swappable looks.
   Long dark hair, bangs, blonde face-framing streaks,
   cat-eye glasses and red lips.
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
  ];

  const heart = (x, y, s, c) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 3C0 1 1.6 0 3 0s3 1.4 3 1.4S7.4 0 9 0s3 1 3 3c0 4-6 7-6 7S0 7 0 3Z" fill="${c}"/>`;
  const sparkle = (x, y, s) =>
    `<path class="av-sparkle" transform="translate(${x} ${y}) scale(${s})" d="M0-6 1.4-1.4 6 0 1.4 1.4 0 6-1.4 1.4-6 0-1.4-1.4Z" fill="#fff"/>`;

  /* Shared garment shapes */
  const TORSO = "M64 160Q70 151 86 150L114 150Q130 151 136 160L139 226L61 226Z";
  const SLEEVE_L = "M64 158Q54 160 52 172L50 220L64 220L68 176Z";
  const SLEEVE_R = "M136 158Q146 160 148 172L150 220L136 220L132 176Z";
  const PANTS = (c) => `<path d="M62 222H138L134 296H104L100 246L96 296H66Z" fill="${c}"/>`;
  const SHOES = (c) => `<ellipse cx="80" cy="298" rx="13" ry="6" fill="${c}"/><ellipse cx="120" cy="298" rx="13" ry="6" fill="${c}"/>`;

  const looks = {
    casual: `
      ${PANTS("#8DB4E8")}
      <path d="M100 246V292" stroke="#6E98D4" stroke-width="1.5"/>
      ${SHOES("#FFFFFF")}
      <path d="${SLEEVE_L}" fill="#FFE3F1"/><path d="${SLEEVE_R}" fill="#FFE3F1"/>
      <path d="${TORSO}" fill="#FFE3F1"/>
      <path d="M84 151Q100 168 116 151" fill="${SKIN}"/>
      <path d="M66 182Q86 172 100 186T136 178" stroke="#BFE3FF" stroke-width="7" fill="none" opacity=".7"/>
      ${heart(74, 190, 1, "#FF5C9A")}${heart(108, 170, 0.9, "#FF5C9A")}${heart(116, 200, 1.1, "#FF7AB8")}
      ${heart(86, 210, 0.8, "#FF7AB8")}${heart(55, 190, 0.7, "#FF5C9A")}${heart(138, 196, 0.7, "#FF5C9A")}`,

    hoodie: `
      ${PANTS("#3B2A6B")}
      ${SHOES("#FFFFFF")}
      <path d="${SLEEVE_L}" fill="#B79CFF"/><path d="${SLEEVE_R}" fill="#B79CFF"/>
      <path d="M50 214H65V224H50ZM135 214H150V224H135Z" fill="#9A7BF0"/>
      <path d="${TORSO}" fill="#B79CFF"/>
      <path d="M78 150Q100 176 122 150Q118 164 100 168Q82 164 78 150Z" fill="#9A7BF0"/>
      <path d="M94 166V186M106 166V186" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <path d="M78 200H122V218H78Z" fill="#9A7BF0" opacity=".6"/>
      <text x="100" y="198" text-anchor="middle" font-family="monospace" font-weight="700" font-size="13" fill="#fff">&lt;/&gt;</text>`,

    designer: `
      <path d="M62 220H138L150 264H50Z" fill="#FF8CC6"/>
      <path d="M70 230L64 262M100 230V264M130 230L136 262" stroke="#FF6FB4" stroke-width="1.5"/>
      <rect x="78" y="262" width="12" height="32" fill="${SKIN}"/><rect x="110" y="262" width="12" height="32" fill="${SKIN}"/>
      ${SHOES("#7B5CD6")}
      <defs><pattern id="stripes-$ID" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="8" height="3" fill="#7B5CD6"/></pattern></defs>
      <path d="M64 158Q56 160 54 170L52 186L66 188L68 172Z" fill="url(#stripes-$ID)"/>
      <path d="M136 158Q144 160 146 170L148 186L134 188L132 172Z" fill="url(#stripes-$ID)"/>
      <path d="${TORSO}" fill="url(#stripes-$ID)"/>
      <rect x="61" y="214" width="78" height="8" fill="#3B2A6B"/>
      <path d="M86 150Q80 190 76 224" stroke="#FFD66B" stroke-width="6" fill="none"/>
      <path d="M114 150Q120 190 124 224" stroke="#FFD66B" stroke-width="6" fill="none"/>
      <path d="M86 160l4 1M85 170l4 1M84 180l4 1M83 190l4 1M82 200l4 1M114 160l-4 1M115 170l-4 1M116 180l-4 1M117 190l-4 1M118 200l-4 1" stroke="#7a5b00" stroke-width="1"/>`,

    labcoat: `
      ${PANTS("#56628F")}
      ${SHOES("#3B2A6B")}
      <path d="${SLEEVE_L}" fill="#FFFFFF" stroke="#D9D3F0"/><path d="${SLEEVE_R}" fill="#FFFFFF" stroke="#D9D3F0"/>
      <path d="M64 160Q70 151 86 150L114 150Q130 151 136 160L142 250L58 250Z" fill="#FFFFFF" stroke="#D9D3F0"/>
      <path d="M86 150L100 190L114 150Z" fill="#A8D8FF"/>
      <path d="M86 150L96 184L84 196M114 150L104 184L116 196" stroke="#D9D3F0" stroke-width="2" fill="none"/>
      <path d="M100 190V250" stroke="#D9D3F0" stroke-width="2"/>
      <rect x="110" y="204" width="18" height="14" rx="2" fill="none" stroke="#D9D3F0" stroke-width="2"/>
      <path d="M116 200V212" stroke="#7B5CD6" stroke-width="3" stroke-linecap="round"/>
      <rect x="72" y="200" width="16" height="10" rx="2" fill="#8EE3E0"/>
      <text x="80" y="208" text-anchor="middle" font-family="monospace" font-size="6" font-weight="700" fill="#2f6f6c">QA</text>
      <g class="av-magnifier"><circle cx="160" cy="206" r="10" fill="#E8F6FF" stroke="#3B2A6B" stroke-width="3"/><path d="M152 214L146 222" stroke="#3B2A6B" stroke-width="4" stroke-linecap="round"/></g>`,

    blazer: `
      ${PANTS("#2E3A6E")}
      ${SHOES("#1B1B2F")}
      <path d="${SLEEVE_L}" fill="#4F6EDB"/><path d="${SLEEVE_R}" fill="#4F6EDB"/>
      <path d="${TORSO}" fill="#4F6EDB"/>
      <path d="M86 150L100 196L114 150Z" fill="#FFFFFF"/>
      <path d="M86 150L94 182L82 188L80 160ZM114 150L106 182L118 188L120 160Z" fill="#3D58BE"/>
      <circle cx="100" cy="206" r="2.5" fill="#FFD66B"/><circle cx="100" cy="216" r="2.5" fill="#FFD66B"/>
      <path d="M118 168h10" stroke="#FF9ACB" stroke-width="3" stroke-linecap="round"/>`,

    gala: `
      <defs><linearGradient id="gown-$ID" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B79CFF"/><stop offset=".55" stop-color="#9FC4FF"/><stop offset="1" stop-color="#FFB3D9"/></linearGradient></defs>
      <path d="M70 162Q100 154 130 162L134 212Q160 260 172 302H28Q40 260 66 212Z" fill="url(#gown-$ID)"/>
      <path d="M70 162Q100 172 130 162" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M66 212Q100 222 134 212" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
      <path d="M60 300Q72 250 84 222M140 300Q128 250 116 222M100 224V300" stroke="#fff" stroke-width="1.2" fill="none" opacity=".45"/>
      ${sparkle(62, 270, 0.9)}${sparkle(138, 250, 0.7)}${sparkle(104, 190, 0.6)}${sparkle(90, 284, 0.8)}
      <path d="M84 50L88 40L94 48L100 36L106 48L112 40L116 50Z" fill="#FFD66B" stroke="#E9B949" stroke-width="1"/>
      <circle cx="100" cy="42" r="2.4" fill="#FF9ACB"/>`,

    sunny: `
      ${PANTS("#8DB4E8")}
      <path d="M100 246V292" stroke="#6E98D4" stroke-width="1.5"/>
      ${SHOES("#FFFFFF")}
      <path d="M68 166Q76 150 90 146L110 146Q124 150 132 166L136 222L64 222Z" fill="#F6C431"/>
      <path d="M90 146Q100 152 110 146L110 160Q100 166 90 160Z" fill="#E8B21E"/>
      <path d="M70 178Q100 186 130 178M68 196Q100 204 132 196M66 212Q100 220 134 212" stroke="#E8B21E" stroke-width="1.4" fill="none"/>
      <path d="M92 164Q100 176 108 164" stroke="#E7C26B" stroke-width="1.5" fill="none"/>
      <rect x="97" y="173" width="6" height="7" rx="1" fill="#E7C26B"/>`,
  };

  /* Accessories drawn on top of the head per look */
  const headwear = {
    designer: `<g transform="rotate(-14 100 48)"><ellipse cx="96" cy="46" rx="40" ry="11" fill="#7B5CD6"/><path d="M62 46Q66 22 98 22Q130 24 132 46Z" fill="#7B5CD6"/><circle cx="98" cy="20" r="4" fill="#5A3FB0"/></g>
               <path d="M140 136l10-6 4 7-10 6Z" fill="#C9C9D6"/><circle cx="145" cy="131" r="2" fill="#3B2A6B"/>`,
    labcoat: ``,
    sunny: `<path d="M86 156Q100 170 114 156" stroke="#E7C26B" stroke-width="1.6" fill="none"/>`,
  };

  function avatarSVG(look = "casual", uid = "a") {
    const garment = (looks[look] || looks.casual).replaceAll("$ID", uid);
    const wave = look === "sunny" ? " av-wave" : "";
    const sleeveless = ["gala", "sunny"].includes(look);
    return `
<svg class="avatar-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated avatar of Jhanina">
  <!-- hair back -->
  <path d="M50 92Q46 38 100 36Q154 38 150 92L158 206Q146 220 130 204L128 128H72L70 204Q54 220 42 206Z" fill="${HAIR}"/>
  <!-- legs + arms -->
  <rect x="80" y="226" width="16" height="70" rx="6" fill="${SKIN}"/>
  <rect x="104" y="226" width="16" height="70" rx="6" fill="${SKIN}"/>
  <g class="av-arm-l"><rect x="52" y="158" width="14" height="66" rx="7" fill="${SKIN}"/><circle cx="58" cy="224" r="7" fill="${SKIN}"/></g>
  <g class="av-arm-r${wave}"><rect x="134" y="158" width="14" height="66" rx="7" fill="${SKIN}"/><circle cx="142" cy="224" r="7" fill="${SKIN}"/></g>
  <rect x="91" y="134" width="18" height="22" rx="6" fill="${SKIN_D}"/>
  <!-- outfit -->
  <g class="av-outfit">${garment}</g>
  ${sleeveless ? `<path d="M64 162Q58 166 58 176" stroke="${SKIN_D}" stroke-width="1" fill="none" opacity=".5"/>` : ""}
  <!-- front hair locks with blonde streaks -->
  <path d="M60 100Q50 160 58 214Q66 220 74 208Q66 160 72 108Z" fill="${HAIR_L}"/>
  <path d="M68 108Q62 156 68 206L71 204Q66 156 72 110Z" fill="${STREAK}" opacity=".85"/>
  <path d="M140 100Q150 160 142 214Q134 220 126 208Q134 160 128 108Z" fill="${HAIR_L}"/>
  <path d="M132 108Q138 156 132 206L129 204Q134 156 128 110Z" fill="${STREAK}" opacity=".85"/>
  <!-- face -->
  <ellipse cx="100" cy="94" rx="40" ry="44" fill="${SKIN}"/>
  <ellipse cx="60" cy="100" rx="5" ry="8" fill="${SKIN_D}"/><ellipse cx="140" cy="100" rx="5" ry="8" fill="${SKIN_D}"/>
  <circle cx="60" cy="108" r="2.2" fill="#FFD66B"/><circle cx="140" cy="108" r="2.2" fill="#FFD66B"/>
  <!-- bangs -->
  <path d="M56 96Q50 44 100 44Q150 44 144 96L141 86L137 90L133 82L128 87L123 80L118 86L113 79L108 85L103 78L98 85L93 79L88 86L83 80L78 87L73 81L68 89L63 84L60 92Z" fill="${HAIR}"/>
  <path d="M84 52Q96 48 112 52" stroke="${HAIR_L}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- eyes -->
  <g class="av-eyes">
    <ellipse cx="82" cy="101" rx="4.6" ry="5.6" fill="#24181F"/><circle cx="83.6" cy="99" r="1.6" fill="#fff"/>
    <ellipse cx="118" cy="101" rx="4.6" ry="5.6" fill="#24181F"/><circle cx="119.6" cy="99" r="1.6" fill="#fff"/>
  </g>
  <path d="M75 95Q82 91 89 94M111 94Q118 91 125 95" stroke="#24181F" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <!-- cat-eye glasses -->
  <g fill="rgba(200,230,255,.18)" stroke="#9AA0B4" stroke-width="1.4">
    <path d="M67 94Q80 89 95 93Q95 107 82 110Q68 108 67 94Z"/>
    <path d="M105 93Q120 89 133 94Q132 108 118 110Q105 107 105 93Z"/>
  </g>
  <path d="M65 93Q80 86 96 92M104 92Q120 86 135 93" stroke="#1D1720" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M65 93L60 88M135 93L140 88" stroke="#1D1720" stroke-width="3" stroke-linecap="round"/>
  <path d="M95 94Q100 91 105 94" stroke="#9AA0B4" stroke-width="1.6" fill="none"/>
  <path d="M71 96L76 100" stroke="#fff" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>
  <!-- nose, blush, lips -->
  <path d="M100 108q-2.4 6 1.2 7.4" stroke="${SKIN_D}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="74" cy="116" rx="7" ry="4" fill="#FF9ACB" opacity=".45"/><ellipse cx="126" cy="116" rx="7" ry="4" fill="#FF9ACB" opacity=".45"/>
  <path d="M92 123Q96 121 100 123Q104 121 108 123Q104 131 100 131Q96 131 92 123Z" fill="#B5303E"/>
  <path d="M95 124Q100 126 105 124" stroke="#8F1F2C" stroke-width=".8" fill="none"/>
  ${headwear[look] || ""}
</svg>`;
  }

  window.avatarSVG = avatarSVG;
})();
