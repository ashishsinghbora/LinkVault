import React, { useState, useMemo } from 'react';
import {
  Cpu,
  ExternalLink,
  ArrowUpRight,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { ProjectItem } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';
import { BrandIcon } from '../shared/BrandIcon';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  searchQuery?: string;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-400/10 text-cyan-300 border border-cyan-400/25">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Active
          </span>
        );
      case 'research':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-violet-deep/20 text-violet-electric border border-violet-electric/30">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-electric" />
            Research
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface/90 border border-white/10 hover:border-violet-electric/40 shadow-glass-card hover:shadow-glass-card-hover backdrop-blur-xl transition-all duration-300 overflow-hidden"
    >
      {/* Subtle layered corner ambient glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-violet-deep/15 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-cyan-400/10 via-transparent to-transparent pointer-events-none rounded-bl-2xl" />

      {/* Top metallic accent line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-violet-electric/60 transition-all duration-300" />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-raised border border-white/10 text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all shadow-sm flex-shrink-0">
              <IconRenderer name={project.icon || 'box'} size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base text-signal-100 group-hover:text-cyan-300 transition-colors leading-snug truncate">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-[10px] font-mono text-violet-electric tracking-wider uppercase font-semibold">
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
        <p className={`text-xs sm:text-sm text-signal-400 leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-3'}`}>
          {project.description}
        </p>

        {/* Toggle description reveal if long */}
        {project.description.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-4 focus:outline-none"
          >
            <span>{expanded ? 'Show Less' : 'Read Architecture Details'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}

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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-violet-deep/20 hover:text-violet-electric border border-white/10 hover:border-violet-electric/40 text-signal-300 transition-all focus:outline-none focus:ring-1 focus:ring-violet-electric"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-cyan-400/15 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 text-signal-300 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
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
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const query = searchQuery.toLowerCase().trim();

  // Filter projects based on search query and category tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(query))) ||
        (project.status && project.status.toLowerCase().includes(query));

      if (!matchesQuery) return false;

      if (selectedTag === 'all') return true;
      if (selectedTag === 'systems') {
        return project.tags.some((t) => ['linux', 'aes-256', 'systems', 'cloud storage'].includes(t.toLowerCase()));
      }
      if (selectedTag === 'vision') {
        return project.tags.some((t) => ['computer vision', 'opencv', 'ai/ml', 'reinforcement learning'].includes(t.toLowerCase()));
      }
      if (selectedTag === 'eda') {
        return project.tags.some((t) => ['eda', 'rtl', 'yosys', 'cocotb'].includes(t.toLowerCase()));
      }
      return true;
    });
  }, [projects, query, selectedTag]);

  // Featured Project Presentation (First featured project or ETS)
  const featuredProject = useMemo(() => {
    return projects.find((p) => p.featured && p.id === 'proj-ets') || projects.find((p) => p.featured) || projects[0];
  }, [projects]);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects-section"
      aria-labelledby="projects-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-8"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-surface-raised text-violet-electric border border-violet-electric/20">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-violet-electric uppercase">
              // SYSTEMS ARCHITECTURE &amp; OPEN SOURCE
            </span>
          </div>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl font-extrabold text-signal-100 tracking-tight"
          >
            Engineering Showcase
          </h2>
        </div>

        <p className="text-xs font-mono text-signal-400 max-w-md">
          Client-side encrypted tiered cloud storage, planetary image registration, and autonomous EDA verification frameworks.
        </p>
      </div>

      {/* Featured Architecture Showcase (Editorial Hero Presentation) */}
      {!query && featuredProject && selectedTag === 'all' && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface-raised via-surface to-void border border-violet-electric/30 shadow-2xl overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-deep/20 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400/10 blur-[80px] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-violet-deep text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-violet-electric">
                  ★ ARCHITECTURAL FLAGSHIP
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/25 text-[10px] font-mono">
                  {featuredProject.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-signal-100 tracking-tight">
                {featuredProject.title}
              </h3>

              <p className="text-sm text-signal-300 leading-relaxed max-w-2xl font-sans">
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface border border-white/10 text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3">
                {featuredProject.repoUrl && (
                  <a
                    href={featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-deep hover:bg-violet-electric text-white font-mono text-xs font-bold transition-all shadow-signal-glow"
                  >
                    <BrandIcon name="github" className="w-4 h-4" size={16} />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center p-5 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-violet-electric font-bold text-[11px] pb-2 border-b border-white/10">
                <Shield className="w-4 h-4" />
                <span>SYSTEM BREAKDOWN</span>
              </div>
              <div className="flex justify-between text-signal-400 text-[11px]">
                <span>Encryption:</span>
                <span className="text-signal-200">AES-256 Client-Side</span>
              </div>
              <div className="flex justify-between text-signal-400 text-[11px]">
                <span>Cache Strategy:</span>
                <span className="text-signal-200">Local SSD / LRU Eviction</span>
              </div>
              <div className="flex justify-between text-signal-400 text-[11px]">
                <span>OS Integration:</span>
                <span className="text-signal-200">systemd background daemon</span>
              </div>
              <div className="flex justify-between text-signal-400 text-[11px]">
                <span>Target Kernel:</span>
                <span className="text-cyan-400">Linux / POSIX</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'systems', label: 'Systems & Linux' },
          { id: 'vision', label: 'Computer Vision & AI' },
          { id: 'eda', label: 'EDA & Hardware' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTag(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap transition-colors ${
              selectedTag === tab.id
                ? 'bg-surface-raised border border-cyan-400 text-cyan-300 shadow-sm'
                : 'bg-surface/60 hover:bg-surface-raised border border-white/5 text-signal-400 hover:text-signal-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
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
