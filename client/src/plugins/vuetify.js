import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#2e3999',
    secondary: '#5e80dc',
    action_add: '#76c7d7',
    text_primary: '#5f6469',
    text_secondary: colors.shades.black,
    action_delete: colors.red,
    primaryAction: colors.green.darken2,
    secondaryAction: colors.red,
    accent: colors.shades.black,
    error: colors.red.lighten1
  },
})