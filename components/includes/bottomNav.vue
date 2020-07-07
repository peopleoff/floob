<template>
  <v-footer height="64px">
    <a href="https://www.patreon.com/bePatron?u=27400212">
      <img :src="require('@/assets/images/patron_logo.png')" alt />
    </a>
    <v-btn fab text href="https://twitter.com/floobgg">
      <v-icon large>mdi-twitter</v-icon>
    </v-btn>
    <v-btn fab text href="https://discord.gg/aHAEenn">
      <v-icon large>mdi-discord</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-btn text href="mailto:Support@floob.gg">Contact Us</v-btn>
    <v-btn text to="/privacy_policy" nuxt>Privacy Policy</v-btn>
    <v-btn text to="/terms_of_service" nuxt>Terms of Service</v-btn>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  })
};
</script>

<style scoped>
.theme--dark.v-btn {
  color: #9ca2a5;
}
img {
  height: 48px;
}
</style>