/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ['"Lato", "sans-serif"'],
      },
      colors: {
        primary: "#16405B",
      },
    },
  },
  plugins: [],
};
