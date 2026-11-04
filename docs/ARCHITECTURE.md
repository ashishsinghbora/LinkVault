# LinkVault Architecture & Design Specification

> "Your identity. Your links. Your infrastructure."

LinkVault is a privacy-first, open-source personal digital identity and link management platform engineered specifically for software engineers, security researchers, systems architects, and technical professionals.

---

## 1. High-Level Architectural Model

LinkVault utilizes a dual-tier separation of concerns:

```
┌────────────────────────────────────────────────────────┐
│                   LOCAL WORKSTATION                    │
│                                                        │
│   ┌─────────────────────┐    Atomic Write              │
│   │  Local Studio UI    │──────────────────────┐       │
│   │ (127.0.0.1:5173)    │                      │       │
│   └─────────────────────┘                      ▼       │
│              │                          src/data/      │
│              ▼                        profile.json     │
│   ┌─────────────────────┐                      ▲       │
│   │  Vite Dev Server    │                      │       │
│   │ + Studio Middleware │──────────────────────┘       │
│   └─────────────────────┘                              │
└────────────────────────────────────────────────────────┘
                           │
                 git push origin main
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   GITHUB PAGES CI/CD                   │
│                                                        │
│   GitHub Actions (.github/workflows/deploy.yml)        │
│   ├── npm ci                                           │
│   ├── npm run validate                                 │
│   ├── npm run typecheck                                │
│   ├── npm run test (Vitest)                            │
│   └── npm run build (Vite Rollup: ONLY index.html)     │
│                                                        │
│   Static Artifacts Deployed:                           │
│   ├── index.html                                       │
│   ├── assets/ (main.js, main.css)                      │
│   ├── favicon.svg, og-image.svg, robots.txt, sitemap   │
│   └── (Zero backend • Zero studio bundle • Zero DB)    │
└────────────────────────────────────────────────────────┘
```

---

## 2. Component Subsystems

### A. The Public Signal Deck (`src/`)
- **Pure Static Execution**: Compiles to standard client-side JavaScript, CSS, and HTML. No runtime database queries, server-rendered endpoints, or node processes required in production.
- **Data Hydration**: All profile information is hydrated strictly from `src/data/profile.json` through safe Zod schema parsing.
- **Zero Telemetry**: LinkVault executes no tracking pixels, analytics scripts, third-party cookies, or remote beaconing.
- **Rel Isolation**: Outbound links strictly enforce `rel="noopener noreferrer"` to protect referrer leakage and tab hijacking.

### B. The Local Visual Studio (`studio/` & `scripts/vite-studio-plugin.ts`)
- **Zero-Cloud Configuration**: Modifications are saved directly into the local repository file `src/data/profile.json` using local Vite dev server middleware.
- **Loopback Enforcement**: The Studio API explicitly validates client IP addresses (`127.0.0.1`, `::1`, `localhost`) and rejects non-loopback connections with HTTP 403.
- **Atomic File Writing**: Profile writes are made to a timestamped temporary file (`profile.json.<timestamp>.tmp`) followed by an atomic filesystem rename, ensuring corruption cannot occur during power loss or abrupt termination.
- **Automatic Local Backups**: Before overwriting `src/data/profile.json`, the API preserves `src/data/profile.backup.json`.
- **Production Isolation**: In Vite production builds (`vite build`), `rollupOptions.input` targets **strictly** `index.html`. `studio.html` and its bundles are entirely omitted from the production `dist/` folder.

---

## 3. Visual Design System: "The Digital Signal Deck"

The aesthetic is inspired by high-end developer workstations, telemetry control interfaces, and modern operating systems:

- **Primary Canvas**: `#07090b` (obsidian black) and `#0d1117` (graphite canvas).
- **Surface Elevation**: `#12171f` (level 1 cards) and `#171e28` (elevated cards).
- **Accents**:
  - `Electric Mint`: `#00f59b` (default high-signal accent)
  - `Cyan Cyber`: `#00e5ff` (blueprint / system accent)
  - `Emerald Slate`: `#10b981`
  - `Amber Telemetry`: `#f59e0b`
  - `Violet Signal`: `#a78bfa`
- **Typography**:
  - Headings: Inter / Modern Sans-Serif system fonts
  - Metadata & Ticks: JetBrains Mono / Fira Code monospace font
- **Grid Matrix**: 32px precision coordinate grid with responsive alignment marks.
- **Contrast & Accessibility**: Meets WCAG 2.2 AA standards with full keyboard focus navigation and `prefers-reduced-motion` compliance.

---

## 4. Schema & Data Flow

Configuration is centralized in `src/data/profile.json`:

1. **Schema Versioning**: `schemaVersion: 1` enables deterministic migrations.
2. **Identity**: Name, headline, biography, avatar, initials fallback, location, availability status, verified email, personal website, GPG public key.
3. **Socials**: Array of verified brand channels with custom labels, URLs, usernames, order, and active toggles.
4. **Collections**: Arbitrary nested groups of categorized links with icons, descriptions, badges, and featured toggles.
5. **Projects**: Showcase cards with repository links, live demos, tech stack tags, and status badges.
6. **Appearance**: Default theme mode (`dark` | `light` | `system`), accent color, background style, and card borders.
7. **Metadata**: Open Graph, Twitter/X cards, canonical URLs, and robots directives.
