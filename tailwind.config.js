/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  },
  theme: {
    fontFamily: {
      sans: ["Roboto, sans-serif"],
    },
    extend: {
      colors: {
        black: require("tailwindcss/colors").black,
        rose: require("tailwindcss/colors").rose,
        white: "#ffffff",
        "gray-dark-1": "#121212",
        "gray-dark-2": "#2C2C2C",
        "gray-dark-3": "#3A3A3A",
        "gray-dark-4": "#202020",
        "gray-dark-5": "#E0E0E0",
      },
    },
  },
  plugins: [],
};
