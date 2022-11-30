import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  if (mode === 'development') {
    return defineConfig({
      server: {
        host: true
      },
      plugins: [vue()]
    })
  }

  return defineConfig({
    plugins: [vue()],
    base: '/suki/',
    build: {
      outDir: 'suki'
    }
  })
}
