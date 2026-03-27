import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue'; // <-- DODANE: Plugin do obsługi Vue w trybie dev

export default defineConfig({
  server: {
    host: true,
    proxy: {}
  },
  appType: 'spa',
  
  // Konfiguracja budowania Twojej biblioteki Lit
  build: {
    lib: {
      entry: 'src/index.ts', // <-- Vite weźmie TYLKO ten plik i to co on importuje
      name: 'onyks-web-ui-system',
      fileName: 'index',
      formats: ['es'] 
    },
    rollupOptions: {
      // Zewnętrzne zależności (nie wejdą do paczki)
      external: [/^lit/], 
      output: {
        assetFileNames: 'general.css'
      }
    }
  },
  
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Mówimy Vue: "Wszystko co zaczyna się od 'onyks-' to Custom Element, zostaw to w spokoju"
          isCustomElement: (tag) => tag.startsWith('onyks-'),
          whitespace: 'preserve'
        }
      }
    }), // <-- DODANE: Pozwala Vite renderować pliki .vue podczas `npm run dev`
    dts({ 
      rollupTypes: true,
      tsconfigPath: './tsconfig.json' 
    }) 
  ],
  
  // Konfiguracja esbuild dla dekoratorów Lit (np. @customElement, @property)
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
});