import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/crest-v2/',
  plugins: [react()],
  server: {
    port: 8000
  }
});
