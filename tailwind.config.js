/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        satyablue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc3fd',
          400: '#36a3fa',
          500: '#0c86eb',
          600: '#0168ca',
          700: '#0253a4',
          800: '#064787',
          900: '#0b3c70',
          950: '#07264a',
        },
        aicte: {
          orange: '#f37021',
          green: '#00843d',
          navy: '#0b2545',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
