# LinkVault Configuration Reference

All profile content and visual options are defined in a single file:

```
src/data/profile.json
```

---

## 1. Schema Overview

```json
{
  "schemaVersion": 1,
  "profile": {
    "name": "Ashish Singh Bora",
    "headline": "Systems & Security Engineer • Open Source Architect",
    "bio": "Building high-assurance distributed systems, cryptographic tooling, and privacy-preserving infrastructure.",
    "avatar": "https://github.com/ashishsinghbora.png",
    "initialsFallback": "AB",
    "location": "Bengaluru, India • UTC+5:30",
    "availability": {
      "status": "available",
      "label": "Available for Architecture & Security Consulting"
    },
    "email": "ashishsinghbora@users.noreply.github.com",
    "website": "https://github.com/ashishsinghbora",
    "gpgFingerprint": "9F8B 32C1 4A5D 7E6F 1B2C 3D4E 5F6A 7B8C 9D0E 1F2A"
  },
  "socials": [
    {
      "id": "soc-github",
      "platform": "github",
      "label": "GitHub",
      "url": "https://github.com/ashishsinghbora",
      "username": "@ashishsinghbora",
      "icon": "github",
      "order": 1,
      "enabled": true
    }
  ],
  "collections": [
    {
      "id": "col-core",
      "title": "Core Work & Identity",
      "description": "Primary repositories, technical foundations, and published tools.",
      "icon": "terminal",
      "order": 1,
      "enabled": true,
      "items": [
        {
          "id": "lnk-linkvault-repo",
          "title": "LinkVault Repository",
          "description": "Privacy-first personal digital signal deck.",
          "url": "https://github.com/ashishsinghbora/LinkVault",
          "icon": "shield-check",
          "badge": "v1.0 • NEW",
          "featured": true,
          "order": 1,
          "enabled": true
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "proj-linkvault",
      "title": "LinkVault",
      "description": "Privacy-first digital identity platform & signal deck.",
      "url": "https://github.com/ashishsinghbora/LinkVault",
      "repoUrl": "https://github.com/ashishsinghbora/LinkVault",
      "demoUrl": "https://ashishsinghbora.github.io/LinkVault",
      "status": "Active",
      "tags": ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Zod", "Privacy"],
      "icon": "shield",
      "featured": true,
      "order": 1,
      "enabled": true
    }
  ],
  "appearance": {
    "defaultTheme": "dark",
    "accentColor": "mint",
    "backgroundStyle": "technical-grid",
    "cardStyle": "bordered"
  },
  "metadata": {
    "title": "Ashish Singh Bora | Digital Signal Deck",
    "description": "Privacy-first digital identity, open-source systems, engineering research, and curated technical links.",
    "canonicalUrl": "https://ashishsinghbora.github.io/LinkVault",
    "ogImage": "/og-image.svg",
    "author": "Ashish Singh Bora",
    "twitterHandle": "@ashishsinghbora",
    "robots": "index, follow"
  },
  "privacy": {
    "showGpg": true,
    "allowSearch": true,
    "showPoweredBy": true
  }
}
```

---

## 2. Supported Brand Icons

LinkVault includes embedded vector SVGs for major platforms without third-party network fetches:

| Brand | Icon Identifier |
| :--- | :--- |
| GitHub | `github` |
| X (Twitter) | `x` or `twitter` |
| LinkedIn | `linkedin` |
| Bluesky | `bluesky` |
| Mastodon | `mastodon` |
| Discord | `discord` |
| Telegram | `telegram` |
| YouTube | `youtube` |

Plus any Lucide icon name: `terminal`, `code-2`, `shield`, `cpu`, `radio`, `file-text`, `book-open`, `key`, `box`, `globe`, `mail`, `link`, `folder`, `lock`, `server`, `database`, `cloud`, etc.

---

## 3. Availability Status States

- `available`: Renders animated electric mint pulsing indicator.
- `busy`: Renders amber pulsing indicator.
- `stealth`: Renders muted graphite indicator.
- `custom`: Displays custom label.
