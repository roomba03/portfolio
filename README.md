# Reem Fatima: Portfolio

My personal portfolio. One codebase ships two versions of the site:

- **Product design portfolio:** [reemfatimaportfolio.vercel.app](https://reemfatimaportfolio.vercel.app/), with case studies for recruiters and hiring managers
- **Web dev portfolio:** [web-dev-portfolio-eight-neon.vercel.app](https://web-dev-portfolio-eight-neon.vercel.app/), with live sites and GitHub links for engineers

Both versions share every component and differ only in the project data they feed in. Press **9** anywhere on the site to switch between them.

## Stack

- React 19 + Vite
- Tailwind CSS
- React Router
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev       # starts the dev server and opens the browser
```

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Routes

| Path | Page |
|---|---|
| `/portfolio` | Product design portfolio (default) |
| `/web-dev` | Web dev portfolio |
| `/work/two-dish` | Two Dish case study |
| `/work/busy-bunny` | Busy Bunny case study |
| `/work/portfolio-site` | Case study about this site |

`/` and any unknown path redirect to the default route.

## Project structure

```
src/
  App.jsx                  Routes, the "9" version switch, page transitions
  pages/                   One file per route
  components/
    MiniLibrary.jsx        The Selected Work / Mini Projects carousel
    CaseStudyKit.jsx       Shared building blocks for the case study pages
    caseStudyTheme.js      Case study colors and fonts
    ...                    Hero effects, footer, loading screen
  hooks/useCopyEmail.js    Click-to-copy email
  index.css                Global styles and self-hosted @font-face rules
public/
  fonts/                   Self-hosted woff2 fonts
  llms.txt                 Site summary for AI tools
  robots.txt
```

## Deployment

Two Vercel projects build from this repo's `main` branch. They differ by one environment variable:

| Variable | Value | Effect |
|---|---|---|
| `VITE_DEFAULT_ROUTE` | unset | `/` goes to `/portfolio` |
| `VITE_DEFAULT_ROUTE` | `web-dev` | `/` goes to `/web-dev` |

`vercel.json` rewrites every path to `index.html` for client-side routing, except `/.well-known/*`. Real files in `public/` (like `robots.txt` and `llms.txt`) are served before the rewrite applies.

## Docs

- [`DESIGN.md`](DESIGN.md): the design case study for this site, covering its goals, core decisions, and what I learned. Kept in sync with the `/work/portfolio-site` page.
- [`CHANGELOG.md`](CHANGELOG.md): a running record of design changes and iterations, with the reasoning where it was written down at the time.
