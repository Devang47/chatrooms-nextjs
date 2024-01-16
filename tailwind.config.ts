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
        dark: "#38404A",
        light: "#F6F6F6",
      },
      transitionTimingFunction: {
        "cubic-ease": "cubic-bezier(.77,0,.175,1)",
      },
    },
  },
  plugins: [],
};
export default config;
