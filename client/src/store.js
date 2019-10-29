import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import router from "./router";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    room: null,
    token: localStorage.getItem("token") || "",
    snackbar: null,
    loginForm: false
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.user = payload.user;
      state.token = payload.token;
      console.log(router);
    },
    ADD_ROOM: (state, payload) => {
      state.room = payload;
    },
    UPDATE_SNACKBAR: (state, payload) => {
      state.snackbar = payload;
    },
    TOGGLE_FORM: (state, payload) => {
      state.loginForm = !state.loginForm;
    },
    START_LOADING: (state, payload) => {
      state.loading = true;
    },
    STOP_LOADING: (state, payload) => {
      state.loading = false;
    },
    LOGOUT_USER(state) {
      state.user = null;
      state.token = null;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (router.currentRoute.path === "/") {
        router.go();
      } else {
        router.push("/");
      }
    }
  },
  getters: {
    snackbar(state) {
      return state.snackbar;
    },
    loggedIn(state) {
      return state.token ? true : false;
    },
    loading(state) {
      return state.loading ? true : false;
    },
  },
  actions: {},
  plugins: [new VuexPersistence().plugin]
});
