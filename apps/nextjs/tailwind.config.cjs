/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  presets: [require("@acme/tailwind-config")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        lightPrimary: "#f6f6f6",
        lightSecondary: "#F47521",
        lightTertiary: "#808080",
        darkPrimary: "#272626",
        darkSecondary: "#F47521",
        darkTertiary: "#f5f5f5",
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         ...require("daisyui/src/colors/themes")["[data-theme=light]"],
  //         primary: "#F47521",
  //         secondary: "#808080",
  //       },
  //       dark: {
  //         ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
  //         primary: "#272626",
  //         secondary: "#F47521",
  //       },
  //     },
  //   ],
  // },
};
