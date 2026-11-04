/**
 * src/scenes/spatialNodes.ts
 * Lightweight spatial navigation node definitions.
 * Separated from Three.js scene to allow lazy-loading of 3D dependencies without bundling Three.js into the main bundle.
 */

export interface SpatialNodeDef {
  id: string;
  label: string;
  targetId: string;
  description: string;
  colorHex: string;
  threeColor: number;
  radius: number;
  speed: number;
  phase: number;
  tiltX: number;
  tiltZ: number;
}

export const SPATIAL_NODES: SpatialNodeDef[] = [
  {
    id: 'identity',
    label: 'Identity Core',
    targetId: 'signal-hero',
    description: 'Engineering identity, systems focus, and active availability.',
    colorHex: '#A855F7',
    threeColor: 0xa855f7,
    radius: 2.2,
    speed: 0.65,
    phase: 0.0,
    tiltX: Math.PI * 0.28,
    tiltZ: 0,
  },
  {
    id: 'projects',
    label: 'Engineering Projects',
    targetId: 'projects-section',
    description: 'ETS Encrypted Storage, Samanvaya Vision, and EDA-Agent.',
    colorHex: '#22D3EE',
    threeColor: 0x22d3ee,
    radius: 2.2,
    speed: 0.65,
    phase: Math.PI,
    tiltX: Math.PI * 0.28,
    tiltZ: 0,
  },
  {
    id: 'research',
    label: 'Research & Writing',
    targetId: 'collections-section',
    description: 'Planetary computer vision, OSINT tools, and technical publications.',
    colorHex: '#8B5CF6',
    threeColor: 0x8b5cf6,
    radius: 2.95,
    speed: -0.52,
    phase: 0.7,
    tiltX: -Math.PI * 0.24,
    tiltZ: Math.PI * 0.2,
  },
  {
    id: 'activity',
    label: 'Developer Activity',
    targetId: 'github-activity-section',
    description: 'Real-time repository commits, activity streams, and open-source telemetry.',
    colorHex: '#67E8F9',
    threeColor: 0x67e8f9,
    radius: 2.95,
    speed: -0.52,
    phase: 0.7 + Math.PI,
    tiltX: -Math.PI * 0.24,
    tiltZ: Math.PI * 0.2,
  },
  {
    id: 'media',
    label: 'Media Laboratory',
    targetId: 'media-section',
    description: 'Techie Ashish YouTube channel: Hardware repair and Linux experiments.',
    colorHex: '#F43F5E',
    threeColor: 0xf43f5e,
    radius: 3.65,
    speed: 0.4,
    phase: 1.3,
    tiltX: Math.PI * 0.48,
    tiltZ: -Math.PI * 0.1,
  },
  {
    id: 'credentials',
    label: 'Education & Credentials',
    targetId: 'credentials-section',
    description: 'Uttarakhand Technical University CSE B.Tech, NISM & Google Cloud certs.',
    colorHex: '#FBBF24',
    threeColor: 0xfbbf24,
    radius: 3.65,
    speed: 0.4,
    phase: 1.3 + Math.PI,
    tiltX: Math.PI * 0.48,
    tiltZ: -Math.PI * 0.1,
  },
  {
    id: 'contact',
    label: 'Contact & Network',
    targetId: 'contact-section',
    description: 'Collaboration channels, verified socials, ORCID, and secure contact.',
    colorHex: '#34D399',
    threeColor: 0x34d399,
    radius: 4.15,
    speed: -0.32,
    phase: 2.1,
    tiltX: -Math.PI * 0.15,
    tiltZ: -Math.PI * 0.3,
  },
];
