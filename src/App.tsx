import { useState, useEffect, useMemo, useCallback } from 'react';
import profileDataRaw from './data/profile.json';
import { validateProfile, sanitizeProfileData, DEFAULT_PROFILE } from './lib/schema';
import type { ProfileData, LinkItem, ProjectItem } from './types/profile';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProfileHero } from './components/profile/ProfileHero';
import { FeaturedSection } from './components/links/FeaturedSection';
import { LinkCollections } from './components/links/LinkCollections';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { SkillsConstellation } from './components/skills/SkillsConstellation';
import { GitHubActivitySection } from './components/github/GitHubActivitySection';
import { MediaSection } from './components/media/MediaSection';
import { CertificationsSection } from './components/profile/CertificationsSection';
import { EducationSection } from './components/profile/EducationSection';
import { ContactSection } from './components/profile/ContactSection';
import { SearchBar } from './components/shared/SearchBar';
import { ShareModal } from './components/shared/ShareModal';
import { PrivacyModal } from './components/shared/PrivacyModal';
import { CommandPalette } from './components/shared/CommandPalette';
import { CustomCursor } from './components/shared/CustomCursor';

export function App() {
  // Validate and parse raw profile json safely
  const profileData: ProfileData = useMemo(() => {
    const validated = validateProfile(profileDataRaw);
    if (validated.success) {
      return sanitizeProfileData(validated.data);
    }
    console.warn('Profile JSON validation warnings, falling back to defaults:', validated.errors);
    return sanitizeProfileData(DEFAULT_PROFILE);
  }, []);

  const { themeMode, toggleTheme, background } = useTheme(
    profileData.appearance?.defaultTheme || 'dark',
    profileData.appearance?.accentColor || 'violet',
    profileData.appearance?.backgroundStyle || 'deep-space'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync document title and metadata
  useEffect(() => {
    if (profileData.metadata?.title) {
      document.title = profileData.metadata.title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && profileData.metadata?.description) {
      metaDesc.setAttribute('content', profileData.metadata.description);
    }
  }, [profileData.metadata]);

  // Extract all featured links across collections
  const featuredLinks: LinkItem[] = useMemo(() => {
    const list: LinkItem[] = [];
    profileData.collections.forEach((col) => {
      col.items.forEach((item) => {
        if (item.featured) {
          list.push(item);
        }
      });
    });
    return list.sort((a, b) => a.order - b.order);
  }, [profileData.collections]);

  // Extract featured projects
  const featuredProjects: ProjectItem[] = useMemo(() => {
    return profileData.projects
      .filter((p) => p.featured)
      .sort((a, b) => a.order - b.order);
  }, [profileData.projects]);

  // Background pattern CSS classes
  const getBackgroundClass = () => {
    switch (background) {
      case 'deep-space':
        return 'bg-void';
      case 'orbital-glow':
        return 'bg-void bg-radial-violet bg-no-repeat bg-[center_top_10%]';
      case 'technical-grid':
        return 'bg-grid-pattern dark:bg-grid-pattern light:bg-grid-pattern-light bg-grid-size';
      case 'dots':
        return 'bg-dots-pattern dark:bg-dots-pattern light:bg-dots-pattern-light bg-dots-size';
      case 'circuit':
        return 'bg-grid-pattern bg-[length:48px_48px]';
      case 'minimal':
      default:
        return 'bg-void';
    }
  };

  const handleOpenCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true);
  }, []);

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden bg-signal-950 dark:bg-signal-950 light:bg-slate-50 text-signal-100 dark:text-signal-100 light:text-slate-900 transition-colors duration-200 selection:bg-violet-deep selection:text-cyan-300 ${getBackgroundClass()}`}>
      {/* Decorative Technical Top Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-violet-electric to-transparent opacity-80" />

      {/* Navigation Header */}
      <Navbar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setShareModalOpen(true)}
        onOpenCommandPalette={handleOpenCommandPalette}
        brandTitle="LINKVAULT"
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* Profile Hero with 3D Digital Identity Core */}
        <ProfileHero
          profile={profileData.profile}
          socials={profileData.socials}
          sceneSettings={profileData.appearance?.scene3d}
          onOpenShare={() => setShareModalOpen(true)}
        />

        {/* Global Search and Filter Bar */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Featured Transmissions (only show if not actively filtering) */}
        {!searchQuery && (
          <FeaturedSection
            featuredLinks={featuredLinks}
            featuredProjects={featuredProjects}
          />
        )}

        {/* Systems & Open Source Projects */}
        <ProjectShowcase
          projects={profileData.projects}
          searchQuery={searchQuery}
        />

        {/* Interactive Skills Visualization Constellation */}
        {!searchQuery && <SkillsConstellation />}

        {/* GitHub Developer Activity & Repositories Telemetry */}
        {!searchQuery && <GitHubActivitySection />}

        {/* Media & YouTube Transmissions (Techie Ashish) */}
        {!searchQuery && profileData.mediaSections && profileData.mediaSections.length > 0 && (
          <MediaSection sections={profileData.mediaSections} />
        )}

        {/* Directory Collections (Core Links, Articles & Writing) */}
        <LinkCollections
          collections={profileData.collections}
          searchQuery={searchQuery}
        />

        {/* Certifications & Credentials */}
        {!searchQuery && profileData.certifications && profileData.certifications.length > 0 && (
          <CertificationsSection certifications={profileData.certifications} />
        )}

        {/* Education & Academic History */}
        {!searchQuery && profileData.education && profileData.education.length > 0 && (
          <EducationSection education={profileData.education} />
        )}

        {/* Direct Contact Channels */}
        <ContactSection
          profile={profileData.profile}
          showGpg={profileData.privacy?.showGpg}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        name={profileData.profile.name}
        showPoweredBy={profileData.privacy?.showPoweredBy}
      />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={profileData.profile.name}
        url={profileData.metadata?.canonicalUrl || ''}
      />

      {/* Privacy Architecture Dialog */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        profileData={profileData}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setShareModalOpen(true)}
      />

      {/* Desktop Custom Cursor */}
      <CustomCursor />
    </div>
  );
}

export default App;
