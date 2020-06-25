<template>
  <section id="background" class="d-flex h100 align-center justify-center">
    <v-sheet width="75%" class="pa-5" color="#36393f">
      <h1 class="text-center">Help getting back into your account</h1>
      <h3 class="text-center">Tell us some information about your account.</h3>
      <v-form @keyup.native.enter="requestPasswordChange">
        <v-card-text>
          <label for>Enter your username or email</label>
          <v-text-field
            name="username"
            type="text"
            hint="Hint: CrowbarKiller"
            v-model="username"
            filled
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary" @click="requestPasswordChange">Request Password Change</v-btn>
        </v-card-actions>
      </v-form>
      <p class="caption px-2">
        Ready to
        <nuxt-link to="/login">Login?</nuxt-link>
      </p>
    </v-sheet>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      username: null
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal"
    }),
    requestPasswordChange() {
      UserService.requestPasswordChange({
        username: this.username
      })
        .then(({ data }) => {
          this.notificationAdd({
            type: "success",
            message: data.message
          });
        })
        .catch(error => {
          this.notificationAdd({
            type: "error",
            message: error.response.data.message
          });
        });
    },
    joinRoom() {
      this.joinDialog = !this.joinDialog;
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