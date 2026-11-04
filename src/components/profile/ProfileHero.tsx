import React, { useState } from 'react';
import { MapPin, Mail, Share2, CheckCircle } from 'lucide-react';
import type { ProfileData } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';

interface ProfileHeroProps {
  profile: ProfileData['profile'];
  socials: ProfileData['socials'];
  onOpenShare: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ profile, socials, onOpenShare }) => {
  const [avatarError, setAvatarError] = useState(false);

  // Compute initials fallback
  const getInitials = () => {
    if (profile.initialsFallback) return profile.initialsFallback;
    const parts = (profile.name || '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (profile.name || 'LV').substring(0, 2).toUpperCase();
  };


  return (
    <section
      id="signal-hero"
      aria-labelledby="profile-name"
      className="relative w-full pt-8 pb-10 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        {profile.availability?.label && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full max-w-full bg-signal-850 dark:bg-signal-850 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 shadow-sm animate-fadeIn text-center">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  profile.availability.status === 'busy' ? 'bg-amber-400' : 'bg-mint-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  profile.availability.status === 'busy' ? 'bg-amber-400' : 'bg-mint-400'
                }`}
              />
            </span>
            <span className="text-[11px] font-mono tracking-tight text-signal-300 dark:text-signal-300 light:text-slate-700 truncate sm:whitespace-normal">
              {profile.availability.label}
            </span>
          </div>
        )}

        {/* Avatar with technical frame */}
        <div className="relative mb-5 group">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-signal-850 dark:bg-signal-850 light:bg-slate-200 border-2 border-mint-500/30 group-hover:border-mint-400 shadow-signal-card transition-all duration-300">
            {profile.avatar && !avatarError ? (
              <img
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-signal-800 to-signal-900 dark:from-signal-800 dark:to-signal-900 light:from-slate-100 light:to-slate-200">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-wider text-mint-400 dark:text-mint-400 light:text-emerald-700">
                  {getInitials()}
                </span>
                <span className="text-[10px] font-mono text-signal-400 tracking-widest mt-1">
                  SYS_ID
                </span>
              </div>
            )}
          </div>

          {/* Technical Corner Alignment Ticks */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-mint-400 pointer-events-none" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-mint-400 pointer-events-none" />
        </div>

        {/* Identity & Headline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2">
            <h1
              id="profile-name"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-signal-100 dark:text-signal-100 light:text-slate-900"
            >
              {profile.name}
            </h1>
            <span
              title="Verified Cryptographic Signal"
              className="text-mint-400 p-0.5 rounded-full"
            >
              <CheckCircle className="w-5 h-5 fill-mint-500/20 text-mint-400" />
            </span>
          </div>

          {profile.headline && (
            <p className="text-sm sm:text-base font-mono text-mint-400 dark:text-mint-400 light:text-emerald-700 max-w-xl mx-auto">
              {profile.headline}
            </p>
          )}

          {profile.location && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-signal-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-signal-500" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm sm:text-base text-signal-300 dark:text-signal-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            {profile.bio}
          </p>
        )}

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-signal-glow hover:scale-[1.02] active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            Share Profile
          </button>

          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-signal-850 dark:bg-signal-850 light:bg-slate-100 hover:bg-signal-800 text-signal-200 dark:text-signal-200 light:text-slate-800 border border-white/10 dark:border-white/10 light:border-slate-300 font-mono text-xs font-medium uppercase tracking-wider transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              Direct Message
            </a>
          )}
        </div>

        {/* Social Icons Strip (Touch friendly, >=44px touch targets) */}
        {socials && socials.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.label} profile: ${social.username || social.url}`}
                title={`${social.label} ${social.username ? `(${social.username})` : ''}`}
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-signal-850 dark:bg-signal-850 light:bg-white text-signal-300 dark:text-signal-300 light:text-slate-700 hover:text-mint-400 hover:border-mint-400/50 border border-white/10 dark:border-white/10 light:border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <IconRenderer name={social.icon || social.platform} size={20} />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
