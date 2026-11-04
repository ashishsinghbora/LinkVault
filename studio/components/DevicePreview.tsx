import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, RotateCcw } from 'lucide-react';
import type { PreviewDevice } from '../types';
import type { ProfileData } from '../../src/types/profile';
import { sanitizeProfileData } from '../../src/lib/schema';
import { ProfileHero } from '../../src/components/profile/ProfileHero';
import { FeaturedSection } from '../../src/components/links/FeaturedSection';
import { LinkCollections } from '../../src/components/links/LinkCollections';
import { ProjectShowcase } from '../../src/components/projects/ProjectShowcase';
import { MediaSection } from '../../src/components/media/MediaSection';
import { CertificationsSection } from '../../src/components/profile/CertificationsSection';
import { EducationSection } from '../../src/components/profile/EducationSection';
import { ContactSection } from '../../src/components/profile/ContactSection';
import { Navbar } from '../../src/components/layout/Navbar';
import { Footer } from '../../src/components/layout/Footer';

interface DevicePreviewProps {
  data: ProfileData;
}

export const DevicePreview: React.FC<DevicePreviewProps> = ({ data }) => {
  const [device, setDevice] = useState<PreviewDevice>('mobile');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [key, setKey] = useState(0);

  const cleanData = sanitizeProfileData(data);

  const featuredLinks = cleanData.collections.flatMap((c) =>
    c.items.filter((item) => item.featured)
  );
  const featuredProjects = cleanData.projects.filter((p) => p.featured);

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 'w-[390px] h-[800px]';
      case 'tablet':
        return 'w-[768px] h-[850px]';
      case 'desktop':
        return 'w-[1024px] h-[850px]';
      case 'full':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-signal-950/90 border-l border-white/10 overflow-hidden">
      {/* Top Preview Controls Bar */}
      <div className="h-12 px-4 bg-signal-900 border-b border-white/10 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-1 bg-signal-950 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setDevice('mobile')}
            aria-label="Mobile preview (390px)"
            title="Mobile (390px)"
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
              device === 'mobile'
                ? 'bg-mint-500/20 text-mint-400 font-semibold'
                : 'text-signal-400 hover:text-signal-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            aria-label="Tablet preview (768px)"
            title="Tablet (768px)"
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
              device === 'tablet'
                ? 'bg-mint-500/20 text-mint-400 font-semibold'
                : 'text-signal-400 hover:text-signal-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDevice('desktop')}
            aria-label="Desktop preview (1024px)"
            title="Desktop (1024px)"
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
              device === 'desktop'
                ? 'bg-mint-500/20 text-mint-400 font-semibold'
                : 'text-signal-400 hover:text-signal-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDevice('full')}
            aria-label="Full responsive preview"
            title="Full Width"
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
              device === 'full'
                ? 'bg-mint-500/20 text-mint-400 font-semibold'
                : 'text-signal-400 hover:text-signal-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fill</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
            className="px-2.5 py-1 rounded bg-signal-850 hover:bg-signal-800 border border-white/10 text-xs font-mono text-signal-300"
          >
            PREVIEW: {previewTheme.toUpperCase()}
          </button>

          {/* Force reload */}
          <button
            onClick={() => setKey((k) => k + 1)}
            aria-label="Reload preview"
            title="Reload Preview"
            className="p-1.5 rounded bg-signal-850 hover:bg-signal-800 border border-white/10 text-signal-400 hover:text-signal-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Viewport Frame */}
      <div className="flex-1 overflow-auto p-4 md:p-6 flex items-start justify-center bg-signal-950/60">
        <div
          key={key}
          className={`${getDeviceWidth()} transition-all duration-300 rounded-2xl overflow-y-auto border border-white/15 shadow-2xl ${
            previewTheme === 'dark' ? 'dark bg-signal-950 text-signal-100' : 'light bg-slate-50 text-slate-900'
          }`}
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Mock Preview Chrome */}
          <div className="sticky top-0 z-50 px-4 py-2 bg-signal-900/90 dark:bg-signal-900/90 light:bg-slate-200/90 border-b border-white/10 backdrop-blur-sm flex items-center justify-between text-[11px] font-mono text-signal-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-mint-500/80 inline-block" />
            </div>
            <span className="truncate max-w-[200px]">
              {cleanData.metadata?.canonicalUrl || 'http://127.0.0.1:5173/'}
            </span>
            <span className="text-[10px] text-mint-400 font-bold">LIVE_PREVIEW</span>
          </div>

          {/* Rendered Live Website */}
          <div className="relative">
            <Navbar
              themeMode={previewTheme}
              onToggleTheme={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
              onOpenShare={() => {}}
              brandTitle="LINKVAULT"
            />

            <ProfileHero
              profile={cleanData.profile}
              socials={cleanData.socials}
              onOpenShare={() => {}}
            />

            <FeaturedSection
              featuredLinks={featuredLinks}
              featuredProjects={featuredProjects}
            />

            <ProjectShowcase projects={cleanData.projects} />

            {cleanData.mediaSections && cleanData.mediaSections.length > 0 && (
              <MediaSection sections={cleanData.mediaSections} />
            )}

            <LinkCollections collections={cleanData.collections} />

            {cleanData.certifications && cleanData.certifications.length > 0 && (
              <CertificationsSection certifications={cleanData.certifications} />
            )}

            {cleanData.education && cleanData.education.length > 0 && (
              <EducationSection education={cleanData.education} />
            )}

            <ContactSection
              profile={cleanData.profile}
              showGpg={cleanData.privacy?.showGpg}
            />

            <Footer
              onOpenPrivacy={() => {}}
              name={cleanData.profile.name}
              showPoweredBy={cleanData.privacy?.showPoweredBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
