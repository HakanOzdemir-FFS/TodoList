/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  theme: {
    fontFamily : {
      sans: [
        "Roboto, sans-serif"
      ]
    },
    extend: {},
  },
  plugins: [],
};
