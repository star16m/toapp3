import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueThinModal from "vue-thin-modal";
import "vue-thin-modal/dist/vue-thin-modal.css";
import "./components/axios";

import VueGoodTablePlugin from "vue-good-table";

// import the styles
import "vue-good-table/dist/vue-good-table.css";

Vue.config.productionTip = false;
// import i18n from './i18n'
// import 'expose-loader?$!expose-loader?jQuery!jquery'
import "./components/common.js";
Vue.use(VueGoodTablePlugin);
Vue.use(VueThinModal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
