module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    colors: {
      /*
      text               = #FFFFFF
      subtext            = #F0F0F0
      sidebar-text       = #FFFFFF
      main               = #000000
      sidebar            = #1ed760
      player             = #000000
      card               = #000000
      shadow             = #202020
      selected-row       = #797979
      button             = #1ed760
      button-active      = #1ed760
      button-disabled    = #535353
      tab-active         = #166632
      notification       = #1db954
      notification-error = #e22134
      misc               = #BFBFBF
      */
      transparent: "transparent",
      "url-text": "#b3b3b3",
      "url-hover": "#ffffff",
      "sidebar-background": "#000000",
      "home-background": "#121212",
      "sidebar-selected": "#282828",
      base: "#fafafa",
      white: "#ffffff",
      "close-red-fill": "#fc605c",
      "minimize-yellow-fill": "#fdbc40",
      "fullscreen-green-fill": "#34c749",
      "close-red-outline": "#df4845",
      "minimize-yellow-outline": "#dfa034",
      "fullscreen-green-outline": "#34af42",
      "title-bar-background": "#1f1f1f",
      searchbar: "#f5f5f5",
      "searchbar-text": "#000000",
      "song-title": "#ffffff",
      "song-artist": "#b3b3b3",
      duration: "#b3b3b3",
      "top-result-bg": "#181818",
      "hover-song-bg": "#282828",
      "secondary-icon-fill": "#848FA5",
      "hover-song-image-bg": "#000000",
      "soundbar-background": "#181818",
      "soundbar-fill": "#535353",
      "soundbar-progress": "#b3b3b3",
      "soundbar-thumb": "#ffffff",
      "soundbar-time-text": "#b3b3b3",
      "playlist-description": "#bebebe",
      "playlist-edit-background": "#282828",
      "playlist-edit-field": "#3E3E3E",
      "playlist-edit-field-text": "#EAEAEA",
      "context-menu-background": "#282828",
      "context-menu-text": "#eaeaea",
      "context-menu-background-hover": "#3e3e3e"
    },
    fontFamily: {
      roboto: ["'Roboto'", "sans-serif"],
    },
    extend: {
      spacing: {
        "title-bar": "2.5rem",
        "song-image": "2.5rem",
      },
      padding: {
        4: "1rem",
      },
      colors: {
        transparent: "transparent",
        "soundbar-dot": "#1ed760",
      },
      zIndex: {
        "-1": "-1",
      },
      transformOrigin: {
        0: "0%",
      },
    },
    fontSize: {
      xxs: "0.775rem",
      "4xl": "2.25rem",
      sm: ".875rem",
      "2xl": "1.5rem",
      smaller: "0.95rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "12rem",
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  borderColor: ["responsive", "hover", "focus", "focus-within"],
  plugins: [],
};
