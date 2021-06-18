const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', '.src/components/**/*.{js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: '.65rem',
      },
      colors: {
        rose: colors.rose,
        primary: {
          50: '#fef3f3',
          100: '#fce6e7',
          200: '#f8c1c4',
          300: '#f49ba1',
          400: '#eb515a',
          500: '#e30613',
          600: '#cc0511',
          700: '#aa050e',
          800: '#88040b',
          900: '#6f0309',
        },
        secondary: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
};
