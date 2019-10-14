import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'


Vue.use(Vuelidate)
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_API
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')