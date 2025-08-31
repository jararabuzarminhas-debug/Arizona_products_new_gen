/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        // Primary brand colors for Arizona Health Care Products
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        medical: {
          blue: "#0066CC",
          navy: "#1B365D",
          light: "#E3F2FD",
          lighter: "#BBDEFB",
        },
        healthcare: {
          green: "#28A745",
          orange: "#FF6B35",
          lightblue: "#87CEEB",
        },
        arizona: {
          red: "#DC2626",
          orange: "#EA580C",
          yellow: "#EAB308",
        },
        // Cooling colors for Bye Bye Fever product
        cooling: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        medical: ["Montserrat", "system-ui", "sans-serif"],
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      backgroundImage: {
        "cooling-gradient": "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
        "arizona-gradient":
          "linear-gradient(135deg, #EA580C 0%, #DC2626 50%, #EAB308 100%)",
        "medical-gradient": "linear-gradient(135deg, #0066CC 0%, #1B365D 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
