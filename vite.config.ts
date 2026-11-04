import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { studioPlugin } from './scripts/vite-studio-plugin';

export default defineConfig(({ command, mode }) => {
  // Determine base path for GitHub Pages
  let base = '/';
  if (command === 'build') {
    if (process.env.VITE_BASE_PATH) {
      base = process.env.VITE_BASE_PATH;
    } else if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      // User site (e.g. username.github.io) -> '/', Project site -> '/repoName/'
      base = repoName.endsWith('.github.io') ? '/' : `/${repoName}/`;
    } else {
      // Default fallback for project site
      base = '/LinkVault/';
    }
  }

  const isDev = command === 'serve';

  return {
    base,
    plugins: [
      react(),
      isDev ? studioPlugin() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@studio': path.resolve(__dirname, './studio'),
      },
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      // CRITICAL SECURITY REQUIREMENT:
      // Production build ONLY includes index.html.
      // studio.html and studio bundles are completely excluded from the public deployment!
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
    // Vitest test configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
      include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    },
  };
});
