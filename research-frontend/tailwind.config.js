/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // This is crucial for class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "var(--background)",
        light: "var(--background)",
      },
      textColor: {
        dark: "var(--foreground)",
        light: "var(--foreground)",
      },
      colors: {
        // Add explicit dark mode colors
        darkbg: "#111827",
        darkcard: "#1f2937",
        darkborder: "#374151",
        "midnight-blue": "#0A192F",
        "neon-cyan": "#00D4FF",
        "cyber-purple": "#7D5BA6",
        "soft-steel": "#A6B1C0",
        "dark-charcoal": "#1E1E1E",
        "soft-white": "#F5F7FA",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  // Force dark mode to be enabled in development
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
    },
  },
};
