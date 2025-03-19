import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import manifest from './src/manifest.ts'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log('The env: ', mode, command)
  const production = mode === 'production'
  const isbuild = command === 'build'

  return {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "./src/assets/styles/reset.css";`,
          javascriptEnabled: true,
        },
        less: {
          additionalData: `@import "./src/assets/styles/variables.less";`,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      cssCodeSplit: true,
      emptyOutDir: production && isbuild,
      outDir: 'build',
      rollupOptions: {
        input: {
          devtools: 'devtools.html',
          sidepanel: 'sidepanel.html',
          popup: 'popup.html',
          options: 'options.html',
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-chunk-[hash].js',
          assetFileNames: 'assets/asset-[hash].[ext]',
        },
      },
    },
    plugins: [crx({ manifest }), vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': './src',
      },
      extensions: ['.js', '.ts', '.vue', '.json'],
    },
  }
})
