import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes:{
      dark:{
        primary: "#7e57c2",
        secondary: "#00bcd4",
        black: "#121d1e",
        white: "#ffffff",
        purple: "#1e162c"
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
