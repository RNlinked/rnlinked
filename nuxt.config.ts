import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],

  modules: [
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
  ],

  runtimeConfig: {
    // Server-side only
    s3: {
      accessKey: process.env.NUXT_S3_ACCESS_KEY,
      secretKey: process.env.NUXT_S3_SECRET_KEY,
      region: process.env.NUXT_S3_REGION,
      bucketName: process.env.NUXT_S3_BUCKET_NAME,
    },

    // Publicly accessible
    public: {
      auth: {
        redirectUserTo: "/",
        redirectGuestTo: "/sign-in",
      },
      appUrl: process.env.NUXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? "http://localhost:8001/api",
    },
  },

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
    componentDir: "./app/components/ui",
  },
});
