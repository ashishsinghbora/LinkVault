import React from 'react';
import type { ProfileData } from '../../src/types/profile';

interface SeoTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export const SeoTab: React.FC<SeoTabProps> = ({ data, onChange }) => {
  const metadata = data.metadata || {
    title: '',
    description: '',
    canonicalUrl: '',
    ogImage: '',
    author: '',
    twitterHandle: '',
    robots: 'index, follow',
  };

  const updateMetadata = (fields: Partial<ProfileData['metadata']>) => {
    onChange({
      ...data,
      metadata: {
        ...metadata,
        ...fields,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
          SEO &amp; SOCIAL METADATA
        </h2>
        <p className="text-xs text-signal-400 mt-1">
          Tune search engine snippets, Open Graph cards, and canonical identity URLs.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-signal-900 border border-white/10 space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-signal-300">
            Page Title <span className="text-mint-400">*</span>
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => updateMetadata({ title: e.target.value })}
            placeholder="e.g. Ashish Singh Bora | Digital Signal Deck"
            className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-signal-300">
            Meta Description (for Search &amp; Sharing)
          </label>
          <textarea
            rows={2}
            value={metadata.description}
            onChange={(e) => updateMetadata({ description: e.target.value })}
            placeholder="Brief summary shown in Google search results and Twitter cards..."
            className="w-full px-3 py-2 text-xs bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none resize-y"
          />
        </div>

        {/* Canonical URL & Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Canonical Website URL
            </label>
            <input
              type="url"
              value={metadata.canonicalUrl || ''}
              onChange={(e) => updateMetadata({ canonicalUrl: e.target.value })}
              placeholder="https://ashishsinghbora.github.io/LinkVault"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Author Moniker
            </label>
            <input
              type="text"
              value={metadata.author || ''}
              onChange={(e) => updateMetadata({ author: e.target.value })}
              placeholder="e.g. Ashish Singh Bora"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
            />
          </div>
        </div>

        {/* Twitter Handle & OG Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Twitter / X Handle
            </label>
            <input
              type="text"
              value={metadata.twitterHandle || ''}
              onChange={(e) => updateMetadata({ twitterHandle: e.target.value })}
              placeholder="@ashishsinghbora"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-signal-300">
              Open Graph Image URL
            </label>
            <input
              type="text"
              value={metadata.ogImage || ''}
              onChange={(e) => updateMetadata({ ogImage: e.target.value })}
              placeholder="/og-image.svg"
              className="w-full px-3 py-2 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
            />
          </div>
        </div>

        {/* Live Search Card Preview */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          <span className="text-[11px] font-mono text-signal-400 uppercase tracking-wider block">
            Google Search Snippet Preview:
          </span>
          <div className="p-3.5 rounded-xl bg-signal-950 border border-white/10 font-sans space-y-1 max-w-xl">
            <span className="text-xs text-signal-400 font-mono block truncate">
              {metadata.canonicalUrl || 'https://ashishsinghbora.github.io/LinkVault'}
            </span>
            <div className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer truncate">
              {metadata.title || 'Your Name | Digital Signal Deck'}
            </div>
            <p className="text-xs text-signal-300 line-clamp-2 leading-relaxed">
              {metadata.description || 'Add a meta description to see how your site appears in search engines.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
