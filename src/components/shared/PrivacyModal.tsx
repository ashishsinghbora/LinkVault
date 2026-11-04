import React from 'react';
import { ShieldCheck, X, Lock, EyeOff, Server, HardDrive } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 bg-signal-900 dark:bg-signal-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl shadow-2xl text-signal-100 dark:text-signal-100 light:text-slate-900 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close privacy information dialog"
          className="absolute top-4 right-4 p-2 text-signal-400 hover:text-signal-100 dark:hover:text-white light:hover:text-slate-900 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="privacy-modal-title" className="text-xl font-bold font-mono tracking-tight">
              PRIVACY ARCHITECTURE
            </h2>
            <p className="text-xs text-signal-400">Zero telemetry • Static delivery • Verifiable code</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-signal-300 dark:text-signal-300 light:text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-lg bg-signal-950 dark:bg-signal-950 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-2 font-mono font-semibold text-mint-400 dark:text-mint-400 light:text-emerald-700 text-xs mb-1">
              <EyeOff className="w-4 h-4" /> ZERO TRACKING & NO COOKIES
            </div>
            <p className="text-xs text-signal-400">
              LinkVault does not execute Google Analytics, Meta Pixels, fingerprinting scripts, or third-party telemetry. No session cookies are issued to visitors.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-signal-950 dark:bg-signal-950 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-2 font-mono font-semibold text-mint-400 dark:text-mint-400 light:text-emerald-700 text-xs mb-1">
              <Server className="w-4 h-4" /> STATIC HOSTING COMPATIBILITY
            </div>
            <p className="text-xs text-signal-400">
              The public profile compiles to pure static HTML/CSS/JS deployed on GitHub Pages. There is no backend database capturing IP addresses or query logs.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-signal-950 dark:bg-signal-950 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-2 font-mono font-semibold text-mint-400 dark:text-mint-400 light:text-emerald-700 text-xs mb-1">
              <HardDrive className="w-4 h-4" /> LOCAL-FIRST STUDIO
            </div>
            <p className="text-xs text-signal-400">
              Profile configuration is managed through the local visual Studio which binds strictly to <code>127.0.0.1</code> during development. The Studio is excluded entirely from production builds.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-signal-950 dark:bg-signal-950 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-2 font-mono font-semibold text-mint-400 dark:text-mint-400 light:text-emerald-700 text-xs mb-1">
              <Lock className="w-4 h-4" /> SANITIZED EXTERNAL NAVIGATION
            </div>
            <p className="text-xs text-signal-400">
              All external links strictly enforce <code>rel=&quot;noopener noreferrer&quot;</code> to prevent tab-nabbing and preserve referrer isolation.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
