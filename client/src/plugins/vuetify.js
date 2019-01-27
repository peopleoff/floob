import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#4b7bec',
    action_add: '#4b7bec',
    action_delete: colors.red,
    primaryAction: colors.green.darken2,
    secondary: colors.grey.darken1,
    secondaryAction: colors.red,
    accent: colors.shades.black,
    error: colors.red.lighten1
  },
})