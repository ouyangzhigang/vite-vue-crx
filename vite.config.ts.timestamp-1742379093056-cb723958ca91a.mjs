// vite.config.ts
import { defineConfig } from "file:///D:/job/demo/lexin-fe-crx/node_modules/vite/dist/node/index.js";
import { crx } from "file:///D:/job/demo/lexin-fe-crx/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///D:/job/demo/lexin-fe-crx/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwindcss from "file:///D:/job/demo/lexin-fe-crx/node_modules/@tailwindcss/vite/dist/index.mjs";

// src/manifest.ts
import { defineManifest } from "file:///D:/job/demo/lexin-fe-crx/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "lexin-fe-crx",
  displayName: "lexin FE",
  version: "0.0.0",
  author: "zane",
  description: "",
  type: "module",
  license: "MIT",
  keywords: [
    "chrome-extension",
    "vue",
    "vite",
    "create-chrome-ext"
  ],
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    start: "vite",
    dev: "npx nodemon --config nodemon.json",
    build: "vite build",
    preview: "vite preview",
    fmt: "prettier --write '**/*.{vue,ts,json,css,scss,md}'",
    zip: "npm run build && node src/zip.js"
  },
  dependencies: {
    "@tailwindcss/postcss": "^4.0.13",
    "@tailwindcss/vite": "^4.0.13",
    less: "^4.2.2",
    postcss: "^8.5.3",
    tailwindcss: "^4.0.13",
    vue: "^3.3.4"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@types/chrome": "^0.0.246",
    "@vitejs/plugin-vue": "^4.4.0",
    "chrome-types": "^0.1.345",
    gulp: "^4.0.2",
    "gulp-zip": "^6.0.0",
    nodemon: "^3.1.9",
    prettier: "^3.0.3",
    typescript: "^5.2.2",
    vite: "^4.4.11",
    "vue-tsc": "^1.8.18"
  }
};

