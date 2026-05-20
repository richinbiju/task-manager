import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    federation({
      name: "tasksmf",

      filename: "remoteEntry.js",

      exposes: {
        "./TasksApp": "./src/App.jsx",
      },

      shared: ["react", "react-dom", "react-hot-toast"],
    }),
  ],

  server: {
    port: 5002,
  },

  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});