// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: "#0A66C2",
          secondary: "#FFFFFF",
          accent: "#7FC15E",
          neutral: "#000000",
          "base-100": "#F3F2EF",
          info: "#5E5E5E",
          success: "#057642",
          warning: "#F5C75D",
          error: "#CC1016",
        },
      },
    },
    plugins: [],
  }
  