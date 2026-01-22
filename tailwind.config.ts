import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MaumToss theme - CSS 변수 참조
        sage: {
          DEFAULT: "var(--sage)",
          light: "var(--sage-light)",
          dark: "var(--sage-dark)",
        },
        background: {
          DEFAULT: "var(--background)",
          dark: "var(--background-dark)",
          card: "var(--background-card)",
          elevated: "var(--background-elevated)",
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        accent: "var(--sage)",
        "accent-light": "var(--sage-light)",
        "accent-dark": "var(--sage-dark)",
        divider: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
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
