import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Play, ExternalLink } from 'lucide-react';
import { BrandIcon } from '../../src/components/shared/BrandIcon';
import type { ProfileData, MediaSection, MediaVideo } from '../../src/types/profile';

interface MediaTabProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

function extractYouTubeId(url: string): string {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

export const MediaTab: React.FC<MediaTabProps> = ({ data, onChange }) => {
  const mediaSections = data.mediaSections || [];
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    mediaSections[0]?.id || ''
  );

  const updateSections = (newSections: MediaSection[]) => {
    const indexed = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
    onChange({
      ...data,
      mediaSections: indexed,
    });
  };

  const handleAddSection = () => {
    const newId = `media-${Date.now()}`;
    const newSection: MediaSection = {
      id: newId,
      title: 'New Media Section',
      description: 'Channel videos, live streams, and tutorials.',
      channelUrl: 'https://www.youtube.com/',
      channelLabel: 'Channel',
      videos: [],
      order: mediaSections.length + 1,
      enabled: true,
    };
    updateSections([...mediaSections, newSection]);
    setSelectedSectionId(newId);
  };

  const handleDeleteSection = (id: string) => {
    const next = mediaSections.filter((s) => s.id !== id);
    updateSections(next);
    if (selectedSectionId === id) {
      setSelectedSectionId(next[0]?.id || '');
    }
  };

  const handleUpdateSection = (id: string, fields: Partial<MediaSection>) => {
    updateSections(
      mediaSections.map((s) => (s.id === id ? { ...s, ...fields } : s))
    );
  };

  const handleAddVideo = (sectionId: string) => {
    const section = mediaSections.find((s) => s.id === sectionId);
    if (!section) return;

    const newVideo: MediaVideo = {
      id: `vid-${Date.now()}`,
      title: 'New Video Title',
      url: 'https://www.youtube.com/watch?v=',
      videoId: '',
      description: '',
      order: (section.videos?.length || 0) + 1,
      enabled: true,
    };

    handleUpdateSection(sectionId, {
      videos: [...(section.videos || []), newVideo],
    });
  };

  const handleUpdateVideo = (
    sectionId: string,
    videoId: string,
    fields: Partial<MediaVideo>
  ) => {
    const section = mediaSections.find((s) => s.id === sectionId);
    if (!section) return;

    // Auto-extract videoId if URL is edited
    if (fields.url && !fields.videoId) {
      const extracted = extractYouTubeId(fields.url);
      if (extracted) {
        fields.videoId = extracted;
      }
    }

    const updatedVideos = (section.videos || []).map((v) =>
      v.id === videoId ? { ...v, ...fields } : v
    );

    handleUpdateSection(sectionId, { videos: updatedVideos });
  };

  const handleDeleteVideo = (sectionId: string, videoId: string) => {
    const section = mediaSections.find((s) => s.id === sectionId);
    if (!section) return;

    handleUpdateSection(sectionId, {
      videos: (section.videos || []).filter((v) => v.id !== videoId),
    });
  };

  const handleMoveVideo = (
    sectionId: string,
    index: number,
    direction: 'up' | 'down'
  ) => {
    const section = mediaSections.find((s) => s.id === sectionId);
    if (!section || !section.videos) return;

    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= section.videos.length) return;

    const copy = [...section.videos];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;

    handleUpdateSection(sectionId, {
      videos: copy.map((v, i) => ({ ...v, order: i + 1 })),
    });
  };

  const activeSection =
    mediaSections.find((s) => s.id === selectedSectionId) || mediaSections[0];

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-signal-100 flex items-center gap-2">
            <BrandIcon name="youtube" className="w-5 h-5 text-red-500" size={20} />
            <span>Media & YouTube Transmissions</span>
          </h2>
          <p className="text-xs text-signal-400 mt-1">
            Showcase YouTube channels, hardware builds, tutorials, and recorded talks.
          </p>
        </div>
        <button
          onClick={handleAddSection}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mint-500 text-signal-950 font-bold text-xs hover:bg-mint-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Section</span>
        </button>
      </div>

      {mediaSections.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-signal-900/50 border border-white/5">
          <p className="text-signal-400 text-sm mb-4">No media sections configured.</p>
          <button
            onClick={handleAddSection}
            className="px-4 py-2 rounded-lg bg-signal-800 hover:bg-signal-750 text-signal-200 text-xs font-mono"
          >
            Create first channel / video section
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section Selector Pills */}
          {mediaSections.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {mediaSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors ${
                    sec.id === (activeSection?.id || '')
                      ? 'bg-signal-800 text-mint-400 border border-mint-500/30'
                      : 'bg-signal-900 text-signal-400 hover:text-signal-200 border border-white/5'
                  }`}
                >
                  <span>{sec.title}</span>
                  <span className="text-[10px] opacity-70">
                    ({sec.videos?.length || 0})
                  </span>
                </button>
              ))}
            </div>
          )}

          {activeSection && (
            <div className="rounded-xl bg-signal-900 border border-white/10 p-5 space-y-6">
              {/* Section Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-signal-400 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={activeSection.title}
                    onChange={(e) =>
                      handleUpdateSection(activeSection.id, { title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-signal-950 border border-white/10 text-signal-100 text-sm focus:border-mint-500 focus:outline-none"
                    placeholder="e.g. Techie Ashish"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-signal-400 mb-1">
                    Channel Label
                  </label>
                  <input
                    type="text"
                    value={activeSection.channelLabel || ''}
                    onChange={(e) =>
                      handleUpdateSection(activeSection.id, { channelLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-signal-950 border border-white/10 text-signal-100 text-sm focus:border-mint-500 focus:outline-none"
                    placeholder="e.g. @Techie-Ashish"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-signal-400 mb-1">
                    Channel URL
                  </label>
                  <input
                    type="url"
                    value={activeSection.channelUrl || ''}
                    onChange={(e) =>
                      handleUpdateSection(activeSection.id, { channelUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-signal-950 border border-white/10 text-signal-100 text-sm focus:border-mint-500 focus:outline-none font-mono"
                    placeholder="https://www.youtube.com/@Techie-Ashish"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-signal-400 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={activeSection.description || ''}
                    onChange={(e) =>
                      handleUpdateSection(activeSection.id, { description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-signal-950 border border-white/10 text-signal-100 text-sm focus:border-mint-500 focus:outline-none"
                    placeholder="Hardware repair, OS setup, and Linux experiments."
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-2 border-t border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-signal-300">
                    <input
                      type="checkbox"
                      checked={activeSection.enabled}
                      onChange={(e) =>
                        handleUpdateSection(activeSection.id, { enabled: e.target.checked })
                      }
                      className="rounded bg-signal-950 border-white/20 text-mint-500 focus:ring-mint-500"
                    />
                    <span>Section Visible on Public Profile</span>
                  </label>
                  <button
                    onClick={() => handleDeleteSection(activeSection.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Section</span>
                  </button>
                </div>
              </div>

              {/* Videos Header */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-signal-200 flex items-center gap-2">
                  <Play className="w-4 h-4 text-mint-400" />
                  <span>Videos ({activeSection.videos?.length || 0})</span>
                </h3>
                <button
                  onClick={() => handleAddVideo(activeSection.id)}
                  className="px-2.5 py-1 rounded bg-signal-800 hover:bg-signal-750 text-signal-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Video</span>
                </button>
              </div>

              {/* Videos List */}
              <div className="space-y-4">
                {(activeSection.videos || []).map((video, idx) => (
                  <div
                    key={video.id}
                    className="rounded-lg bg-signal-950/80 border border-white/10 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-signal-800 text-signal-400">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={video.title}
                          onChange={(e) =>
                            handleUpdateVideo(activeSection.id, video.id, {
                              title: e.target.value,
                            })
                          }
                          className="font-semibold text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:border-mint-500 text-signal-100 focus:outline-none w-full max-w-md"
                          placeholder="Video Title"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveVideo(activeSection.id, idx, 'up')}
                          disabled={idx === 0}
                          aria-label="Move video up"
                          className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveVideo(activeSection.id, idx, 'down')}
                          disabled={idx === (activeSection.videos?.length || 0) - 1}
                          aria-label="Move video down"
                          className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(activeSection.id, video.id)}
                          aria-label="Delete video"
                          className="p-1 rounded text-signal-400 hover:text-red-400 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-mono text-signal-400 mb-1">
                          YouTube URL
                        </label>
                        <input
                          type="url"
                          value={video.url}
                          onChange={(e) =>
                            handleUpdateVideo(activeSection.id, video.id, {
                              url: e.target.value,
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded bg-signal-900 border border-white/10 text-signal-100 font-mono text-xs focus:border-mint-500 focus:outline-none"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-signal-400 mb-1">
                          Video ID (11 chars)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={video.videoId}
                            onChange={(e) =>
                              handleUpdateVideo(activeSection.id, video.id, {
                                videoId: e.target.value.trim(),
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-signal-900 border border-white/10 text-signal-100 font-mono text-xs focus:border-mint-500 focus:outline-none"
                            placeholder="e.g. YvRS3thO0f0"
                          />
                          {video.url && (
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-signal-900 hover:bg-signal-800 text-signal-400 hover:text-mint-400 border border-white/10 flex-shrink-0"
                              title="Test link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-mono text-signal-400 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={video.description || ''}
                          onChange={(e) =>
                            handleUpdateVideo(activeSection.id, video.id, {
                              description: e.target.value,
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded bg-signal-900 border border-white/10 text-signal-100 text-xs focus:border-mint-500 focus:outline-none"
                          placeholder="Brief description of the video content"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer text-signal-400 hover:text-signal-200">
                        <input
                          type="checkbox"
                          checked={video.enabled}
                          onChange={(e) =>
                            handleUpdateVideo(activeSection.id, video.id, {
                              enabled: e.target.checked,
                            })
                          }
                          className="rounded bg-signal-900 border-white/20 text-mint-500 focus:ring-mint-500"
                        />
                        <span>Active</span>
                      </label>
                      {video.videoId && (
                        <span className="text-[10px] font-mono text-signal-500">
                          Thumbnail: img.youtube.com/vi/{video.videoId}/mqdefault.jpg
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
