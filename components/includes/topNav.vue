<template>
  <v-app-bar flat app hide-on-scroll class="transparent" id="top-nav">
    <nuxt-link
      to="/"
      tag="img"
      :src="require('@/assets/images/placeholder.png')"
      class="logo"
      alt="Floob Logo"
    ></nuxt-link>
    <v-spacer></v-spacer>
    <v-btn outlined @click="toggleForm" v-if="!$auth.loggedIn">Sign In</v-btn>
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
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      toggleForm: "user/toggleForm"
    })
  }
};
</script>

<style scoped>
.logo {
  height: 100%;
}
</style>
