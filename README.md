# Elemental Research Lab website

The public website for Elemental Research Lab, an open research group exploring world model interpretability, model diagnostics, and AI safety.

## Pages

- `index.html` — lab-led homepage with a moving architectural cover and current project index
- `about.html` — lab overview and research focus
- `projects.html` — tools and active projects
- `directions.html` — four core research directions and a visual overview of the research approach
- `research.html` — working papers and draft requests
- `people.html` — contributors
- `contact.html` — ways to contact the lab
- `site.css` and `site.js` — shared styling and mobile navigation
- `public/elemental-mark.svg` — Elemental mark asset

All seven pages are Vite entry points and are published to GitHub Pages by `.github/workflows/deploy.yml`. The cover uses two muted, looping MP4 panoramas made from the hall artwork, with the still image as a fallback and for reduced motion.

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
