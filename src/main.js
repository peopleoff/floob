import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import VueSocketIO from 'vue-socket.io'
import './registerServiceWorker'

Vue.use(Vuelidate)
Vue.use(VueTheMask)

let socketDebug = true;
if(process.env.NODE_ENV === 'production') {
  socketDebug = false;
}

Vue.use(
  new VueSocketIO({
    debug: socketDebug,
    connection: process.env.VUE_APP_API
  })
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')