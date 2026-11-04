import React from 'react';
import { Shield, GitFork, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  name: string;
  repoUrl?: string;
  showPoweredBy?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  name,
  repoUrl = 'https://github.com/ashishsinghbora/LinkVault',
  showPoweredBy = true,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-signal-950/90 dark:bg-signal-950/90 light:bg-slate-50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center space-y-6">
        {/* System telemetry bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1 rounded-full max-w-full bg-signal-850 dark:bg-signal-850 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 text-[11px] font-mono text-signal-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-mint-400 flex-shrink-0" />
          <span>STATUS: SIGNAL DEPLOYED</span>
          <span className="text-signal-600 hidden sm:inline">•</span>
          <span>STATIC &amp; UNTRACKED</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-signal-400">
          <button
            onClick={onOpenPrivacy}
            className="hover:text-mint-400 transition-colors flex items-center gap-1.5 focus-visible:text-mint-400"
          >
            <Shield className="w-3.5 h-3.5 text-mint-400" />
            Privacy Architecture
          </button>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-mint-400 transition-colors flex items-center gap-1.5 focus-visible:text-mint-400"
          >
            <GitFork className="w-3.5 h-3.5" />
            Fork on GitHub
          </a>

          <a
            href="data/profile.json"
            download="profile.json"
            className="hover:text-mint-400 transition-colors flex items-center gap-1.5 focus-visible:text-mint-400"
          >
            <FileCode className="w-3.5 h-3.5" />
            Export Profile JSON
          </a>
        </div>

        {/* Copyright and Attribution */}
        <div className="text-xs text-signal-500 font-mono space-y-1">
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          {showPoweredBy && (
            <p className="text-[11px]">
              Engineered with{' '}
              <a
                href="https://github.com/ashishsinghbora/LinkVault"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal-300 hover:text-mint-400 underline decoration-mint-500/30 transition-colors"
              >
                LinkVault
              </a>{' '}
              • Privacy-First Open Source Signal Deck
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};
