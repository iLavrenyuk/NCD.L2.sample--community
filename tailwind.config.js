module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: {
          500: '#272739',
          600: '#343346',
          700: '#2D2C41',
          800: '#313045',
        },
        blue: {
          400: '#5DAAE2',
          500: '#2A65FC',
        },
        orange: {
          400: '#FF7A00',
          500: '#DC2828',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
