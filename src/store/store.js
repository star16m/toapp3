import Vue from 'vue';
import Vuex from 'vuex';
import VueThinModal from 'vue-thin-modal';
import modules from './modules';

Vue.use(Vuex);
Vue.use(VueThinModal);

export default new Vuex.Store({
  state: {
    messagePayload: {
      title: null,
      message: null,
      input: null,
      inputValue: null,
      ok: null,
      yes: null,
    },
    showModal: false,
    showLoader: false,
  },
  mutations: {
    setModalMessage(state, messagePayload) {
      state.messagePayload = messagePayload;
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    openLoader(state) {
      state.showLoader = true;
    },
    closeLoader(state) {
      state.showLoader = false;
    },
  },
  getters: {
    messagePayload(state) {
      return state.messagePayload;
    },
    showModal(state) {
      return state.showModal;
    },
    showLoader(state) {
      return state.showLoader;
    },
  },
  actions: {
    openModal({ commit }, messagePayload) {
      commit('setModalMessage', messagePayload);
    },
    closeModal({ commit }) {
      commit('closeModal');
    },
    openLoader({ commit }) {
      commit('openLoader');
    },
    closeLoader({ commit }) {
      commit('closeLoader');
    },
  },
  modules,
});
