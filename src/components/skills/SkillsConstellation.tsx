import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Search,
  Eye,
  Info,
  Check,
} from 'lucide-react';

export interface SkillNode {
  id: string;
  name: string;
  category: 'systems' | 'programming' | 'aiml' | 'software' | 'tools' | 'research';
  categoryLabel: string;
  description: string;
  evidence: string;
  relatedProject?: string;
  relatedProjectUrl?: string;
}

export const VERIFIED_SKILLS: SkillNode[] = [
  // Systems & Linux
  {
    id: 'linux-systems',
    name: 'Linux & Systems Engineering',
    category: 'systems',
    categoryLabel: 'Systems & Linux',
    description: 'Linux environment configuration, CLI automation, systemd daemon integration, and POSIX process control.',
    evidence: 'Core runtime for ETS (Encrypted Tiered Storage) background daemon and daily development stack.',
    relatedProject: 'ETS — Encrypted Tiered Storage',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/ETS',
  },
  {
    id: 'storage-caching',
    name: 'Tiered Storage & LRU Caching',
    category: 'systems',
    categoryLabel: 'Systems & Linux',
    description: 'Hierarchical storage structures, local SSD cache eviction algorithms (LRU), and asynchronous cloud migration.',
    evidence: 'Implemented in client-side storage architecture for ETS project.',
    relatedProject: 'ETS',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/ETS',
  },
  {
    id: 'cryptography',
    name: 'AES-256 Client-Side Encryption',
    category: 'systems',
    categoryLabel: 'Systems & Linux',
    description: 'Client-side data confidentiality, zero-knowledge cloud backends, and key derivation.',
    evidence: 'Engineered as foundational security layer in ETS.',
    relatedProject: 'ETS',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/ETS',
  },
  {
    id: 'hardware-diagnostics',
    name: 'Hardware Restoration & Maintenance',
    category: 'systems',
    categoryLabel: 'Systems & Linux',
    description: 'Board-level fan cleaning, thermal compound application, and OS boot restoration.',
    evidence: 'Demonstrated through public teardowns and restorations on Techie Ashish YouTube channel.',
    relatedProject: 'Techie Ashish Broadcasts',
    relatedProjectUrl: 'https://www.youtube.com/@Techie-Ashish',
  },

  // Programming
  {
    id: 'python-core',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'Programming',
    description: 'Primary engineering language for algorithmic workflows, systems scripting, computer vision, and cocotb testbenches.',
    evidence: 'ETS, Samanvaya, EDA-Agent, and ARL codebases.',
    relatedProject: 'Samanvaya & ETS',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/Samanvaya',
  },
  {
    id: 'typescript-js',
    name: 'TypeScript & Modern JavaScript',
    category: 'programming',
    categoryLabel: 'Programming',
    description: 'Type-safe frontend development, strict schemas, reactive state management, and modern ESM build pipelines.',
    evidence: 'LinkVault architecture, local Studio, and interactive 3D WebGL scenes.',
    relatedProject: 'LinkVault',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/LinkVault',
  },
  {
    id: 'c-lang',
    name: 'C / Systems Programming',
    category: 'programming',
    categoryLabel: 'Programming',
    description: 'Systems-level programming concepts, memory layout, pointers, and POSIX system call mechanics.',
    evidence: 'Undergraduate Computer Science curriculum at Uttarakhand Technical University (2023–2027).',
  },
  {
    id: 'shell-scripting',
    name: 'Shell & Bash Automation',
    category: 'programming',
    categoryLabel: 'Programming',
    description: 'Automated workflow scripts, build automation, service deployment, and environment bootstrapping.',
    evidence: 'Repository maintenance and Linux deployment automation.',
  },

  // AI & ML
  {
    id: 'computer-vision',
    name: 'Computer Vision & Image Registration',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    description: 'Planetary satellite image registration, feature point extraction, Fourier-Mellin transform, and subpixel correlation.',
    evidence: 'Samanvaya planetary registration project analyzing Chandrayaan-2 imagery.',
    relatedProject: 'Samanvaya',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/Samanvaya',
  },
  {
    id: 'reinforcement-learning',
    name: 'Adaptive Reinforcement Learning (ARL)',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    description: 'Reinforcement learning paradigms, agent-environment feedback loops, and state adaptation strategies.',
    evidence: 'ARL open-source research repository.',
    relatedProject: 'ARL',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/ARL',
  },
  {
    id: 'gen-ai',
    name: 'Generative AI Fundamentals',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    description: 'Foundations of large language models, transformer mechanisms, prompt structure, and multimodal models.',
    evidence: 'Google Cloud Skills Boost Certification (August 2024, ID: 10397407).',
  },

  // Software Engineering
  {
    id: 'schema-validation',
    name: 'Runtime Schema Validation & Safety',
    category: 'software',
    categoryLabel: 'Software Engineering',
    description: 'Zod-based zero-trust schema parsing, input sanitization, and URL security protocol filtering.',
    evidence: 'Architected in LinkVault profile schema and local Studio API layer.',
    relatedProject: 'LinkVault',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/LinkVault',
  },
  {
    id: 'react-vite',
    name: 'React 18 & Vite Architecture',
    category: 'software',
    categoryLabel: 'Software Engineering',
    description: 'Component lifecycles, custom hooks, code-splitting, dynamic imports, and static bundle optimization.',
    evidence: 'Production frontend of LinkVault with sub-100ms cold boots.',
    relatedProject: 'LinkVault',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/LinkVault',
  },
  {
    id: 'webgl-threejs',
    name: '3D Graphics & Three.js',
    category: 'software',
    categoryLabel: 'Software Engineering',
    description: 'WebGL2 scenes, custom shaders, orbital kinematics, lighting models, and memory disposal lifecycles.',
    evidence: 'LinkVault Digital Observatory 3D centerpiece.',
    relatedProject: 'LinkVault',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/LinkVault',
  },

  // Tools & Infrastructure
  {
    id: 'eda-verification',
    name: 'EDA & RTL Verification Workflows',
    category: 'tools',
    categoryLabel: 'Tools & Infrastructure',
    description: 'Automated electronic design automation, RTL linting, Yosys synthesis checks, and cocotb Python testbenches.',
    evidence: 'EDA-Agent automation repository.',
    relatedProject: 'EDA-Agent',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/EDA-Agent',
  },
  {
    id: 'github-actions-cicd',
    name: 'GitHub Actions & Static CI/CD',
    category: 'tools',
    categoryLabel: 'Tools & Infrastructure',
    description: 'Multi-stage automated test suites, playwright end-to-end regression testing, and zero-downtime GitHub Pages deployments.',
    evidence: 'LinkVault continuous delivery workflow.',
    relatedProject: 'LinkVault CI/CD',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/LinkVault',
  },
  {
    id: 'osint-research',
    name: 'Open-Source Intelligence (OSINT)',
    category: 'tools',
    categoryLabel: 'Tools & Infrastructure',
    description: 'Methodologies and ethical tooling for information gathering, digital footprint verification, and technical research.',
    evidence: 'Published research article "Top 10 OSINT Tools for Effective Information Gathering".',
  },

  // Research Interests
  {
    id: 'planetary-imaging',
    name: 'Planetary Remote Sensing',
    category: 'research',
    categoryLabel: 'Research Interests',
    description: 'Phase correlation, Fourier-Mellin invariant registration, and lunar optical terrain mapping.',
    evidence: 'Samanvaya project analyzing ISRO Chandrayaan-2 datasets.',
    relatedProject: 'Samanvaya',
    relatedProjectUrl: 'https://github.com/ashishsinghbora/Samanvaya',
  },
  {
    id: 'efficient-computing',
    name: 'Resource-Efficient Computing',
    category: 'research',
    categoryLabel: 'Research Interests',
    description: 'Lightweight software architectures designed to minimize CPU cycles, memory footprint, and network payload.',
    evidence: 'Core design philosophy across ETS, LinkVault static delivery, and Linux restorations.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Domains', icon: Layers },
  { id: 'systems', label: 'Systems & Linux', icon: Terminal },
  { id: 'programming', label: 'Programming', icon: Cpu },
  { id: 'aiml', label: 'AI & Machine Learning', icon: Sparkles },
  { id: 'software', label: 'Software Engineering', icon: GitBranch },
  { id: 'tools', label: 'Tools & EDA', icon: Search },
  { id: 'research', label: 'Research Interests', icon: Eye },
] as const;

