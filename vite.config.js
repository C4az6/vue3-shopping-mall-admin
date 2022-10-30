import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // __dirname为当前路径,然后拼接src,意味着~符号和src目录做了关联
      "~": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://ceshi13.dishait.cn',
        target: 'http://shopadmin.dishawang.com/api',
        changeOrigin: true,
        // 匹配以^开头的/admin字符串,然后替换
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue(), WindiCSS()]
})
