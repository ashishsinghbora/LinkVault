import React from 'react';
import {
  Terminal,
  Code2,
  Shield,
  ShieldCheck,
  Cpu,
  Radio,
  FileText,
  BookOpen,
  Key,
  Box,
  Globe,
  Mail,
  Link as LinkIcon,
  Folder,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Search,
  Lock,
  Server,
  Zap,
  Sparkles,
  Eye,
  Layers,
  Compass,
  GitFork,
  Star,
  Hash,
  Bookmark,
  Newspaper,
  Send,
  Database,
  Cloud,
  Layers3,
  Monitor,
  Flame,
  Activity,
  User,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Home,
  Rss,
  PenTool,
  Package,
  Tag,
} from 'lucide-react';
import { BrandIcon } from './BrandIcon';

interface IconRendererProps {
  name?: string;
  className?: string;
  size?: number;
}

const LUCIDE_ICONS: Record<string, React.ElementType> = {
  terminal: Terminal,
  'code-2': Code2,
  code: Code2,
  shield: Shield,
  'shield-check': ShieldCheck,
  cpu: Cpu,
  radio: Radio,
  'file-text': FileText,
  'book-open': BookOpen,
  key: Key,
  box: Box,
  globe: Globe,
  mail: Mail,
  email: Mail,
  link: LinkIcon,
  folder: Folder,
  'external-link': ExternalLink,
  share: Share2,
  'share-2': Share2,
  copy: Copy,
  check: Check,
  search: Search,
  lock: Lock,
  server: Server,
  zap: Zap,
  sparkles: Sparkles,
  eye: Eye,
  layers: Layers,
  compass: Compass,
  'git-fork': GitFork,
  star: Star,
  hash: Hash,
  bookmark: Bookmark,
  newspaper: Newspaper,
  send: Send,
  database: Database,
  cloud: Cloud,
  'layers-3': Layers3,
  monitor: Monitor,
  flame: Flame,
  activity: Activity,
  user: User,
  'map-pin': MapPin,
  clock: Clock,
  'arrow-up-right': ArrowUpRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'layout-dashboard': LayoutDashboard,
  home: Home,
  rss: Rss,
  'pen-tool': PenTool,
  package: Package,
  tag: Tag,
};

export const IconRenderer: React.FC<IconRendererProps> = ({
  name = 'link',
  className = 'w-5 h-5',
  size = 20,
}) => {
  const normalized = (name || 'link').toLowerCase().trim();

  // Try brand icon first
  const brandSvg = <BrandIcon name={normalized} className={className} size={size} />;
  if (
    ['github', 'x', 'twitter', 'linkedin', 'bluesky', 'mastodon', 'discord', 'telegram', 'youtube'].includes(
      normalized
    )
  ) {
    return brandSvg;
  }

  // Try Lucide icon
  const LucideComp = LUCIDE_ICONS[normalized];
  if (LucideComp) {
    return <LucideComp className={className} size={size} aria-hidden="true" />;
  }

  // Fallback to Link icon
  return <LinkIcon className={className} size={size} aria-hidden="true" />;
};
