/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  styles: {
    'react-big-calendar': ['react-big-calendar/lib/css/react-big-calendar.css']
  },
  plugins: [require('@tailwindcss/aspect-ratio'),],
}
