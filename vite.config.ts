import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: 
  {
    host: true,
    proxy: 
    {}
  },
  appType: 'spa',
  build: 
  {
    lib: 
    {
      entry: 'src/index.ts',
      name: 'onyks-web-ui-system',
      fileName: 'index',
      formats: ['es'] 
    },
    rollupOptions: 
    {
      external: [/^lit/],
      output: {
        assetFileNames: 'general.css'
      }
    }
  },
  plugins: [
    dts({ 
      rollupTypes: true,
      tsconfigPath: './tsconfig.json' 
    }) 
  ],
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
});