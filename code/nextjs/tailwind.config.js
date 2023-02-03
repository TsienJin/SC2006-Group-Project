/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'offwhite': '#FCFCFC',
        'beige': '#E7FEE6',
        'salt': '#F0EAEA',
        'violet': '#731DDE',
        'rust': '#D05353',
        'shadow': '#14080E',
      },
    },
  },
  plugins: [],
}
