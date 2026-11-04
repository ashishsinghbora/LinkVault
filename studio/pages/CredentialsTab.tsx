import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Award, GraduationCap, ExternalLink } from 'lucide-react';
import type { ProfileData, CertificationItem, EducationItem } from '../../src/types/profile';

interface CredentialsTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export const CredentialsTab: React.FC<CredentialsTabProps> = ({ data, onChange }) => {
  const certifications = data.certifications || [];
  const education = data.education || [];

  const updateCertifications = (newCerts: CertificationItem[]) => {
    const indexed = newCerts.map((c, idx) => ({ ...c, order: idx + 1 }));
    onChange({
      ...data,
      certifications: indexed,
    });
  };

  const updateEducation = (newEdu: EducationItem[]) => {
    const indexed = newEdu.map((e, idx) => ({ ...e, order: idx + 1 }));
    onChange({
      ...data,
      education: indexed,
    });
  };

  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: 'New Certification Title',
      issuer: 'Issuing Organization',
      issuedDate: 'Month Year',
      credentialId: '',
      credentialUrl: '',
      icon: 'award',
      order: certifications.length + 1,
      enabled: true,
    };
    updateCertifications([...certifications, newCert]);
  };

  const handleUpdateCert = (id: string, fields: Partial<CertificationItem>) => {
    updateCertifications(
      certifications.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
  };

  const handleDeleteCert = (id: string) => {
    updateCertifications(certifications.filter((c) => c.id !== id));
  };

  const handleMoveCert = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= certifications.length) return;
    const copy = [...certifications];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    updateCertifications(copy);
  };

  const handleAddEdu = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'University or College Name',
      degree: 'Degree Program',
      field: 'Field of Study',
      period: '2023–2027',
      description: '',
      order: education.length + 1,
      enabled: true,
    };
    updateEducation([...education, newEdu]);
  };

  const handleUpdateEdu = (id: string, fields: Partial<EducationItem>) => {
    updateEducation(
      education.map((e) => (e.id === id ? { ...e, ...fields } : e))
    );
  };

  const handleDeleteEdu = (id: string) => {
    updateEducation(education.filter((e) => e.id !== id));
  };

  const handleMoveEdu = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= education.length) return;
    const copy = [...education];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    updateEducation(copy);
  };

  return (
    <div className="space-y-8">
      {/* Tab Header */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-lg font-bold text-signal-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Certifications & Academics</span>
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Manage verified certificates, licenses, degrees, and academic institutions.
        </p>
      </div>

      {/* SECTION 1: CERTIFICATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-signal-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Certifications ({certifications.length})</span>
          </h3>
          <button
            onClick={handleAddCert}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 font-bold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-6 rounded-xl bg-signal-900/40 border border-white/5 font-mono text-xs text-signal-500">
            No certifications configured.
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className="rounded-xl bg-signal-900 border border-white/10 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-signal-800 text-signal-400">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) => handleUpdateCert(cert.id, { title: e.target.value })}
                      className="font-semibold text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:border-amber-400 text-signal-100 focus:outline-none w-full"
                      placeholder="Certification Title"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveCert(idx, 'up')}
                      disabled={idx === 0}
                      aria-label="Move cert up"
                      className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveCert(idx, 'down')}
                      disabled={idx === certifications.length - 1}
                      aria-label="Move cert down"
                      className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      aria-label="Delete cert"
                      className="p-1 rounded text-signal-400 hover:text-red-400 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Issuer / Organization
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleUpdateCert(cert.id, { issuer: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 focus:border-amber-400 focus:outline-none"
                      placeholder="e.g. NISM or Google Cloud"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Issued Date
                    </label>
                    <input
                      type="text"
                      value={cert.issuedDate}
                      onChange={(e) => handleUpdateCert(cert.id, { issuedDate: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 focus:border-amber-400 focus:outline-none"
                      placeholder="e.g. November 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Credential ID (Metadata only)
                    </label>
                    <input
                      type="text"
                      value={cert.credentialId || ''}
                      onChange={(e) => handleUpdateCert(cert.id, { credentialId: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 font-mono text-xs focus:border-amber-400 focus:outline-none"
                      placeholder="e.g. ABCF1000184"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Verification URL (Optional — verified public URL only)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={cert.credentialUrl || ''}
                        onChange={(e) => handleUpdateCert(cert.id, { credentialUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 font-mono text-xs focus:border-amber-400 focus:outline-none"
                        placeholder="Leave empty if no public verification URL exists"
                      />
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-signal-950 hover:bg-signal-850 text-signal-400 hover:text-amber-400 border border-white/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <label className="flex items-center gap-1.5 cursor-pointer text-signal-400 hover:text-signal-200">
                    <input
                      type="checkbox"
                      checked={cert.enabled}
                      onChange={(e) => handleUpdateCert(cert.id, { enabled: e.target.checked })}
                      className="rounded bg-signal-950 border-white/20 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Visible on Profile</span>
                  </label>
                  <span className="text-[10px] font-mono text-signal-500">
                    Icon: {cert.icon || 'award'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: EDUCATION */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-signal-200 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Academic Institutions &amp; Education ({education.length})</span>
          </h3>
          <button
            onClick={handleAddEdu}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-bold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Institution</span>
          </button>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-6 rounded-xl bg-signal-900/40 border border-white/5 font-mono text-xs text-signal-500">
            No education entries configured.
          </div>
        ) : (
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                className="rounded-xl bg-signal-900 border border-white/10 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-signal-800 text-signal-400">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdateEdu(edu.id, { institution: e.target.value })}
                      className="font-semibold text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:border-cyan-400 text-signal-100 focus:outline-none w-full"
                      placeholder="Institution Name"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveEdu(idx, 'up')}
                      disabled={idx === 0}
                      aria-label="Move edu up"
                      className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveEdu(idx, 'down')}
                      disabled={idx === education.length - 1}
                      aria-label="Move edu down"
                      className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(edu.id)}
                      aria-label="Delete edu"
                      className="p-1 rounded text-signal-400 hover:text-red-400 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleUpdateEdu(edu.id, { degree: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 focus:border-cyan-400 focus:outline-none"
                      placeholder="e.g. Bachelor of Technology"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field || ''}
                      onChange={(e) => handleUpdateEdu(edu.id, { field: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 focus:border-cyan-400 focus:outline-none"
                      placeholder="e.g. Computer Science and Engineering"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Period / Years
                    </label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => handleUpdateEdu(edu.id, { period: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 font-mono text-xs focus:border-cyan-400 focus:outline-none"
                      placeholder="e.g. 2023–2027"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-mono text-signal-400 mb-1">
                      Description or Highlights (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.description || ''}
                      onChange={(e) => handleUpdateEdu(edu.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-signal-950 border border-white/10 text-signal-100 text-xs focus:border-cyan-400 focus:outline-none"
                      placeholder="Optional notes or details"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <label className="flex items-center gap-1.5 cursor-pointer text-signal-400 hover:text-signal-200">
                    <input
                      type="checkbox"
                      checked={edu.enabled}
                      onChange={(e) => handleUpdateEdu(edu.id, { enabled: e.target.checked })}
                      className="rounded bg-signal-950 border-white/20 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Visible on Profile</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
