// NOWA, POPRAWIONA ZAWARTOŚĆ pliku vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <--- ZMIANA: Usunięto '-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})