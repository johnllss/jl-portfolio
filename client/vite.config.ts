import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, the React app (5173) forwards /api calls to Express (5000).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:5001" },
  },
});
