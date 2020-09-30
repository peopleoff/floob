import RoomService from "@/services/RoomService";

export const state = () => ({
  room: null,
  users: []
});

export const mutations = {
  SET_ROOM_DATA(state, room) {
    state.room = room;
  },
  SET_USERS_DATA(state, users) {
    state.users = users;
  },
  CLEAR_ROOM(state) {
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
  },
  updateUserList: ({ commit }, usersArray) => {
    return commit("SET_USERS_DATA", usersArray);
  }
};

export const getters = {
  room(state) {
    return state.room;
  },
  users(state) {
    return state.users;
  },
};
