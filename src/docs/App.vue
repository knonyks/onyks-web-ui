<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const availableRoutes = router.getRoutes()

</script>

<template>
  <div id="app">

    <onyks-nav size="m">
      <onyks-logo></onyks-logo>
      <onyks-nav-content maxviewitems="6" mobilebreakpoint="1100">
        <router-link v-for="route in availableRoutes" :key="route.name" :to="route.path" class="menu-link">
          <onyks-nav-option :selected="$route.path === route.path">{{ route.name }}</onyks-nav-option>
        </router-link>
      </onyks-nav-content>
    </onyks-nav>

    <main>
      <router-view></router-view>
    </main>
    
  </div>
</template>

<style scoped>
  onyks-nav
  {
    position: sticky;
    top: 0;
    margin: 0;
    width: auto;
    z-index: 100000;
  }

  onyks-nav > onyks-logo
  {
    position: absolute;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    padding: var(--spacing-md);
    top: 0;
    width: fit-content;
  }

  main
  {
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    min-height: 90vh;
    box-sizing: border-box;
    padding: var(--spacing-lg);
  }

  a
  {
    text-decoration: none;
    color: inherit;
    display: block;
    height: fit-content;
  }
</style>