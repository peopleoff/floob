<template>
  <v-app dark>
    <v-main>
      <topNav />
      <nuxt />
    </v-main>
    <Snackbar />
    <loginDialog />
    <JoinRoom />
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import Snackbar from "@/components/includes/Snackbar";
import loginDialog from "@/components/auth/loginDialog";
import JoinRoom from "@/components/modals/JoinRoom";

export default {
  components: {
    topNav,
    Snackbar,
    loginDialog,
    JoinRoom
  },
  data: () => ({})
};
</script>

<style>
</style>
