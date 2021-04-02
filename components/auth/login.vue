<template>
  <v-form @keyup.native.enter="signIn">
    <v-card flat color="transparent">
      <v-card-text>
        <label for="username">Username/Email</label>
        <v-text-field
          name="username"
          type="text"
          v-model="user.username"
          :error-messages="usernameErrors"
          hint="Hint: CrowbarKiller"
          color="legendary_mint"
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
          color="legendary_mint"
          filled
          outlined
        ></v-text-field>
        <nuxt-link to="/user/reset">Forgot Password?</nuxt-link>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="kings_purple"
          class="rounded-pill"
          @click="signIn()"
          :loading="loading"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, username, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loading: false,
      rememberme: false,
      status: null,
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
    }),
    async signIn() {
      this.$v.$touch();
      this.loading = true;
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }
      this.$auth
        .loginWith("local", {
          data: this.user,
        })
        .then((response) => {
          this.loading = false;
          this.user = {
            username: "",
            password: "",
          };
          this.toggleLoginModal();
          this.notificationAdd({
            type: "success",
            message: "Logged In",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.notificationAdd({
            type: "error",
            message: "Invalid Username or Password",
          });
        });
    },
  },
  validations: {
    user: {
      username: {
        minLength: minLength(4),
        required,
      },
      password: {
        minLength: minLength(6),
        required,
      },
    },
  },
  computed: {
    ...mapState({
      previousAction: (state) => state.modal.previousAction,
    }),
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
    },
  },
};
</script>

<style scoped></style>
