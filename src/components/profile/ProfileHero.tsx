import React, { useState } from 'react';
import {
  CheckCircle,
  ExternalLink,
  Share2,
  ArrowDownRight,
  FolderGit2,
} from 'lucide-react';
import type { ProfileData, Scene3DSettings } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';
import { BrandIcon } from '../shared/BrandIcon';
import { DynamicIdentityScene } from '../../scenes/DynamicIdentityScene';

interface ProfileHeroProps {
  profile: ProfileData['profile'];
  socials: ProfileData['socials'];
  sceneSettings?: Scene3DSettings;
  onOpenShare: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  profile,
  socials,
  sceneSettings,
  onOpenShare,
}) => {
  const [avatarError, setAvatarError] = useState(false);

  // Compute initials fallback
  const getInitials = () => {
    if (profile.initialsFallback) return profile.initialsFallback;
    const parts = (profile.name || '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (profile.name || 'AS').substring(0, 2).toUpperCase();
  };

  const handleNodeClick = (nodeId: string) => {
    switch (nodeId) {
      case 'github':
        window.open('https://github.com/ashishsinghbora', '_blank', 'noopener,noreferrer');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/ashishsinghbora/', '_blank', 'noopener,noreferrer');
        break;
      case 'projects': {
        const el = document.getElementById('projects-section');
        el?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'research': {
        const el = document.getElementById('collections-section');
        el?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'portfolio':
        window.open(profile.website || 'https://ashishsinghbora.github.io/Portfolio/', '_blank', 'noopener,noreferrer');
        break;
      case 'youtube': {
        const el = document.getElementById('media-heading-media-youtube');
        el?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
        break;
    }
  };

  return (
    <section
      id="signal-hero"
      aria-labelledby="profile-name"
      className="relative w-full pt-6 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Status Pill & Quick Share */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {profile.availability?.label && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-glow" />
              </span>
              <span className="text-[11px] font-mono tracking-tight text-signal-300">
                {profile.availability.label}
              </span>
            </div>
          )}

          <button
            onClick={onOpenShare}
            aria-label="Share profile"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/80 hover:bg-surface-raised border border-white/10 hover:border-emerald/40 text-xs font-mono text-signal-300 hover:text-signal-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-glow" />
            <span className="hidden sm:inline">Share Profile</span>
          </button>
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Identity, Statement, Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Identity Badge with avatar / monogram */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-surface-raised border border-emerald/30 shadow-glass-card flex-shrink-0">
                {profile.avatar && !avatarError ? (
                  <img
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface to-surface-raised">
                    <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-wider text-emerald-glow">
                      {getInitials()}
                    </span>
                  </div>
                )}
                {/* Corner tech ticks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-glow pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-violet-lavender pointer-events-none" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1
                    id="profile-name"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-signal-100"
                  >
                    {profile.name}
                  </h1>
                  <CheckCircle className="w-4 h-4 text-emerald-glow" aria-label="Verified" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-signal-400 mt-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-emerald/10 text-emerald-light border border-emerald/20 text-[10px]">
                    SYS_ACTIVE
                  </span>
                  <span>Uttarakhand Technical University</span>
                </div>
              </div>
            </div>

            {/* Oversized Headline */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-signal-100 leading-[1.12]">
                {profile.headline ? (
                  profile.headline
                ) : (
                  <>
                    Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-glow via-emerald-light to-violet-lavender">digital frontier.</span>
                  </>
                )}
              </h2>
              {profile.bio && (
                <p className="text-sm sm:text-base text-signal-400 leading-relaxed font-sans max-w-xl pt-1">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-2">
              <a
                href="https://github.com/ashishsinghbora"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald hover:bg-emerald-glow text-void font-mono text-xs font-bold transition-all shadow-signal-glow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-glow"
              >
                <BrandIcon name="github" className="w-4 h-4" size={16} />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://www.linkedin.com/in/ashishsinghbora/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-white/10 hover:border-violet-lavender/40 text-signal-100 font-mono text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-violet-lavender"
              >
                <BrandIcon name="linkedin" className="w-4 h-4 text-violet-lavender" size={16} />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="#projects-section"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-raised/70 hover:bg-surface-raised border border-white/5 hover:border-white/20 text-signal-300 hover:text-signal-100 font-mono text-xs transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-glow" />
                <span>Explore Projects</span>
                <ArrowDownRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Technical Focus Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Systems Engineering',
                'Linux',
                'Computer Vision',
                'AI/ML',
                'Distributed Protocols',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-surface border border-white/5 text-[11px] font-mono text-signal-400 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Socials Icon Row */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono text-signal-500 uppercase tracking-widest mr-1">
                RADIAL_LINKS:
              </span>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={`${social.label} (${social.username || ''})`}
                  className="p-2 rounded-lg bg-surface hover:bg-surface-raised border border-white/10 hover:border-emerald/40 text-signal-400 hover:text-emerald-glow transition-all"
                >
                  <IconRenderer name={social.icon || social.platform} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Digital Identity Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* The 3D Canvas / Fallback */}
            <div className="w-full relative">
              <DynamicIdentityScene
                settings={sceneSettings}
                onNodeClick={handleNodeClick}
              />
            </div>

            {/* Accessible Destination Nodes Bar */}
            <div className="w-full mt-2 grid grid-cols-3 gap-2 px-1">
              <a
                href="https://github.com/ashishsinghbora"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-emerald/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-glow group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">GitHub</div>
                  <div className="text-[9px] font-mono text-signal-500">Repositories</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ashishsinghbora/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-violet-lavender/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-violet-lavender group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">LinkedIn</div>
                  <div className="text-[9px] font-mono text-signal-500">Network</div>
                </div>
              </a>

              <a
                href="#projects-section"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-emerald/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-emerald group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">Projects</div>
                  <div className="text-[9px] font-mono text-signal-500">ETS · ARL</div>
                </div>
              </a>

              <a
                href="#collections-section"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-violet-lavender/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-violet-glow group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">Research</div>
                  <div className="text-[9px] font-mono text-signal-500">Writing</div>
                </div>
              </a>

              <a
                href="#media-heading-media-youtube"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-rose-400/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">YouTube</div>
                  <div className="text-[9px] font-mono text-signal-500">Techie Ashish</div>
                </div>
              </a>

              <a
                href={profile.website || 'https://ashishsinghbora.github.io/Portfolio/'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-cyan-400/40 transition-all text-left"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-signal-200 truncate">Portfolio</div>
                  <div className="text-[9px] font-mono text-signal-500">Interactive</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
