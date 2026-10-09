import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative asset paths work at both root and project GitHub Pages URLs.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        about: path.resolve(__dirname, "about.html"),
        projects: path.resolve(__dirname, "projects.html"),
        directions: path.resolve(__dirname, "directions.html"),
        research: path.resolve(__dirname, "research.html"),
        people: path.resolve(__dirname, "people.html"),
        contact: path.resolve(__dirname, "contact.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
