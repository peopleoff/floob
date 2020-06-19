<template>
  <v-form @keyup.native.enter="register">
    <v-card flat color="transparent">
      <v-card-text>
        <label for="username">Username</label>
        <v-text-field
          type="text"
          name="username"
          hint="Hint: xXxFearlessFuhrerxXx"
          v-model="user.username"
          :error-messages="usernameErrors"
          filled
          outlined
        ></v-text-field>
        <label for="email">Email</label>
        <v-text-field
          type="text"
          name="email"
          hint="Hint: MaesHughes@floob.gg"
          v-model="user.email"
          :error-messages="emailErrors"
          filled
          outlined
        ></v-text-field>
        <label for="dob">Date of Birth</label>
        <v-text-field
          type="text"
          name="dob"
          hint="Hint: 10/03/1911"
          v-model="user.date_of_birth"
          v-mask="'##/##/####'"
          :error-messages="date_of_birthErrors"
          filled
          outlined
        ></v-text-field>
        <label for="password">Password</label>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          name="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="user.password"
          :error-messages="passwordErrors"
          hint="Hint: YesThe$e@reFullMetalReference$!"
          filled
          outlined
        ></v-text-field>
        <p class="caption">
          By clicking Sign Up, you are indicating that you have read and
          acknowledge the
          <a
            href="TermsOfService"
            target="_blank"
          >Terms of Service</a> and
          <a href="PrivacyPolicy" target="_blank">Privacy Notice</a>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" :loading="loading" @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import UserService from "@/services/UserService";
import { mapActions } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        date_of_birth: "",
        email: ""
      },
      dobMask: "##/##/####",
      loading: false,
      showPassword: false
    };
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
      },
      date_of_birth: {
        minLength: minLength(6),
        required
      },
      email: {
        minLength: minLength(4),
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleForm: "user/toggleForm"
    }),
    getAge(DOB) {
      var today = new Date();
      var birthDate = new Date(DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }

      return age;
    },
    register: function() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      } else {
        UserService.register(this.user)
          .then(({ data }) => {
            this.loading = false;
            let token = data.token;
            this.$auth
              .setUserToken(token)
              .then(() => {
                this.notificationAdd({
                  type: "success",
                  message: "Registered"
                });
                this.toggleForm();
              })
              .catch(error => {
                console.log("ERror");
                console.log(error.response);
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
    date_of_birthErrors() {
      const errors = [];
      if (!this.$v.user.date_of_birth.$dirty) {
        return errors;
      }
      if (!this.$v.user.date_of_birth.required) {
        errors.push("Date of Birth is required");
      }
      if (this.getAge(this.user.date_of_birth) < 14) {
        errors.push("Must be at least 13 year's old to join");
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
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) {
        return errors;
      }
      if (!this.$v.user.email.email) {
        errors.push("Must be valid e-mail");
      }
      if (!this.$v.user.email.required) {
        errors.push("E-mail is required");
      }
      return errors;
    }
  }
};
</script>

<style>
</style>
