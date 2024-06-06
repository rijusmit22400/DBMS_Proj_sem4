import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        method: 'POST'
      },
      '/register': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        method: 'POST'
      },
      '/change_profile': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        method: 'POST'
      },
      '/call/cart':{
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        method: 'POST'
      }
    }
  }
})
