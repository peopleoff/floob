<template>
  <v-app dark>
    <sideNav />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import sideNav from "@/components/includes/sideNav";

export default {
  components: {
    sideNav
  },
  data() {
    return {};
  }
};
</script>
