<template>
  <v-app-bar fixed flat class="transparent pa-4" color="transparent">
    <nuxt-link
      to="/"
      tag="img"
      :src="require('@/assets/images/placeholder.png')"
      class="logo"
      alt="Floob Logo"
    ></nuxt-link>
    <v-spacer></v-spacer>
    <v-btn color="legendary_mint" rounded outlined nuxt to="/login" v-if="!loggedIn">Sign In</v-btn>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{user.username}}</v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>1</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">SignOut</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      logout: "user/logout"
    })
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loggedIn: "user/loggedIn"
    })
  }
};
</script>

<style scoped>
.logo {
  height: 100%;
}
</style>
