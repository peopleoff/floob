<template>
  <section class="d-flex h100 align-center justify-center">
    <v-sheet class="pa-5 login-sheet" color="#36393f">
      <h1 class="text-center">Welcome Back!</h1>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
      >
        <v-tab>
          Login
        </v-tab>
        <v-tab>
          Sign-Up
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <login />
        </v-tab-item>
        <v-tab-item>
          <signup />
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </section>
</template>

<script>
import login from "@/components/auth/login";
import signup from "@/components/auth/signup";

export default {
  layout: "auth",
  components: {
    login,
    signup
  },
  data() {
    return {
      tab: 0
    };
  }
};
</script>

<style>
.login-card{
  width: 100%;
  background-color: #36393f
}
.login-sheet{
  width: 50%;
}

@media only screen and (max-width: 600px) {
  .login-sheet{
    width: 75%;
  }
}
</style>
