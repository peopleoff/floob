import Vue from "vue";
import VueSocketIO from "vue-socket.io";

export default function() {
  let socketDebug = true;
  if (process.env.NODE_ENV === "production") {
    socketDebug = false;
  }

  Vue.use(
    new VueSocketIO({
      debug: socketDebug,
      connection: process.env.BASE_URL
    })
  );
}
