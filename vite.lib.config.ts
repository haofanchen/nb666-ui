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
      name: "NB666UI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "nb666-ui.js" : "nb666-ui.cjs"),
      cssFileName: "nb666-ui",
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom|react\/jsx-runtime|lucide-react)(\/|$)/.test(id),
    },
  },
})
