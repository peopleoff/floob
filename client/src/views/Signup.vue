<template>
  <div id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs8 md6 lg4>
          <v-card class="elevation-12 mt-5">
            <v-toolbar>
              <v-toolbar-title>Register Form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="username"
                  label="Username"
                  type="text"
                  v-model="user.username"
                  :error-messages="usernameErrors"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="user.email"
                  :error-messages="emailErrors"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="user.password"
                  :error-messages="passwordErrors"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  v-model="user.confirmPassword"
                  :error-messages="confirmPasswordErrors"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="Register"
                v-on:keyup.enter="register()"
                :loading="loading"
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs8 md6 lg4>
          <v-card>
            <v-card-title class="justify-center">
              <h4 class="text-xs-center">
                Already have an account?
                <router-link to="/login" class="white--text">
                  Sign In
                </router-link>
              </h4>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import { mapMutations } from 'vuex'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      loading: false
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
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      email: {
        minLength: minLength(4),
        required,
        email
      }
    }
  },
  methods: {
    ...mapMutations(['ADD_USER', 'UPDATE_SNACKBAR']),
    Register: function() {
      this.loading = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.loading = false
        return
      } else {
        UserService.Register(this.user)
          .then(response => {
            if(response.data.error){
              this.UPDATE_SNACKBAR(response.data)
              this.loading = false;
              return;
            }
            let today = new Date()
            today.setTime(today.getTime() + 3600000 * 24 * 7)
            document.cookie =
              'token=' +
              escape(response.data.token) +
              ';expires=' +
              today.toGMTString()
            this.ADD_USER({
              token: response.data.token,
              user: response.data.user
            })
            this.$router.push('/')
            this.loading = false
          })
          .catch(error => {
            this.UPDATE_SNACKBAR(error.data)
            this.loading = false
          })
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.user.username.$dirty) {
        return errors
      }
      if (!this.$v.user.username.minLength) {
        errors.push(
          `Must be at least ${this.$v.user.username.$params.minLength.min} characters long`
        )
      }
      if (!this.$v.user.username.required) {
        errors.push('Username is required')
      }
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.user.password.$dirty) {
        return errors
      }
      if (!this.$v.user.password.minLength) {
        errors.push(
          `Must be at least ${this.$v.user.password.$params.minLength.min} characters long`
        )
      }
      if (!this.$v.user.password.required) {
        errors.push('Password is required')
      }
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.user.confirmPassword.$dirty) {
        return errors
      }
      if (!this.$v.user.confirmPassword.$model) {
        errors.push('Can not be empty')
      }
      if (!this.$v.user.confirmPassword.sameAsPassword) {
        errors.push('Passwords must match')
      }
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.user.email.$dirty) {
        return errors
      }
      if (!this.$v.user.email.email) {
        errors.push('Must be valid e-mail')
      }
      if (!this.$v.user.email.required) {
        errors.push('E-mail is required')
      }
      return errors
    }
  }
}
</script>

<style scoped></style>
