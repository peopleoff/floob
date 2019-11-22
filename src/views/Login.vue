<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg6>
          <v-card class="elevation-12 mt-5">
            <LoginForm />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg6>
          <v-card color="primary">
            <v-card-title class="justify-center">
              <h4 class="text-xs-center">
                Need an account?
                <router-link to="/Signup" class="white--text">Register Here</router-link>
              </h4>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
