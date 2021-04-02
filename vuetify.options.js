import colors from "vuetify/es5/util/colors";
import crunchyroll from "@/components/icons/Crunchyroll.vue";

export default {
  theme: {
    dark: true,
    themes: {
      dark: {
        royal_flue: "#9cbaef",
        kings_purple: "#634FD6",
        legendary_mint: "#00CCC2",
        just_purple: "#BB67F5",
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  },
  icons: {
    values: {
      iconfont: "md",
      crunchyroll: {
        component: crunchyroll
      }
    }
  }
};
