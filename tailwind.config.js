/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",
        "light-dark": "#404040",
        whitesmoke: "#f8f8f8",
        "gray-custom": "#f2f2f2",
        "red-salsa": "#fb3640",
        "green-custom": "#00a82d",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      width: {
        sidebar: "196px",
      },
      spacing: { sidebar: "196px" },
      transitionDuration: {
        300: "300ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-out",
        "bounce-delayed": "bounce-delayed 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
