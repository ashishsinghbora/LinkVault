import React from 'react';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { ProfileData, SocialLink } from '../../src/types/profile';
import { IconRenderer } from '../../src/components/shared/IconRenderer';

interface SocialsTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

const PLATFORM_PRESETS = [
  { platform: 'github', label: 'GitHub', icon: 'github', urlPrefix: 'https://github.com/' },
  { platform: 'x', label: 'X (Twitter)', icon: 'x', urlPrefix: 'https://x.com/' },
  { platform: 'linkedin', label: 'LinkedIn', icon: 'linkedin', urlPrefix: 'https://linkedin.com/in/' },
  { platform: 'bluesky', label: 'Bluesky', icon: 'bluesky', urlPrefix: 'https://bsky.app/profile/' },
  { platform: 'mastodon', label: 'Mastodon', icon: 'mastodon', urlPrefix: 'https://mastodon.social/@' },
  { platform: 'discord', label: 'Discord', icon: 'discord', urlPrefix: 'https://discord.gg/' },
  { platform: 'telegram', label: 'Telegram', icon: 'telegram', urlPrefix: 'https://t.me/' },
  { platform: 'youtube', label: 'YouTube', icon: 'youtube', urlPrefix: 'https://youtube.com/@' },
];

export const SocialsTab: React.FC<SocialsTabProps> = ({ data, onChange }) => {
  const socials = data.socials || [];

  const updateSocials = (newSocials: SocialLink[]) => {
    // Re-index orders
    const indexed = newSocials.map((s, idx) => ({ ...s, order: idx + 1 }));
    onChange({
      ...data,
      socials: indexed,
    });
  };

  const handleAddPreset = (preset: (typeof PLATFORM_PRESETS)[0]) => {
    const newSocial: SocialLink = {
      id: `soc-${preset.platform}-${Date.now()}`,
      platform: preset.platform,
      label: preset.label,
      url: preset.urlPrefix,
      username: '',
      icon: preset.icon,
      order: socials.length + 1,
      enabled: true,
    };
    updateSocials([...socials, newSocial]);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= socials.length) return;

    const copy = [...socials];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    updateSocials(copy);
  };

  const handleToggle = (id: string) => {
    updateSocials(
      socials.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDelete = (id: string) => {
    updateSocials(socials.filter((s) => s.id !== id));
  };

  const handleChangeField = (id: string, fields: Partial<SocialLink>) => {
    updateSocials(
      socials.map((s) => (s.id === id ? { ...s, ...fields } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
            SOCIAL &amp; DEVELOPER PRESENCE
          </h2>
          <p className="text-xs text-signal-400 mt-1">
            Verified channels displayed in the hero profile bar.
          </p>
        </div>
      </div>

      {/* Preset Quick Add Bar */}
      <div className="p-4 rounded-xl bg-signal-900 border border-white/10 space-y-2">
        <span className="text-[11px] font-mono text-signal-400 uppercase tracking-wider block">
          Quick Add Channel Preset:
        </span>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_PRESETS.map((p) => (
            <button
              key={p.platform}
              onClick={() => handleAddPreset(p)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-200 border border-white/5 hover:border-mint-500/40 text-xs font-mono transition-colors"
            >
              <IconRenderer name={p.icon} size={14} />
              <span>+ {p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Social Items List */}
      <div className="space-y-3">
        {socials.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-signal-900 border border-white/10 text-xs font-mono text-signal-400">
            No social channels added yet. Click one of the presets above.
          </div>
        ) : (
          socials.map((social, index) => (
            <div
              key={social.id}
              className={`p-4 rounded-xl bg-signal-900 border transition-all ${
                social.enabled ? 'border-white/10' : 'border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-signal-800 text-mint-400 border border-white/10">
                    <IconRenderer name={social.icon || social.platform} size={18} />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-signal-200 font-mono">
                      {social.label}
                    </span>
                    {social.username && (
                      <span className="text-[11px] font-mono text-signal-400 ml-2">
                        ({social.username})
                      </span>
                    )}
                  </div>
                </div>

                {/* Reorder and status actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Move ${social.label} up`}
                    className="p-1.5 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === socials.length - 1}
                    aria-label={`Move ${social.label} down`}
                    className="p-1.5 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleToggle(social.id)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-semibold transition-colors ${
                      social.enabled
                        ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                        : 'bg-signal-800 text-signal-500'
                    }`}
                  >
                    {social.enabled ? 'ACTIVE' : 'DISABLED'}
                  </button>

                  <button
                    onClick={() => handleDelete(social.id)}
                    aria-label={`Delete ${social.label}`}
                    className="p-1.5 rounded hover:bg-rose-500/20 text-signal-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Edit form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-[10px] font-mono text-signal-400 mb-1">
                    Display Label
                  </label>
                  <input
                    type="text"
                    value={social.label}
                    onChange={(e) =>
                      handleChangeField(social.id, { label: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-signal-400 mb-1">
                    Username / Handle
                  </label>
                  <input
                    type="text"
                    value={social.username || ''}
                    onChange={(e) =>
                      handleChangeField(social.id, { username: e.target.value })
                    }
                    placeholder="@handle"
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-signal-400 mb-1">
                    Target URL
                  </label>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      handleChangeField(social.id, { url: e.target.value })
                    }
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
