import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL("./src/components/ui/lib.ts", import.meta.url)),
      name: "AuroraUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "aurora-ui.js" : "aurora-ui.cjs"),
      cssFileName: "aurora-ui",
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom|react\/jsx-runtime|lucide-react)(\/|$)/.test(id),
    },
  },
})
