export const state = () => ({
  user: null,
  token: null,
  showLoginForm: false
});

export const actions = {
  ADD_USER: ({ commit }, payload) => {
    commit("ADD_USER", payload);
  },
  LOGOUT_USER: ({ commit }, payload) => {
    commit("LOGOUT_USER", payload);
  },
  SHOW_LOGIN_FORM: ({ commit }) => {
    commit("SHOW_LOGIN_FORM");
  },
  HIDE_LOGIN_FORM: ({ commit }) => {
    commit("HIDE_LOGIN_FORM");
  }
};

export const mutations = {
  ADD_USER: (state, payload) => {
    state.user = payload.user;
    state.token = payload.token;
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
  },
  SHOW_LOGIN_FORM: state => {
    state.showLoginForm = true;
  },
  HIDE_LOGIN_FORM: state => {
    state.showLoginForm = false;
  }
};

export const getters = {
  loggedIn(state) {
    return state.token ? true : false;
  },
  showLoginForm(state) {
    return state.showLoginForm;
  }
};
