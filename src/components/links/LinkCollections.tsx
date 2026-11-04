import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Folder } from 'lucide-react';
import type { LinkCollection, LinkItem } from '../../types/profile';
import { IconRenderer } from '../shared/IconRenderer';

interface LinkCollectionsProps {
  collections: LinkCollection[];
  searchQuery?: string;
}

export const LinkCollections: React.FC<LinkCollectionsProps> = ({
  collections,
  searchQuery = '',
}) => {
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    collections.forEach((c) => {
      if (c.collapsedByDefault) {
        map[c.id] = true;
      }
    });
    return map;
  });

  const toggleCollection = (id: string) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const query = searchQuery.toLowerCase().trim();

  // Filter collections and items based on search query
  const filteredCollections = collections
    .map((collection) => {
      const items = (collection.items || []).filter((item) => {
        if (!query) return true;
        return (
          item.title.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.badge && item.badge.toLowerCase().includes(query)) ||
          item.url.toLowerCase().includes(query)
        );
      });

      return {
        ...collection,
        items,
      };
    })
    .filter((c) => c.items.length > 0 || !query);

  if (filteredCollections.length === 0) {
    if (!query) return null;
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-8 text-center py-10 rounded-xl bg-signal-900/50 border border-white/5 font-mono text-xs text-signal-400">
        // NO LINKS FOUND MATCHING &quot;{searchQuery}&quot;
      </div>
    );
  }

  return (
    <section
      id="collections-section"
      aria-labelledby="collections-heading"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12 space-y-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-signal-800 text-signal-300 border border-white/10">
          <Folder className="w-4 h-4" />
        </div>
        <h2
          id="collections-heading"
          className="text-xs font-mono font-bold tracking-widest text-signal-400 uppercase"
        >
          // DIRECTORY INDEX
        </h2>
      </div>

      {filteredCollections.map((collection) => {
        const isCollapsed = !query && !!collapsedMap[collection.id];

        return (
          <div
            key={collection.id}
            className="rounded-2xl bg-signal-900 dark:bg-signal-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 overflow-hidden shadow-signal-card transition-all"
          >
            {/* Collection Header */}
            <button
              onClick={() => toggleCollection(collection.id)}
              aria-expanded={!isCollapsed}
              className="w-full flex items-center justify-between p-4 bg-signal-850/60 dark:bg-signal-850/60 light:bg-slate-50 border-b border-white/5 dark:border-white/5 light:border-slate-200 hover:bg-signal-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20">
                  <IconRenderer name={collection.icon || 'folder'} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono tracking-wide text-signal-100 dark:text-signal-100 light:text-slate-900">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-[11px] text-signal-400 mt-0.5">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal-800 dark:bg-signal-800 light:bg-slate-200 text-signal-400">
                  {collection.items.length} {collection.items.length === 1 ? 'item' : 'items'}
                </span>
                <span className="text-signal-400">
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </span>
              </div>
            </button>

            {/* Collection Items */}
            {!isCollapsed && (
              <div className="divide-y divide-white/5 dark:divide-white/5 light:divide-slate-100">
                {collection.items.map((item: LinkItem) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 hover:bg-signal-850/50 dark:hover:bg-signal-850/50 light:hover:bg-slate-50 transition-all duration-150"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-signal-800 dark:bg-signal-800 light:bg-slate-100 text-signal-300 dark:text-signal-300 light:text-slate-700 border border-white/5 group-hover:border-mint-400/50 group-hover:text-mint-400 transition-colors">
                        <IconRenderer name={item.icon || 'link'} size={18} />
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-signal-100 dark:text-signal-100 light:text-slate-900 group-hover:text-mint-400 transition-colors truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-mint-500/10 text-mint-400 border border-mint-500/20">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-signal-400 truncate mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 pl-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-mint-500/20 text-signal-400 group-hover:text-mint-400 transition-all">
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
