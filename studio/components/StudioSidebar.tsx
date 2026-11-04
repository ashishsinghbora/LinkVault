import React from 'react';
import {
  LayoutDashboard,
  User,
  Share2,
  FolderTree,
  Cpu,
  Palette,
  Globe,
  FileDown,
  Code2,
  Terminal,
  ExternalLink,
  Video,
  Award,
} from 'lucide-react';
import type { StudioTab } from '../types';
import type { ProfileData } from '../../src/types/profile';

interface StudioSidebarProps {
  activeTab: StudioTab;
  onSelectTab: (tab: StudioTab) => void;
  data: ProfileData;
  isApiConnected: boolean;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  activeTab,
  onSelectTab,
  data,
  isApiConnected,
}) => {
  const tabs = [
    { id: 'overview' as StudioTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'identity' as StudioTab, label: 'Identity & Bio', icon: User },
    {
      id: 'socials' as StudioTab,
      label: 'Social Links',
      icon: Share2,
      count: data.socials.length,
    },
    {
      id: 'collections' as StudioTab,
      label: 'Link Collections',
      icon: FolderTree,
      count: data.collections.reduce((sum, c) => sum + (c.items?.length || 0), 0),
    },
    {
      id: 'projects' as StudioTab,
      label: 'Projects',
      icon: Cpu,
      count: data.projects.length,
    },
    {
      id: 'media' as StudioTab,
      label: 'Media & YouTube',
      icon: Video,
      count: (data.mediaSections || []).reduce((sum, s) => sum + (s.videos?.length || 0), 0),
    },
    {
      id: 'credentials' as StudioTab,
      label: 'Certifications & Edu',
      icon: Award,
      count: (data.certifications?.length || 0) + (data.education?.length || 0),
    },
    { id: 'appearance' as StudioTab, label: 'Appearance & Theme', icon: Palette },
    { id: 'seo' as StudioTab, label: 'SEO & Metadata', icon: Globe },
    { id: 'export' as StudioTab, label: 'Export & Backup', icon: FileDown },
    { id: 'raw' as StudioTab, label: 'Raw JSON Editor', icon: Code2 },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-signal-950 border-r border-white/10 flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-signal-850 border border-mint-500/40">
            <Terminal className="w-4 h-4 text-mint-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
          </div>
          <div>
            <div className="font-mono font-bold text-xs tracking-wider text-signal-100 flex items-center gap-1.5">
              <span>LINKVAULT</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-mint-500/20 text-mint-400 font-mono">
                STUDIO
              </span>
            </div>
            <div className="text-[10px] font-mono text-signal-500">
              LOCAL VISUAL EDITOR
            </div>
          </div>
        </div>

        {/* Server status pill */}
        <div className="px-4 py-2 border-b border-white/5 bg-signal-900/40 flex items-center justify-between text-[11px] font-mono">
          <span className="text-signal-400">HOST: 127.0.0.1</span>
          <span
            className={`flex items-center gap-1 font-semibold ${
              isApiConnected ? 'text-mint-400' : 'text-amber-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isApiConnected ? 'bg-mint-400 animate-ping' : 'bg-amber-400'
              }`}
            />
            {isApiConnected ? 'API SYNCED' : 'READ-ONLY'}
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-mint-500/15 text-mint-400 border border-mint-500/30 font-semibold'
                    : 'text-signal-300 hover:text-signal-100 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-mint-400' : 'text-signal-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-mint-500/20 text-mint-300'
                        : 'bg-signal-850 text-signal-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer in sidebar */}
      <div className="p-4 border-t border-white/10 bg-signal-950/80 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-300 hover:text-mint-400 border border-white/10 text-xs font-mono transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Site</span>
        </a>

        <div className="text-[10px] font-mono text-signal-500 text-center">
          Security: Bound to loopback only
        </div>
      </div>
    </aside>
  );
};
