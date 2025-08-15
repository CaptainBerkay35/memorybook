// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "toast-timer": "toastTimer 3s linear forwards",
        gradient: "gradient 3s ease infinite",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        toastTimer: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      colors: {
        primary: "#745cbc",
        "primary-dark": "#6B4597",
        secondary: "#9B7EBD",
        textPrimary: "#F49BAB",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), 
  ],
};
