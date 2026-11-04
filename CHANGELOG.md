# Changelog

All notable changes to the **LinkVault** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-04

### Initial Production Release

#### Added
- **The Digital Signal Deck Visual Identity**: High-contrast obsidian/graphite aesthetic with electric mint and cyan accents, technical alignment ticks, and responsive coordinate grid.
- **Dark and Light Theme Engine**: System preference detection, manual toggle, localStorage persistence, and 5 accent palettes (Electric Mint, Cyan, Emerald, Amber, Violet).
- **Public Signal Page**:
  - Profile Hero with verified avatar or initials fallback.
  - Live availability signal indicator with animated pulse.
  - Social media row with zero-CDN vector brand icons.
  - Featured transmission cards with micro-interactions.
  - Categorized directory collections with badge tags.
  - Open-source project showcase with repo and live launch links.
  - Direct communication channels with email copy and cryptographic GPG fingerprint copy.
  - Dynamic real-time client-side search across links and projects.
  - Share modal with dynamic client-side QR code generation.
  - Privacy architecture information modal.
- **Local Visual Studio (`studio.html` / `npm run studio`)**:
  - Zero-cloud local visual management dashboard.
  - Vite dev server middleware for validated atomic file writes directly to `src/data/profile.json`.
  - Automatic backup creation (`profile.backup.json`).
  - Left sidebar with 9 management tabs (Overview, Identity, Socials, Collections, Projects, Appearance, SEO, Export, Raw JSON).
  - Interactive live preview with device frame switcher (Phone 390px, Tablet 768px, Desktop 1024px, Fill).
  - Undo and Redo history stack with keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`).
  - Offline JSON import and export with schema validation.
- **Security & Privacy Architecture**:
  - Bound to `127.0.0.1` loopback only in dev mode.
  - Complete exclusion of Studio code from production builds (`rollupOptions.input` strictly builds `index.html`).
  - Strict URL scheme validation rejecting `javascript:` and dangerous data URIs.
  - Zero tracking pixels, cookies, or remote analytics.
- **GitHub Pages CI/CD Workflow**:
  - Fully automated GitHub Actions deployment on push to `main`.
  - Automatic detection of user sites (`username.github.io`) vs project sites (`username.github.io/repo/`).
  - Quality gates: Zod validation, TypeScript check, Vitest unit tests before deployment.
