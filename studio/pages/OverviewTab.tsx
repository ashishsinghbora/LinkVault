import React from 'react';
import {
  ShieldCheck,
  Share2,
  FolderTree,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import type { ProfileData } from '../../src/types/profile';
import type { StudioTab } from '../types';

interface OverviewTabProps {
  data: ProfileData;
  onNavigate: (tab: StudioTab) => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  data,
  onNavigate,
  onSave,
  hasUnsavedChanges,
}) => {
  // Calculate completion percentage
  const checks = [
    { label: 'Full Name configured', pass: !!data.profile.name },
    { label: 'Professional headline set', pass: !!data.profile.headline },
    { label: 'Bio / intro written', pass: !!data.profile.bio },
    { label: 'Location specified', pass: !!data.profile.location },
    { label: 'Availability status active', pass: !!data.profile.availability?.label },
    { label: 'Contact email configured', pass: !!data.profile.email },
    { label: 'Social links added (min 2)', pass: data.socials.length >= 2 },
    { label: 'Link collections created', pass: data.collections.length > 0 },
    { label: 'Showcase projects added', pass: data.projects.length > 0 },
    { label: 'SEO meta tags defined', pass: !!data.metadata.title && !!data.metadata.description },
  ];

  const passedCount = checks.filter((c) => c.pass).length;
  const healthPercent = Math.round((passedCount / checks.length) * 100);

  const totalLinks = data.collections.reduce((sum, c) => sum + (c.items?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-signal-900 to-signal-850 border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mint-500/10 text-mint-400 border border-mint-500/20 text-[10px] font-mono font-bold tracking-wider mb-2">
              SIGNAL DECK ACTIVE
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-signal-100">
              Welcome back, {data.profile.name || 'Operator'}
            </h1>
            <p className="text-xs sm:text-sm text-signal-400 mt-1 max-w-xl">
              Manage your personal digital identity, verified social footprints, open-source repositories, and technical link infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <button
                onClick={onSave}
                className="px-4 py-2 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-signal-glow animate-pulse"
              >
                Save Changes Now
              </button>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-signal-800 hover:bg-signal-750 text-signal-200 border border-white/10 text-xs font-mono transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('socials')}
          className="p-4 rounded-xl bg-signal-900 border border-white/10 hover:border-mint-500/30 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-signal-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Social Links</span>
            <Share2 className="w-4 h-4 text-mint-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-signal-100">
            {data.socials.length}
          </div>
          <span className="text-[10px] font-mono text-signal-500">
            {data.socials.filter((s) => s.enabled).length} active
          </span>
        </div>

        <div
          onClick={() => onNavigate('collections')}
          className="p-4 rounded-xl bg-signal-900 border border-white/10 hover:border-mint-500/30 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-signal-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Collections</span>
            <FolderTree className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-signal-100">
            {data.collections.length}
          </div>
          <span className="text-[10px] font-mono text-signal-500">
            {totalLinks} total links
          </span>
        </div>

        <div
          onClick={() => onNavigate('projects')}
          className="p-4 rounded-xl bg-signal-900 border border-white/10 hover:border-mint-500/30 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-signal-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Projects</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-signal-100">
            {data.projects.length}
          </div>
          <span className="text-[10px] font-mono text-signal-500">
            {data.projects.filter((p) => p.featured).length} featured
          </span>
        </div>

        <div
          onClick={() => onNavigate('identity')}
          className="p-4 rounded-xl bg-signal-900 border border-white/10 hover:border-mint-500/30 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-signal-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Health Score</span>
            <ShieldCheck className="w-4 h-4 text-mint-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-mint-400">
            {healthPercent}%
          </div>
          <span className="text-[10px] font-mono text-signal-500">
            {passedCount}/{checks.length} criteria met
          </span>
        </div>
      </div>

      {/* Profile Checklist */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-mono text-signal-200 uppercase tracking-wider">
            // PROFILE CONFIGURATION AUDIT
          </h2>
          <span className="text-xs font-mono text-mint-400 font-bold">
            {passedCount} OF {checks.length} COMPLETE
          </span>
        </div>

        <div className="w-full bg-signal-950 h-2 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-mint-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${healthPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {checks.map((chk, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-signal-950/60 border border-white/5 text-xs font-mono"
            >
              {chk.pass ? (
                <CheckCircle2 className="w-4 h-4 text-mint-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              )}
              <span className={chk.pass ? 'text-signal-300' : 'text-signal-500'}>
                {chk.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('identity')}
          className="p-4 rounded-xl bg-signal-900 hover:bg-signal-850 border border-white/10 text-left group transition-all"
        >
          <div className="flex items-center justify-between text-mint-400 mb-1">
            <span className="font-mono font-bold text-xs uppercase tracking-wider">
              1. Identity &amp; Bio
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-signal-400">
            Set your headline, bio, avatar, status, and GPG fingerprint.
          </p>
        </button>

        <button
          onClick={() => onNavigate('collections')}
          className="p-4 rounded-xl bg-signal-900 hover:bg-signal-850 border border-white/10 text-left group transition-all"
        >
          <div className="flex items-center justify-between text-cyan-400 mb-1">
            <span className="font-mono font-bold text-xs uppercase tracking-wider">
              2. Link Collections
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-signal-400">
            Group, organize, and reorder links into categorized directories.
          </p>
        </button>

        <button
          onClick={() => onNavigate('appearance')}
          className="p-4 rounded-xl bg-signal-900 hover:bg-signal-850 border border-white/10 text-left group transition-all"
        >
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="font-mono font-bold text-xs uppercase tracking-wider">
              3. Theme &amp; Accent
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-signal-400">
            Switch default color palette, accents, and technical background grid.
          </p>
        </button>
      </div>
    </div>
  );
};
