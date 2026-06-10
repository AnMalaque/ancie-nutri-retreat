import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retreat: {
          bg: "#F5EDD6",
          surface: "#FDF6E3",
          panel: "#EFE3C0",
          border: "#C8A96E",
          borderLight: "#DEC88A",
          text: "#5A3E1B",
          textMuted: "#8C6A3F",
          textLight: "#A68550",
          green: "#4A7C59",
          greenLight: "#6BA882",
          greenBg: "#E8F4EC",
          red: "#C0392B",
          redBg: "#FDECEA",
          amber: "#D4860A",
          amberBg: "#FEF3DC",
          blue: "#2471A3",
          blueBg: "#EBF5FB",
          purple: "#6C3483",
          purpleBg: "#F5EEF8",
          teal: "#148F77",
          tealBg: "#E8F8F5",
        },
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace"],
        cozy: ["Georgia", "serif"],
        body: ["'Trebuchet MS'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cozy: "4px 4px 0px rgba(90, 62, 27, 0.25)",
        "cozy-lg": "6px 6px 0px rgba(90, 62, 27, 0.20)",
        inner: "inset 2px 2px 6px rgba(90, 62, 27, 0.15)",
      },
      borderRadius: {
        cozy: "8px",
        "cozy-lg": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
