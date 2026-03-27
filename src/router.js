import { createRouter, createWebHistory } from 'vue-router'
import Home from './docs/other/Home.vue'
import License from './docs/other/License.vue'

const viewModules = import.meta.glob('./docs/examples/*.vue')

let routes = [
  {path: '/', component: Home, name: "Home"},
  {path: '/license', component: License, name: "License"}]

routes.push(...Object.keys(viewModules).map((path) => 
{
  const name = path.split('/').pop()?.replace('.vue', '') || 'Unknown'
  return {
    path: `/${name.toLowerCase()}`,
    name: name,
    component: viewModules[path]
  }
}))

const router = createRouter(
{
  history: createWebHistory(),
  routes: routes,
})

export default router