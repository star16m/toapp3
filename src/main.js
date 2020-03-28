import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import VueThinModal from 'vue-thin-modal';
import { ValidationProvider, extend } from 'vee-validate';
import VueFilterDateParse from 'vue-filter-date-parse';
import VueFilterDateFormat from 'vue-filter-date-format';
import 'vue-thin-modal/dist/vue-thin-modal.css';
import '@/plugins/axios';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/ko.json';
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  });
});
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css';

Vue.config.productionTip = false;
import i18n from '@/plugins/i18n';
import './components/common.js';
Vue.use(VueGoodTablePlugin);
Vue.use(VueThinModal);
Vue.use(i18n);
Vue.use(VueFilterDateParse);
Vue.use(VueFilterDateFormat);

Vue.filter('truncate', function(value, length) {
  if (!value) return '';
  value = value.toString();
  if (value.length > length) {
    return value.substring(0, length) + '...';
  } else {
    return value;
  }
});
Vue.filter('cut', function(value, length) {
  if (!value) return '';
  value = value.toString();
  if (value.length > length) {
    return value.substring(0, length);
  } else {
    return value;
  }
});

// const veeValidateConfig = {
//     locale: JSON.parse(localStorage.getItem('locale')) || 'ko',
//     dictionary: {
//         en,
//         ko,
//     },
// };

// Vue.use(VeeValidate, veeValidateConfig);
new Vue({
  router,
  store,
  vuetify,
  i18n,
  ValidationProvider,
  render: h => h(App),
}).$mount('#app');
