/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-navy": "#111827",
        "main-black": "#111827",
        "main-purple": "#5048E5",
        "main-light-gray": "#F9FAFB",
        "main-grey": "#6B7280",
        "user-yellow": "#FCE944",
        "main-red": "#F53838",
        "error-orange": "#FC5A44",
        "stock-orange": "#EA3D2F"
      },
      spacing:{
        "5%": "5%",
        "10%": "10%",
        "30%": "30%",
      }
    },
  },
  plugins: [
  ],
}