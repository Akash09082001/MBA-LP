/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Bebas-Neue": ['"Bebas Neue"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        "primary": {
          "50": "#FBE5EE",
          "100": "#F6CBDC",
          "200": "#ED97B9",
          "300": "#E35E93",
          "400": "#DA2A70",
          "500": "#A91D54",
          "600": "#871744",
          "700": "#641132",
          "800": "#460C23",
          "900": "#230612",
          "950": "#110309"
        }
      }
    },
  },
  plugins: [],
};
