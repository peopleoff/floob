<template>
  <section class="d-flex h100 align-center justify-center">
    <v-form @keyup.native.enter="signIn" class="login-card">
      <v-card-text>
        <label for="username">Username/Email</label>
        <v-text-field
          name="username"
          type="text"
          v-model="user.username"
          :error-messages="usernameErrors"
          hint="Hint: CrowbarKiller"
          filled
          outlined
        ></v-text-field>
        <label for="password">Password</label>
        <v-text-field
          name="password"
          type="password"
          v-model="user.password"
          :error-messages="passwordErrors"
          hint="Hint: BlackMesaScientist"
          filled
          outlined
        ></v-text-field>
        <nuxt-link to="/password-reset">Forgot Password?</nuxt-link>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="signIn()" :loading="loading">Login</v-btn>
      </v-card-actions>
    </v-form>
  </section>
</template>

<script>
import UserService from "@/services/UserService";
import { mapActions } from "vuex";
import { required, username, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loading: false,
      rememberme: false,
      status: null
    };
  },
  methods: {
    ...mapActions({
      UPDATE_SNACKBAR: "utilities/UPDATE_SNACKBAR",
      ADD_USER: "auth/ADD_USER",
    }),
    signIn: function() {
      this.$v.$touch();
      this.loading = true;
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      } else {
        UserService.login(this.user)
          .then(response => {
            this.loading = false;
            if (response.data.message) {
              // this.$store.dispatch("utilities/UPDATE_SNACKBAR");
              this.UPDATE_SNACKBAR(response.data);
            } else {
              this.ADD_USER({
                user: response.data.user,
                token: response.data.token
              });
              this.UPDATE_SNACKBAR({
                type: "success",
                message: "Signed In!"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  validations: {
    user: {
      username: {
        minLength: minLength(4),
        required
      },
      password: {
        minLength: minLength(6),
        required
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) {
        return errors;
      }
      if (!this.$v.user.username.minLength) {
        errors.push(
          `Must be at least ${this.$v.user.username.$params.minLength.min} characters long`
        );
      }
      if (!this.$v.user.username.required) {
        errors.push("Username is required");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) {
        return errors;
      }
      if (!this.$v.user.password.minLength) {
        errors.push(
          `Must be at least ${this.$v.user.password.$params.minLength.min} characters long`
        );
      }
      if (!this.$v.user.password.required) {
        errors.push("Password is required");
      }
      return errors;
    }
  }
};
</script>

<style scoped></style>
