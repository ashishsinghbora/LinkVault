import React from 'react';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import type { LinkItem, ProjectItem } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';

interface FeaturedSectionProps {
  featuredLinks: LinkItem[];
  featuredProjects: ProjectItem[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredLinks,
  featuredProjects,
}) => {
  if (featuredLinks.length === 0 && featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="featured-section"
      aria-labelledby="featured-heading"
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-mint-500/10 text-mint-400 border border-mint-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2
          id="featured-heading"
          className="text-xs font-mono font-bold tracking-widest text-signal-400 uppercase"
        >
          // FEATURED TRANSMISSIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Featured Links */}
        {featuredLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-b from-signal-850 to-signal-900 dark:from-signal-850 dark:to-signal-900 light:from-white light:to-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-mint-400/60 dark:hover:border-mint-400/60 shadow-signal-card hover:shadow-signal-card-hover transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20 group-hover:scale-105 transition-transform">
                    <IconRenderer name={link.icon} size={18} />
                  </div>
                  <span className="font-semibold text-sm text-signal-100 dark:text-signal-100 light:text-slate-900 group-hover:text-mint-400 transition-colors">
                    {link.title}
                  </span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-mint-500/15 text-mint-400 border border-mint-500/30">
                    {link.badge}
                  </span>
                )}
              </div>

              {link.description && (
                <p className="text-xs text-signal-400 line-clamp-2 mt-1">
                  {link.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/5 dark:border-white/5 light:border-slate-100 text-[11px] font-mono text-signal-500 group-hover:text-mint-400 transition-colors">
              <span className="truncate max-w-[200px]">
                {link.url.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}

        {/* Featured Projects */}
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between p-4 rounded-xl bg-gradient-to-b from-signal-850 to-signal-900 dark:from-signal-850 dark:to-signal-900 light:from-white light:to-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/60 dark:hover:border-cyan-400/60 shadow-signal-card hover:shadow-cyan-glow transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    <IconRenderer name={project.icon || 'box'} size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-signal-100 dark:text-signal-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  {project.status}
                </span>
              </div>

              <p className="text-xs text-signal-400 line-clamp-2 mt-1">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-signal-950 dark:bg-signal-950 light:bg-slate-200 text-signal-300 dark:text-signal-300 light:text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-4 pt-2 border-t border-white/5 dark:border-white/5 light:border-slate-100">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-signal-400 hover:text-cyan-400 transition-colors"
                >
                  <IconRenderer name="github" size={14} />
                  <span>Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
