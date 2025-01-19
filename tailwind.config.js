module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1F2937", // Deep gray
        darkCard: "#374151", // Lighter gray for cards
        accent: "#4CAF50", // Accent green
        textLight: "#F9FAFB", // Light text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
