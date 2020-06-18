<template>
  <v-app dark>
    <v-content>
      <topNav />
      <nuxt />
    </v-content>
    <Snackbar />
    <loginDialog />
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import Snackbar from "@/components/includes/Snackbar";
import loginDialog from "@/components/auth/loginDialog";

export default {
  components: {
    topNav,
    Snackbar,
    loginDialog
  },
  data: () => ({})
};
</script>

<style>
</style>
