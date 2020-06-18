<template>
  <section class="d-flex h100 align-center justify-center login-background">
    <v-sheet class="pa-5 login-sheet" color="#36393f">
      <h1 class="text-center">Welcome Back!</h1>
      <authTabs />
    </v-sheet>
  </section>
</template>

<script>
import authTabs from "@/components/auth/authTabs";

export default {
  components: {
    authTabs
  },
  data() {
    return {};
  }
};
</script>

<style>
.login-background {
  background: url("~assets/images/color-background.jpg");
  background-size: cover;
}
.login-sheet {
  width: 50%;
}
.login-background .theme--dark.v-tabs-items,
.login-background .v-tabs .theme--dark {
  background-color: transparent;
}

@media only screen and (max-width: 600px) {
  .login-sheet {
    width: 95%;
  }
}
</style>
