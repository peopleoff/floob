import Vue from "vue";
import vueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/en-ca"; // whatever you import here will be set as default, no need to import all locales you intend to use

Vue.use(vueMoment, { moment });
