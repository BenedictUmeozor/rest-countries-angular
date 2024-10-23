/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          'dark-blue': 'hsl(209, 23%, 22%)',
          'very-dark-blue': {
            DEFAULT: 'hsl(207, 26%, 17%)',
            light: 'hsl(200, 15%, 8%)',
          },
          'dark-gray': 'hsl(0, 0%, 52%)',
          'very-light-gray': 'hsl(0, 0%, 98%)',
          white: 'hsl(0, 0%, 100%)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'selector',
};
