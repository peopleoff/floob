<template>
  <v-app dark>
    <topNav />
    <v-content>
      <nuxt />
    </v-content>
    <snackBar />
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import snackBar from '@/components/includes/snackBar'
export default {
  components: {
    topNav,
    snackBar
  },
  data: () => ({
  })
};
</script>

<style>
</style>
