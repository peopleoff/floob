<template>
  <v-app dark>
    <topNav />
    <v-main>
      <nuxt />
      <bottomNav />
    </v-main>
    <Snackbar />
    <loginDialog />
    <JoinRoom />
    <client-only>
      <ShareRoom v-if="this.room" />
    </client-only>
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import bottomNav from "@/components/includes/bottomNav";
import Snackbar from "@/components/includes/Snackbar";
import loginDialog from "@/components/auth/loginDialog";
import JoinRoom from "@/components/modals/JoinRoom";
import ShareRoom from "@/components/modals/ShareRoom";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    topNav,
    Snackbar,
    loginDialog,
    JoinRoom,
    ShareRoom,
    bottomNav
  },
  data: () => ({}),
  computed: {
    ...mapState({
      room: state => state.room.room
    })
  }
};
</script>

<style>
</style>
