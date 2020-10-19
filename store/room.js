import RoomService from "@/services/RoomService";

export const state = () => ({
  room: null,
  users: [],
  video: null,
  theaterMode: false
});

export const mutations = {
  SET_ROOM_DATA(state, room) {
    state.room = room;
  },
  SET_USERS_DATA(state, users) {
    state.users = users;
  },
  SET_VIDEO_DATA(state, video) {
    state.video = video;
  },
  SET_THEATER_MODE(state, mode) {
    state.theaterMode = mode;
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
  },
  setTheaterMode: ({ commit }, mode) => {
    return commit("SET_THEATER_MODE", mode);
  },
  updateVideo: ({ commit }, video) => {
    return commit("SET_VIDEO_DATA", video);
  }
};

export const getters = {
  room(state) {
    return state.room;
  },
  theaterMode(state) {
    return state.theaterMode;
  },
  users(state) {
    return state.users;
  },
  video(state) {
    return state.video;
  }
};
