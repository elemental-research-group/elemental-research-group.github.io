import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base is "/" because the production target is a user/org GitHub Pages site
// (elemental-lab.github.io), not a project page.
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
