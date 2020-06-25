export const state = () => ({
  showLoginModal: false,
  showJoinModal: false
});

export const mutations = {
  TOGGLE_LOGIN_MODAL: state => {
    state.showLoginModal = !state.showLoginModal;
  },
  TOGGLE_JOIN_MODAL: state => {
    state.showJoinModal = !state.showJoinModal;
  }
};

export const actions = {
  toggleLoginModal: ({ commit }) => {
    commit("TOGGLE_LOGIN_MODAL");
  },
  toggleJoinModal: ({ commit }) => {
    commit("TOGGLE_JOIN_MODAL");
  }
};

export const getters = {
  showLoginModal(state) {
    return state.showLoginModal;
  },
  showJoinModal(state) {
    return state.showJoinModal;
  }
};
