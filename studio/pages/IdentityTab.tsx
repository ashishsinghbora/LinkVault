import React from 'react';
import type { ProfileData, AvailabilityStatus } from '../../src/types/profile';

interface IdentityTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export const IdentityTab: React.FC<IdentityTabProps> = ({ data, onChange }) => {
  const profile = data.profile;

  const updateProfile = (fields: Partial<ProfileData['profile']>) => {
    onChange({
      ...data,
      profile: {
        ...profile,
        ...fields,
      },
    });
  };

  const updateAvailability = (status: AvailabilityStatus, label: string) => {
    onChange({
      ...data,
      profile: {
        ...profile,
        availability: {
          status,
          label,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
          IDENTITY &amp; BIO CONFIGURATION
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Customize your public presence, verified moniker, headline, and availability.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-4">
        {/* Full Name & Initials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Full Name <span className="text-mint-400">*</span>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              placeholder="e.g. Ashish Singh Bora"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Initials Fallback
            </label>
            <input
              type="text"
              maxLength={3}
              value={profile.initialsFallback || ''}
              onChange={(e) => updateProfile({ initialsFallback: e.target.value })}
              placeholder="e.g. AB"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none uppercase"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-signal-300">
            Professional Headline
          </label>
          <input
            type="text"
            value={profile.headline}
            onChange={(e) => updateProfile({ headline: e.target.value })}
            placeholder="e.g. Systems & Security Engineer • Open Source Maintainer"
            className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
          />
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-signal-300">
            Short Biography
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            placeholder="Introduce your mission, technical focus, and open-source contributions..."
            className="w-full px-3 py-2 text-xs bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none resize-y"
          />
        </div>

        {/* Avatar URL & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Avatar Image URL (Optional)
            </label>
            <input
              type="text"
              value={profile.avatar || ''}
              onChange={(e) => updateProfile({ avatar: e.target.value })}
              placeholder="https://github.com/ashishsinghbora.png"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
            />
            <p className="text-[10px] text-signal-500 font-mono">
              Leave blank to use clean initials avatar.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Location &amp; Timezone
            </label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => updateProfile({ location: e.target.value })}
              placeholder="e.g. Bengaluru, India • UTC+5:30"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
            />
          </div>
        </div>

        {/* Availability Status */}
        <div className="pt-2 border-t border-white/5 space-y-3">
          <label className="block text-xs font-mono font-medium text-signal-300">
            Availability Signal Indicator
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <select
                value={profile.availability?.status || 'available'}
                onChange={(e) =>
                  updateAvailability(
                    e.target.value as AvailabilityStatus,
                    profile.availability?.label || 'Available'
                  )
                }
                className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
              >
                <option value="available">Available (Green)</option>
                <option value="busy">Engaged / Busy (Amber)</option>
                <option value="stealth">Stealth / Minimal (Muted)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <input
                type="text"
                value={profile.availability?.label || ''}
                onChange={(e) =>
                  updateAvailability(
                    profile.availability?.status || 'available',
                    e.target.value
                  )
                }
                placeholder="e.g. Available for Architecture & Security Consulting"
                className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Direct Contact & Cryptographic GPG */}
        <div className="pt-2 border-t border-white/5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-signal-400 uppercase tracking-wider">
            DIRECT CHANNELS &amp; CRYPTOGRAPHY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-signal-300">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => updateProfile({ email: e.target.value })}
                placeholder="e.g. you@example.com"
                className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-signal-300">
                Personal Domain / Website
              </label>
              <input
                type="url"
                value={profile.website || ''}
                onChange={(e) => updateProfile({ website: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              GPG Public Key Fingerprint
            </label>
            <input
              type="text"
              value={profile.gpgFingerprint || ''}
              onChange={(e) => updateProfile({ gpgFingerprint: e.target.value })}
              placeholder="e.g. 9F8B 32C1 4A5D 7E6F 1B2C 3D4E 5F6A 7B8C 9D0E 1F2A"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 focus:border-mint-400 outline-none select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
