<template>
  <section id="background" class="d-flex h100 align-center justify-center">
    <v-sheet width="448px" class="pa-5" color="#36393f">
      <h4 class="text-center">Password reset for</h4>
      <h2 class="text-center">{{user.username}}</h2>
      <v-form @keyup.native.enter="changePassword">
        <v-card-text>
          <label for="password">New password</label>
          <v-text-field
            name="password"
            type="password"
            color="legendary_mint"
            v-model="user.password"
            :error-messages="passwordErrors"
            filled
            outlined
          ></v-text-field>
          <label for="confirmPassword">Confirm your password</label>
          <v-text-field
            name="confirmPassword"
            type="password"
            color="legendary_mint"
            v-model="user.confirmPassword"
            :error-messages="confirmPasswordErrors"
            filled
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-btn
            block
            large
            color="legendary_mint"
            outlined
            @click="changePassword"
            :loading="loading"
          >Change Password</v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import UserService from "@/services/UserService";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false
    };
  },
  asyncData({ error, params, store }) {
    return UserService.getUser({ token: params.id })
      .then(result => {
        return {
          user: result.data.user,
          token: params.id
        };
      })
      .catch(err => {
        error({ statusCode: 401, message: err.response.data.message });
      });
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal"
    }),
    changePassword() {
      this.$v.$touch();
      this.loading = true;
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }
      UserService.changePassword({
        token: this.token,
        password: this.user.password,
        confirmPassword: this.user.confirmPassword
      })
        .then(({ data }) => {
          this.loading = false;
          this.notificationAdd({
            type: "success",
            message: data.message
          });
        })
        .catch(error => {
          this.loading = false;
          this.notificationAdd({
            type: "error",
            message: error.response.data.message
          });
        });
    }
  },
  validations: {
    user: {
      password: {
        minLength: minLength(6),
        required
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
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
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.user.confirmPassword.$dirty) {
        return errors;
      }
      if (!this.$v.user.confirmPassword.sameAsPassword) {
        errors.push(`Password must match`);
      }
      return errors;
    }
  }
};
</script>

<style scoped>
#background {
  background: url("/images/background-dark.svg");
  background-position: center;
  background-size: cover;
}
</style>