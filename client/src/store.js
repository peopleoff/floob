import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      username: "admin"
    },
    room: {
      _id: '5c48c7d478657a2a30fe7cb7',
      name: 'Room 1',
      nsfw: false
    },
    snackbar: null
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.user = payload;
    },
    ADD_ROOM: (state, payload) => {
      state.room = payload;
    },
    UPDATE_SNACKBAR: (state, payload) => {
      state.snackbar = payload;
    },
    SIGN_OUT: (state) => {
      state.user = null;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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