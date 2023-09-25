/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Very-Dark-Blue-light-text": " hsl(200, 15%, 8%)",
        "Dark-Gray-light-input": "hsl(0, 0%, 52%)",
        "Very-Light-Gray-light": "hsl(0, 0%, 98%)",
        "Very-Light-Gray-light-hover": "hsl(0, 0%, 98%)",
        White: "hsl(0, 0%, 100%)",
        "Dark-Blue-dark-el": "hsl(209, 23%, 22%)",
        "Dark-Blue-dark-hover": "hsl(209, 23%, 30%)",
        "Very-Dark-Blue-dark": "hsl(207, 26%, 17%)",
      },
    },
  },
  plugins: [],
};
