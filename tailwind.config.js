/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./studio.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./studio/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#05070D",
        surface: {
          DEFAULT: "#0B1018",
          raised: "#101925",
          overlay: "#162233",
        },
        signal: {
          950: "#05070D", // Deep near-black background
          900: "#0B1018", // Surface
          850: "#101925", // Raised surface
          800: "#162233",
          750: "#1d2b40",
          700: "#273a55",
          600: "#3d5575",
          500: "#5d7799",
          400: "#8ca2bd",
          300: "#b9c9dc",
          200: "#dce5f0",
          100: "#F1F5F6", // Primary text
          50: "#f8fafc",
        },
        emerald: {
          DEFAULT: "#06A679",
          glow: "#00f59b",
          light: "#34d399",
          dark: "#047857",
          deep: "#022c22",
        },
        violet: {
          DEFAULT: "#7C5CF5",
          lavender: "#A78BFA",
          glow: "#8b5cf6",
          dark: "#5b21b6",
          deep: "#2e1065",
        },
        mint: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#06A679",
          glow: "#00f59b",
          deep: "#064e3b",
        },
        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          glow: "#00e5ff",
          deep: "#164e63",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
          glow: "#ffd166",
        },
      },
      fontFamily: {
        sans: [
          "'Geist'",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "'SF Mono'",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Liberation Mono'",
          "monospace",
        ],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "grid-pattern-light": "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
        "dots-pattern-light": "radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
        "radial-emerald": "radial-gradient(circle at 50% 50%, rgba(6, 166, 121, 0.15) 0%, transparent 60%)",
        "radial-violet": "radial-gradient(circle at 50% 50%, rgba(124, 92, 245, 0.15) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid-size": "32px 32px",
        "dots-size": "20px 20px",
      },
      boxShadow: {
        "signal-card": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        "signal-card-hover": "0 0 0 1px rgba(6, 166, 121, 0.35), 0 8px 30px -4px rgba(6, 166, 121, 0.15)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "glass-card-hover": "0 16px 48px -8px rgba(6, 166, 121, 0.25), inset 0 1px 0 0 rgba(167, 139, 250, 0.3)",
        "signal-glow": "0 0 30px -5px rgba(6, 166, 121, 0.4)",
        "violet-glow": "0 0 30px -5px rgba(124, 92, 245, 0.4)",
        "core-glow": "0 0 60px -10px rgba(6, 166, 121, 0.35), 0 0 90px -20px rgba(124, 92, 245, 0.25)",
      },
    },
  },
  plugins: [],
};
