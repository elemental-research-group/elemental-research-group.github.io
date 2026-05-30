import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base: "./" emits relative asset paths. Works both at the current
// project URL (bhavith-chandra.github.io/Elemental-Lab/) and at the
// future user/org URL (elemental-lab.github.io) without rebuild.
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
