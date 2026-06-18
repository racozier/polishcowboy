import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Served from https://<user>.github.io/polishcowboy/ — base must match the repo name.
const base = process.env.GITHUB_PAGES ? "/polishcowboy/" : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectRegister: false,
      manifest: {
        name: "Droga do Instruktora — Riding Path",
        short_name: "Riding Path",
        description: "Checklists for becoming a riding instructor, horse behavioralist and hippotherapy instructor.",
        start_url: base,
        scope: base,
        display: "standalone",
        background_color: "#fbf8f3",
        theme_color: "#d9a441",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
