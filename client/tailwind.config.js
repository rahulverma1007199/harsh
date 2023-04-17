module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    colors: {
      primaryBlue: "#278FD3",
      secondaryBlue: "#E2F4FF",
      primaryGray: "#EAEAEA",
      primaryWhite: "#fff",
      primaryBlack: "#000",
    },
    extend: {
      backgroundImage: {
        gaugauLogo: "url('/src/assets/logo.svg')",
        gaugauLoginBanner: "url('/src/assets/logo_banner.png')",
      },
    },
  },
  plugins: [],
};
