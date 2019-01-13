<template>
  <div id="app">
    <TopNav />
    <router-view />
  </div>
</template>

<script>
  import TopNav from '@/components/TopNav.vue'
  export default {
    name: 'App',
    components: {
      TopNav
    },
  }
</script>

<style>
.click{
  cursor: pointer;
}
</style>