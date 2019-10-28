<template>
  <v-app>
    <Sidebar v-if="right" />
    <Topbar v-else />
    <v-content>
      <router-view />
      <Snackbar :snackbar="snackbar" />
      <LoginDialog :dialog="showLoginForm" />
      <v-btn fixed dark fab bottom right color="secondary" @click="right = !right">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/includes/Sidebar'
import Topbar from './components/includes/Topbar'
import Snackbar from './components/includes/Snackbar'
import LoginDialog from './components/Dialogs/Signup-Dialog'

import { mapMutations } from 'vuex'

export default {
  components: {
    Sidebar,
    Topbar,
    LoginDialog,
    Snackbar
  },
  sockets: {
    updateSnackbar(data) {
      this.UPDATE_SNACKBAR(data)
    }
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' }
    ],
    right: false
  }),
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR', 'TOGGLE_FORM'])
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    showLoginForm() {
      return this.$store.state.loginForm
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
* {
  font-family: 'Poppins', sans-serif;
}
html,
body {
  overscroll-behavior: none;
}

.h100 {
  height: 100% !important;
}

.w0 {
  width: 0 !important;
}

.v-text-field--filled.v-text-field--single-line input,
.v-text-field--full-width.v-text-field--single-line input {
  margin-top: 0px !important;
}

.pointer {
  cursor: pointer;
}
</style>
