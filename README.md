# ITSS Website

This is the official repository of the Information Technology Student Society (ITSS) for developing the ITSS website.

**Repository:** [uncesaii/itss-web](https://github.com/uncesaii/itss-web)

**Webmaster:** Jeric D. Septimo, ITSS President

## About

The ITSS website is the public-facing site for the organization. It presents the organization's mission, vision, quality policy, Constitution and By-Laws, executive board, programs, announcements, learning materials, and contact information.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript, HTML, CSS |
| UI library | React 18 |
| Build tool | Vite 6 |
| Styling | Plain CSS with component-level stylesheets |
| Routing | Hash-based client-side views |
| Linting | ESLint 10 with TypeScript and React rules |
| CI | GitHub Actions |
| Runtime | Node.js 22+ with npm |

No CSS framework, UI component library, or router package is used. The interface is built with React components and custom CSS.

## Project Tree

```text
itss-web/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   │   ├── roboto-300.woff2
│   │   ├── roboto-400.woff2
│   │   ├── roboto-500.woff2
│   │   ├── roboto-700.woff2
│   │   └── roboto-900.woff2
│   └── images/
│       ├── about-abstract.jpg
│       ├── about-glass.jpg
│       ├── about-lattice.jpg
│       ├── contact-call.jpg
│       ├── hero-aperture.jpg
│       ├── hero-lorum.jpg
│       ├── logo-dark.png
│       ├── logo-light.png
│       ├── project-bridge.jpg
│       ├── project-dome.jpg
│       ├── project-field.jpg
│       ├── project-residential.jpg
│       └── project-wave.jpg
├── src/
│   ├── components/
│   │   ├── About.css
│   │   ├── About.tsx
│   │   ├── ArrowRight.tsx
│   │   ├── Contact.css
│   │   ├── Contact.tsx
│   │   ├── Footer.css
│   │   ├── Footer.tsx
│   │   ├── Header.css
│   │   ├── Header.tsx
│   │   ├── Hero.css
│   │   ├── Hero.tsx
│   │   ├── InfoPage.css
│   │   ├── InfoPage.tsx
│   │   ├── Logo.css
│   │   ├── Logo.tsx
│   │   ├── Mission.css
│   │   ├── Mission.tsx
│   │   ├── PageSkeleton.css
│   │   ├── PageSkeleton.tsx
│   │   ├── Projects.css
│   │   └── Projects.tsx
│   ├── styles/
│   │   └── global.css
│   ├── App.css
│   ├── App.tsx
│   ├── content.ts
│   ├── main.tsx
│   └── usePageReady.ts
├── scripts/
│   └── smoke.mjs
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

`dist/` and `node_modules/` are generated locally and are not committed.

## Pages

The site uses hash-based navigation:

| View | Hash |
| --- | --- |
| Home | `#main` |
| About Us | `#gallery` |
| Mission | `#mission` |
| Vision | `#vision` |
| Quality Policy | `#quality-policy` |
| Constitution and By-Laws | `#cbl` |
| Organization Executive | `#executive` |
| Programs | `#projects` |
| News | `#announcements` |
| Learning Materials | `#learning-materials` |
| Contact | `#contact` |

Page transitions use a route-aware loading skeleton, and image-heavy views preload their main assets before the page becomes visible.

## Getting Started

### Requirements

- Node.js 22 or newer
- npm

### Install

```bash
git clone https://github.com/uncesaii/itss-web.git
cd itss-web
npm install
```

If you already cloned the repository, run `git pull origin main` from the project root before installing dependencies.

### Run locally

```bash
npm run dev
```

Open the local URL printed by Vite.

### Production build

```bash
npm run build
```

The output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Quality Checks

```bash
# Lint the project
npm run lint

# Build the production site
npm run build

# Run the HTTP smoke test against the build output
npm run smoke

# Run lint, build, and smoke checks together
npm test
```

The `main` branch is protected. All changes must go through a pull request, and the GitHub Actions CI check must pass before merging. CI runs linting, the production build, and the smoke test.

## Contact

- Email: itss.cvsusc@gmail.com

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. All contributions must follow the commit and pull request format defined there.

## Security

Do not report security vulnerabilities through public issues or pull requests. Follow the private reporting process in [SECURITY.md](SECURITY.md).

## License

Copyright © 2026 Information Technology Student Society (ITSS). All rights reserved.

This repository is proprietary and is provided for authorized ITSS website development only. No permission is granted to copy, modify, distribute, sublicense, or create derivative works without prior written permission from ITSS. See [LICENSE](LICENSE) for the full terms.
