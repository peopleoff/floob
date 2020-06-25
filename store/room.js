import RoomService from "@/services/RoomService";

export const state = () => ({
  room: null
});

export const mutations = {
  SET_ROOM_DATA(state, room) {
    state.room = room;
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
  }
};

export const getters = {
  room(state) {
    return state.room;
  }
};
