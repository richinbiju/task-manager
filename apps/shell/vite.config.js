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
        authmf: "https://auth-mf-zeta.vercel.app/assets/remoteEntry.js",
        tasksmf: "https://tasks-mf.vercel.app/assets/remoteEntry.js",
        dashboardmf: "https://dashboard-mf-beta.vercel.app/assets/remoteEntry.js",
      },

      shared: ["react", "react-dom", "react-hot-toast"],
    }),
  ],

  server: {
    host: true,
    port: 5000,
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