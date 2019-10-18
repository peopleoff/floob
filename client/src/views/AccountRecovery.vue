<template>
  <div id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 md6 lg4>
          <v-card class="elevation-12 mt-5">
            <v-toolbar color="primary">
              <v-toolbar-title>Getting back into Floob</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <h3>
                Enter your username or email and we will send you a link to reset your password.
              </h3>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="username"
                  label="Username or Email"
                  type="text"
                  v-model="username"
                  @keydown.enter="requestPasswordChange"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primaryAction"
                @click="requestPasswordChange"
                :loading="loading"
                :disabled="this.$v.username.$invalid"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import { mapMutations } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'PasswordReset',
  data() {
    return {
      username: '',
      loading: false
    }
  },
  methods: {
    ...mapMutations(['ADD_USER', 'UPDATE_SNACKBAR']),
    requestPasswordChange: function() {
      this.loading = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.loading = false
        return
      } else {
        UserService.requestPasswordChange({
          username: this.username
        })
          .then(response => {
            this.UPDATE_SNACKBAR(response.data);
            this.loading = false;
            this.username = '';
          })
          .catch(error => {
            this.UPDATE_SNACKBAR(error)
            this.loading = false
          })
      }
    }
  },
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.username.$dirty) {
        return errors
      }
      if (!this.$v.username.minLength) {
        errors.push(
          `Must be at least ${this.$v.username.$params.minLength.min} characters long`
        )
      }
      if (!this.$v.username.required) {
        errors.push('Password is required')
      }
      return errors
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    }
  }
}
</script>

<style scoped>
#inspire .application--wrap {
  min-height: 90vh;
}
h3 {
  width: 75%;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
}
</style>
