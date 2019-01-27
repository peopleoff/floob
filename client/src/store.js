import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      username: 'admin'
    },
    snackbar: null
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.user = payload;
    },
    UPDATE_SNACKBAR: (state, payload) => {
      state.snackbar = payload;
    },
    SIGN_OUT: (state) => {
      state.user = null;
      router.push('/');
    },
  },
  getters: {
    snackbar(state) {
      return state.snackbar
    }
  },
  actions: {

  }
})