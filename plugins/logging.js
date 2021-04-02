import Vue from "vue";

Vue.mixin({
  methods: {
    log(level, message) {
      //   console.log(message);
      //   console.log("hi");
    },
    formatProvider(id) {
      switch (parseInt(id)) {
        case 1:
          return "mdi-youtube";
          break;
        case 2:
          return "mdi-vimeo";
          break;
        case 3:
          return "$crunchyroll";
          break;
        default:
          return "house";
          break;
      }
    },
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    getHostname(url) {
      var urlObject = new URL(url);
      return urlObject.host;
    },
    validateLogin() {}
  }
});
