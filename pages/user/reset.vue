<template>
  <section id="background" class="d-flex h100 align-center justify-center">
    <v-sheet width="75%" class="pa-5" color="#36393f">
      <h1 class="text-center">Help getting back into your account</h1>
      <h3 class="text-center">Tell us some information about your account.</h3>
      <v-form v-on:submit.prevent="requestPasswordChange">
        <v-card-text>
          <label for>Enter your username or email</label>
          <v-text-field
            name="username"
            type="text"
            hint="Hint: CrowbarKiller"
            v-model="username"
            filled
            outlined
            :error-messages="usernameErrors"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="primary"
            @click="requestPasswordChange"
            :loading="loading"
            >Request Password Change</v-btn
          >
        </v-card-actions>
      </v-form>
      <p class="caption px-2">
        Ready to
        <a href="#" @click="toggleLoginModal">Login?</a>
      </p>
    </v-sheet>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      username: null,
      loading: false,
    };
  },
  mounted() {
    this.toggleLoginModal({action: "close"});
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal",
    }),
    requestPasswordChange() {
      this.$v.$touch();
      this.loading = true;
      if (this.$v.$invalid) {
        this.loading = false;
        return false;
      }
      UserService.requestPasswordChange({
        username: this.username,
      })
        .then(({ data }) => {
          this.loading = false;
          this.notificationAdd({
            type: "success",
            message: data.message,
          });
        })
        .catch((error) => {
          this.loading = false;
          this.notificationAdd({
            type: "error",
            message: error.response.data.message,
          });
        });
    },
  },
  validations: {
    username: {
      minLength: minLength(4),
      required,
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) {
        return errors;
      }
      if (!this.$v.username.minLength) {
        errors.push(
          `Must be ${this.$v.username.$params.minLength.min} characters long`
        );
      }
      if (!this.$v.username.required) {
        errors.push("Username or Email is required");
      }
      return errors;
    },
  },
};
</script>

<style scoped>
#background {
  background: url("/images/background-dark.svg");
  background-position: center;
  background-size: cover;
  /* height: 100vh; */
}
</style>