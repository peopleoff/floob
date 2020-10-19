export const state = () => ({
  notification: null
});

export const mutations = {
  PUSH(state, notification) {
    state.notification = notification;
  },
  CLEAR(state, notificationToRemove) {
    state.notification = null;
  }
};
export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }) {
    commit("CLEAR");
  }
};
