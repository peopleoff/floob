export const state = () => ({
  showLoginForm: false
});

export const mutations = {
  TOGGLE_LOGIN_FORM: state => {
    state.showLoginForm = !state.showLoginForm;
  }
};

export const actions = {
  toggleForm: ({ commit }) => {
    commit("TOGGLE_LOGIN_FORM");
  }
};

export const getters = {
  showLoginForm(state) {
    return state.showLoginForm;
  }
};
