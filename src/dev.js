import { createApp } from 'vue'
import App from './docs/App.vue'
import router from './router.js'

const docs_modules = import.meta.glob('./components/*.ts'); 

for (let el of Object.keys(docs_modules)) {
    if (docs_modules[el]) {
      const mod = await docs_modules[el]();
      
      if (mod && typeof mod.init === 'function') {
        mod.init();
      }
    }
}

const app = createApp(App)

app.use(router)
app.mount('#app')