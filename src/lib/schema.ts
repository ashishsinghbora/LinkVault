import { z } from 'zod';
import type { ProfileData } from '../types/profile';

// URL validator that rejects javascript:, vbscript:, data: URIs (except safe data:image)
export const safeUrlSchema = z.string().trim().refine((val) => {
  if (!val) return true;
  const lower = val.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:text/html') ||
    lower.startsWith('data:application')
  ) {
    return false;
  }
  return true;
}, {
  message: 'Invalid or unsafe URL format',
});

export const SocialLinkSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  platform: z.string().min(1, 'Platform name is required'),
  label: z.string().min(1, 'Label is required'),
  url: safeUrlSchema,
  username: z.string().optional().default(''),
  icon: z.string().optional().default('link'),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const LinkItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  url: safeUrlSchema,
  icon: z.string().optional().default('link'),
  badge: z.string().optional().default(''),
  featured: z.boolean().optional().default(false),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
  clicks: z.number().optional().default(0),
});

export const LinkCollectionSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  icon: z.string().optional().default('folder'),
  collapsedByDefault: z.boolean().optional().default(false),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
  items: z.array(LinkItemSchema).default([]),
});

export const ProjectItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  url: safeUrlSchema.optional().default(''),
  repoUrl: safeUrlSchema.optional().default(''),
  demoUrl: safeUrlSchema.optional().default(''),
  status: z.string().default('Active'),
  tags: z.array(z.string()).default([]),
  icon: z.string().optional().default('box'),
  image: safeUrlSchema.optional().default(''),
  featured: z.boolean().optional().default(false),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const CertificationItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  issuedDate: z.string().default(''),
  credentialId: z.string().optional().default(''),
  credentialUrl: safeUrlSchema.optional().default(''),
  icon: z.string().optional().default('award'),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const EducationItemSchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().optional().default(''),
  field: z.string().optional().default(''),
  period: z.string().default(''),
  description: z.string().optional().default(''),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const MediaVideoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: safeUrlSchema,
  videoId: z.string().min(1),
  description: z.string().optional().default(''),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const MediaSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  channelUrl: safeUrlSchema.optional().default(''),
  channelLabel: z.string().optional().default(''),
  videos: z.array(MediaVideoSchema).default([]),
  order: z.number().int().default(0),
  enabled: z.boolean().default(true),
});

export const Scene3DSettingsSchema = z.object({
  enabled: z.boolean().default(true),
  animate: z.boolean().default(true),
  motionIntensity: z.enum(['low', 'medium', 'high']).default('medium'),
  quality: z.enum(['auto', 'performance', 'high']).default('auto'),
  glowIntensity: z.enum(['subtle', 'medium', 'vibrant']).default('medium'),
  orbitalSpeed: z.number().min(0.1).max(3.0).default(1.0),
  particleDensity: z.enum(['low', 'medium', 'high']).default('medium'),
  heroLayout: z.enum(['split', 'centered']).default('split'),
  backgroundStyle: z.enum(['deep-space', 'orbital-glow', 'technical-grid', 'minimal']).default('deep-space'),
  showFallbackOnly: z.boolean().optional().default(false),
});

