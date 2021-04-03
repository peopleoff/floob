<template>
  <v-footer color="#1e142d">
    <a href="https://www.patreon.com/bePatron?u=27400212" target="_blank">
      <img :src="require('@/assets/images/patron_logo.png')" alt />
    </a>
    <v-spacer></v-spacer>

    <v-btn text href="mailto:Support@floob.gg">Contact Us</v-btn>
    <v-btn text to="/privacy_policy" nuxt>Privacy Policy</v-btn>
    <v-btn text to="/terms_of_service" nuxt>Terms of Service</v-btn>
  </v-footer>
</template>

<style scoped>
.theme--dark.v-btn {
  color: #9ca2a5;
}
img {
  height: 48px;
}
</style>