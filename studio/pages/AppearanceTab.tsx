import React from 'react';
import { Sparkles } from 'lucide-react';
import type {
  ProfileData,
  AccentColor,
  BackgroundStyle,
  Scene3DSettings,
} from '../../src/types/profile';

interface AppearanceTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

const ACCENT_OPTIONS: { id: AccentColor; label: string; color: string; desc: string }[] = [
  { id: 'violet', label: 'Observatory Violet', color: '#A855F7', desc: 'Electric violet & deep purple telemetry' },
  { id: 'cyan', label: 'Observatory Cyan', color: '#22D3EE', desc: 'Bright cyan orbital rings and nodes' },
  { id: 'emerald', label: 'Genesis Emerald', color: '#06A679', desc: 'Deep atmospheric green & emerald glow' },
  { id: 'mint', label: 'Electric Mint', color: '#00f59b', desc: 'High-signal terminal green' },
  { id: 'amber', label: 'Amber Telemetry', color: '#f59e0b', desc: 'Vintage telemetry amber' },
];

const BACKGROUND_OPTIONS: { id: BackgroundStyle; label: string; desc: string }[] = [
  { id: 'deep-space', label: 'Digital Observatory (Void)', desc: 'Near-black #07070D canvas with layered depth' },
  { id: 'orbital-glow', label: 'Observatory Radial Glow', desc: 'Violet and cyan layered ambient radial lighting' },
  { id: 'technical-grid', label: 'Technical Grid', desc: '32px precision coordinate alignment grid' },
  { id: 'dots', label: 'Matrix Dots', desc: '20px radial dot pattern' },
  { id: 'minimal', label: 'Minimal Flat', desc: 'Clean distraction-free dark canvas' },
];

