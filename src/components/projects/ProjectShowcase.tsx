import React, { useState } from 'react';
import { Cpu, ExternalLink, ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';
import { BrandIcon } from '../shared/BrandIcon';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  searchQuery?: string;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtle desktop tilt effect (no excessive spinning)
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald/10 text-emerald-light border border-emerald/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
            Active
          </span>
        );
      case 'research':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-violet/15 text-violet-lavender border border-violet/30">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-glow" />
            Research
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan/15 text-cyan-300 border border-cyan/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
            Beta
          </span>
        );
      case 'maintained':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-surface-raised text-signal-400 border border-white/10">
            Maintained
          </span>
        );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
      }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface/90 border border-white/10 hover:border-emerald/40 shadow-glass-card hover:shadow-glass-card-hover backdrop-blur-xl transition-all duration-300 overflow-hidden"
    >
      {/* Subtle layered corner ambient glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-emerald/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-violet/10 via-transparent to-transparent pointer-events-none rounded-bl-2xl" />

      {/* Top metallic accent line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-emerald-glow/60 transition-all duration-300" />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-raised border border-white/10 text-emerald-glow group-hover:border-emerald/50 group-hover:scale-105 transition-all shadow-sm flex-shrink-0">
              <IconRenderer name={project.icon || 'box'} size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base text-signal-100 group-hover:text-emerald-light transition-colors leading-snug truncate">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-[10px] font-mono text-emerald-glow tracking-wider uppercase font-semibold">
                  ★ FEATURED ARCHITECTURE
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 pt-0.5">
            {getStatusBadge(project.status)}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-signal-400 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Technology tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-surface-raised border border-white/5 text-signal-300 group-hover:border-white/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions bottom bar */}
      <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-emerald/15 hover:text-emerald-light border border-white/10 hover:border-emerald/30 text-signal-300 transition-all focus:outline-none focus:ring-1 focus:ring-emerald"
            >
              <BrandIcon name="github" className="w-3.5 h-3.5" size={14} />
              <span>Repository</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-violet/15 hover:text-violet-lavender border border-white/10 hover:border-violet/30 text-signal-300 transition-all focus:outline-none focus:ring-1 focus:ring-violet-lavender"
            >
              <ExternalLink className="w-3.5 h-3.5 text-violet-lavender" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {project.url && project.url !== project.repoUrl && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-signal-500 hover:text-signal-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
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

  return (
    <section
      id="projects-section"
      aria-labelledby="projects-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-surface-raised text-emerald-glow border border-emerald/20">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-light uppercase">
              // SYSTEMS ARCHITECTURE &amp; OPEN SOURCE
            </span>
          </div>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl font-extrabold text-signal-100 tracking-tight"
          >
            Featured Constellation
          </h2>
        </div>

        <p className="text-xs font-mono text-signal-400 max-w-md">
          Client-side encrypted tiered cloud storage, planetary image registration, and autonomous EDA verification frameworks.
        </p>
      </div>

      {/* 3D Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
