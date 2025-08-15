// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/theme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [heroui(), require("@tailwindcss/forms")],
};
