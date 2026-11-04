import { ExternalLink, PlayCircle } from 'lucide-react';
import { BrandIcon } from '../shared/BrandIcon';
import type { MediaSection as MediaSectionType } from '../../types/profile';

interface MediaSectionProps {
  sections: MediaSectionType[];
}

function VideoCard({ video }: { video: MediaSectionType['videos'][number] }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-signal-800 bg-signal-900/60 hover:border-mint-500/50 hover:bg-signal-800/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:ring-offset-2 focus:ring-offset-signal-950"
      aria-label={`Watch: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-signal-800">
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for: ${video.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-signal-900/80 border border-mint-400/60 shadow-lg">
            <PlayCircle className="w-8 h-8 text-mint-400" aria-hidden="true" />
          </div>
        </div>
        {/* YouTube badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
          <BrandIcon name="youtube" className="w-3 h-3 text-red-500" size={12} />
          <span className="text-[10px] font-mono text-signal-300 uppercase tracking-wider">YouTube</span>
        </div>
      </div>

      {/* Video info */}
      <div className="flex flex-col gap-1.5 p-3">
        <h4 className="text-sm font-semibold text-signal-100 group-hover:text-mint-300 line-clamp-2 leading-snug transition-colors duration-150">
          {video.title}
        </h4>
        {video.description && (
          <p className="text-xs text-signal-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        )}
        <div className="mt-auto pt-1.5 flex items-center gap-1 text-xs text-signal-500 group-hover:text-mint-400 transition-colors duration-150">
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span className="font-mono">Watch on YouTube</span>
        </div>
      </div>
    </a>
  );
}

export function MediaSection({ sections }: MediaSectionProps) {
  const enabled = sections.filter((s) => s.enabled);
  if (!enabled.length) return null;

  return (
    <>
      {enabled.map((section) => {
        const enabledVideos = section.videos.filter((v) => v.enabled);
        if (!enabledVideos.length && !section.channelUrl) return null;

        return (
          <section
            key={section.id}
            aria-labelledby={`media-heading-${section.id}`}
            className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8"
          >
            {/* Section header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* YouTube icon accent */}
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500/10 border border-red-500/20">
                  <BrandIcon name="youtube" className="w-4 h-4 text-red-400" size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-signal-500">
                      MEDIA
                    </span>
                  </div>
                  <h2
                    id={`media-heading-${section.id}`}
                    className="text-xl font-bold text-signal-100"
                  >
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Channel link */}
              {section.channelUrl && (
                <a
                  href={section.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/5 text-red-400 hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-signal-950"
                  aria-label={`Visit ${section.channelLabel || 'YouTube channel'}`}
                >
                  <BrandIcon name="youtube" className="w-3.5 h-3.5 text-red-400" size={14} />
                  <span>{section.channelLabel || 'View Channel'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Section description */}
            {section.description && (
              <p className="text-sm text-signal-400 mb-5 ml-11">{section.description}</p>
            )}

            {/* Video grid */}
            {enabledVideos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enabledVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}

            {/* Note about partial history */}
            <p className="mt-4 text-xs text-signal-600 font-mono text-center">
              Select videos · Full history at{' '}
              {section.channelUrl ? (
                <a
                  href={section.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-500 hover:text-mint-400 underline underline-offset-2 transition-colors"
                >
                  YouTube
                </a>
              ) : (
                'YouTube'
              )}
            </p>
          </section>
        );
      })}
    </>
  );
}
