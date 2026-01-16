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
        // MaumToss Deep Forest & Calm Night theme
        sage: {
          DEFAULT: "#6A9C78",
          light: "#C4D7B2",
          dark: "#5A8A68",
        },
        background: {
          DEFAULT: "#1A1A1A",
          dark: "#121212",
          card: "#2C2C2C",
          elevated: "#363636",
        },
        text: {
          DEFAULT: "#E0E0E0",
          muted: "#A0A0A0",
          subtle: "#707070",
        },
        accent: "#6A9C78",
        "accent-light": "#C4D7B2",
        "accent-dark": "#5A8A68",
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
        "pulse-slow": "pulse 3s ease-in-out infinite",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(106, 156, 120, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(106, 156, 120, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
