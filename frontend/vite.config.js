import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: ["sireagle.ru", "www.sireagle.ru"],
  },
});