export const AppearanceTab: React.FC<AppearanceTabProps> = ({ data, onChange }) => {
  const appearance = data.appearance || {
    defaultTheme: 'dark',
    accentColor: 'emerald',
    backgroundStyle: 'deep-space',
  };

  const scene3d: Scene3DSettings = appearance.scene3d || {
    enabled: true,
    animate: true,
    motionIntensity: 'medium',
    quality: 'auto',
    glowIntensity: 'medium',
    orbitalSpeed: 1.0,
    particleDensity: 'medium',
    heroLayout: 'split',
    backgroundStyle: 'deep-space',
    showFallbackOnly: false,
  };

  const privacy = data.privacy || {
    showGpg: false,
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

  const updateScene3d = (fields: Partial<Scene3DSettings>) => {
    updateAppearance({
      scene3d: {
        ...scene3d,
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
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald" />
          <span>VISUAL SYSTEM &amp; 3D ENVIRONMENT</span>
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Configure the 3D Digital Identity Core, Genesis-inspired lighting, depth tokens, and display preferences.
        </p>
      </div>

      {/* 3D EXPERIENCE SETTINGS */}
      <div className="p-5 rounded-2xl bg-signal-900 border border-emerald/30 space-y-6 shadow-glass-card">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse" />
              <label className="text-sm font-mono font-bold text-signal-100 uppercase tracking-wider">
                3D EXPERIENCE SETTINGS
              </label>
            </div>
            <p className="text-xs text-signal-400 mt-0.5">
              Control the WebGL Digital Identity Core, orbital mechanics, particle dust, and lighting.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald/10 text-emerald-light border border-emerald/20 font-bold">
            WEBGL 3D
          </span>
        </div>

        {/* Master Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-signal-950 border border-white/10 hover:border-white/20 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                3D Identity Scene
              </span>
              <span className="text-[11px] text-signal-500">
                Render interactive 3D WebGL core on public profile
              </span>
            </div>
            <input
              type="checkbox"
              checked={scene3d.enabled}
              onChange={(e) => updateScene3d({ enabled: e.target.checked })}
              className="w-4 h-4 rounded text-emerald accent-emerald"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-signal-950 border border-white/10 hover:border-white/20 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                Continuous Orbital Motion
              </span>
              <span className="text-[11px] text-signal-500">
                Rotate rings and particles in real time
              </span>
            </div>
            <input
              type="checkbox"
              checked={scene3d.animate}
              onChange={(e) => updateScene3d({ animate: e.target.checked })}
              className="w-4 h-4 rounded text-emerald accent-emerald"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-signal-950 border border-white/10 hover:border-white/20 cursor-pointer">
            <div>
              <span className="text-xs font-mono font-semibold text-signal-200 block">
                Preview Static Fallback
              </span>
              <span className="text-[11px] text-signal-500">
                Force CSS/SVG fallback to test low-power devices
              </span>
            </div>
            <input
              type="checkbox"
              checked={scene3d.showFallbackOnly || false}
              onChange={(e) => updateScene3d({ showFallbackOnly: e.target.checked })}
              className="w-4 h-4 rounded text-emerald accent-emerald"
            />
          </label>

          <div className="p-3.5 rounded-xl bg-signal-950 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-semibold text-signal-200">
                Orbital Velocity: {scene3d.orbitalSpeed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={scene3d.orbitalSpeed}
              onChange={(e) => updateScene3d({ orbitalSpeed: parseFloat(e.target.value) })}
              className="w-full accent-emerald cursor-pointer"
            />
          </div>
        </div>

        {/* Multi-option selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rendering Quality */}
          <div>
            <label className="block text-[11px] font-mono text-signal-400 uppercase tracking-wider mb-2">
              Rendering Quality
            </label>
            <div className="space-y-1.5">
              {(['auto', 'performance', 'high'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => updateScene3d({ quality: q })}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono border transition-all ${
                    scene3d.quality === q
                      ? 'bg-emerald/15 border-emerald text-emerald-light font-bold'
                      : 'bg-signal-950 border-white/5 text-signal-400 hover:text-signal-200'
                  }`}
                >
                  <span className="capitalize">{q}</span>
                  <span className="text-[10px] block opacity-70">
                    {q === 'auto' ? 'DPR adapt to device' : q === 'performance' ? '1.0 DPR max (low battery)' : '1.5 DPR max sharp'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Particle Density */}
          <div>
            <label className="block text-[11px] font-mono text-signal-400 uppercase tracking-wider mb-2">
              Particle Constellation
            </label>
            <div className="space-y-1.5">
              {(['low', 'medium', 'high'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => updateScene3d({ particleDensity: d })}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono border transition-all ${
                    scene3d.particleDensity === d
                      ? 'bg-emerald/15 border-emerald text-emerald-light font-bold'
                      : 'bg-signal-950 border-white/5 text-signal-400 hover:text-signal-200'
                  }`}
                >
                  <span className="capitalize">{d} Density</span>
                  <span className="text-[10px] block opacity-70">
                    {d === 'low' ? '100 particles' : d === 'medium' ? '200 particles' : '350 particles'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Glow & Lighting Intensity */}
          <div>
            <label className="block text-[11px] font-mono text-signal-400 uppercase tracking-wider mb-2">
              Emerald/Violet Lighting
            </label>
            <div className="space-y-1.5">
              {(['subtle', 'medium', 'vibrant'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => updateScene3d({ glowIntensity: g })}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono border transition-all ${
                    scene3d.glowIntensity === g
                      ? 'bg-emerald/15 border-emerald text-emerald-light font-bold'
                      : 'bg-signal-950 border-white/5 text-signal-400 hover:text-signal-200'
                  }`}
                >
                  <span className="capitalize">{g} Glow</span>
                  <span className="text-[10px] block opacity-70">
                    {g === 'subtle' ? 'Minimal ambient' : g === 'medium' ? 'Balanced depth' : 'Vivid illumination'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Accent Color */}
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
                  ? 'bg-signal-850 border-emerald shadow-sm'
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
          BACKGROUND ENVIRONMENT
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BACKGROUND_OPTIONS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => updateAppearance({ backgroundStyle: bg.id })}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                appearance.backgroundStyle === bg.id
                  ? 'bg-emerald/15 border-emerald text-emerald-light font-bold'
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
              className="w-4 h-4 rounded text-emerald accent-emerald"
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
              className="w-4 h-4 rounded text-emerald accent-emerald"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
