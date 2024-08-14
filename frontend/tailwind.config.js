/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tomato: '#ff6347', // Add custom tomato color
        'tomato-dark': '#e5533d', // Optional: Define a darker shade for hover
        blue: '#3498db', // Add custom blue color,
        'blue-dark': '#2980b9',
        'blue-dark-40': '##1f6f9f',
        'blue-dark-60': '#2c3e50',
      },
    },
  },
  plugins: [],
};
