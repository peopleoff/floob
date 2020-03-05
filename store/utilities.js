export const state = () => ({
  snackbar: null,
  loading: false
});

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
