/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // Deep Blue
        secondary: "#1e293b", // Dark Blue
        lightBlue: "#e0f2fe",
      },
    },
  },
  plugins: [],
};

