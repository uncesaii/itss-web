# ITSS website — Wizelaw-inspired redesign

This document covers the redesigned site: structure, design system, responsive
behaviour, performance work and deployment. It intentionally lives outside
`README.md`.

## Stack

- Vite + React 18 + TypeScript
- `three` for the interactive book showcase on `/learning-materials`
- `framer-motion` for UI transitions
- `vite-imagetools` for AVIF/WebP/JPG responsive images
- Plain CSS per component (`Header.css`, `Hero.css`, `Home.css`, ...) with a
  shared token layer in `src/styles/global.css`

## Routes

| View id | Path |
| --- | --- |
| main | `/` |
| gallery | `/about` |
| mission | `/mission` |
| vision | `/vision` |
| quality-policy | `/quality-policy` |
| cbl | `/constitution-and-by-laws` |
| executive | `/executive` |
| projects | `/programs` |
| announcements | `/news` |
| learning-materials | `/learning-materials` |
| contact | `/contact` |

`vercel.json` rewrites every client-side route to `index.html`.

## Design system

Defined in `src/styles/global.css`:

- `--navy: #001147` — primary brand navy, also the header/hero backdrop
- `--primary: #0048c6` — link and button blue
- `--accent-bright: #38b1ff` — highlights and light-on-dark accents
- `--ink: #27323d` — body text
- `--container: 1170px`, 24px inline page padding
- `.btn` baseline: 62px height, 12px label size, pill shape

Typography uses the self-hosted Plus Jakarta Sans (preloaded in `index.html`).
Sections follow the Wizelaw rhythm: eyebrow → title → lead paragraph, generous
whitespace, navy image bands separated by white content bands.

## Header and hero

- The header has an `overlay` mode on the home page (transparent over the
  hero) and a solid sticky variant on the remaining pages.
- At ≤1199px the desktop navigation collapses into a full-width dropdown panel.
  The panel is solid navy and, in sticky mode, is anchored to the header with
  `position: absolute` so it spans the viewport edge to edge.
- At ≤767px the header stays as a transparent overlay over the hero on the home
  page, matching desktop behaviour. Hero content is offset so the title clears
  the 100px header bar.
- The hero is a three-slide carousel with animated curtain-strip transitions.
  Mobile CTAs stay visible and are sized at 52px height / 11px label so they
  remain tappable. The slide dots are shown between 601–767px and above 840px.

## Learning materials performance

`src/components/BooksShowcase.tsx` is a custom three.js carousel. Optimisations
applied on top of the Wizelaw layout:

- Frame pacing is adaptive: up to 60fps while the visitor is dragging, hovering,
  opening or closing a book; 24fps (low-power devices) to 30fps when idle.
- The 2048px PCF shadow pass was removed; sprite blobs under each book provide
  contact shadows with no extra draw calls.
- Procedural cover, spine and index-page canvases are painted at 75% desktop /
  50% mobile backing resolution and cached across mounts, so StrictMode
  remounts and repeat visits do not repaint ~16 large canvases.
- Renderer pixel ratio is capped at 1, and the renderer requests the
  high-performance GPU (`powerPreference`).
- Low-power detection: reduced motion, viewport ≤900px, or ≤4 logical cores.
  These devices skip antialiasing and use a smaller page count.
- Rendering pauses whenever the canvas is out of the viewport
  (`IntersectionObserver`) or the tab is hidden.

## Asset pipeline

- `src/images.ts` imports local images with `vite-imagetools` and exposes
  `<picture>` sources with responsive widths.
- Full-bleed backgrounds live in `public/bg/` (news, stats, contact).
- Hero photography lives in `public/hero/` and is preloaded from `index.html`.
- The logo mark is the inline `LogoMark` SVG component so it can inherit colour
  (used in the header, footer and testimonial badge).

## Accessibility and SEO

- Skip link, landmarks, labelled sections, focus-visible styles and reduced
  motion support are kept across the redesign.
- `src/seo.ts` manages per-route titles, descriptions, canonical URLs, Open
  Graph and JSON-LD.
- `public/robots.txt`, `public/sitemap.xml` and the 404/error boundary remain in
  place.

## Commands

```bash
npm run dev      # local dev server
npm run lint     # eslint, zero warnings allowed
npm run build    # tsc --noEmit + vite build
npm run smoke    # verifies the compiled assets
npm test         # lint + build + smoke
```

## Deployment

The project deploys on Vercel with the Vite preset. `vercel.json` handles SPA
rewrites for the client-side routes above. Production is served from the `main`
branch.
