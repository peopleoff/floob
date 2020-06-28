import RoomService from "@/services/RoomService";

export const state = () => ({
  room: null
});

export const mutations = {
  SET_ROOM_DATA(state, room) {
    state.room = room;
  },
  CLEAR_ROOM(state, room) {
    state.room = null;
  }
};

export const actions = {
  enterRoom: ({ commit }, id) => {
    return RoomService.getInfo({ id })
      .then(({ data }) => {
        commit("SET_ROOM_DATA", data);
        return data;
      })
      .catch(error => {
        return error;
      });
  },
  clearRoom: ({ commit }) => {
    return commit("CLEAR_ROOM");
  }
};

export const getters = {
  room(state) {
    return state.room;
  }
};
