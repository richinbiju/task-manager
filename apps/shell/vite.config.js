import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    federation({
      name: "shell",

      remotes: {
        authmf: "http://localhost:5001/assets/remoteEntry.js",
        tasksmf: "http://localhost:5002/assets/remoteEntry.js",
        dashboardmf: "http://localhost:5003/assets/remoteEntry.js",
      },

      shared: ["react", "react-dom", "react-hot-toast"],
    }),
  ],

  server: {
    port: 5000,
  },

  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});