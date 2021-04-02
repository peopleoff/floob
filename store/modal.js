export const state = () => ({
  showLoginModal: false,
  showJoinModal: false,
  showShareModal: false,
  action: null
});

export const mutations = {
  TOGGLE_LOGIN_MODAL: (state, action) => {
    switch (action) {
      case "close":
        state.showLoginModal = false;
        break;
      case "open":
        state.showLoginModal = true;
        break;

      default:
        state.showLoginModal = !state.showLoginModal;
        break;
    }

    state.action = action;
  },
  TOGGLE_JOIN_MODAL: state => {
    state.showJoinModal = !state.showJoinModal;
  },
  TOGGLE_SHARE_MODAL: state => {
    state.showShareModal = !state.showShareModal;
  }
};

export const actions = {
  toggleLoginModal: ({ commit }, action) => {
    commit("TOGGLE_LOGIN_MODAL", action);
  },
  toggleJoinModal: ({ commit }) => {
    commit("TOGGLE_JOIN_MODAL");
  },
  toggleShareModal: ({ commit }) => {
    commit("TOGGLE_SHARE_MODAL");
  }
};

export const getters = {
  showLoginModal(state) {
    return state.showLoginModal;
  },
  showJoinModal(state) {
    return state.showJoinModal;
  },
  showShareModal(state) {
    return state.showShareModal;
  },
  previousAction(state) {
    return state.previousAction;
  }
};
