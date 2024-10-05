/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightBackGround: "#F5F5F5",
        purpleColor: "#DC8DEA",
        mintColor: "#73C3A0",
        SecondaryColor: "#4e7f62",
        "custom-bg": "rgb(104 42 34)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
