import React, { useState } from 'react';
import { Sun, Moon, Laptop, Share2, Menu, X, Terminal } from 'lucide-react';
import type { ThemeMode } from '../../types/profile';

interface NavbarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenShare: () => void;
  brandTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  onToggleTheme,
  onOpenShare,
  brandTitle = 'LINKVAULT',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getThemeIcon = () => {
    if (themeMode === 'dark') return <Moon className="w-4 h-4 text-cyan-400" />;
    if (themeMode === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    return <Laptop className="w-4 h-4 text-mint-400" />;
  };

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-mint-500 focus:text-signal-950 focus:font-mono focus:font-bold focus:rounded-md focus:shadow-xl"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-signal-950/85 dark:bg-signal-950/85 light:bg-white/90 border-b border-white/10 dark:border-white/10 light:border-slate-200 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-mint-400 rounded-md p-1"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-signal-850 dark:bg-signal-850 light:bg-slate-100 border border-mint-500/30 group-hover:border-mint-400 transition-colors">
              <Terminal className="w-4 h-4 text-mint-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-mint-400 animate-signal-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-xs tracking-widest text-signal-100 dark:text-signal-100 light:text-slate-900 group-hover:text-mint-400 transition-colors">
                {brandTitle}
              </span>
              <span className="text-[9px] font-mono tracking-tight text-signal-400 uppercase -mt-0.5">
                v1.0 // SIGNAL DECK
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-signal-400">
            <a
              href="#signal-hero"
              className="hover:text-mint-400 transition-colors focus-visible:text-mint-400"
            >
              // HERO
            </a>
            <a
              href="#featured-section"
              className="hover:text-mint-400 transition-colors focus-visible:text-mint-400"
            >
              // FEATURED
            </a>
            <a
              href="#collections-section"
              className="hover:text-mint-400 transition-colors focus-visible:text-mint-400"
            >
              // COLLECTIONS
            </a>
            <a
              href="#projects-section"
              className="hover:text-mint-400 transition-colors focus-visible:text-mint-400"
            >
              // PROJECTS
            </a>
            <a
              href="#contact-section"
              className="hover:text-mint-400 transition-colors focus-visible:text-mint-400"
            >
              // CONTACT
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Current theme: ${themeMode}. Click to switch theme.`}
              title={`Theme: ${themeMode.toUpperCase()} (Click to toggle)`}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-signal-850 dark:bg-signal-850 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 hover:border-mint-500/50 transition-colors"
            >
              {getThemeIcon()}
            </button>

            {/* Share Profile Action */}
            <button
              onClick={onOpenShare}
              aria-label="Share digital signal card"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mint-500/10 hover:bg-mint-500/20 text-mint-400 border border-mint-500/30 text-xs font-mono font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SHARE</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-signal-850 dark:bg-signal-850 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-signal-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-signal-950 dark:bg-signal-950 light:bg-white px-4 py-3 space-y-2 font-mono text-xs animate-fadeIn">
            <a
              href="#signal-hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-mint-400"
            >
              // PROFILE HERO
            </a>
            <a
              href="#featured-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-mint-400"
            >
              // FEATURED LINKS
            </a>
            <a
              href="#collections-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-mint-400"
            >
              // LINK COLLECTIONS
            </a>
            <a
              href="#projects-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-mint-400"
            >
              // PROJECTS SHOWCASE
            </a>
            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-signal-300 hover:text-mint-400"
            >
              // CONTACT & KEYS
            </a>
          </div>
        )}
      </header>
    </>
  );
};
