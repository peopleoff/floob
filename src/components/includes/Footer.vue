<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn color="white" text class="my-2" to="/PrivacyPolicy">Help</v-btn>
      <v-btn color="white" text class="my-2" to="/PrivacyPolicy">Privacy</v-btn>
      <v-btn color="white" text class="my-2" to="/TermsOfService">Terms</v-btn>
      <v-btn color="white" text class="my-2" to="//www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LUBJ846KR6SKS&source=url">Donate</v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({})
}
</script>
<style scoped>
.row .v-btn:not(:last-child){
  border-right: 1px solid #eee;
  border-radius: 0%
}
</style>
