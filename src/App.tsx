import { useState, useEffect, useMemo } from 'react';
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
import { ContactSection } from './components/profile/ContactSection';
import { SearchBar } from './components/shared/SearchBar';
import { ShareModal } from './components/shared/ShareModal';
import { PrivacyModal } from './components/shared/PrivacyModal';

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
    profileData.appearance?.accentColor || 'mint',
    profileData.appearance?.backgroundStyle || 'technical-grid'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

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
      case 'technical-grid':
        return 'bg-grid-pattern dark:bg-grid-pattern light:bg-grid-pattern-light bg-grid-size';
      case 'dots':
        return 'bg-dots-pattern dark:bg-dots-pattern light:bg-dots-pattern-light bg-dots-size';
      case 'circuit':
        return 'bg-grid-pattern bg-[length:48px_48px]';
      case 'minimal':
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden bg-signal-950 dark:bg-signal-950 light:bg-slate-50 text-signal-100 dark:text-signal-100 light:text-slate-900 transition-colors duration-200 selection:bg-mint-500/30 selection:text-mint-300 ${getBackgroundClass()}`}>
      {/* Decorative Technical Top Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-mint-400 to-transparent opacity-80" />

      {/* Navigation Header */}
      <Navbar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setShareModalOpen(true)}
        brandTitle="LINKVAULT"
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* Profile Hero */}
        <ProfileHero
          profile={profileData.profile}
          socials={profileData.socials}
          onOpenShare={() => setShareModalOpen(true)}
        />

        {/* Global Search and Filter Bar */}
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Featured Transmissions (only show if not actively filtering) */}
        {!searchQuery && (
          <FeaturedSection
            featuredLinks={featuredLinks}
            featuredProjects={featuredProjects}
          />
        )}

        {/* Directory Collections */}
        <LinkCollections
          collections={profileData.collections}
          searchQuery={searchQuery}
        />

        {/* Systems & Open Source Projects */}
        <ProjectShowcase
          projects={profileData.projects}
          searchQuery={searchQuery}
        />

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
    </div>
  );
}

export default App;
