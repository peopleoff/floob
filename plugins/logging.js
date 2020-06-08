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
          return "youtube";
          break;
        case 2:
          return "vimeo";
          break;

        default:
          console.log("Format Provider Default Case");
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
    }
  }
});
