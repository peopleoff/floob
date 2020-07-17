export const state = () => ({
  showLoginModal: false,
  showJoinModal: false,
  showShareModal: false,
  previousAction: null
});

export const mutations = {
  TOGGLE_LOGIN_MODAL: (state, previousAction) => {
    state.showLoginModal = !state.showLoginModal;
    state.previousAction = previousAction
  },
  TOGGLE_JOIN_MODAL: state => {
    state.showJoinModal = !state.showJoinModal;
  },
  TOGGLE_SHARE_MODAL: state => {
    state.showShareModal = !state.showShareModal;
  }
};

export const actions = {
  toggleLoginModal: ({ commit }, previousAction) => {
    console.log(previousAction);
    commit("TOGGLE_LOGIN_MODAL", previousAction);
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
