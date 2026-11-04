import React, { useState } from 'react';
import { Sun, Moon, Laptop, Share2, Menu, X, Terminal, Search, Command } from 'lucide-react';
import type { ThemeMode } from '../../types/profile';

interface NavbarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenShare: () => void;
  onOpenCommandPalette?: () => void;
  brandTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  onToggleTheme,
  onOpenShare,
  onOpenCommandPalette,
  brandTitle = 'LINKVAULT',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getThemeIcon = () => {
    if (themeMode === 'dark') return <Moon className="w-4 h-4 text-cyan-400" />;
    if (themeMode === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    return <Laptop className="w-4 h-4 text-violet-electric" />;
  };

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-electric focus:text-white focus:font-mono focus:font-bold focus:rounded-md focus:shadow-xl"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-signal-950/85 dark:bg-signal-950/85 light:bg-white/90 border-b border-white/10 dark:border-white/10 light:border-slate-200 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-violet-electric rounded-md p-1"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-surface-raised border border-violet-electric/40 group-hover:border-violet-electric transition-colors">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet-electric animate-signal-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-xs tracking-widest text-signal-100 dark:text-signal-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                {brandTitle}
              </span>
              <span className="text-[9px] font-mono tracking-tight text-signal-400 uppercase -mt-0.5">
                v2.0 // OBSERVATORY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Synchronized with 3D Spatial Nodes) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-mono tracking-wider text-signal-400">
            <a
              href="#signal-hero"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // HERO
            </a>
            <a
              href="#projects-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // PROJECTS
            </a>
            <a
              href="#skills-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // SKILLS
            </a>
            <a
              href="#github-activity-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // ACTIVITY
            </a>
            <a
              href="#media-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // MEDIA
            </a>
            <a
              href="#collections-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // WRITING
            </a>
            <a
              href="#contact-section"
              className="hover:text-cyan-400 transition-colors focus-visible:text-cyan-400"
            >
              // CONTACT
            </a>
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
                title="Command Palette (Ctrl+K / Cmd+K)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-raised border border-white/10 hover:border-violet-electric/40 text-signal-300 hover:text-signal-100 text-xs font-mono transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline text-[11px] text-signal-400">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-signal-400">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Current theme: ${themeMode}. Click to switch theme.`}
              title={`Theme: ${themeMode.toUpperCase()} (Click to toggle)`}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface hover:bg-surface-raised border border-white/10 hover:border-violet-electric/40 transition-colors"
            >
              {getThemeIcon()}
            </button>

            {/* Share Profile Action */}
            <button
              onClick={onOpenShare}
              aria-label="Share digital signal card"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-deep/20 hover:bg-violet-deep/30 text-violet-electric border border-violet-electric/30 hover:border-violet-electric/60 text-xs font-mono font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">SHARE</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-white/10 text-signal-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-surface/98 backdrop-blur-xl px-4 py-3 space-y-2 font-mono text-xs animate-fadeIn">
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-surface-raised border border-white/10 text-cyan-400 text-left mb-2"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Command Palette...</span>
                </span>
                <span className="text-[10px] text-signal-500">Ctrl+K</span>
              </button>
            )}
            <a
              href="#signal-hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // IDENTITY CORE
            </a>
            <a
              href="#projects-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // ENGINEERING PROJECTS
            </a>
            <a
              href="#skills-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // DOMAIN MAP &amp; SKILLS
            </a>
            <a
              href="#github-activity-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // DEVELOPER ACTIVITY
            </a>
            <a
              href="#media-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // MEDIA LABORATORY
            </a>
            <a
              href="#collections-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // WRITING &amp; INSIGHTS
            </a>
            <a
              href="#credentials-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // EDUCATION &amp; CREDENTIALS
            </a>
            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-cyan-400"
            >
              // CONTACT &amp; NETWORK
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
