import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can add custom colors, spacing, etc. here
    },
  },
  plugins: [
    // Example plugin for customizing scrollbars
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'], // Enable scrollbar customization with rounded corners
  },
};
export default config;
