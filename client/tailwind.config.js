/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: '#3d9776',
        secondary: '#ff6145'
      }
    },
  },
  plugins: [],
}

