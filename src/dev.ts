
// import { createApp } from 'vue'
// import App from './docs/App.vue'
// import router from './router.js'

// interface PageModule 
// {
//   init?: () => void;
// }

// const docs_modules = import.meta.glob('./components/*.ts') as Record<string, () => Promise<PageModule>>;
// for(let el of Object.keys(docs_modules))
// {
//     if (docs_modules[el]) 
//     {
//       const mod = await docs_modules[el]();
//       if (mod && typeof mod.init === 'function') 
//       {
//         mod.init();
//       }
//     }
// }

// const app = createApp(App)

// app.use(router)
// app.mount('#app')