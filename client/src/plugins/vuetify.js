import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#6200EE',
    primary_light: '3700B3',
    primary_dark: '#3700B3',
    secondary: '#03DAC6',
    secondary_light: '#55D6BE',
    secondary_dark: '#018786',
    primary_text: '#FFFFFF',
    secondary_text : '#000000',
    error_text: '#FFFFFF',
    accent: '#7CEA9C',
    error: '#C51162',
  },
})