/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, and TSX files in the 'src' directory
    "./public/index.html", // Include the main HTML file in 'public' directory (optional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
