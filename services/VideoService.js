import Api from "@/services/Api";

export default {
  add(data) {
    return Api().post("register", data);
  },
  getVideos(data) {
    return Api().get("videos/getVideos", {
      params: data
    });
  },
  search(data) {
    return Api().post("videos/search", data);
  },
  getThumbnail(data) {
    return Api().post("videos/getThumbnail", data);
  },
  voteToSkip(data) {
    return Api().post("videos/voteToSkip", data);
  },
  postVideo(data) {
    return Api().post("videos/postVideo", data);
  }
};
