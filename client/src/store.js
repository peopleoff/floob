import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    room: null,
    token: localStorage.getItem('token') || '',
    snackbar: null
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.user = payload.user
      state.token = payload.token
    },
    ADD_ROOM: (state, payload) => {
      state.room = payload
    },
    TOGGLE_SIDEBAR: state => {
      state.chatroomSidebar = !state.chatroomSidebar
    },
    TOGGLE_LOADING: state => {
      state.loading = false
    },
    UPDATE_SNACKBAR: (state, payload) => {
      state.snackbar = payload
    },
    SIGN_OUT: state => {
      state.user = null
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      router.push('/')
    },
    logout(state) {
      state.user = null
      state.token = null
    }
  },
  getters: {
    snackbar(state) {
      return state.snackbar
    },
    loggedIn(state) {
      return state.token ? true : false
    }
  },
  actions: {}
})
