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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        rotateXY: {
          "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "50%": { transform: "rotateX(180deg) rotateY(0deg)" },
          "100%": { transform: "rotateX(180deg) rotateY(180deg)" },
        },
      },
      animation: {
        rotateXY: "rotateXY 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
