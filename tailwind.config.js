/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dekut-green': '#004d26',
        'dekut-gold': '#ffd700',
        'chroma-green': '#00b140',
      },
      fontFamily: {
        impact: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      dropShadow: {
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
