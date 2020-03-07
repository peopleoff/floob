export const state = () => ({
  snackbar: null,
  loading: false
});

export const actions = {
  UPDATE_SNACKBAR: ({ commit }, payload) => {
    commit("UPDATE_SNACKBAR", payload);
  },
  START_LOADING: ({ commit }) => {
    commit("START_LOADING");
  },
  STOP_LOADING: ({ commit }) => {
    commit("STOP_LOADING");
  }
};

export const mutations = {
  UPDATE_SNACKBAR: (state, payload) => {
    state.snackbar = payload;
  },
  START_LOADING: state => {
    state.loading = true;
  },
  STOP_LOADING: state => {
    state.loading = false;
  }
};

export const getters = {
  snackbar(state) {
    return state.snackbar;
  },
  loading(state) {
    return state.loading ? true : false;
  }
};
