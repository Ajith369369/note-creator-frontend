/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1a1a1a',
        'light-dark': '#404040',
        'whitesmoke': '#f8f8f8',
        'gray-custom': '#f2f2f2',
        'red-salsa': '#fb3640',
        'green-custom': '#00a82d',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      width: {
        'sidebar': '196px',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}

