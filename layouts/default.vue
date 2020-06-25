<template>
  <v-app dark>
    <v-content>
      <topNav />
      <nuxt />
    </v-content>
    <Snackbar />
    <loginDialog />
    <joinRoom />
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import Snackbar from "@/components/includes/Snackbar";
import loginDialog from "@/components/auth/loginDialog";
import joinRoom from "@/components/modals/joinRoom";

export default {
  components: {
    topNav,
    Snackbar,
    loginDialog,
    joinRoom
  },
  data: () => ({})
};
</script>

<style>
</style>
