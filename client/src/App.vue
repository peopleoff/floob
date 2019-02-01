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
  .heading {
    font-family: 'Domine', serif !important;
  }

  .grad-button {
    background: linear-gradient(to right, #018786, #03DAC6);
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #03DAC6;

    background-image: -webkit-gradient(linear, 0 0, 0 100%,
      color-stop(.5, rgba(255, 255, 255, .2)),
      color-stop(.5, transparent), to(transparent));
  }
</style>