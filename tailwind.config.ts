import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dopo: {
          purple: "#6A52F1",
          "purple-light": "#8B78F4",
          "purple-dark": "#5240C9",
        },
        background: {
          DEFAULT: "#1D212C",
          dark: "#111827",
          card: "#252A3A",
        },
        accent: "#6A52F1",
        "accent-light": "#8B78F4",
        "accent-dark": "#5240C9",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        spoqa: ["Spoqa Han Sans Neo", "sans-serif"],
      },
      lineHeight: {
        'relaxed-headline': '1.5',
        'loose-headline': '1.6',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(106, 82, 241, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(106, 82, 241, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