// src/manifest.ts
var isDev = process.env.NODE_ENV == "development";
var manifest_default = defineManifest({
  name: `${package_default.displayName || package_default.name}${isDev ? ` \u27A1\uFE0F Dev` : ""}`,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/lexin-tool-icon.jpg",
    32: "img/lexin-tool-icon.jpg",
    48: "img/lexin-tool-icon.jpg",
    128: "img/lexin-tool-icon.jpg"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/lexin-tool-icon.jpg"
  },
  options_page: "options.html",
  devtools_page: "devtools.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/contentScript/index.ts"],
      run_at: "document_start"
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png", "img/lexin-tool-icon.jpg", "img/*"],
      matches: []
    }
  ],
  permissions: ["sidePanel", "storage", "activeTab"]
});

// vite.config.ts
var vite_config_default = defineConfig(({ mode, command }) => {
  console.log("The env: ", mode, command);
  const production = mode === "production";
  const isbuild = command === "build";
  return {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "./src/assets/styles/reset.css";`,
          javascriptEnabled: true
        },
        less: {
          additionalData: `@import "./src/assets/styles/variables.less";`,
          javascriptEnabled: true
        }
      }
    },
    build: {
      cssCodeSplit: true,
      emptyOutDir: production && isbuild,
      outDir: "build",
      rollupOptions: {
        input: {
          devtools: "devtools.html",
          sidepanel: "sidepanel.html",
          popup: "popup.html",
          options: "options.html"
        },
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-chunk-[hash].js",
          assetFileNames: "assets/asset-[hash].[ext]"
        }
      }
    },
    plugins: [crx({ manifest: manifest_default }), vue(), tailwindcss()],
    resolve: {
      alias: {
        "@": "./src"
      },
      extensions: [".js", ".ts", ".vue", ".json"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGpvYlxcXFxkZW1vXFxcXGxleGluLWZlLWNyeFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcam9iXFxcXGRlbW9cXFxcbGV4aW4tZmUtY3J4XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9qb2IvZGVtby9sZXhpbi1mZS1jcngvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL3NyYy9tYW5pZmVzdC50cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgY29uc29sZS5sb2coJ1RoZSBlbnY6ICcsIG1vZGUsIGNvbW1hbmQpXG4gIGNvbnN0IHByb2R1Y3Rpb24gPSBtb2RlID09PSAncHJvZHVjdGlvbidcbiAgY29uc3QgaXNidWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcblxuICByZXR1cm4ge1xuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGVzL3Jlc2V0LmNzc1wiO2AsXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGxlc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGVzL3ZhcmlhYmxlcy5sZXNzXCI7YCxcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgZW1wdHlPdXREaXI6IHByb2R1Y3Rpb24gJiYgaXNidWlsZCxcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBkZXZ0b29sczogJ2RldnRvb2xzLmh0bWwnLFxuICAgICAgICAgIHNpZGVwYW5lbDogJ3NpZGVwYW5lbC5odG1sJyxcbiAgICAgICAgICBwb3B1cDogJ3BvcHVwLmh0bWwnLFxuICAgICAgICAgIG9wdGlvbnM6ICdvcHRpb25zLmh0bWwnLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tY2h1bmstW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9hc3NldC1baGFzaF0uW2V4dF0nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtjcngoeyBtYW5pZmVzdCB9KSwgdnVlKCksIHRhaWx3aW5kY3NzKCldLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogJy4vc3JjJyxcbiAgICAgIH0sXG4gICAgICBleHRlbnNpb25zOiBbJy5qcycsICcudHMnLCAnLnZ1ZScsICcuanNvbiddLFxuICAgIH0sXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGpvYlxcXFxkZW1vXFxcXGxleGluLWZlLWNyeFxcXFxzcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGpvYlxcXFxkZW1vXFxcXGxleGluLWZlLWNyeFxcXFxzcmNcXFxcbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2pvYi9kZW1vL2xleGluLWZlLWNyeC9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBwYWNrYWdlRGF0YSBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG5cbi8vQHRzLWlnbm9yZVxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAnZGV2ZWxvcG1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KHtcbiAgbmFtZTogYCR7cGFja2FnZURhdGEuZGlzcGxheU5hbWUgfHwgcGFja2FnZURhdGEubmFtZX0ke2lzRGV2ID8gYCBcdTI3QTFcdUZFMEYgRGV2YCA6ICcnfWAsXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlRGF0YS5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbjogcGFja2FnZURhdGEudmVyc2lvbixcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAxNjogJ2ltZy9sZXhpbi10b29sLWljb24uanBnJyxcbiAgICAzMjogJ2ltZy9sZXhpbi10b29sLWljb24uanBnJyxcbiAgICA0ODogJ2ltZy9sZXhpbi10b29sLWljb24uanBnJyxcbiAgICAxMjg6ICdpbWcvbGV4aW4tdG9vbC1pY29uLmpwZycsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpbWcvbGV4aW4tdG9vbC1pY29uLmpwZycsXG4gIH0sXG4gIG9wdGlvbnNfcGFnZTogJ29wdGlvbnMuaHRtbCcsXG4gIGRldnRvb2xzX3BhZ2U6ICdkZXZ0b29scy5odG1sJyxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxuICAgIHR5cGU6ICdtb2R1bGUnLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50U2NyaXB0L2luZGV4LnRzJ10sXG4gICAgICBydW5fYXQ6ICdkb2N1bWVudF9zdGFydCcsXG4gICAgfSxcbiAgXSxcbiAgc2lkZV9wYW5lbDoge1xuICAgIGRlZmF1bHRfcGF0aDogJ3NpZGVwYW5lbC5odG1sJyxcbiAgfSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2LnBuZycsICdpbWcvbG9nby0zNC5wbmcnLCAnaW1nL2xvZ28tNDgucG5nJywgJ2ltZy9sb2dvLTEyOC5wbmcnLCAnaW1nL2xleGluLXRvb2wtaWNvbi5qcGcnLCAnaW1nLyonXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbJ3NpZGVQYW5lbCcsICdzdG9yYWdlJywgJ2FjdGl2ZVRhYiddXG59KVxuIiwgIntcbiAgXCJuYW1lXCI6IFwibGV4aW4tZmUtY3J4XCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJsZXhpbiBGRVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcImF1dGhvclwiOiBcInphbmVcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiY2hyb21lLWV4dGVuc2lvblwiLFxuICAgIFwidnVlXCIsXG4gICAgXCJ2aXRlXCIsXG4gICAgXCJjcmVhdGUtY2hyb21lLWV4dFwiXG4gIF0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNC4xOC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInN0YXJ0XCI6IFwidml0ZVwiLFxuICAgIFwiZGV2XCI6IFwibnB4IG5vZGVtb24gLS1jb25maWcgbm9kZW1vbi5qc29uXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgJyoqLyoue3Z1ZSx0cyxqc29uLGNzcyxzY3NzLG1kfSdcIixcbiAgICBcInppcFwiOiBcIm5wbSBydW4gYnVpbGQgJiYgbm9kZSBzcmMvemlwLmpzXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHRhaWx3aW5kY3NzL3Bvc3Rjc3NcIjogXCJeNC4wLjEzXCIsXG4gICAgXCJAdGFpbHdpbmRjc3Mvdml0ZVwiOiBcIl40LjAuMTNcIixcbiAgICBcImxlc3NcIjogXCJeNC4yLjJcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC41LjNcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjQuMC4xM1wiLFxuICAgIFwidnVlXCI6IFwiXjMuMy40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMTlcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0NlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuNC4wXCIsXG4gICAgXCJjaHJvbWUtdHlwZXNcIjogXCJeMC4xLjM0NVwiLFxuICAgIFwiZ3VscFwiOiBcIl40LjAuMlwiLFxuICAgIFwiZ3VscC16aXBcIjogXCJeNi4wLjBcIixcbiAgICBcIm5vZGVtb25cIjogXCJeMy4xLjlcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4xMVwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjguMThcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtRLFNBQVMsb0JBQW9CO0FBQy9SLFNBQVMsV0FBVztBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7OztBQ0hrUCxTQUFTLHNCQUFzQjs7O0FDQXpTO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxRQUFVO0FBQUEsRUFDVixhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxLQUFPO0FBQUEsSUFDUCxLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLE1BQVE7QUFBQSxJQUNSLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixzQkFBc0I7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
