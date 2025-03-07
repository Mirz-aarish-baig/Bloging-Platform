/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: ({ opacityValue }) =>
          opacityValue ? `hsl(var(--background) / ${opacityValue})` : `hsl(var(--background))`,
        foreground: ({ opacityValue }) =>
          opacityValue ? `hsl(var(--foreground) / ${opacityValue})` : `hsl(var(--foreground))`,
        /** 🛠️ Fix for border-border issue **/
        border: ({ opacityValue }) =>
          opacityValue ? `hsl(var(--border) / ${opacityValue})` : `hsl(var(--border))`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
