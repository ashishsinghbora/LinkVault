import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import type { ProfileData, ProjectItem } from '../../src/types/profile';
import { IconRenderer } from '../../src/components/shared/IconRenderer';

interface ProjectsTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

const PROJECT_STATUSES = ['Active', 'Beta', 'Maintained', 'Archived', 'RFC', 'Research'];

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ data, onChange }) => {
  const projects = data.projects || [];

  const updateProjects = (newProjects: ProjectItem[]) => {
    const indexed = newProjects.map((p, idx) => ({ ...p, order: idx + 1 }));
    onChange({
      ...data,
      projects: indexed,
    });
  };

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      description: 'System tool, open-source protocol, or distributed application.',
      url: '',
      repoUrl: 'https://github.com/ashishsinghbora/',
      demoUrl: '',
      status: 'Active',
      tags: ['TypeScript', 'Rust'],
      icon: 'cpu',
      featured: false,
      order: projects.length + 1,
      enabled: true,
    };
    updateProjects([...projects, newProject]);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= projects.length) return;
    const copy = [...projects];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    updateProjects(copy);
  };

  const handleDelete = (id: string) => {
    updateProjects(projects.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<ProjectItem>) => {
    updateProjects(
      projects.map((p) => (p.id === id ? { ...p, ...fields } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
            PROJECT SHOWCASE &amp; REPOSITORIES
          </h2>
          <p className="text-xs text-signal-400 mt-1">
            Display your engineered systems, open-source repositories, and interactive demos.
          </p>
        </div>

        <button
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-signal-900 border border-white/10 text-xs font-mono text-signal-400">
            No projects added yet. Click &quot;New Project&quot; to showcase your repositories.
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project.id}
              className={`p-5 rounded-2xl bg-signal-900 border transition-all ${
                project.enabled ? 'border-white/10' : 'border-white/5 opacity-60'
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-signal-800 text-mint-400 border border-white/10">
                    <IconRenderer name={project.icon || 'box'} size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold font-mono text-sm text-signal-100">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono text-mint-400">
                      STATUS: {project.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      handleUpdate(project.id, { featured: !project.featured })
                    }
                    title="Toggle featured status"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      project.featured
                        ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                        : 'text-signal-400 hover:text-signal-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{project.featured ? 'FEATURED' : 'FEATURE'}</span>
                  </button>

                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Move project ${project.title} up`}
                    className="p-1 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === projects.length - 1}
                    aria-label={`Move project ${project.title} down`}
                    className="p-1 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      handleUpdate(project.id, { enabled: !project.enabled })
                    }
                    className={`px-2 py-1 rounded text-[10px] font-mono ${
                      project.enabled
                        ? 'bg-mint-500/10 text-mint-400'
                        : 'bg-signal-800 text-signal-500'
                    }`}
                  >
                    {project.enabled ? 'ACTIVE' : 'OFF'}
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    aria-label={`Delete project ${project.title}`}
                    className="p-1 rounded hover:bg-rose-500/20 text-signal-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      handleUpdate(project.id, { title: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Project Status
                  </label>
                  <select
                    value={project.status}
                    onChange={(e) =>
                      handleUpdate(project.id, { status: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  >
                    {PROJECT_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={project.description}
                    onChange={(e) =>
                      handleUpdate(project.id, { description: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={project.repoUrl || ''}
                    onChange={(e) =>
                      handleUpdate(project.id, { repoUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={project.demoUrl || ''}
                    onChange={(e) =>
                      handleUpdate(project.id, { demoUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-signal-400">
                    Tech Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={(project.tags || []).join(', ')}
                    onChange={(e) =>
                      handleUpdate(project.id, {
                        tags: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Go, TypeScript, Docker"
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
