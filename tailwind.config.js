
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      body:['Shabnam','Inter','sans-serif'],
    },
    extend: {},
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
}

