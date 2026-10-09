# Elemental Research Lab website

The public website for Elemental Research Lab, a research group exploring world model interpretability, model diagnostics, and AI safety.

## Pages

- `index.html` — lab thesis, research agenda, projects, and working notes
- `about.html` — lab overview and research focus
- `projects.html` — tools and active projects
- `directions.html` — four core research directions and the lab's research approach
- `research.html` — working papers and draft requests
- `people.html` — contributors
- `contact.html` — ways to contact the lab
- `site.css`, `paper.css`, and `site.js` — shared styling and navigation
- `public/elemental-mark.svg` — Elemental mark asset

All seven pages are Vite entry points and are published to GitHub Pages by `.github/workflows/deploy.yml`. The current presentation uses a white editorial layout, restrained typography, and minimal motion. Older cover media remains in `public/` but is not loaded by the pages.

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The static pages can also be previewed with any local HTTP server.
