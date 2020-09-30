<template>
  <v-app-bar
    flat
    color="transparent"
    v-bind:class="{ 'color-nav': $route.path == '/' }"
  >
    <nuxt-link
      to="/"
      tag="img"
      alt="Floob Logo"
      :src="require('@/assets/images/logo.svg')"
      class="logo"
    ></nuxt-link>
    <v-spacer></v-spacer>
    <RoomShare />
    <v-spacer></v-spacer>
    <v-btn
      outlined
      color="royal_flue"
      class="mx-3 hidden-sm-and-down"
      @click="toggleJoinModal"
      v-if="room"
      >Join a Room</v-btn
    >
    <v-btn
      @click="toggleLoginModal"
      v-if="!$auth.loggedIn"
      color="kings_purple"
      >Sign In</v-btn
    >
    <v-menu offset-y v-else transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="kings_purple" class="text-unset" v-bind="attrs" v-on="on">
          {{ $auth.user.username }} 
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$auth.logout()">
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import RoomShare from "@/components/RoomShare";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    RoomShare,
  },
  methods: {
    ...mapActions({
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal",
    }),
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
    }),
  },
};
</script>

<style>
.v-application--wrap header.color-nav {
  background-color: #662d91 !important;
}
.v-toolbar__content {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 960px) {
  .v-toolbar__content {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  .v-toolbar__content {
    max-width: 1185px;
  }
}
@media (min-width: 1904px) {
  .v-toolbar__content {
    max-width: 1785px;
  }
}
.logo {
  height: 50%;
  cursor: pointer;
}
</style>
