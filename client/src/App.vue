<template>
  <v-app>
    <Sidebar />
    <v-content>
      <router-view />
      <Snackbar :snackbar="snackbar" />      
      <LoginDialog :dialog="showLoginForm" />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/includes/Sidebar'
import Snackbar from './components/includes/Snackbar'
import LoginDialog from './components/Dialogs/Signup-Dialog'

import { mapMutations } from 'vuex'

export default {
  components: {
    Sidebar,
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
    right: null
  }),
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR','TOGGLE_FORM']),
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    showLoginForm(){
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
.logo {
  height: 100%;
  width: 100%;
  padding: 8px;
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
