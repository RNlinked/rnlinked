import tailwindcss from "@tailwindcss/vite";
import env from "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "shadcn-nuxt",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    classSuffix: "",
    dataValue: "",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
