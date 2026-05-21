import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    federation({
      name: "dashboardmf",

      filename: "remoteEntry.js",

      exposes: {
        "./DashboardApp": "./src/App.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    host: true,
    port: 5003,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin":
        "*",
    },
  },

  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});