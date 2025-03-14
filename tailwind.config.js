/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        colorOrange: ["#fa4a0c"],
        colorGrey: ["#737373"],
      },

      fontFamily: {
        Poppins: ["Poppins"],
        Montserrat: ["Montserrat"],
        Roboto: ["Roboto"],
      },

      screens: {
        mm: "375px",
        ml: "425px",
        xl: "1349px",
      },
    },
  },
  plugins: [],
};
