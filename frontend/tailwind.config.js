/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tomato: '#ff6347', // Add custom tomato color
        'tomato-dark': '#e5533d', // Optional: Define a darker shade for hover
      },
    },
  },
  plugins: [],
};
