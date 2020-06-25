<template>
  <v-dialog v-model="showJoinModal" @click:outside="toggleJoinModal" max-width="600px">
    <v-form @keyup.native.enter="joinRoom">
      <v-toolbar>
        <v-toolbar-title>Sign Up</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="roomCode" label="Room Code" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="joinRoom">Sign Up</v-btn>
      </v-card-actions>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      roomCode: ""
    };
  },
  methods: {
    ...mapActions({
      toggleJoinModal: "modal/toggleJoinModal"
    }),
    joinRoom() {
      this.toggleJoinModal();
      this.$router.push({ path: `/room/${this.roomCode}` });
      this.roomCode = "";
    }
  },
  computed: {
    ...mapGetters({
      showJoinModal: "modal/showJoinModal"
    })
  }
};
</script>

<style>
</style>