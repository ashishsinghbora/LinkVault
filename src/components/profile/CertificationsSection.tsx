import { Award, ExternalLink, Hash } from 'lucide-react';
import { IconRenderer } from '../shared/IconRenderer';
import type { CertificationItem } from '../../types/profile';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const enabled = certifications.filter((c) => c.enabled);
  if (!enabled.length) return null;

  return (
    <section
      id="credentials-section"
      aria-labelledby="certifications-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/20">
          <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-signal-500 mb-0.5">
            CREDENTIALS
          </span>
          <h2 id="certifications-heading" className="text-xl font-bold text-signal-100">
            Certifications
          </h2>
        </div>
      </div>

      {/* Certifications list */}
      <div className="flex flex-col gap-3">
        {enabled.map((cert) => (
          <div
            key={cert.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-signal-800 bg-signal-900/60 hover:border-amber-500/30 hover:bg-signal-800/60 transition-all duration-200"
          >
            {/* Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/20 mt-0.5">
              <IconRenderer
                name={cert.icon || 'award'}
                className="w-5 h-5 text-amber-400"
                size={20}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-signal-100 leading-snug">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
                        aria-label={`${cert.title} — verify credential`}
                      >
                        {cert.title}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                      </a>
                    ) : (
                      cert.title
                    )}
                  </h3>
                  <p className="text-xs text-signal-400 mt-0.5">{cert.issuer}</p>
                </div>
                {/* Issue date badge */}
                <span className="flex-shrink-0 text-[10px] font-mono text-signal-500 bg-signal-800 border border-signal-700 px-2 py-0.5 rounded">
                  {cert.issuedDate}
                </span>
              </div>

              {/* Credential ID — shown as metadata only */}
              {cert.credentialId && (
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-signal-600">
                  <Hash className="w-3 h-3" aria-hidden="true" />
                  <span>Credential ID: {cert.credentialId}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
