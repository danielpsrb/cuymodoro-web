/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx, js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "black", "halloween"],
  },
  plugins: [require('daisyui')],
}