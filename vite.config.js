import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('node_modules/react-bootstrap/')) return;
        warn(warning);
      },
    },
  },
});