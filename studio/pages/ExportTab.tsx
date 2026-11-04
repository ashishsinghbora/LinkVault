import React, { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ProfileData } from '../../src/types/profile';
import { validateProfile } from '../../src/lib/schema';

interface ExportTabProps {
  data: ProfileData;
  onImport: (newData: ProfileData) => void;
  onResetToDemo: () => void;
}

export const ExportTab: React.FC<ExportTabProps> = ({
  data,
  onImport,
  onResetToDemo,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const validation = validateProfile(parsed);

        if (!validation.success) {
          setImportStatus({
            success: false,
            message: `Validation failed: ${validation.errors.slice(0, 3).join(', ')}`,
          });
          return;
        }

        onImport(validation.data);
        setImportStatus({
          success: true,
          message: 'Profile configuration imported and verified successfully!',
        });
      } catch (err) {
        setImportStatus({
          success: false,
          message: 'Invalid JSON file: Failed to parse file contents.',
        });
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleResetConfirm = () => {
    if (
      window.confirm(
        'Are you sure you want to reset your configuration to the default demo profile? Any unsaved changes will be replaced.'
      )
    ) {
      onResetToDemo();
      setImportStatus({
        success: true,
        message: 'Profile has been reset to default demo template.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
          IMPORT, EXPORT &amp; DISASTER RECOVERY
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Backup your verified profile configuration, restore previous revisions, or reset to demo data.
        </p>
      </div>

      {importStatus && (
        <div
          className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-mono ${
            importStatus.success
              ? 'bg-mint-500/10 border-mint-500/30 text-mint-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {importStatus.success ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Export Card */}
        <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 w-fit rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20 mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-mono text-xs text-signal-100 uppercase tracking-wider">
              EXPORT PROFILE BACKUP
            </h3>
            <p className="text-xs text-signal-400 mt-1">
              Download the active configuration as an offline JSON snapshot file.
            </p>
          </div>

          <button
            onClick={handleExportJson}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-200 border border-white/10 hover:border-mint-500/30 text-xs font-mono font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Backup</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-mono text-xs text-signal-100 uppercase tracking-wider">
              RESTORE FROM JSON
            </h3>
            <p className="text-xs text-signal-400 mt-1">
              Upload a previously exported JSON backup file with automatic schema validation.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-200 border border-white/10 hover:border-cyan-500/30 text-xs font-mono font-semibold transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select File</span>
            </button>
          </div>
        </div>

        {/* Reset Card */}
        <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-mono text-xs text-signal-100 uppercase tracking-wider">
              RESET TO DEMO DECK
            </h3>
            <p className="text-xs text-signal-400 mt-1">
              Reset all collections, socials, and styles to the default turnkey starter profile.
            </p>
          </div>

          <button
            onClick={handleResetConfirm}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
