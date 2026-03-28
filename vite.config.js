import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/YenMade-ReactProject/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 react 相關套件拆分出來
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // 將 bootstrap 相關套件拆分出來
          "bootstrap-vendor": ["bootstrap"],
        },
      },
    },
  },
});
