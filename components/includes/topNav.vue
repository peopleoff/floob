<template>
  <v-app-bar flat fixed hide-on-scroll color="transparent">
    <nuxt-link to="/" class="logo">Floob</nuxt-link>
    <v-spacer></v-spacer>
    <p class="ma-0" v-if="room">
      Room: {{room.name}}
      <v-icon>mdi-share</v-icon>
    </p>
    <v-spacer></v-spacer>
    <v-btn outlined @click="toggleLoginModal" v-if="!$auth.loggedIn">Sign In</v-btn>
    <v-menu offset-y v-else transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{$auth.user.username}}</v-btn>
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
      toggleLoginModal: "modal/toggleLoginModal"
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
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 3rem;
  font-family: "Poppins", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}
</style>
