import React, { useState, useEffect } from 'react';
import { Code2, Check, AlertTriangle, Wand2 } from 'lucide-react';
import type { ProfileData } from '../../src/types/profile';
import { validateProfile } from '../../src/lib/schema';

interface RawJsonTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export const RawJsonTab: React.FC<RawJsonTabProps> = ({ data, onChange }) => {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setJsonText(JSON.stringify(data, null, 2));
  }, [data]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: unknown) {
      setError(`JSON syntax error: ${(err as Error).message}`);
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const validation = validateProfile(parsed);
      if (!validation.success) {
        setError(`Validation error: ${validation.errors.join('; ')}`);
        return;
      }
      onChange(validation.data);
      setError(null);
      setApplied(true);
      setTimeout(() => setApplied(false), 2000);
    } catch (err: unknown) {
      setError(`JSON syntax error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
            RAW JSON PROFILE EDITOR
          </h2>
          <p className="text-xs text-signal-400 mt-1">
            Directly inspect and modify the raw structured schema representation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFormat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-300 border border-white/10 text-xs font-mono transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Format</span>
          </button>

          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-mono text-xs font-bold uppercase transition-colors"
          >
            {applied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Applied!</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5" />
                <span>Apply Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}

      <div className="rounded-xl border border-white/10 overflow-hidden bg-signal-950">
        <textarea
          rows={22}
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            setError(null);
          }}
          className="w-full p-4 font-mono text-xs text-mint-300 bg-transparent outline-none resize-y selection:bg-mint-500/30"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
