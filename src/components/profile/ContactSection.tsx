import React, { useState } from 'react';
import { Mail, Globe, Key, Copy, Check, Radio, Send } from 'lucide-react';
import type { ProfileData } from '../../types/profile';

interface ContactSectionProps {
  profile: ProfileData['profile'];
  showGpg?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, showGpg = true }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasContactInfo = profile.email || profile.website || (profile.gpgFingerprint && showGpg);

  if (!hasContactInfo) {
    return null;
  }

  const handleCopyGpg = () => {
    if (profile.gpgFingerprint) {
      navigator.clipboard.writeText(profile.gpgFingerprint);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-signal-800 text-signal-300 border border-white/10">
          <Radio className="w-4 h-4 text-cyan-400" />
        </div>
        <h2
          id="contact-heading"
          className="text-xs font-mono font-bold tracking-widest text-signal-400 uppercase"
        >
          // DIRECT COMMUNICATION CHANNELS
        </h2>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-signal-900 dark:bg-signal-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-signal-card space-y-4">
        {/* Email channel */}
        {profile.email && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-signal-850/70 dark:bg-signal-850/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-signal-400 uppercase tracking-wider block">
                  PRIMARY EMAIL
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium text-signal-200 dark:text-signal-200 light:text-slate-800 break-all select-all">
                  {profile.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-signal-300 text-xs font-mono transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-mint-400" />
                    <span className="text-mint-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-mint-500/20 hover:bg-mint-500/30 text-mint-400 text-xs font-mono font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose</span>
              </a>
            </div>
          </div>
        )}

        {/* Website */}
        {profile.website && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-signal-850/70 dark:bg-signal-850/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-signal-400 uppercase tracking-wider block">
                  PERSONAL DOMAIN
                </span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono font-medium text-signal-200 dark:text-signal-200 light:text-slate-800 hover:text-cyan-400 transition-colors"
                >
                  {profile.website}
                </a>
              </div>
            </div>

            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-signal-300 text-xs font-mono transition-colors self-end sm:self-center"
            >
              <span>Visit Site</span>
            </a>
          </div>
        )}

        {/* GPG Key */}
        {showGpg && profile.gpgFingerprint && (
          <div className="p-3.5 rounded-xl bg-signal-850/70 dark:bg-signal-850/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Key className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider">
                  CRYPTOGRAPHIC GPG FINGERPRINT
                </span>
              </div>
              <button
                onClick={handleCopyGpg}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-signal-300 text-[11px] font-mono transition-colors"
                title="Copy GPG fingerprint"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3 h-3 text-mint-400" />
                    <span className="text-mint-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded bg-signal-950 dark:bg-signal-950 light:bg-slate-100 border border-white/5 font-mono text-xs text-signal-300 dark:text-signal-300 light:text-slate-700 tracking-wider break-all select-all">
              {profile.gpgFingerprint}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
