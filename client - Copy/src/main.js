import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import EvaIcons from 'vue-eva-icons'
import router from './router'
import store from './store'
import './registerServiceWorker'

export const SocketInstance = socketio(process.env.VUE_APP_API);
Vue.use(VueSocketIO, SocketInstance)
Vue.use(EvaIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')