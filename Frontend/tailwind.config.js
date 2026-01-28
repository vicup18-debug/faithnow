/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sacred: {
          white: '#ffffff',
          glass: 'rgba(255, 255, 255, 0.7)', // Frosted effect base
          subtle: '#f8f9fa',
        },
        kingdom: {
          blue: '#2E5CFF', // Electric Royal Blue
          gold: '#D4AF37', // Divine Gold
          dark: '#1a1a2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, geometric
      },
      boxShadow: {
        'holy': '0 20px 40px -10px rgba(46, 92, 255, 0.15)', // Soft blue glow
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)', // Glass depth
      }
    },
  },
  plugins: [],
}