// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.ts";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    // Disable sourcemaps globally
    rollupOptions: {
      treeshake: "recommended",
      output: {
        inlineDynamicImports: false,
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["sonner", "lucide-react"],
          effects: [
            "./src/utils/effects/hearts.ts",
            "./src/utils/effects/matrix.ts",
            "./src/utils/effects/rain.ts",
            "./src/utils/effects/rainbowRain.ts",
            "./src/utils/effects/spaceTravel.ts"
          ],
          filters: ["./src/utils/filters"],
          transforms: ["./src/utils/transforms"]
        },
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js"
      },
      input: {
        main: resolve(__dirname, "index.html"),
        "gif.worker": resolve(__dirname, "public/gif.worker.js")
      }
    },
    target: "esnext",
    minify: "esbuild",
    modulePreload: {
      polyfill: false,
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        return deps.filter((dep) => !dep.includes("node_modules"));
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1e3
  },
  plugins: [
    react()
  ],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "sonner",
      "lucide-react",
      "gif.js",
      "gifuct-js"
    ],
    exclude: []
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000"
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcblxuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsIC8vIERpc2FibGUgc291cmNlbWFwcyBnbG9iYWxseVxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHRyZWVzaGFrZTogJ3JlY29tbWVuZGVkJyxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogZmFsc2UsXG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICByb3V0ZXI6IFsncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIHVpOiBbJ3Nvbm5lcicsICdsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICBlZmZlY3RzOiBbXG4gICAgICAgICAgICAnLi9zcmMvdXRpbHMvZWZmZWN0cy9oZWFydHMudHMnLFxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL2VmZmVjdHMvbWF0cml4LnRzJyxcbiAgICAgICAgICAgICcuL3NyYy91dGlscy9lZmZlY3RzL3JhaW4udHMnLFxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL2VmZmVjdHMvcmFpbmJvd1JhaW4udHMnLFxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL2VmZmVjdHMvc3BhY2VUcmF2ZWwudHMnXG4gICAgICAgICAgXSxcbiAgICAgICAgICBmaWx0ZXJzOiBbJy4vc3JjL3V0aWxzL2ZpbHRlcnMnXSxcbiAgICAgICAgICB0cmFuc2Zvcm1zOiBbJy4vc3JjL3V0aWxzL3RyYW5zZm9ybXMnXVxuICAgICAgICB9LFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdLltleHRdJyxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5baGFzaF0uanMnXG4gICAgICB9LFxuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICAgICdnaWYud29ya2VyJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvZ2lmLndvcmtlci5qcycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgbW9kdWxlUHJlbG9hZDoge1xuICAgICAgcG9seWZpbGw6IGZhbHNlLFxuICAgICAgcmVzb2x2ZURlcGVuZGVuY2llczogKGZpbGVuYW1lLCBkZXBzLCB7IGhvc3RJZCwgaG9zdFR5cGUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gZGVwcy5maWx0ZXIoZGVwID0+ICFkZXAuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLCBcbiAgICAgICdyZWFjdC1kb20nLCBcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJywgXG4gICAgICAnc29ubmVyJywgXG4gICAgICAnbHVjaWRlLXJlYWN0JyxcbiAgICAgICdnaWYuanMnLFxuICAgICAgJ2dpZnVjdC1qcydcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFtdXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ3B1YmxpYywgbWF4LWFnZT0zMTUzNjAwMCdcbiAgICB9XG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFsnLi9zcmMvdGVzdC9zZXR1cC50cyddLFxuICAgIGNzczogZmFsc2UsXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiAndjgnLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdodG1sJ10sXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgICdub2RlX21vZHVsZXMvJyxcbiAgICAgICAgJ3NyYy90ZXN0LycsXG4gICAgICAgICcqKi8qLmQudHMnLFxuICAgICAgXVxuICAgIH1cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxTQUFTLGVBQWU7QUFDakMsU0FBUyxxQkFBcUI7QUFIb0csSUFBTSwyQ0FBMkM7QUFLbkwsSUFBTSxZQUFZLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBR3hELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQTtBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sc0JBQXNCO0FBQUEsUUFDdEIsY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzdCLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixJQUFJLENBQUMsVUFBVSxjQUFjO0FBQUEsVUFDN0IsU0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsU0FBUyxDQUFDLHFCQUFxQjtBQUFBLFVBQy9CLFlBQVksQ0FBQyx3QkFBd0I7QUFBQSxRQUN2QztBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLE1BQU0sUUFBUSxXQUFXLFlBQVk7QUFBQSxRQUNyQyxjQUFjLFFBQVEsV0FBVyxzQkFBc0I7QUFBQSxNQUN6RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLHFCQUFxQixDQUFDLFVBQVUsTUFBTSxFQUFFLFFBQVEsU0FBUyxNQUFNO0FBQzdELGVBQU8sS0FBSyxPQUFPLFNBQU8sQ0FBQyxJQUFJLFNBQVMsY0FBYyxDQUFDO0FBQUEsTUFDekQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDO0FBQUEsRUFDWjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMscUJBQXFCO0FBQUEsSUFDbEMsS0FBSztBQUFBLElBQ0wsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsVUFBVSxDQUFDLFFBQVEsTUFBTTtBQUFBLE1BQ3pCLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
