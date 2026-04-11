import { createRouter, createWebHistory } from 'vue-router'
import Home from './docs/other/Home.vue'

function process_routes(routes) 
{
  routes.forEach(element => {
    switch(element.name)
    {
      case("FileExplorer"):
        element.name = "File Explorer"
        element.path = "/file-explorer"
        break;
      default:
        break;
    }
  });
}

const viewModules = import.meta.glob('./docs/examples/*.vue')
let routes = [{path: '/', component: Home, name: "Home"}]

routes.push(...Object.keys(viewModules).map((path) => 
{
  const name = path.split('/').pop()?.replace('.vue', '') || 'Unknown'
  return {
    path: `/${name.toLowerCase()}`,
    name: name,
    component: viewModules[path]
  }
}))

process_routes(routes);

const router = createRouter(
{
  history: createWebHistory(),
  routes: routes,
})

export default router