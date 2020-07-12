<template>
  <v-app-bar flat fixed hide-on-scroll color="transparent">
    <nuxt-link to="/" tag="img" :src="require('@/assets/images/logo.svg')" class="logo"></nuxt-link>
    <v-spacer></v-spacer>
    <div class="ma-0 pointer" @click="toggleShareModal" v-if="room">
      <span class="hidden-sm-and-down">Room Code: {{room.roomUUID}}</span>
      <span class="hidden-md-and-up">Share Room</span>
      <v-icon>mdi-share</v-icon>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      outlined
      color="royal_flue"
      class="mx-3 hidden-sm-and-down"
      @click="toggleJoinModal"
      v-if="room"
    >Join a Room</v-btn>
    <v-btn @click="toggleLoginModal" v-if="!$auth.loggedIn" color="kings_purple" class="rounded-pill">Sign In</v-btn>
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
header {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 960px) {
  header {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  header {
    max-width: 1185px;
  }
}
@media (min-width: 1904px) {
  header {
    max-width: 1785px;
  }
}
.logo {
  height: 50%;
  cursor: pointer;
}
</style>
