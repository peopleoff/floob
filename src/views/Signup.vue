<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg6>
          <v-card class="elevation-12 mt-5">
            <SignupForm />
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
                Already have an account?
                <router-link to="/login" class="white--text">Sign In</router-link>
              </h4>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import SignupForm from "@/components/SignupForm";
import { mapMutations } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Signup",
  components: {
    SignupForm
  },
  data() {
    return{

    }
  },
  methods: {
    ...mapMutations(["ADD_USER", "UPDATE_SNACKBAR"]),
  },
  computed: {
  }
};
</script>

<style scoped></style>
