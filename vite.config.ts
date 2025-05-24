import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    sourcemap: false, // Disable sourcemaps globally
    rollupOptions: {
      treeshake: 'recommended',
      output: {
        inlineDynamicImports: false,
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['sonner', 'lucide-react'],
          effects: [
            './src/utils/effects/hearts.ts',
            './src/utils/effects/matrix.ts',
            './src/utils/effects/rain.ts',
            './src/utils/effects/rainbowRain.ts',
            './src/utils/effects/spaceTravel.ts'
          ],
          filters: ['./src/utils/filters'],
          transforms: ['./src/utils/transforms']
        },
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      },
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    modulePreload: {
      polyfill: false,
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        return deps.filter(dep => !dep.includes('node_modules'))
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    react()
  ],
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'sonner', 
      'lucide-react',
      'gif.js',
      'gifuct-js'
    ],
    exclude: []
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ]
    }
  }
});