export const ProfileDataSchema = z.object({
  schemaVersion: z.number().int().default(1),
  profile: z.object({
    name: z.string().min(1, 'Name is required'),
    headline: z.string().default(''),
    bio: z.string().default(''),
    avatar: safeUrlSchema.optional().default(''),
    initialsFallback: z.string().optional().default(''),
    location: z.string().optional().default(''),
    availability: z
      .object({
        status: z.enum(['available', 'busy', 'stealth', 'custom']).default('available'),
        label: z.string().default('Available'),
      })
      .optional()
      .default({ status: 'available', label: 'Available' }),
    email: z.string().email('Invalid email address').or(z.literal('')).optional().default(''),
    website: safeUrlSchema.optional().default(''),
    gpgFingerprint: z.string().optional().default(''),
  }),
  socials: z.array(SocialLinkSchema).default([]),
  collections: z.array(LinkCollectionSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  certifications: z.array(CertificationItemSchema).optional().default([]),
  education: z.array(EducationItemSchema).optional().default([]),
  mediaSections: z.array(MediaSectionSchema).optional().default([]),
  appearance: z.object({
    defaultTheme: z.enum(['dark', 'light', 'system']).default('dark'),
    accentColor: z.enum(['mint', 'cyan', 'emerald', 'amber', 'violet']).default('emerald'),
    backgroundStyle: z.enum(['deep-space', 'orbital-glow', 'technical-grid', 'dots', 'minimal', 'circuit']).default('deep-space'),
    cardStyle: z.enum(['bordered', 'technical', 'minimal']).optional().default('bordered'),
    scene3d: Scene3DSettingsSchema.optional().default({
      enabled: true,
      animate: true,
      motionIntensity: 'medium',
      quality: 'auto',
      glowIntensity: 'medium',
      orbitalSpeed: 1.0,
      particleDensity: 'medium',
      heroLayout: 'split',
      backgroundStyle: 'deep-space',
      showFallbackOnly: false,
    }),
  }).default({
    defaultTheme: 'dark',
    accentColor: 'emerald',
    backgroundStyle: 'deep-space',
    cardStyle: 'bordered',
    scene3d: {
      enabled: true,
      animate: true,
      motionIntensity: 'medium',
      quality: 'auto',
      glowIntensity: 'medium',
      orbitalSpeed: 1.0,
      particleDensity: 'medium',
      heroLayout: 'split',
      backgroundStyle: 'deep-space',
      showFallbackOnly: false,
    },
  }),
  metadata: z.object({
    title: z.string().min(1, 'Page title is required'),
    description: z.string().default(''),
    canonicalUrl: safeUrlSchema.optional().default(''),
    ogImage: safeUrlSchema.optional().default(''),
    author: z.string().optional().default(''),
    twitterHandle: z.string().optional().default(''),
    robots: z.string().optional().default('index, follow'),
  }),
  privacy: z.object({
    showGpg: z.boolean().optional().default(true),
    allowSearch: z.boolean().optional().default(true),
    showPoweredBy: z.boolean().optional().default(true),
  }).default({
    showGpg: true,
    allowSearch: true,
    showPoweredBy: true,
  }),
});

export const DEFAULT_PROFILE: ProfileData = {
  schemaVersion: 1,
  profile: {
    name: "Ashish Singh Bora",
    headline: "Systems & Security Engineer • Open Source Architect",
    bio: "Building high-assurance distributed systems, cryptographic tooling, and privacy-preserving infrastructure. Dedicated to open-source resilience and minimalist software craftsmanship.",
    avatar: "",
    initialsFallback: "AB",
    location: "Bengaluru, India • UTC+5:30",
    availability: {
      status: "available",
      label: "Available for Architecture & Security Consulting",
    },
    email: "ashishsinghbora@users.noreply.github.com",
    website: "https://github.com/ashishsinghbora",
    gpgFingerprint: "9F8B 32C1 4A5D 7E6F 1B2C 3D4E 5F6A 7B8C 9D0E 1F2A",
  },
  socials: [
    {
      id: "soc-github",
      platform: "github",
      label: "GitHub",
      url: "https://github.com/ashishsinghbora",
      username: "@ashishsinghbora",
      icon: "github",
      order: 1,
      enabled: true,
    },
    {
      id: "soc-x",
      platform: "x",
      label: "X (Twitter)",
      url: "https://x.com",
      username: "@ashishsinghbora",
      icon: "x",
      order: 2,
      enabled: true,
    },
    {
      id: "soc-linkedin",
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com",
      username: "ashishsinghbora",
      icon: "linkedin",
      order: 3,
      enabled: true,
    },
    {
      id: "soc-bluesky",
      platform: "bluesky",
      label: "Bluesky",
      url: "https://bsky.app",
      username: "@ashishsinghbora.bsky.social",
      icon: "bluesky",
      order: 4,
      enabled: true,
    },
  ],
  collections: [
    {
      id: "col-core",
      title: "Core Work & Identity",
      description: "Primary repositories, technical foundations, and published tools.",
      icon: "terminal",
      order: 1,
      enabled: true,
      items: [
        {
          id: "lnk-linkvault-repo",
          title: "LinkVault Repository",
          description: "Privacy-first personal digital signal deck with zero-trust local Studio.",
          url: "https://github.com/ashishsinghbora/LinkVault",
          icon: "shield-check",
          badge: "v1.0 • NEW",
          featured: true,
          order: 1,
          enabled: true,
        },
        {
          id: "lnk-gh-repos",
          title: "Open Source Codebase",
          description: "Distributed protocols, security scanners, and systems development.",
          url: "https://github.com/ashishsinghbora?tab=repositories",
          icon: "code-2",
          badge: "Active",
          featured: true,
          order: 2,
          enabled: true,
        },
        {
          id: "lnk-gpg-keys",
          title: "GPG Public Key & Keybase",
          description: "Cryptographic identity verification and signed release keys.",
          url: "https://github.com/ashishsinghbora.gpg",
          icon: "key",
          badge: "SECURE",
          featured: false,
          order: 3,
          enabled: true,
        },
      ],
    },
    {
      id: "col-research",
      title: "Research & Technical Publications",
      description: "Whitepapers, architecture RFCs, and engineering deep-dives.",
      icon: "file-text",
      order: 2,
      enabled: true,
      items: [
        {
          id: "lnk-res-easm",
          title: "Modern Attack Surface Monitoring (EASM)",
          description: "Taxonomy of external exposure surfaces and automated defense postures.",
          url: "https://github.com/ashishsinghbora",
          icon: "book-open",
          badge: "READ",
          featured: false,
          order: 1,
          enabled: true,
        },
        {
          id: "lnk-res-mailradar",
          title: "MailRadar Protocol Analysis",
          description: "Telemetry, deliverability tracing, and security verification heuristics.",
          url: "https://github.com/ashishsinghbora",
          icon: "newspaper",
          badge: "RFC",
          featured: false,
          order: 2,
          enabled: true,
        },
      ],
    },
  ],
  projects: [
    {
      id: "proj-linkvault",
      title: "LinkVault",
      description: "Privacy-first digital identity platform & signal deck. Self-hostable, zero-tracker, static GitHub Pages deployment with a private local visual Studio.",
      url: "https://github.com/ashishsinghbora/LinkVault",
      repoUrl: "https://github.com/ashishsinghbora/LinkVault",
      demoUrl: "https://ashishsinghbora.github.io/LinkVault",
      status: "Active",
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Zod", "Privacy"],
      icon: "shield",
      featured: true,
      order: 1,
      enabled: true,
    },
    {
      id: "proj-sentinel",
      title: "Sentinel EASM",
      description: "External attack surface discovery, asset inventory analysis, and continuous security intelligence pipeline.",
      url: "https://github.com/ashishsinghbora",
      repoUrl: "https://github.com/ashishsinghbora",
      demoUrl: "",
      status: "Active",
      tags: ["Go", "Distributed Systems", "Security", "Telemetry"],
      icon: "cpu",
      featured: true,
      order: 2,
      enabled: true,
    },
    {
      id: "proj-mailradar",
      title: "MailRadar",
      description: "High-performance email routing analytics, deliverability validation, and domain reputation telemetry.",
      url: "https://github.com/ashishsinghbora",
      repoUrl: "https://github.com/ashishsinghbora",
      demoUrl: "",
      status: "Maintained",
      tags: ["TypeScript", "DNS", "Security", "Analytics"],
      icon: "radio",
      featured: false,
      order: 3,
      enabled: true,
    },
  ],
  certifications: [],
  education: [],
  mediaSections: [],
  appearance: {
    defaultTheme: "dark",
    accentColor: "emerald",
    backgroundStyle: "deep-space",
    cardStyle: "bordered",
    scene3d: {
      enabled: true,
      animate: true,
      motionIntensity: "medium",
      quality: "auto",
      glowIntensity: "medium",
      orbitalSpeed: 1.0,
      particleDensity: "medium",
      heroLayout: "split",
      backgroundStyle: "deep-space",
      showFallbackOnly: false,
    },
  },
  metadata: {
    title: "Ashish Singh Bora | Digital Signal Deck",
    description: "Privacy-first digital identity, open-source systems, engineering research, and curated technical links.",
    canonicalUrl: "https://ashishsinghbora.github.io/LinkVault",
    ogImage: "/og-image.svg",
    author: "Ashish Singh Bora",
    twitterHandle: "@ashishsinghbora",
    robots: "index, follow",
  },
  privacy: {
    showGpg: true,
    allowSearch: true,
    showPoweredBy: true,
  },
};

export function validateProfile(data: unknown): { success: true; data: ProfileData } | { success: false; errors: string[] } {
  const result = ProfileDataSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data as ProfileData };
  }
  const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
  return { success: false, errors };
}

export function sanitizeProfileData(data: ProfileData): ProfileData {
  return {
    ...data,
    socials: (data.socials || [])
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order),
    collections: (data.collections || [])
      .filter((c) => c.enabled)
      .sort((a, b) => a.order - b.order)
      .map((c) => ({
        ...c,
        items: (c.items || [])
          .filter((item) => item.enabled)
          .sort((a, b) => a.order - b.order),
      })),
    projects: (data.projects || [])
      .filter((p) => p.enabled)
      .sort((a, b) => a.order - b.order),
    certifications: (data.certifications || [])
      .filter((c) => c.enabled)
      .sort((a, b) => a.order - b.order),
    education: (data.education || [])
      .filter((e) => e.enabled)
      .sort((a, b) => a.order - b.order),
    mediaSections: (data.mediaSections || [])
      .filter((m) => m.enabled)
      .sort((a, b) => a.order - b.order)
      .map((m) => ({
        ...m,
        videos: (m.videos || [])
          .filter((v) => v.enabled)
          .sort((a, b) => a.order - b.order),
      })),
  };
}
