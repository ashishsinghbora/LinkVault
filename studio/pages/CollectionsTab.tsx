import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  FolderPlus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { ProfileData, LinkCollection, LinkItem } from '../../src/types/profile';
import { IconRenderer } from '../../src/components/shared/IconRenderer';

interface CollectionsTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export const CollectionsTab: React.FC<CollectionsTabProps> = ({ data, onChange }) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
    data.collections[0]?.id || null
  );

  const collections = data.collections || [];

  const updateCollections = (newCols: LinkCollection[]) => {
    const indexed = newCols.map((c, i) => ({ ...c, order: i + 1 }));
    onChange({
      ...data,
      collections: indexed,
    });
  };

  const handleAddCollection = () => {
    const newCol: LinkCollection = {
      id: `col-${Date.now()}`,
      title: 'New Collection',
      description: 'Curated technical links and tools.',
      icon: 'folder',
      order: collections.length + 1,
      enabled: true,
      items: [],
    };
    updateCollections([...collections, newCol]);
    setActiveCollectionId(newCol.id);
  };

  const handleMoveCollection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= collections.length) return;
    const copy = [...collections];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    updateCollections(copy);
  };

  const handleDeleteCollection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entire collection?')) {
      updateCollections(collections.filter((c) => c.id !== id));
      if (activeCollectionId === id) {
        setActiveCollectionId(collections[0]?.id || null);
      }
    }
  };

  const handleUpdateCollection = (id: string, fields: Partial<LinkCollection>) => {
    updateCollections(
      collections.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
  };

  const handleAddLink = (colId: string) => {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;

    const newLink: LinkItem = {
      id: `lnk-${Date.now()}`,
      title: 'New Link',
      description: 'Resource description or summary.',
      url: 'https://',
      icon: 'link',
      badge: '',
      featured: false,
      order: (col.items || []).length + 1,
      enabled: true,
    };

    handleUpdateCollection(colId, {
      items: [...(col.items || []), newLink],
    });
  };

  const handleMoveLink = (colId: string, linkIndex: number, direction: 'up' | 'down') => {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;

    const target = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    if (target < 0 || target >= col.items.length) return;

    const copy = [...col.items];
    const temp = copy[linkIndex];
    copy[linkIndex] = copy[target];
    copy[target] = temp;

    const indexed = copy.map((item, i) => ({ ...item, order: i + 1 }));
    handleUpdateCollection(colId, { items: indexed });
  };

  const handleUpdateLink = (colId: string, linkId: string, fields: Partial<LinkItem>) => {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;

    const updated = col.items.map((item) =>
      item.id === linkId ? { ...item, ...fields } : item
    );
    handleUpdateCollection(colId, { items: updated });
  };

  const handleDeleteLink = (colId: string, linkId: string) => {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;

    const filtered = col.items.filter((item) => item.id !== linkId);
    handleUpdateCollection(colId, { items: filtered });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-mono text-signal-100 uppercase tracking-wider">
            LINK COLLECTIONS &amp; DIRECTORIES
          </h2>
          <p className="text-xs text-signal-400 mt-1">
            Group links into categorized sections with badges, icons, and featured toggles.
          </p>
        </div>

        <button
          onClick={handleAddCollection}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections List */}
      <div className="space-y-4">
        {collections.map((col, colIndex) => {
          const isExpanded = activeCollectionId === col.id;

          return (
            <div
              key={col.id}
              className="rounded-2xl bg-signal-900 border border-white/10 overflow-hidden"
            >
              {/* Collection Header Bar */}
              <div className="p-4 bg-signal-850/80 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() =>
                    setActiveCollectionId(isExpanded ? null : col.id)
                  }
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20">
                    <IconRenderer name={col.icon || 'folder'} size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold font-mono text-xs text-signal-100 uppercase tracking-wide">
                      {col.title}
                    </h3>
                    <span className="text-[10px] font-mono text-signal-500">
                      {col.items?.length || 0} links inside
                    </span>
                  </div>
                </div>

                {/* Collection Management Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleMoveCollection(colIndex, 'up')}
                    disabled={colIndex === 0}
                    aria-label={`Move collection ${col.title} up`}
                    className="p-1 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveCollection(colIndex, 'down')}
                    disabled={colIndex === collections.length - 1}
                    aria-label={`Move collection ${col.title} down`}
                    className="p-1 rounded hover:bg-white/10 text-signal-400 hover:text-signal-200 disabled:opacity-20"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      handleUpdateCollection(col.id, { enabled: !col.enabled })
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      col.enabled
                        ? 'bg-mint-500/20 text-mint-400'
                        : 'bg-signal-800 text-signal-500'
                    }`}
                  >
                    {col.enabled ? 'ACTIVE' : 'OFF'}
                  </button>

                  <button
                    onClick={() => handleDeleteCollection(col.id)}
                    aria-label={`Delete collection ${col.title}`}
                    className="p-1 rounded hover:bg-rose-500/20 text-signal-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveCollectionId(isExpanded ? null : col.id)
                    }
                    className="p-1 text-signal-400"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Collection Details & Link Items */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {/* Category Details form */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-white/5">
                    <div>
                      <label className="block text-[10px] font-mono text-signal-400 mb-1">
                        Category Title
                      </label>
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) =>
                          handleUpdateCollection(col.id, { title: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-signal-400 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={col.description || ''}
                        onChange={(e) =>
                          handleUpdateCollection(col.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-signal-400 mb-1">
                        Icon Name
                      </label>
                      <input
                        type="text"
                        value={col.icon || 'folder'}
                        onChange={(e) =>
                          handleUpdateCollection(col.id, { icon: e.target.value })
                        }
                        placeholder="terminal, folder, book-open"
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-signal-950 border border-white/10 rounded-lg text-signal-100 outline-none"
                      />
                    </div>
                  </div>

                  {/* Links Inside Collection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-signal-400 uppercase tracking-wider">
                        LINKS IN &quot;{col.title}&quot;
                      </span>
                      <button
                        onClick={() => handleAddLink(col.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-mint-500/15 hover:bg-mint-500/25 text-mint-400 border border-mint-500/30 text-[11px] font-mono transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Link</span>
                      </button>
                    </div>

                    {(!col.items || col.items.length === 0) ? (
                      <div className="p-4 text-center rounded-xl bg-signal-950 border border-white/5 text-xs font-mono text-signal-500">
                        No links in this collection. Click &quot;Add Link&quot; above.
                      </div>
                    ) : (
                      col.items.map((item, linkIdx) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-signal-950 border border-white/5 space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-signal-800 text-signal-400">
                                #{linkIdx + 1}
                              </span>
                              <span className="text-xs font-semibold text-signal-200">
                                {item.title || 'Untitled Link'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Featured Toggle */}
                              <button
                                onClick={() =>
                                  handleUpdateLink(col.id, item.id, {
                                    featured: !item.featured,
                                  })
                                }
                                title="Toggle Featured Transmission"
                                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                                  item.featured
                                    ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                                    : 'text-signal-500 hover:text-signal-300'
                                }`}
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>{item.featured ? 'FEATURED' : 'FEATURE'}</span>
                              </button>

                              <button
                                onClick={() =>
                                  handleMoveLink(col.id, linkIdx, 'up')
                                }
                                disabled={linkIdx === 0}
                                aria-label={`Move link ${item.title} up`}
                                className="p-1 rounded hover:bg-white/10 text-signal-400 disabled:opacity-20"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() =>
                                  handleMoveLink(col.id, linkIdx, 'down')
                                }
                                disabled={linkIdx === col.items.length - 1}
                                aria-label={`Move link ${item.title} down`}
                                className="p-1 rounded hover:bg-white/10 text-signal-400 disabled:opacity-20"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() =>
                                  handleUpdateLink(col.id, item.id, {
                                    enabled: !item.enabled,
                                  })
                                }
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                  item.enabled
                                    ? 'bg-mint-500/10 text-mint-400'
                                    : 'bg-signal-800 text-signal-500'
                                }`}
                              >
                                {item.enabled ? 'ON' : 'OFF'}
                              </button>

                              <button
                                onClick={() => handleDeleteLink(col.id, item.id)}
                                aria-label={`Delete link ${item.title}`}
                                className="p-1 rounded hover:bg-rose-500/20 text-signal-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Link Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                            <div className="sm:col-span-1">
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) =>
                                  handleUpdateLink(col.id, item.id, {
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Link title"
                                className="w-full px-2 py-1 text-xs font-mono bg-signal-900 border border-white/10 rounded text-signal-100 outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="url"
                                value={item.url}
                                onChange={(e) =>
                                  handleUpdateLink(col.id, item.id, {
                                    url: e.target.value,
                                  })
                                }
                                placeholder="https://..."
                                className="w-full px-2 py-1 text-xs font-mono bg-signal-900 border border-white/10 rounded text-signal-100 outline-none"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <input
                                type="text"
                                value={item.badge || ''}
                                onChange={(e) =>
                                  handleUpdateLink(col.id, item.id, {
                                    badge: e.target.value,
                                  })
                                }
                                placeholder="Badge (e.g. NEW, LIVE)"
                                className="w-full px-2 py-1 text-xs font-mono bg-signal-900 border border-white/10 rounded text-signal-100 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={item.description || ''}
                              onChange={(e) =>
                                handleUpdateLink(col.id, item.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Optional description..."
                              className="w-full px-2 py-1 text-xs bg-signal-900 border border-white/10 rounded text-signal-100 outline-none"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
