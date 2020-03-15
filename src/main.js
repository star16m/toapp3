import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import VueThinModal from 'vue-thin-modal';
import { ValidationProvider, extend } from 'vee-validate';
import 'vue-thin-modal/dist/vue-thin-modal.css';
import './components/axios';
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
import i18n from './i18n';
import './components/common.js';
Vue.use(VueGoodTablePlugin);
Vue.use(VueThinModal);
Vue.use(i18n);

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
