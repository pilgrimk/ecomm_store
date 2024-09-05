/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'accent-light': {
          50: '#faf6ef',
          100: '#f5ede0',
          200: '#efe5d1',
          300: '#eadcc2',
          400: '#e4d3b3',
          500: '#decba4',
          600: '#b5a687',
          700: '#8e826a',
          800: '#69604f',
          900: '#464036',
        },
        'accent-dark': {
          50: '#dce0e0',
          100: '#bac1c1',
          200: '#99a4a4',
          300: '#7a8787',
          400: '#5b6b6b',
          500: '#3e5151',
          600: '#344444',
          700: '#2b3737',
          800: '#222a2a',
          900: '#191e1e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-overlay': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '1.5em',
            background: 'linear-gradient(to bottom, transparent, white)',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}

