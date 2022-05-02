// Styles
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

// Vuetify
import { createVuetify } from "vuetify"

const customDarkTheme = {
    dark: true,
    colors: {
        background: "#121212",
        surface: "#121212",
        primary: "#07987d",
        "primary-c": "#FFFFFF",
        secondary: "#ffffff",
        error: "#CF6679",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
    },
}
const customLightTheme = {
    dark: false,
    colors: {
        background: "#ffffff",
        surface: "#ffffff",
        primary: "#07987d",
        "primary-c": "#ffffff",
        secondary: "#151515",
        error: "#B00020",
        info: "#e0ece0",
        success: "#4CAF50",
        warning: "#FB8C00",
    },
}

export default createVuetify({
    theme: {
        defaultTheme: "customLightTheme",
        themes: {
            customLightTheme,
            customDarkTheme,
        },
    },
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
