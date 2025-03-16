/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          DEFAULT: "#0A66C2", // LinkedIn's brand blue
          hover: "#004182",    // Darker blue for hover states
        },
        accent: "#EBF5FE"      // Light blue background color
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: for better form styling
    require('@tailwindcss/typography') // Optional: for prose content
    [daisyui]
  ],
}