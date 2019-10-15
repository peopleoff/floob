import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueSocketIO from 'vue-socket.io'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.use(Vuelidate)
Vue.use(
  new VueSocketIO({
    debug: true,
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
