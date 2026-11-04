import React, { useState } from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';
import type { SpatialNodeDef } from './spatialNodes';

interface SceneFallbackProps {
  interactive?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({
  interactive = true,
  onNodeClick,
}) => {
  const [activeNode, setActiveNode] = useState<SpatialNodeDef | null>(null);

  const handleNavigate = (node: SpatialNodeDef) => {
    setActiveNode(node);
    if (onNodeClick) {
      onNodeClick(node.id);
    }
    const targetElement = document.getElementById(node.targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.pushState(null, '', `#${node.targetId}`);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      className="relative w-full h-[360px] sm:h-[430px] md:h-[490px] flex items-center justify-center select-none overflow-hidden"
      aria-label="Digital Observatory Constellation & Spatial Navigation Map"
    >
      {/* Background ambient radial glow layers (Violet & Cyan) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] rounded-full bg-violet-600/15 blur-[90px] animate-pulse-glow" />
        <div className="w-[280px] h-[280px] rounded-full bg-cyan-400/15 blur-[80px] animate-pulse-glow [animation-delay:2s]" />
      </div>

      {/* SVG Orbital Rings and Constellation Structure */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[480px] max-h-[480px] z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbit-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="orbit-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="core-glow-obs" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#10101A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#07070D" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Ring 1 - Inner Violet Ring */}
        <g className="animate-orbital-spin origin-[250px_250px]">
          <ellipse
            cx="250"
            cy="250"
            rx="210"
            ry="75"
            transform="rotate(-25 250 250)"
            stroke="url(#orbit-violet)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          {/* Identity Node */}
          <circle cx="85" cy="180" r="4.5" fill="#A855F7" filter="drop-shadow(0 0 6px #A855F7)" />
          {/* Projects Node */}
          <circle cx="415" cy="320" r="4.5" fill="#22D3EE" filter="drop-shadow(0 0 6px #22D3EE)" />
        </g>

        {/* Ring 2 - Middle Cyan Ring */}
        <g className="animate-orbital-spin-reverse origin-[250px_250px]">
          <ellipse
            cx="250"
            cy="250"
            rx="175"
            ry="65"
            transform="rotate(35 250 250)"
            stroke="url(#orbit-cyan)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Research Node */}
          <circle cx="385" cy="190" r="4" fill="#8B5CF6" filter="drop-shadow(0 0 6px #8B5CF6)" />
          {/* Activity Node */}
          <circle cx="115" cy="310" r="4" fill="#67E8F9" filter="drop-shadow(0 0 6px #67E8F9)" />
        </g>

        {/* Ring 3 - Outer Observatory Ring */}
        <g className="animate-orbital-spin origin-[250px_250px] [animation-duration:36s]">
          <ellipse
            cx="250"
            cy="250"
            rx="130"
            ry="45"
            transform="rotate(-5 250 250)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
          {/* Media Node */}
          <circle cx="360" cy="245" r="3.5" fill="#F43F5E" filter="drop-shadow(0 0 4px #F43F5E)" />
          {/* Credentials Node */}
          <circle cx="140" cy="255" r="3.5" fill="#FBBF24" filter="drop-shadow(0 0 4px #FBBF24)" />
        </g>

        {/* Connector Lines to Nucleus */}
        <line x1="250" y1="250" x2="85" y2="180" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" />
        <line x1="250" y1="250" x2="415" y2="320" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" />
        <line x1="250" y1="250" x2="385" y2="190" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" />
        <line x1="250" y1="250" x2="115" y2="310" stroke="rgba(103, 232, 249, 0.25)" strokeWidth="1" />

        {/* Central Core */}
        <circle cx="250" cy="250" r="54" fill="url(#core-glow-obs)" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1.5" />
        <polygon
          points="250,210 285,230 285,270 250,290 215,270 215,230"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="1.2"
          opacity="0.75"
        />
        <circle cx="250" cy="250" r="16" fill="#A855F7" opacity="0.9" filter="drop-shadow(0 0 10px #A855F7)" />
      </svg>

      {/* Top Observatory HUD */}
      <div className="absolute top-2 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md text-[10px] font-mono text-signal-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-widest uppercase">CONSTELLATION OBSERVATORY // 7 NODES</span>
        </div>
      </div>

      {/* Bottom Interactive Node Status Bar */}
      {interactive && (
        <div className="absolute bottom-2 left-4 right-4 z-20 flex flex-col items-center gap-2">
          <div className="max-w-md w-full px-3.5 py-2 rounded-xl bg-surface/90 border border-white/10 backdrop-blur-md shadow-glass-card text-center">
            {activeNode ? (
              <div className="flex items-center justify-between gap-3 text-left">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeNode.colorHex }}
                    />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-signal-100 truncate">
                      {activeNode.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-signal-400 truncate mt-0.5">{activeNode.description}</p>
                </div>
                <button
                  onClick={() => handleNavigate(activeNode)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-raised hover:bg-violet-deep border border-white/15 hover:border-violet-electric text-[10px] font-mono text-signal-100 transition-colors flex-shrink-0"
                >
                  <span>Navigate</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-signal-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-electric animate-pulse" />
                <span>SELECT OR TAP DESTINATION NODES BELOW</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneFallback;
