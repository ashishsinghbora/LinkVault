import React from 'react';
import { Cpu, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  searchQuery?: string;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  searchQuery = '',
}) => {
  const query = searchQuery.toLowerCase().trim();

  const filteredProjects = projects.filter((project) => {
    if (!query) return true;
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(query))) ||
      (project.status && project.status.toLowerCase().includes(query))
    );
  });

  if (filteredProjects.length === 0) {
    return null;
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-mint-500/15 text-mint-400 border-mint-500/30';
      case 'beta':
      case 'research':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'maintained':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-signal-700 text-signal-300 border-signal-600';
    }
  };

  return (
    <section
      id="projects-section"
      aria-labelledby="projects-heading"
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-10 space-y-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-signal-800 text-signal-300 border border-white/10">
          <Cpu className="w-4 h-4" />
        </div>
        <h2
          id="projects-heading"
          className="text-xs font-mono font-bold tracking-widest text-signal-400 uppercase"
        >
          // SYSTEMS &amp; OPEN SOURCE
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between p-5 rounded-2xl bg-signal-900 dark:bg-signal-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-mint-500/40 shadow-signal-card transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-signal-800 dark:bg-signal-800 light:bg-slate-100 text-mint-400 border border-white/10">
                    <IconRenderer name={project.icon || 'box'} size={18} />
                  </div>
                  <h3 className="font-bold text-sm text-signal-100 dark:text-signal-100 light:text-slate-900">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-xs text-signal-400 line-clamp-3 leading-relaxed mb-4">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-signal-850 dark:bg-signal-850 light:bg-slate-100 text-signal-300 dark:text-signal-300 light:text-slate-700 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-100 text-xs font-mono">
              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-signal-400 hover:text-mint-400 transition-colors"
                  >
                    <IconRenderer name="github" size={14} />
                    <span>Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-mint-400 hover:text-mint-300 font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch</span>
                  </a>
                )}
              </div>

              {project.url && !project.demoUrl && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-signal-400 hover:text-signal-200 transition-colors"
                >
                  <span>Info</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
