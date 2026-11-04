import React from 'react';

interface SceneFallbackProps {
  interactive?: boolean;
}

export const SceneFallback: React.FC<SceneFallbackProps> = () => {
  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center select-none overflow-hidden"
      aria-label="Digital Identity Core visual representation"
    >
      {/* Background ambient radial glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] rounded-full bg-emerald-500/15 blur-[80px] animate-pulse-glow" />
        <div className="w-[280px] h-[280px] rounded-full bg-violet-600/15 blur-[70px] animate-pulse-glow [animation-delay:2s]" />
      </div>

      {/* SVG Orbital Rings and Constellation Structure */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[460px] max-h-[460px] z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbit-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06A679" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06A679" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00f59b" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="orbit-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C5CF5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7C5CF5" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06A679" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#0B1018" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#05070D" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="node-glow-emerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f59b" />
            <stop offset="100%" stopColor="#06A679" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-glow-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C5CF5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Ring 1 - Emerald */}
        <g className="animate-orbital-spin origin-[250px_250px]">
          <ellipse
            cx="250"
            cy="250"
            rx="210"
            ry="75"
            transform="rotate(-25 250 250)"
            stroke="url(#orbit-emerald)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          {/* Orbital Node: GitHub */}
          <circle cx="85" cy="180" r="4.5" fill="#00f59b" filter="drop-shadow(0 0 6px #06A679)" />
          {/* Orbital Node: Projects */}
          <circle cx="415" cy="320" r="4" fill="#00f59b" filter="drop-shadow(0 0 6px #06A679)" />
        </g>

        {/* Middle Ring 2 - Violet */}
        <g className="animate-orbital-spin-reverse origin-[250px_250px]">
          <ellipse
            cx="250"
            cy="250"
            rx="180"
            ry="65"
            transform="rotate(35 250 250)"
            stroke="url(#orbit-violet)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Orbital Node: LinkedIn */}
          <circle cx="390" cy="190" r="4" fill="#A78BFA" filter="drop-shadow(0 0 6px #7C5CF5)" />
          {/* Orbital Node: Research */}
          <circle cx="110" cy="310" r="3.5" fill="#A78BFA" filter="drop-shadow(0 0 6px #7C5CF5)" />
        </g>

        {/* Inner Ring 3 - Equatorial */}
        <g className="animate-orbital-spin origin-[250px_250px] [animation-duration:18s]">
          <ellipse
            cx="250"
            cy="250"
            rx="130"
            ry="45"
            transform="rotate(-5 250 250)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
          {/* Orbital Node: Portfolio */}
          <circle cx="360" cy="245" r="3.5" fill="#00e5ff" filter="drop-shadow(0 0 4px #00e5ff)" />
          {/* Orbital Node: YouTube */}
          <circle cx="140" cy="255" r="3.5" fill="#f43f5e" filter="drop-shadow(0 0 4px #f43f5e)" />
        </g>

        {/* Laser Ray Connectors */}
        <line x1="250" y1="250" x2="85" y2="180" stroke="rgba(6, 166, 121, 0.25)" strokeWidth="0.8" />
        <line x1="250" y1="250" x2="390" y2="190" stroke="rgba(124, 92, 245, 0.25)" strokeWidth="0.8" />
        <line x1="250" y1="250" x2="415" y2="320" stroke="rgba(6, 166, 121, 0.25)" strokeWidth="0.8" />
        <line x1="250" y1="250" x2="110" y2="310" stroke="rgba(124, 92, 245, 0.25)" strokeWidth="0.8" />

        {/* Central Core Sphere */}
        <circle cx="250" cy="250" r="44" fill="url(#core-glow)" stroke="rgba(6, 166, 121, 0.5)" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="36" fill="#0B1018" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="250" cy="250" r="14" fill="#06A679" filter="drop-shadow(0 0 12px #00f59b)" opacity="0.9" />

        {/* Monogram AS inside core */}
        <text
          x="250"
          y="254"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F1F5F6"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="bold"
          letterSpacing="0.1em"
        >
          AS
        </text>

        {/* Floating tech crosshairs */}
        <line x1="250" y1="180" x2="250" y2="192" stroke="rgba(6, 166, 121, 0.4)" strokeWidth="1" />
        <line x1="250" y1="308" x2="250" y2="320" stroke="rgba(6, 166, 121, 0.4)" strokeWidth="1" />
        <line x1="180" y1="250" x2="192" y2="250" stroke="rgba(124, 92, 245, 0.4)" strokeWidth="1" />
        <line x1="308" y1="250" x2="320" y2="250" stroke="rgba(124, 92, 245, 0.4)" strokeWidth="1" />
      </svg>

      {/* Status indicator bottom badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-signal-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
        <span>IDENTITY CORE // ONLINE</span>
      </div>
    </div>
  );
};
