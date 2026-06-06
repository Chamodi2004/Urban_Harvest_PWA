import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.jpg",
        "IMG1.jpg",
        "IMG2.jpg",
        "workshop.jpg",
        "composite bin.jpg",
        "recycling.jpg",
        "seeds.jpg",
        "tools.jpg",
        "gardening.jpg",
        "icon-192.png",
        "icon-512.png",
        "offline.html",
      ],

      manifest: {
        name: "Urban Harvest Hub",
        short_name: "UrbanHarvest",

        theme_color: "#2e7d32",
        background_color: "#ffffff",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,webmanifest}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "static-images",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })
  ]
});