import RoomService from "@/services/RoomService";

export const state = () => ({
  room: null
});

export const mutations = {
  SET_ROOM_DATA: (state, payload) => {
    state.room = payload;
  },
};

export const actions = {
  enterRoom: ({ commit }, payload) => {
    return RoomService.getInfo(payload)
      .then(({ data }) => {
        commit("SET_ROOM_DATA", data);
      })
  }
};

export const getters = {
  room(state) {
    return state.room;
  }
};
