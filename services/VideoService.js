import Api from "@/services/Api";

export default {
  add(data) {
    return Api().post("register", data);
  },
  getAll(data) {
    return Api().post("videos/getAll", data);
  },
  search(data) {
    return Api().post("videos/search", data);
  },
  getThumbnail(data) {
    return Api().post("videos/getThumbnail", data);
  },
  postVideo(data) {
    return Api().post("videos/postVideo", data);
  }
};
