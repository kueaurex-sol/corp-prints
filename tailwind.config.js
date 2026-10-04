/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6F8",
        ink: "#14151A",
        cyan: "#00B8D9",
        magenta: "#E8368F",
        yellow: "#FFC400",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        "register-in": {
          "0%": { transform: "translate(0,0)", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { transform: "translate(var(--tx,0), var(--ty,0))", opacity: "1" },
        },
        "rise-in": {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "field-in": {
          "0%": { transform: "translateY(6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "register-in": "register-in 900ms cubic-bezier(0.16,1,0.3,1) forwards",
        "rise-in": "rise-in 700ms cubic-bezier(0.16,1,0.3,1) forwards",
        "field-in": "field-in 350ms ease-out forwards",
      },
    },
  },
  plugins: [],
};