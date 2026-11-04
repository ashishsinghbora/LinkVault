import React, { useState } from 'react';
import {
  CheckCircle,
  ExternalLink,
  Share2,
  FolderGit2,
} from 'lucide-react';
import type { ProfileData, Scene3DSettings } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';
import { BrandIcon } from '../shared/BrandIcon';
import { DynamicIdentityScene } from '../../scenes/DynamicIdentityScene';
import { SPATIAL_NODES } from '../../scenes/spatialNodes';

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

  // Initials fallback
  const getInitials = () => {
    if (profile.initialsFallback) return profile.initialsFallback;
    const parts = (profile.name || '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (profile.name || 'AB').substring(0, 2).toUpperCase();
  };

  const handleNodeClick = (nodeId: string) => {
    const node = SPATIAL_NODES.find((n) => n.id === nodeId);
    if (!node) return;

    const el = document.getElementById(node.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.pushState(null, '', `#${node.targetId}`);
      } catch {
        // ignore
      }
    }
  };

  return (
    <section
      id="signal-hero"
      aria-labelledby="profile-name"
      className="relative w-full pt-6 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting glows (Violet & Cyan Observatory aesthetic) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Status Pill & Quick Share */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {profile.availability?.label && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[11px] font-mono tracking-tight text-signal-300">
                {profile.availability.label}
              </span>
            </div>
          )}

          <button
            onClick={onOpenShare}
            aria-label="Share profile"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/80 hover:bg-surface-raised border border-white/10 hover:border-violet-electric/40 text-xs font-mono text-signal-300 hover:text-signal-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Share Profile</span>
          </button>
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Identity, Statement, Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Identity Badge with avatar / monogram */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-surface-raised border border-violet-electric/30 shadow-glass-card flex-shrink-0">
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
                    <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-wider text-cyan-400">
                      {getInitials()}
                    </span>
                  </div>
                )}
                {/* Corner tech ticks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-violet-electric pointer-events-none" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1
                    id="profile-name"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-signal-100"
                  >
                    {profile.name}
                  </h1>
                  <CheckCircle className="w-4 h-4 text-cyan-400" aria-label="Verified" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-signal-400 mt-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-violet-deep/20 text-violet-electric border border-violet-electric/30 text-[10px]">
                    SYS_ACTIVE
                  </span>
                  <span>Uttarakhand Technical University</span>
                </div>
              </div>
            </div>

            {/* Neo-Editorial Headline */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-signal-100 leading-[1.12]">
                {profile.headline ? (
                  profile.headline
                ) : (
                  <>
                    Curiosity builds <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-electric via-cyan-400 to-cyan-300">what comes next.</span>
                  </>
                )}
              </h2>
              {profile.bio && (
                <p className="text-sm sm:text-base text-signal-400 leading-relaxed font-sans max-w-xl pt-1">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-2">
              <a
                href="#projects-section"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-deep hover:bg-violet-electric text-white font-mono text-xs font-bold transition-all shadow-signal-glow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-electric"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>Explore Engineering</span>
              </a>

              <a
                href="https://github.com/ashishsinghbora"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-white/10 hover:border-cyan-400/40 text-signal-100 font-mono text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <BrandIcon name="github" className="w-4 h-4 text-cyan-400" size={16} />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/ashishsinghbora/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-white/10 hover:border-violet-electric/40 text-signal-100 font-mono text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-violet-electric"
              >
                <BrandIcon name="linkedin" className="w-4 h-4 text-violet-electric" size={16} />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Technical Focus Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Systems Engineering',
                'Linux & Caching',
                'Computer Vision',
                'AI/ML',
                'Hardware & EDA',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-surface border border-white/5 text-[11px] font-mono text-signal-400 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Socials Icon Row */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono text-signal-500 uppercase tracking-widest mr-1">
                IDENTITY_LINKS:
              </span>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={`${social.label} (${social.username || ''})`}
                  className="p-2 rounded-lg bg-surface hover:bg-surface-raised border border-white/10 hover:border-violet-electric/40 text-signal-400 hover:text-cyan-400 transition-all"
                >
                  <IconRenderer name={social.icon || social.platform} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Digital Observatory Core & Spatial Map */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* The 3D Canvas / Fallback */}
            <div className="w-full relative">
              <DynamicIdentityScene
                settings={sceneSettings}
                onNodeClick={handleNodeClick}
              />
            </div>

            {/* Accessible 7-Node Spatial Directory */}
            <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 px-1">
              {SPATIAL_NODES.map((node) => (
                <a
                  key={node.id}
                  href={`#${node.targetId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNodeClick(node.id);
                  }}
                  className="group flex items-center gap-2 p-2 rounded-lg bg-surface/70 hover:bg-surface-raised border border-white/5 hover:border-violet-electric/40 transition-all text-left"
                  title={node.description}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: node.colorHex }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono font-bold text-signal-200 truncate">
                      {node.label.split(' ')[0]}
                    </div>
                    <div className="text-[9px] font-mono text-signal-500 truncate">
                      {node.label.split(' ').slice(1).join(' ') || 'Section'}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
