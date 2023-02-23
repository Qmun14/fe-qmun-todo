/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-blue1': '#3a90d3',
        'my-theme-bg': '#5d5ffe',
        'my-theme-bg-green': '#66d97a'

      },
      fontFamily: {
        'classic': ['Mullingar-nRgnO', 'sans-serif'],
        'roboto': ['RobotoMono-Regular', 'Inter', 'sans-serif'],
        'roboto-var': ['RobotoMono-Regular', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}