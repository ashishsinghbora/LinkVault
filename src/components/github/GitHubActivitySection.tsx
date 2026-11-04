import React from 'react';
import {
  GitCommit,
  GitPullRequest,
  Star,
  GitFork,
  ExternalLink,
  Activity,
  Calendar,
  Code2,
} from 'lucide-react';
import { BrandIcon } from '../shared/BrandIcon';
import fallbackActivityData from '../../data/github-activity.json';

export interface GitHubActivityData {
  username: string;
  profileUrl: string;
  lastUpdated: string;
  isFallback: boolean;
  repositories: Array<{
    name: string;
    fullName: string;
    description: string;
    url: string;
    language: string;
    stars: number;
    forks: number;
    updatedAt: string;
  }>;
  recentEvents: Array<{
    type: string;
    repo: string;
    message: string;
    timestamp: string;
  }>;
}

interface GitHubActivitySectionProps {
  activityData?: GitHubActivityData;
}

export const GitHubActivitySection: React.FC<GitHubActivitySectionProps> = ({
  activityData = fallbackActivityData as GitHubActivityData,
}) => {
  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python':
        return '#3572A5';
      case 'typescript':
        return '#3178C6';
      case 'javascript':
        return '#F7DF1E';
      case 'c':
      case 'c++':
        return '#F34B7D';
      case 'html':
        return '#E34C26';
      default:
        return '#A855F7';
    }
  };

  return (
    <section
      id="github-activity-section"
      aria-labelledby="github-activity-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
              OPEN SOURCE TELEMETRY // GITHUB
            </span>
          </div>
          <h2 id="github-activity-heading" className="text-2xl sm:text-3xl font-extrabold text-signal-100 tracking-tight">
            Developer Activity & Repositories
          </h2>
          <p className="text-xs sm:text-sm text-signal-400 mt-1 max-w-2xl font-sans">
            Verified public code repositories, commit logs, and systems engineering projects from @{activityData.username}.
          </p>
        </div>

        {/* GitHub Profile Action Link */}
        <a
          href={activityData.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-raised border border-white/10 hover:border-cyan-400/40 text-signal-100 font-mono text-xs transition-colors"
        >
          <BrandIcon name="github" className="w-4 h-4 text-cyan-400" size={16} />
          <span>View @{activityData.username}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Repositories Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-mono font-bold text-signal-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-violet-electric" />
              <span>Public Repositories</span>
            </span>
            <span className="text-[10px] font-mono text-signal-500">
              {activityData.repositories.length} ARCHIVED SNAPSHOTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activityData.repositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 rounded-xl bg-surface/80 hover:bg-surface-raised border border-white/5 hover:border-cyan-400/40 backdrop-blur-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-mono font-bold text-sm text-signal-100 group-hover:text-cyan-300 transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-signal-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-signal-400 line-clamp-2 leading-relaxed mb-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-signal-400">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 text-signal-300">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                        <span>{repo.stars}</span>
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-1 text-signal-300">
                        <GitFork className="w-3 h-3 text-signal-400" />
                        <span>{repo.forks}</span>
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Activity Log & Build Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-mono font-bold text-signal-300 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Telemetry & Commit Stream</span>
            </span>
            <span className="text-[10px] font-mono text-signal-500">
              BUILD-TIME
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-xl shadow-glass-card space-y-3">
            {activityData.recentEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div className="p-1.5 rounded-lg bg-surface-raised border border-white/5 text-violet-electric flex-shrink-0 mt-0.5">
                  {event.type === 'PushEvent' ? (
                    <GitCommit className="w-3.5 h-3.5" />
                  ) : (
                    <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-signal-200 truncate">
                      {event.repo.replace(`${activityData.username}/`, '')}
                    </span>
                    <span className="text-[9px] font-mono text-signal-500 flex items-center gap-1 flex-shrink-0">
                      <Calendar className="w-2.5 h-2.5" />
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-[11px] text-signal-400 leading-snug mt-0.5 line-clamp-2">
                    {event.message}
                  </p>
                </div>
              </div>
            ))}

            {/* Static Verification Notice */}
            <div className="pt-2 text-[10px] font-mono text-signal-500 border-t border-white/5 flex items-center justify-between">
              <span>Updated: {formatTimestamp(activityData.lastUpdated)}</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-signal-400 border border-white/10">
                Static Pages CI/CD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
