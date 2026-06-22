/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF8EF", // off-white page bg
          glow:    "#F4EBBE", // Lemon Chiffon — ambient background glows
          card:    "#A7CECB", // Light Blue — card/surface bg
        },
        ink: {
          DEFAULT: "#332F1C", // dark olive-black — primary text/dark fills (real contrast anchor)
          mid:     "#75704E", // Dusty Olive — secondary text
          soft:    "#958F6A",
          ghost:   "#B5AE86",
        },
        accent: {
          DEFAULT: "#8BA6A9", // Cool Steel — links, numbers, primary accent
          pop:     "#CACC90", // Dry Sage — stamp shadows, bright pop
        },
        warm: {
          border:     "rgba(150,150,150,0.3)",
          rule:       "rgba(150,150,150,0.22)",
          pill:       "rgba(139,166,169,0.09)",
          pillBorder: "rgba(139,166,169,0.2)",
        },
      },
      fontFamily: {
        display: ["'Fredoka'", "sans-serif"],
        sans: ["'Courier Prime'", "'Courier New'", "monospace"],
        mono: ["'Courier Prime'", "'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
};
