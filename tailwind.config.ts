// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
