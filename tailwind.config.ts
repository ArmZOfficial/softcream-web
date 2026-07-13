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
        "moon-white": "#F7F8FC",
        "sky-light": "#A9C6EC",
        periwinkle: "#5B7FC4",
        midnight: "#1C2A52",
        "violet-glow": "#6A4FC2",
        "gold-accent": "#C9A24B",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "var(--font-mitr)", "sans-serif"],
        body: ["var(--font-quicksand)", "var(--font-prompt)", "sans-serif"],
        accent: ["var(--font-playfair)", "var(--font-prompt)", "serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        sparkle: "sparkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      backgroundImage: {
        "gothic-gradient":
          "linear-gradient(180deg, rgba(28,42,82,0.85) 0%, rgba(106,79,194,0.3) 50%, rgba(28,42,82,0.9) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
