export type AvailabilityStatus = 'available' | 'busy' | 'stealth' | 'custom';
export type ThemeMode = 'dark' | 'light' | 'system';
export type AccentColor = 'mint' | 'cyan' | 'emerald' | 'amber' | 'violet';
export type BackgroundStyle = 'technical-grid' | 'dots' | 'minimal' | 'circuit';
export type CardStyle = 'bordered' | 'technical' | 'minimal';

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  username?: string;
  icon?: string;
  order: number;
  enabled: boolean;
}

export interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  badge?: string;
  featured?: boolean;
  order: number;
  enabled: boolean;
  clicks?: number;
}

export interface LinkCollection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  collapsedByDefault?: boolean;
  order: number;
  enabled: boolean;
  items: LinkItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  repoUrl?: string;
  demoUrl?: string;
  status: 'Active' | 'Beta' | 'Maintained' | 'Archived' | 'RFC' | 'Research' | string;
  tags: string[];
  icon?: string;
  image?: string;
  featured?: boolean;
  order: number;
  enabled: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;        // e.g. "November 2025"
  credentialId?: string;
  credentialUrl?: string;    // only if a verified public URL exists
  icon?: string;
  order: number;
  enabled: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree?: string;
  field?: string;
  period: string;            // e.g. "2023–2027"
  description?: string;
  order: number;
  enabled: boolean;
}

export interface MediaVideo {
  id: string;
  title: string;
  url: string;               // full youtube watch URL
  videoId: string;           // YouTube video ID only (for thumbnail)
  description?: string;
  order: number;
  enabled: boolean;
}

export interface MediaSection {
  id: string;
  title: string;
  description?: string;
  channelUrl?: string;
  channelLabel?: string;
  videos: MediaVideo[];
  order: number;
  enabled: boolean;
}

export interface ProfileData {
  schemaVersion: number;
  profile: {
    name: string;
    headline: string;
    bio: string;
    avatar?: string;
    initialsFallback?: string;
    location?: string;
    availability?: {
      status: AvailabilityStatus;
      label: string;
    };
    email?: string;
    website?: string;
    gpgFingerprint?: string;
  };
  socials: SocialLink[];
  collections: LinkCollection[];
  projects: ProjectItem[];
  certifications?: CertificationItem[];
  education?: EducationItem[];
  mediaSections?: MediaSection[];
  appearance: {
    defaultTheme: ThemeMode;
    accentColor: AccentColor;
    backgroundStyle: BackgroundStyle;
    cardStyle?: CardStyle;
  };
  metadata: {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    author?: string;
    twitterHandle?: string;
    robots?: string;
  };
  privacy: {
    showGpg?: boolean;
    allowSearch?: boolean;
    showPoweredBy?: boolean;
  };
}
