<template>
  <v-app dark>
    <v-app-bar fixed flat class="transparent" color="transparent">
      <router-link to="/" tag="img" :src="require('@/assets/images/logo.svg')" class="logo" alt="Floob Logo"></router-link>

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

      <v-btn rounded outlined>
        Sign In
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.transparent {
  background: transparent !important;
  background-color: transparent !important;
}
.logo{
  height: 100%;
  cursor: pointer;
}
</style>
