import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import {resolve} from 'path'
// import mpa from 'vite-plugin-mpa'

export default defineConfig({
  plugins: [
    react(), 
    // mpa({
    //   scanDir: '.'
    // })
  ],
  build:{
    rollupOptions:{
      input:{
        index: resolve('./index.html'),
        async: resolve('./async/index.html'),
      }
    }
  }
});