/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // 👈 important (not 'media')
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
