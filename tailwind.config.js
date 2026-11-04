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
        signal: {
          950: "#07090b",
          900: "#0d1117",
          850: "#12171f",
          800: "#171e28",
          750: "#1d2633",
          700: "#243040",
          600: "#37475d",
          500: "#50627a",
          400: "#8697ac",
          300: "#b5c2d1",
          200: "#dbe3eb",
          100: "#f0f4f8",
          50: "#f8fafc",
        },
        mint: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
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
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        "grid-pattern-light": "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "dots-pattern-light": "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-size": "32px 32px",
        "dots-size": "20px 20px",
      },
      boxShadow: {
        "signal-card": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        "signal-card-hover": "0 0 0 1px rgba(0, 245, 155, 0.35), 0 8px 30px -4px rgba(0, 245, 155, 0.15)",
        "signal-card-light": "0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 16px -2px rgba(0, 0, 0, 0.05)",
        "signal-glow": "0 0 25px -5px rgba(0, 245, 155, 0.35)",
        "cyan-glow": "0 0 25px -5px rgba(0, 229, 255, 0.35)",
      },
    },
  },
  plugins: [],
};
