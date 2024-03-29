/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
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
      progress: "#7343C5",
      primaryLight: "#E6E3FF",
      progressLight: "#E3D9F3"
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      fontFamily: {
        "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".Reg12": {
          fontSize: "12px",
          fontWeight: 400
        },
        ".Reg14": {
          fontSize: "14px",
          fontWeight: 400
        },
        ".Reg16": {
          fontSize: "16px",
          fontWeight: 400
        },
        ".Bold12": {
          fontSize: "12px",
          fontWeight: 700
        },
        ".Bold16": {
          fontSize: "16px",
          fontWeight: 700
        },
        ".Bold24": {
          fontSize: "24px",
          fontWeight: 700
        },
        ".Bold32": {
          fontSize: "32px",
          fontWeight: 700
        },
        ".Medium12": {
          fontSize: "12px",
          fontWeight: 500
        },
        ".Medium16": {
          fontSize: "16px",
          fontWeight: 500
        },
        ".RegUnderline12": {
          fontSize: "12px",
          fontWeight: 400,
          textDecoration: "underline"
        },
        ".effect-default": {
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
        },
        ".effect-description": {
          boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.25)"
        },
        ".effect-svg-default": {
          filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))"
        },
        ".glow-selected-node": {
          boxShadow: "0 0 30px -1px rgba(92, 78, 255, 1)"
        }
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ]
};
