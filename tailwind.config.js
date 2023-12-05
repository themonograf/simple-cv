/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#454550",
      },
      width: {
        a4: "210mm",
      },
      height: {
        a4: "297mm",
      },
    },
  },
  plugins: [],
};
