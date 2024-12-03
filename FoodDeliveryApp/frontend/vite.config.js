import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Explicitly setting the build output directory (default is 'dist')
  },
  server: {
    historyApiFallback: true, // Enables the React Router to handle client-side routing
  }
});