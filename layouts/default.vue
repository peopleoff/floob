<template>
  <v-app dark>
    <topNav />
    <v-content>
      <nuxt />
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import Snackbar from '@/components/includes/Snackbar'

export default {
  components: {
    topNav,
    Snackbar
  },
  data: () => ({
  })
};
</script>

<style>
</style>
