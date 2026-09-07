import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
      },
      boxShadow: {
        pixel: "6px 6px 0 rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
export default config;