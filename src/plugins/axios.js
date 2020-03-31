import Vue from 'vue';
import axios from 'axios';
import { formatErrorMessages } from '@/utils/utils';
import toast from '@/plugins/toast';
import store from '../store/store';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.headers.common['Accept-Language'] = JSON.parse(localStorage.getItem('locale')) || 'ko';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    // const urlsExcludedForBearerHeader = [
    //     '/login',
    //     '/forgot',
    //     '/register',
    //     '/reset'
    // ]
    // if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
    //     config.headers.Authorization = `Bearer ${JSON.parse(
    //         localStorage.getItem('token')
    //     )}`
    // }
    // if (!store.getters.showLoader) {
    store.dispatch('openLoader');
    // }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);
// Add a response interceptor
axios.interceptors.response.use(
  response => {
    if (response.data.header && response.data.header !== 'SUCCESS') {
      toast.error(formatErrorMessages('response', response.data.header));
    }
    store.dispatch('closeLoader');
    return response;
  },
  error => {
    store.dispatch('addDebugMessage', 'received errors');
    if (error.response && error.response.data.header) {
      toast.error(formatErrorMessages('response', error.response.data.header));
    } else {
      toast.error(formatErrorMessages('common', 'ERROR_MESSAGE'));
    }
    store.dispatch('closeLoader');
    return Promise.reject(error);
  },
);

// eslint-disable-next-line no-shadow
Plugin.install = Vue => {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      },
    },
    $axios: {
      get() {
        return axios;
      },
    },
  });
};

Vue.use(Plugin);
export default Plugin;
