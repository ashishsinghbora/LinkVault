import React from 'react';
import type {
  ProfileData,
  ThemeMode,
  AccentColor,
  BackgroundStyle,
} from '../../src/types/profile';

interface AppearanceTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

const ACCENT_OPTIONS: { id: AccentColor; label: string; color: string; desc: string }[] = [
  { id: 'mint', label: 'Electric Mint', color: '#00f59b', desc: 'Default high-signal terminal green' },
  { id: 'cyan', label: 'Cyan Cyber', color: '#00e5ff', desc: 'Precision technical blueprint cyan' },
  { id: 'emerald', label: 'Emerald Slate', color: '#10b981', desc: 'Deep calm architectural green' },
  { id: 'amber', label: 'Amber Terminal', color: '#f59e0b', desc: 'Vintage telemetry amber' },
  { id: 'violet', label: 'Violet Signal', color: '#a78bfa', desc: 'Modern deep purple spectrum' },
];

const BACKGROUND_OPTIONS: { id: BackgroundStyle; label: string; desc: string }[] = [
  { id: 'technical-grid', label: 'Technical Grid', desc: '32px precision alignment coordinate grid' },
  { id: 'dots', label: 'Matrix Dots', desc: '20px radial dot pattern' },
  { id: 'circuit', label: 'Circuit Matrix', desc: '48px wider engineering coordinate grid' },
  { id: 'minimal', label: 'Minimal Flat', desc: 'Clean distraction-free dark canvas' },
];

export const AppearanceTab: React.FC<AppearanceTabProps> = ({ data, onChange }) => {
  const appearance = data.appearance || {
    defaultTheme: 'dark',
    accentColor: 'mint',
    backgroundStyle: 'technical-grid',
  };

  const privacy = data.privacy || {
    showGpg: true,
    allowSearch: true,
    showPoweredBy: true,
  };

  const updateAppearance = (fields: Partial<ProfileData['appearance']>) => {
    onChange({
      ...data,
      appearance: {
        ...appearance,
        ...fields,
      },
    });
  };

  const updatePrivacy = (fields: Partial<ProfileData['privacy']>) => {
    onChange({
      ...data,
      privacy: {
        ...privacy,
        ...fields,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
          THEME &amp; VISUAL SYSTEM CONFIGURATION
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Configure the Digital Signal Deck aesthetic, tokens, and display preferences.
        </p>
      </div>

      {/* Default Theme Selector */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-3">
        <label className="block text-xs font-mono font-bold text-signal-200 uppercase tracking-wider">
          DEFAULT THEME MODE
        </label>
        <p className="text-xs text-signal-400">
          The public visitor will initially see this theme mode (they can still switch freely).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {(['dark', 'light', 'system'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => updateAppearance({ defaultTheme: mode })}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                appearance.defaultTheme === mode
                  ? 'bg-mint-500/15 border-mint-400 text-mint-400 font-bold'
                  : 'bg-signal-950 border-white/10 text-signal-300 hover:border-white/20'
              }`}
            >
              <div className="uppercase tracking-wider">
                {mode === 'dark' ? 'Dark Signal (Default)' : mode === 'light' ? 'Light Engineering' : 'System Auto'}
              </div>
              <span className="text-[10px] text-signal-500 block mt-1">
                {mode === 'dark' ? 'Deep graphite & obsidian canvas' : mode === 'light' ? 'Slate paper & crisp contrast' : 'Matches visitor OS preference'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-3">
        <label className="block text-xs font-mono font-bold text-signal-200 uppercase tracking-wider">
          PRIMARY ACCENT COLOR
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateAppearance({ accentColor: opt.id })}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-start gap-3 ${
                appearance.accentColor === opt.id
                  ? 'bg-signal-850 border-mint-400 shadow-sm'
                  : 'bg-signal-950 border-white/10 hover:border-white/20'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                style={{ backgroundColor: opt.color }}
              />
              <div>
                <span className="font-bold text-signal-200 block">{opt.label}</span>
                <span className="text-[10px] text-signal-500 block mt-0.5">{opt.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Background Style */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-3">
        <label className="block text-xs font-mono font-bold text-signal-200 uppercase tracking-wider">
          TECHNICAL BACKGROUND PATTERN
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BACKGROUND_OPTIONS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => updateAppearance({ backgroundStyle: bg.id })}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                appearance.backgroundStyle === bg.id
                  ? 'bg-mint-500/15 border-mint-400 text-mint-400 font-bold'
                  : 'bg-signal-950 border-white/10 text-signal-300 hover:border-white/20'
              }`}
            >
              <div className="text-signal-200 font-semibold">{bg.label}</div>
              <span className="text-[10px] text-signal-500 block mt-1">{bg.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interface Toggles */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-3">
        <label className="block text-xs font-mono font-bold text-signal-200 uppercase tracking-wider">
          DISPLAY &amp; ATTRIBUTION TOGGLES
        </label>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 rounded-xl bg-signal-950 border border-white/5 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                Show GPG Public Key Fingerprint
              </span>
              <span className="text-[11px] text-signal-500">
                Display cryptographic verification channel in the contact card.
              </span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showGpg ?? true}
              onChange={(e) => updatePrivacy({ showGpg: e.target.checked })}
              className="w-4 h-4 rounded text-mint-500 accent-mint-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-signal-950 border border-white/5 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                Enable Directory Search Bar
              </span>
              <span className="text-[11px] text-signal-500">
                Allow visitors to search and filter links and projects in real time.
              </span>
            </div>
            <input
              type="checkbox"
              checked={privacy.allowSearch ?? true}
              onChange={(e) => updatePrivacy({ allowSearch: e.target.checked })}
              className="w-4 h-4 rounded text-mint-500 accent-mint-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-signal-950 border border-white/5 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                Show &quot;Powered by LinkVault&quot; in Footer
              </span>
              <span className="text-[11px] text-signal-500">
                Open-source attribution link to help other developers discover LinkVault.
              </span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showPoweredBy ?? true}
              onChange={(e) => updatePrivacy({ showPoweredBy: e.target.checked })}
              className="w-4 h-4 rounded text-mint-500 accent-mint-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
