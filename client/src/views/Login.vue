<template>
  <div id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs8 md6 lg4>
          <v-card class="elevation-12 mt-5">
            <v-form @keyup.native.enter="signIn">
              <v-toolbar color="purple">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="username"
                  label="Username"
                  type="text"
                  v-model="user.username"
                  :error-messages="usernameErrors"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="user.password"
                  :error-messages="passwordErrors"
                ></v-text-field>
                <router-link
                  to="/AccountRecovery"
                  class="text-xs-right white--text"
                  style="float: right;"
                >
                  Forgot Password?
                </router-link>
                <v-checkbox
                  v-model="rememberme"
                  label="Remember Login?"
                ></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="signIn" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs8 md6 lg4>
          <v-card color="primary">
            <v-card-title class="justify-center">
              <h4 class="text-xs-center">
                Need an account?
                <router-link to="/Signup" class="white--text">
                  Register Here
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
import { required, username, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loading: false,
      rememberme: false,
      status: null
    }
  },
  methods: {
    ...mapMutations(['ADD_USER', 'UPDATE_SNACKBAR']),
    signIn: function() {
      this.$v.$touch()
      this.loading = true
      if (this.$v.$invalid) {
        this.loading = false
        return
      } else {
        UserService.login(this.user).then(response => {
          this.loading = false
          if (response.data.message) {
            this.UPDATE_SNACKBAR(response.data)
          } else {
            let today = new Date()
            if (this.rememberme) {
              //If remember me is checked, create cookie token cookie for a week
              today.setTime(today.getTime() + 3600000 * 24 * 7)
              document.cookie =
                'token=' +
                escape(response.data.token) +
                ';expires=' +
                today.toGMTString()
            } else {
              //Otherwise set expiration for one hour
              today.setTime(today.getTime() + 1 * 3600 * 1000)
              document.cookie =
                'token=' +
                escape(response.data.token) +
                ';expires=' +
                today.toGMTString()
            }
            this.ADD_USER({
              user: response.data.user,
              token: response.data.token
            })
            this.$router.go(-1)
          }
        })
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
    }
  }
}
</script>

<style scoped></style>
