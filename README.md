# Elemental Research Lab website

The public website for Elemental Research Lab, a research group exploring world model interpretability, model diagnostics, and AI safety.

## Pages

- `index.html` — concise introduction and project index
- `about.html` — lab overview and method
- `projects.html` — tools and active projects
- `directions.html` — four core research directions
- `research.html` — working papers and draft requests
- `people.html` — contributors
- `contact.html` — lab email
- `clean.css` and `site.js` — shared styling and small page utilities
- `public/elemental-mark.svg` — Elemental mark asset

All seven pages are Vite entry points and are published to GitHub Pages by `.github/workflows/deploy.yml`. The site uses one compact editorial layout across every page.

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
