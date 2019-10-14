<template>
  <v-app dark>
    <Loading v-if="loading" />
    <Header />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
      <Snackbar :snackbar="snackbar" />
    </v-content>
  </v-app>
</template>

<script>
  import Header from './components/includes/Header'
  import Snackbar from './components/includes/Snackbar'
  import Loading from './components/includes/Loading'
  
  export default {
    name: 'App',
    components: {
      Header,
      Snackbar,
      Loading
    },
    data() {
      return {
        //
      }
    },
    computed: {
      snackbar() {
        return this.$store.state.snackbar
      },
      loading() {
        return this.$store.state.loading
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
*{
  font-family: 'Poppins', sans-serif;
}

</style>
