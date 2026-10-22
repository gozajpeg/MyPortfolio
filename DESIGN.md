# DESIGN.md: Rommel Angelo Goza Portfolio (2026)

## Design Read
Reading this as: Personal software engineering portfolio for technical hiring managers, founders, and developers, in a Swiss architectural editorial style, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

## Identity & Character
- **Owner**: Rommel Angelo Goza (Full-Stack Developer & CLI Tooling Author based in Bacolod City, Philippines).
- **Aesthetic**: 2026 Awwwards Swiss Editorial Grid. Raw architectural `1px` hairlines (`#222222`) over matte obsidian (`#090909`) and warm archival paper ink (`#EDEAE3`).
- **Strict Constraints**:
  - Zero gradients (no `linear-gradient`, no `radial-gradient`, no soft color fades).
  - Zero pills or capsule badges (no `rounded-full` tags, no decorative status dots).
  - Zero cyber/sci-fi text (no `Orbitron`, no `SYS.2026 //` prefixes, no glitch shaders).
  - Zero em-dashes (`—`) and zero AI buzzwords (*crafting, seamless, cutting-edge, passionate, leveraging, next-gen*).

## Palette (R-29: 2 Neutrals + 1 Warm Ink Accent)
- **Canvas (`--color-bg`)**: `#090909` (Matte Obsidian)
- **Elevated Surface (`--color-surface`)**: `#111111` (Architectural Panel)
- **Primary Ink (`--color-ink`)**: `#EDEAE3` (Warm Archival Bone)
- **Secondary Ink (`--color-ink-soft`)**: `#A6A49E` (Neutral Stone, 7.58:1 on `#111111`)
- **Muted Ink (`--color-ink-muted`)**: `#8A8880` (WCAG AA compliant: 5.61:1 on `#090909` and 5.32:1 on `#111111`)
- **Structural Hairline (`--color-border`)**: `#222222` (`1px solid`)

## Typography (R-06)
- **Display (`--font-display`)**: `Syne` (700, 800) for oversized architectural headlines and numbered index rows. Chosen for its wide, monumental geometric proportions that anchor an Awwwards-level typographic grid.
- **Body (`--font-sans`)**: `Space Grotesk` (400, 500, 600, 700) for crisp technical prose, metadata tables, and navigation.
- **Code (`--font-mono`)**: `JetBrains Mono` (400, 500) strictly for actual CLI install commands (`npm install -g prins-cli`, `npx depshred`) and package versions.

## Dials & Motion Architecture (R-19)
- **ENERGY**: 3 (Bold oversized typography, stark contrast, full-viewport architectural sections).
- **RHYTHM**: 3 (Varied section compositions: Asymmetric split Hero -> Interactive Sticky/Accordion Numbered Project Index -> Sticky-Left / Scrolling-Right Experience Ledger -> 5-Column Specification Matrix -> Monumental Split Contact Sheet).
- **MOTION**: 3 (Choreographed GSAP ScrollTrigger animations: line-by-line `yPercent` masked headline reveals, `scaleX` architectural hairline drawing on scroll, scrub-driven image/portrait parallax, and smooth scroll-linked progress indicator).

