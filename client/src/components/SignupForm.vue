<template>
  <v-form @keyup.native.enter="Register">
    <v-toolbar color="purple">
      <v-toolbar-title>Sign Up</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        name="username"
        label="Username"
        hint="This is the name everyone will know you as on Floob"
        type="text"
        v-model="user.username"
        :error-messages="usernameErrors"
      ></v-text-field>
      <v-text-field
        name="password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        v-model="user.password"
        :error-messages="passwordErrors"
      ></v-text-field>
      <v-text-field
        name="dob"
        label="Date of Birth"
        hint="01/10/1943"
        v-model="user.dateofbirth"
        v-mask="dobMask"
        :error-messages="dateofbirthErrors"
      ></v-text-field>
      <v-text-field
        name="email"
        label="Email"
        type="email"
        v-model="user.email"
        :error-messages="emailErrors"
      ></v-text-field>
      <p class="caption">
        By clicking Sign Up, you are indicating that you have read and
        acknowledge the
        <a href="TermsOfService" target="_blank">Terms of Service</a> and
        <a href="PrivacyPolicy" target="_blank">Privacy Notice</a>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="Register" :loading="loading">Sign Up</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import UserService from '@/services/UserService'
import { mapMutations } from 'vuex'
import {
  required,
  minLength,
  email,
} from 'vuelidate/lib/validators'

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        dateofbirth: ''
      },
      dobMask: '##/##/####',
      loading: false,
      showPassword: false
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
      dateofbirth: {
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
            if (response.data.error) {
              this.UPDATE_SNACKBAR(response.data)
              this.loading = false
              return
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
            this.UPDATE_SNACKBAR({
              type: 'success',
              message: 'Signed In!'
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
    dateofbirthErrors() {
      const errors = []
      if (!this.$v.user.dateofbirth.$dirty) {
        return errors
      }
      if (!this.$v.user.dateofbirth.required) {
        errors.push('Date of Birth is required')
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
