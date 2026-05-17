import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    federation({
      name: "authmf",

      filename: "remoteEntry.js",

      exposes: {
        "./AuthApp": "./src/App.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5001,
  },

  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});