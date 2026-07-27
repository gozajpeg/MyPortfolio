# MyPortfolio

Personal portfolio site for **Rommel Angelo Goza**, a self-taught full-stack developer from the Philippines. Build a single-page "bento" layout portfolio, one large active panel plus a queue strip of the other sections, swapped with a FLIP-animated transition instead of a traditional scrolling page.

**Live site:** https://gozajpeg.github.io/MyPortfolio/

## Features

- **Bento-style navigation** — Home, About, Projects, Skills, and Connect live as swappable panels rather than stacked page sections. Clicking a queue item brings it to the front with a smooth FLIP (First-Last-Invert-Play) transition.
- **No-scroll layout** — Every panel is designed to fit to your screen vs normal scrolling websites.
- **Custom cursor** — The Figma code editor-inspired custom cursor.
- **Responsive layout** — Responsive to any layout you have. (e.g mobile, dekstop)
- **Dark, monochrome, keycap-inspired design system** — Custom monochrome design and keycap-inspiired layout.

## Tech stack

| | |
|---|---|
| Framework | React |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Icons | lucide-react |
| Deployment | GitHub Pages via `gh-pages` |

## Getting started

```bash
# clone the repo
git clone https://github.com/gozajpeg/MyPortfolio.git
cd MyPortfolio

# install dependencies
npm install

# start the dev server
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot module reload |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

## Project structure

```
src/
├── assets/              # images, logos
├── components/
│   ├── bento/           # HeroBento, AboutBento, ProjectsBento, SkillsBento, SocialsBento
│   └── Layout/           # BentoLayout (panel switching + FLIP animation), Cursor
├── data/
│   └── Projects/         # Featured, Screensavers, Logos, and NPM project data
├── hooks/                # useIsMobile
├── App.jsx
├── main.jsx
└── index.css             # Tailwind v4 theme tokens, keyframes, and custom utilities
```

## Contact

- GitHub: [@gozajpeg](https://github.com/gozajpeg)
- Email: ragoza.builds@gmail.com

## License

This project is a personal portfolio and is not currently licensed for reuse.
