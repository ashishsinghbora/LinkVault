<div align="center">

# LINKVAULT

### Your identity. Your links. Your infrastructure.

**A privacy-first, open-source personal digital identity and link management platform for engineers, researchers, and creators.**

[![License: MIT](https://img.shields.io/badge/License-MIT-00f59b.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-22272e.svg?style=flat-square&logo=github)](https://pages.github.com/)
[![Privacy: Zero Tracking](https://img.shields.io/badge/Telemetry-Zero_Tracking-00f59b.svg?style=flat-square)](docs/ARCHITECTURE.md)
[![Accessibility: WCAG 2.2 AA](https://img.shields.io/badge/A11y-WCAG_2.2_AA-cyan.svg?style=flat-square)](docs/ARCHITECTURE.md)

[Live Demo](https://ashishsinghbora.github.io/LinkVault) • [Architecture Guide](docs/ARCHITECTURE.md) • [Configuration Reference](docs/CONFIGURATION.md) • [Deployment Manual](docs/DEPLOYMENT.md)

---

</div>

## ✦ Why LinkVault?

Most link-in-bio services are generic consumer templates bloated with tracking pixels, aggressive advertisements, paywalled styling tiers, and vendor lock-in.

**LinkVault is different.** It is engineered as a **Digital Signal Deck**—a high-assurance, precision technical headquarters where developers, security researchers, system architects, and creators can publish their verified identities, open-source repositories, research papers, and communication channels.

- **100% Free & Open Source**: No subscriptions, no artificial paywalls.
- **Privacy-First**: Zero tracking cookies, no Google Analytics, no third-party beaconing.
- **Static Hosting Compatible**: Compiles to pure static assets deployable entirely on **GitHub Pages Free**.
- **Local Visual Studio**: Edit your profile visually in your browser with real-time preview and safe atomic writes to your local `profile.json`. No secrets or tokens needed.
- **Excluded Admin Surface**: The local visual Studio is never bundled into production builds, guaranteeing that no administrative code or write APIs are exposed publicly.

---

## ✦ Visual Identity: "The Digital Signal Deck"

```
┌────────────────────────────────────────────────────────────────────────┐
│ // LINKVAULT                                       [ THEME ] [ SHARE ] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                      ┌─────────────┐                                   │
│                      │   [ AB ]    │  ● AVAILABLE FOR CONSULTING       │
│                      └─────────────┘                                   │
│                     Ashish Singh Bora  ✔                               │
│        Systems & Security Engineer • Open Source Architect             │
│                 Bengaluru, India • UTC+5:30                            │
│                                                                        │
│            [ GitHub ] [ X ] [ LinkedIn ] [ Bluesky ]                   │
│                                                                        │
│   ┌───────────────────────────┐     ┌──────────────────────────────┐   │
│   │ ⚡ FEATURED: LinkVault     │     │ ⚡ FEATURED: Sentinel EASM   │   │
│   │ Privacy-first signal deck │     │ Attack surface monitor       │   │
│   └───────────────────────────┘     └──────────────────────────────┘   │
│                                                                        │
│   ▼ // DIRECTORY: Core Work & Identity                                 │
│   ├── [Shield] LinkVault Repository ......................... [v1.0] ↗ │
│   ├── [Code]   Open Source Repositories ................... [Active] ↗ │
│   └── [Key]    GPG Public Key & Keybase ................... [SECURE] ↗ │
│                                                                        │
│   ▼ // DIRECTORY: Research & Technical Publications                    │
│   ├── [Doc]    Modern Attack Surface Monitoring (EASM) ...... [READ] ↗ │
│   └── [Paper]  MailRadar Protocol Telemetry Analysis ......... [RFC] ↗ │
│                                                                        │
│   ▼ // DIRECT COMMUNICATION CHANNELS                                   │
│   ├── Primary Email: ashishsinghbora@users.noreply.github.com          │
│   └── GPG Key: 9F8B 32C1 4A5D 7E6F 1B2C 3D4E 5F6A 7B8C 9D0E 1F2A      │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

- **Canvas**: Deep graphite/obsidian (`#07090b` / `#0d1117`) with refined surface layers.
- **Accents**: Electric Mint (`#00f59b`), Cyber Cyan (`#00e5ff`), Emerald, Amber, and Violet.
- **Typography**: Precision monospace metadata (`JetBrains Mono`) paired with modern sans-serif headings (`Inter`).
- **Responsive Mastery**: Seamless across mobile phones (320px–430px), tablets (768px–1024px), laptops (1280px–1440px), 4K displays (2560px), and televisions.

---

## ✦ Local Visual Studio: Visual Editing Without Coding

You never have to manually edit JSON syntax or touch React code just to add a social link or publication.

```bash
npm run studio
```

Opens the local visual management studio at:
```
http://127.0.0.1:5173/studio.html
```

### Studio Capabilities:
1. **Interactive Live Preview**: Real-time side-by-side preview with instant device switching (Phone, Tablet, Laptop, Fill).
2. **Atomic Writes to Disk**: Clicking **Save Profile** writes validated configuration directly to `src/data/profile.json` via local Vite dev middleware.
3. **Automatic Backups**: Creates `src/data/profile.backup.json` before saving.
4. **Undo / Redo**: Full history stack with keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`).
5. **Drag-and-Drop & Keyboard Ordering**: Easily rearrange links, collections, and projects.
6. **Turnkey Disaster Recovery**: Export offline JSON backups, import existing backups with schema validation, or reset to demo data.

---

## ✦ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/ashishsinghbora/LinkVault.git
cd LinkVault
npm install
```

### 2. Run the Development Website
```bash
npm run dev
# Opens public site at http://127.0.0.1:5173
```

### 3. Open the Visual Studio
```bash
npm run studio
# Opens http://127.0.0.1:5173/studio.html
```

### 4. Build for Production
```bash
npm run build
# Compiles static site to dist/ (Studio is excluded)
```

---

## ✦ Deploying to GitHub Pages

LinkVault includes a fully configured GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Setup in 60 Seconds:
1. **Fork** or push this repository to GitHub.
2. In your GitHub repository, open **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any change to your `main` branch. GitHub Actions will validate your profile, run all tests, build the site, and publish your URL!

LinkVault automatically configures the Vite base path for both project sites (`username.github.io/LinkVault/`) and user sites (`username.github.io/`).

---

## ✦ Project Structure

```
linkvault/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages CI/CD workflow
│       └── checks.yml          # Pull request validation checks
├── docs/
│   ├── ARCHITECTURE.md         # Technical architecture specification
│   ├── CONFIGURATION.md        # Complete profile.json schema reference
│   └── DEPLOYMENT.md           # Step-by-step GitHub Pages & custom domain guide
├── public/
│   ├── favicon.svg             # Vector brand icon
│   ├── og-image.svg            # Social share card
│   ├── robots.txt              # Search engine crawler directives
│   ├── sitemap.xml             # XML sitemap
│   └── site.webmanifest        # PWA web manifest
├── scripts/
│   ├── validate-profile.js     # Standalone CLI profile validator
│   └── vite-studio-plugin.ts   # Local-only Vite dev server Studio API
├── src/
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── profile/            # ProfileHero, ContactSection
│   │   ├── links/              # FeaturedSection, LinkCollections
│   │   ├── projects/           # ProjectShowcase
│   │   └── shared/             # BrandIcon, IconRenderer, SearchBar, Modals
│   ├── data/
│   │   └── profile.json        # Central profile configuration
│   ├── hooks/                  # useTheme hook
│   ├── lib/
│   │   └── schema.ts           # Zod schema validation & defaults
│   ├── styles/                 # Tailwind CSS tokens
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Public entry point
├── studio/
│   ├── components/             # StudioSidebar, DevicePreview
│   ├── pages/                  # 9 Studio management tabs
│   ├── StudioApp.tsx           # Studio root application
│   └── main.tsx                # Studio entry point
├── tests/
│   ├── e2e/
│   │   └── responsive.spec.ts  # Playwright 10-viewport responsive tests
│   └── unit/
│       ├── schema.test.ts      # Zod schema & validation unit tests
│       ├── components.test.tsx # UI component unit tests
│       └── studio-api.test.ts  # Atomic write & security unit tests
├── index.html                  # Public website HTML entry
├── studio.html                 # Local development Studio HTML entry
├── vite.config.ts              # Vite configuration (excludes studio in prod)
├── tailwind.config.js          # Design System token configuration
├── tsconfig.json               # TypeScript strict configuration
└── package.json
```

---

## ✦ Quality Assurance & Testing

LinkVault enforces automated quality gates:

```bash
# 1. Run profile schema validation
npm run validate

# 2. Run TypeScript strict typecheck
npm run typecheck

# 3. Run Vitest unit & integration test suite
npm test

# 4. Run Playwright end-to-end responsive tests
npm run test:e2e
```

---

## ✦ License

LinkVault is licensed under the [MIT License](LICENSE).  
Engineered with precision for the open-source engineering community.
