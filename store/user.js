import UserService from "@/services/UserService";

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER_DATA: (state, payload) => {
    state.user = payload;
    localStorage.setItem('user', JSON.stringify(payload));
  },
  CLEAR_USER_DATA: state => {
      state.user = null;
      localStorage.removeItem('user');
  }
};

export const actions = {
  register: ({ commit }, credentials) => {
    return UserService.register(credentials)
      .then(({ data }) => {
        commit("SET_USER_DATA", data);
      })
  },
  login: ({ commit }, credentials) => {
    return UserService.login(credentials)
      .then(({ data }) => {
        commit("SET_USER_DATA", data);
      })
  },
  logout: ({ commit }) => {
    commit("CLEAR_USER_DATA");
  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  loggedIn(state) {
    return !!state.user;
  }
};
