import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: '/MyPortfolio/', // Add this line!
  plugins: [react(), tailwindcss(), cloudflare()],
})