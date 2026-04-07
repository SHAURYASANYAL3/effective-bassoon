/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05050A',
        sigil: '#89a8ff',
      },
      animation: {
        pulseSlow: 'pulse 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
