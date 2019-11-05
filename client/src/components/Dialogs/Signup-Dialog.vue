<template>
  <v-dialog v-model="dialog" max-width="50%" @input="close" @in>
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="form in forms" :key="form">
          <v-card flat color="basil">
            <component :is="form" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import Signup from '@/components/SignupForm'
import Login from '@/components/LoginForm'

import { mapMutations } from 'vuex'

export default {
  components: {
    Signup,
    Login
  },
  props: ['dialog'],
  data: () => ({
    tab: null,
    items: ['Login', 'Sign Up'],
    forms: ['Login', 'Signup']
  }),
  methods: {
     ...mapMutations(['TOGGLE_FORM']),
    close: function(event) {
      console.log(event);
      this.$emit('closeDialog')
    }
  },
  computed: {
    loginForm() {
      return this.$store.getters.loginForm;
    }
  }
}
</script>

<style></style>
