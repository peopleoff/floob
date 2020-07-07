<template>
  <v-app-bar flat fixed hide-on-scroll color="transparent">
    <nuxt-link to="/" tag="img" :src="require('@/assets/images/logo.svg')" class="logo"></nuxt-link>
    <v-spacer></v-spacer>
    <p class="ma-0" v-if="room">
      Room Code: {{room.roomUUID}}
      <v-icon @click="toggleShareModal">mdi-share</v-icon>
    </p>
    <v-spacer></v-spacer>
    <v-btn outlined color="legendary_mint" class="mx-3" @click="toggleJoinModal">Join a Room</v-btn>
    <v-btn @click="toggleLoginModal" v-if="!$auth.loggedIn">Sign In</v-btn>
    <v-menu offset-y open-on-hover v-else transition="scale-transition">
      <template v-slot:activator="{ on }">
        <span v-on="on" class="mx-3 pointer">
          {{$auth.user.username}}
          <v-icon>mdi-chevron-down</v-icon>
        </span>
      </template>

      <v-list>
        <v-list-item @click="$auth.logout()">Log Out</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions({
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal",
      toggleShareModal: "modal/toggleShareModal"
    })
  },
  computed: {
    ...mapState({
      room: state => state.room.room
    })
  }
};
</script>

<style scoped>
#top-nav {
  background: #00ccc2;
}
.logo {
  height: 50%;
  cursor: pointer;
  /* color: white;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 3rem;
  font-family: "Poppins", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial,
    sans-serif; */
}
</style>
