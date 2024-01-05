/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
      colors: {
        black: "#000000",
        grayMain: "#494949",
        grayMedium: "#7E7D7D",
        graySmall: "#D9D9D9",
        grayLight: "#F3F3F3",
        white: "#FFFFFF",
        primary: "#5C4EFF",
        danger: "#FF4E4E",
        success: "#22C55E",
        passed: "#7343C5",
        primaryLight: "#E6E3FF",
        passedLight: "#E3D9F3",
      },
    },
    
  },
  plugins: [require("tailwindcss-animate")],
};
