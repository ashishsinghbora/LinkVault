import { GraduationCap } from 'lucide-react';
import type { EducationItem } from '../../types/profile';

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const enabled = education.filter((e) => e.enabled);
  if (!enabled.length) return null;

  return (
    <section
      aria-labelledby="education-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/20">
          <GraduationCap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-signal-500 mb-0.5">
            ACADEMICS
          </span>
          <h2 id="education-heading" className="text-xl font-bold text-signal-100">
            Education
          </h2>
        </div>
      </div>

      {/* Education list */}
      <div className="flex flex-col gap-3">
        {enabled.map((edu) => (
          <div
            key={edu.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-signal-800 bg-signal-900/60 hover:border-cyan-500/30 hover:bg-signal-800/60 transition-all duration-200"
          >
            {/* Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md bg-cyan-500/10 border border-cyan-500/20 mt-0.5">
              <GraduationCap className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-signal-100 leading-snug">
                    {edu.institution}
                  </h3>
                  {(edu.degree || edu.field) && (
                    <p className="text-xs text-signal-400 mt-0.5">
                      {[edu.degree, edu.field].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-xs text-signal-500 mt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
                {/* Period badge */}
                <span className="flex-shrink-0 text-[10px] font-mono text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                  {edu.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
