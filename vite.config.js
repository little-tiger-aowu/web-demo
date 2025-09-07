import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import unoCss from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    unoCss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue', // 自动引入vue相关的API，比如 reactive, ref 等
        '@vueuse/core', // 自动引入 vueUse 的所有 API
      ],
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
