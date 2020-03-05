export const state = () => ({
  room: null
});

export const mutations = {
  ADD_ROOM: (state, payload) => {
    state.room = payload;
  }
};

export const getters = {};
