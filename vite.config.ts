import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for the 'src' directory
      "@pages": path.resolve(__dirname, "src/pages"), // Alias for the 'src/pages' directory
      "@components": path.resolve(__dirname, "src/components"), // Alias for the 'src/components' directory
    },
  },
});
