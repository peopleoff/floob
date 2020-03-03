<template>
  <v-app-bar fixed flat class="transparent" color="transparent">
    <nuxt-link
      to="/"
      tag="img"
      :src="require('@/assets/images/logo.svg')"
      class="logo"
      alt="Floob Logo"
    ></nuxt-link>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-reddit</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-twitter</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-btn rounded outlined nuxt to="/login">
      Sign In
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