export const SkillsConstellation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillNode>(VERIFIED_SKILLS[0]);
  const [showSemanticTable, setShowSemanticTable] = useState(false);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return VERIFIED_SKILLS;
    return VERIFIED_SKILLS.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="skills-section"
      aria-labelledby="skills-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-electric" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-violet-electric font-semibold">
              VERIFIED COMPETENCIES // TELEMETRY
            </span>
          </div>
          <h2 id="skills-heading" className="text-2xl sm:text-3xl font-extrabold text-signal-100 tracking-tight">
            Engineering & Technical Domain Map
          </h2>
          <p className="text-xs sm:text-sm text-signal-400 mt-1 max-w-2xl font-sans">
            Competencies grounded exclusively in verified open-source projects, academic curriculum at Uttarakhand Technical University, and authenticated certifications.
          </p>
        </div>

        {/* Accessible Semantic Alternative Toggle */}
        <button
          onClick={() => setShowSemanticTable(!showSemanticTable)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-raised border border-white/10 text-xs font-mono text-signal-400 hover:text-signal-200 transition-colors"
          aria-expanded={showSemanticTable}
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>{showSemanticTable ? 'Show Constellation View' : 'Accessible Table View'}</span>
        </button>
      </div>

      {/* Domain Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-violet-deep text-white border border-violet-electric shadow-signal-glow'
                  : 'bg-surface/80 hover:bg-surface-raised text-signal-400 hover:text-signal-200 border border-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-signal-500'}`} />
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-60">
                ({cat.id === 'all' ? VERIFIED_SKILLS.length : VERIFIED_SKILLS.filter((s) => s.category === cat.id).length})
              </span>
            </button>
          );
        })}
      </div>

      {showSemanticTable ? (
        /* Accessible Text-Based Semantic Alternative */
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface/90 backdrop-blur-md">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-surface-raised text-signal-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Domain Area</th>
                <th className="py-3 px-4">Competency</th>
                <th className="py-3 px-4">Technical Details</th>
                <th className="py-3 px-4">Verified Project Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-signal-300">
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-violet-electric font-semibold whitespace-nowrap">
                    {skill.categoryLabel}
                  </td>
                  <td className="py-3 px-4 font-bold text-signal-100">{skill.name}</td>
                  <td className="py-3 px-4 text-signal-400 leading-relaxed max-w-md">{skill.description}</td>
                  <td className="py-3 px-4 text-signal-300 font-mono text-[11px]">
                    {skill.relatedProjectUrl ? (
                      <a
                        href={skill.relatedProjectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        {skill.evidence}
                      </a>
                    ) : (
                      skill.evidence
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Constellation Node Grid & Detail Inspection Panel */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Constellation Grid (7 cols desktop) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveSkill(skill);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`group relative p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-violet-electric ${
                    isSelected
                      ? 'bg-surface-raised border-violet-electric shadow-signal-glow'
                      : 'bg-surface/75 hover:bg-surface-raised border-white/5 hover:border-violet-electric/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      {skill.categoryLabel}
                    </span>
                    {isSelected && (
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-violet-electric text-void">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-signal-100 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] text-signal-400 line-clamp-2 mt-1 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Skill Telemetry / Verification Inspector (5 cols desktop) */}
          <div className="lg:col-span-5 sticky top-20 p-6 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-xl shadow-glass-card">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono text-violet-electric uppercase tracking-widest">
                TELEMETRY // DETAIL INSPECTOR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 text-[10px] font-mono">
                VERIFIED
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-signal-100 tracking-tight mb-2">
              {activeSkill.name}
            </h3>

            <div className="inline-block px-2.5 py-1 rounded-md bg-surface-raised border border-white/10 text-xs font-mono text-cyan-400 mb-4">
              Domain: {activeSkill.categoryLabel}
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <span className="block font-mono text-[10px] uppercase text-signal-500 mb-1">
                  TECHNICAL DESCRIPTION:
                </span>
                <p className="text-signal-300 leading-relaxed font-sans">{activeSkill.description}</p>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-signal-500 mb-1">
                  PROJECT / CURRICULUM EVIDENCE:
                </span>
                <p className="text-signal-400 leading-relaxed font-sans">{activeSkill.evidence}</p>
              </div>

              {activeSkill.relatedProject && (
                <div className="pt-2">
                  <span className="block font-mono text-[10px] uppercase text-signal-500 mb-1.5">
                    LINKED REPOSITORY:
                  </span>
                  {activeSkill.relatedProjectUrl ? (
                    <a
                      href={activeSkill.relatedProjectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-deep/30 hover:bg-violet-deep border border-violet-electric/40 text-violet-electric hover:text-white font-mono text-xs transition-colors"
                    >
                      <span>Explore {activeSkill.relatedProject}</span>
                      <Search className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-signal-300 font-mono text-xs">{activeSkill.relatedProject}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsConstellation;
