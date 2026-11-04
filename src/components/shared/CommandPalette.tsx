import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Search,
  ExternalLink,
  FolderGit2,
  Bookmark,
  Share2,
  Sun,
  Moon,
  Copy,
  Check,
  X,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { ProfileData, ThemeMode } from '../../types/profile';
import { BrandIcon } from './BrandIcon';

export interface CommandItem {
  id: string;
  category: 'Sections' | 'Projects' | 'Socials' | 'Articles' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  keywords?: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenShare: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  profileData,
  themeMode,
  onToggleTheme,
  onOpenShare,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Copy canonical link action
  const handleCopyLink = useCallback(async () => {
    try {
      const url = profileData.metadata?.canonicalUrl || window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onClose();
    } catch {
      // ignore
    }
  }, [profileData.metadata?.canonicalUrl, onClose]);

  // Navigate to element
  const scrollTo = useCallback(
    (elementId: string) => {
      onClose();
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try {
          window.history.pushState(null, '', `#${elementId}`);
        } catch {
          // ignore
        }
      }
    },
    [onClose]
  );

  // Build searchable items catalogue
  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      // Sections
      {
        id: 'sec-hero',
        category: 'Sections',
        title: 'Identity Core',
        subtitle: 'Hero introduction & 3D spatial observatory',
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        keywords: ['hero', 'identity', 'home', 'top', '3d'],
        action: () => scrollTo('signal-hero'),
      },
      {
        id: 'sec-projects',
        category: 'Sections',
        title: 'Engineering Projects',
        subtitle: 'ETS, Samanvaya, EDA-Agent, ARL, LinkVault',
        icon: <FolderGit2 className="w-4 h-4 text-violet-electric" />,
        keywords: ['projects', 'code', 'repos', 'ets', 'software'],
        action: () => scrollTo('projects-section'),
      },
      {
        id: 'sec-skills',
        category: 'Sections',
        title: 'Skills & Competencies',
        subtitle: 'Verified systems, programming, and AI domain map',
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        keywords: ['skills', 'technologies', 'linux', 'python', 'vision', 'ml'],
        action: () => scrollTo('skills-section'),
      },
      {
        id: 'sec-github',
        category: 'Sections',
        title: 'Developer Activity',
        subtitle: 'GitHub live repository telemetry & commit stream',
        icon: <BrandIcon name="github" className="w-4 h-4 text-signal-100" size={16} />,
        keywords: ['github', 'activity', 'commits', 'telemetry', 'open source'],
        action: () => scrollTo('github-activity-section'),
      },
      {
        id: 'sec-media',
        category: 'Sections',
        title: 'Media Laboratory',
        subtitle: 'Techie Ashish hardware restoration broadcasts',
        icon: <BrandIcon name="youtube" className="w-4 h-4 text-red-500" size={16} />,
        keywords: ['youtube', 'videos', 'techie ashish', 'hardware', 'laptop repair'],
        action: () => scrollTo('media-section'),
      },
      {
        id: 'sec-collections',
        category: 'Sections',
        title: 'Writing & Insights',
        subtitle: 'Articles on blockchain, AI, OSINT, and dev tools',
        icon: <Bookmark className="w-4 h-4 text-violet-electric" />,
        keywords: ['articles', 'writing', 'posts', 'osint', 'blockchain'],
        action: () => scrollTo('collections-section'),
      },
      {
        id: 'sec-credentials',
        category: 'Sections',
        title: 'Education & Credentials',
        subtitle: 'Uttarakhand Technical University, NISM, Google GenAI',
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        keywords: ['education', 'degree', 'certifications', 'utu', 'btech'],
        action: () => scrollTo('credentials-section'),
      },
      {
        id: 'sec-contact',
        category: 'Sections',
        title: 'Contact & Collaboration',
        subtitle: 'Direct email, verified socials, and network presence',
        icon: <Share2 className="w-4 h-4 text-emerald" />,
        keywords: ['contact', 'email', 'network', 'collaborate', 'message'],
        action: () => scrollTo('contact-section'),
      },

      // Quick Actions
      {
        id: 'act-theme',
        category: 'Actions',
        title: `Switch Theme (Current: ${themeMode.toUpperCase()})`,
        subtitle: 'Toggle dark or light observatory aesthetic',
        icon: themeMode === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />,
        keywords: ['theme', 'dark', 'light', 'mode', 'color', 'toggle'],
        action: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'act-share',
        category: 'Actions',
        title: 'Share Profile Signal',
        subtitle: 'Open QR code modal and link transmitter',
        icon: <Share2 className="w-4 h-4 text-cyan-400" />,
        keywords: ['share', 'qr', 'link', 'transmitter', 'copy'],
        action: () => {
          onClose();
          onOpenShare();
        },
      },
      {
        id: 'act-copy',
        category: 'Actions',
        title: 'Copy Profile URL',
        subtitle: 'Copy memorable URL to system clipboard',
        icon: copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-signal-400" />,
        keywords: ['copy', 'clipboard', 'url', 'address'],
        action: handleCopyLink,
      },
    ];

    // Add Projects
    profileData.projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        category: 'Projects',
        title: proj.title,
        subtitle: proj.description,
        icon: <FolderGit2 className="w-4 h-4 text-violet-electric" />,
        keywords: [proj.title, ...proj.tags, proj.status],
        action: () => {
          onClose();
          if (proj.repoUrl) {
            window.open(proj.repoUrl, '_blank', 'noopener,noreferrer');
          } else {
            scrollTo('projects-section');
          }
        },
      });
    });

    // Add Socials
    profileData.socials.forEach((soc) => {
      items.push({
        id: `soc-${soc.id}`,
        category: 'Socials',
        title: `${soc.label} (${soc.username || '@ashishsinghbora'})`,
        subtitle: soc.url,
        icon: <BrandIcon name={soc.icon || soc.platform} className="w-4 h-4 text-cyan-400" size={16} />,
        keywords: [soc.label, soc.platform, soc.username || ''],
        action: () => {
          onClose();
          window.open(soc.url, '_blank', 'noopener,noreferrer');
        },
      });
    });

    // Add Articles
    profileData.collections.forEach((col) => {
      col.items.forEach((item) => {
        items.push({
          id: `art-${item.id}`,
          category: 'Articles',
          title: item.title,
          subtitle: item.description || col.title,
          icon: <Bookmark className="w-4 h-4 text-signal-300" />,
          keywords: [item.title, item.badge || '', col.title],
          action: () => {
            onClose();
            window.open(item.url, '_blank', 'noopener,noreferrer');
          },
        });
      });
    });

    return items;
  }, [profileData, themeMode, onToggleTheme, onOpenShare, handleCopyLink, scrollTo, copied, onClose]);

  // Filter items based on user query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.subtitle?.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query, allItems]);

  // Reset selectedIndex when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-void/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="LinkVault Command Palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-surface/95 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections, projects, writing..."
            className="w-full bg-transparent text-sm text-signal-100 placeholder-signal-500 font-sans focus:outline-none"
            aria-autocomplete="list"
            aria-controls="command-palette-results"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-signal-500 hover:text-signal-300 transition-colors ml-2"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y-0"
        >
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs font-mono text-signal-500">
              No matching commands or destinations found for &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-violet-deep text-white shadow-signal-glow'
                      : 'hover:bg-surface-raised text-signal-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                        isSelected ? 'bg-white/10' : 'bg-surface-raised border border-white/5'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs truncate text-signal-100">{item.title}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-signal-500'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-signal-400'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                    {item.category === 'Projects' || item.category === 'Socials' || item.category === 'Articles' ? (
                      <ExternalLink className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-signal-500'}`} />
                    ) : (
                      <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-300' : 'text-signal-500'}`} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 border-t border-white/10 bg-surface-raised/60 flex items-center justify-between text-[10px] font-mono text-signal-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>{filteredItems.length} destinations</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
