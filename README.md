# ✂️ Jhanina.atelier

My portfolio, built as a fashion atelier where you unlock my outfits as you explore.
Live at **https://jhanina03.github.io**.

- **Wardrobe game**: visit each section to unlock a look, then dress the avatar from the rack
- **QA mini-game**: find the 3 bugs in the product card to unlock the lab coat
- **Pattern archive** (`archive.html`) with filters, and a printable **CV** (`cv.html`, also as a PDF in `assets/cv/`)
- English by default, Spanish with one click (or `?lang=es`); light and dark mode; works on phones

Built with plain HTML, CSS and JavaScript. There's no build step: GitHub Pages serves the files as they are.

## Editing content

Everything lives in **`js/data.js`**: projects, skills, experience and certificates, each in English and Spanish.
UI texts are in `js/i18n.js`, and the avatar and its looks are in `js/avatar.js`.

To add a certificate, put the PDF in `assets/certs/` and add an entry to `CERTS` in `js/data.js`.

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

`brand-kit/` holds the banners, the GitHub profile README and the social-media texts.
