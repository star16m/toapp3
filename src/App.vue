<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="#4c5c7a">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-layout class="white--text title mr-5" router :to="{ name: 'home' }">ToApap</v-layout>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="키워드 추가"
        prepend-inner-icon="mdi-database-search"
        v-model="newKeyword"
        @submit="addKeyword"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(menu, i) in menus">
          <v-list-item :key="i" route :to="menu.path">
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-dialog v-model="showModal" max-width="290">
      <v-card>
        <v-card-title class="headline" v-show="messagePayload.title">{{ messagePayload.title }}</v-card-title>
        <v-card-text v-show="messagePayload.message">{{ messagePayload.message }}</v-card-text>
        <v-card-actions v-show="messagePayload.input">
          <v-text-field
            outlined
            :label="messagePayload.input"
            v-model="messagePayload.inputValue"
            @keypress.13.prevent="ok"
            v-focus
            autofocus
          ></v-text-field>
        </v-card-actions>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <!-- <v-btn color="green darken-1" text @click="closeModal">Disagree</v-btn> -->
          <v-btn color="green darken-1" v-show="messagePayload.ok" text @click.prevent="ok">OK</v-btn>
          <v-btn color="green darken-1" v-show="messagePayload.yes" text @click="yes">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loader />
    <v-footer app center color="#4c5c7a">ToApp</v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _isEmpty from 'lodash/isEmpty';
import Loader from '@/components/Loader';
export default {
  props: {
    source: String,
  },
  data() {
    return {
      drawer: null,
      menus: [
        { icon: 'mdi-desktop-mac', title: 'Home', path: '/' },
        { icon: 'mdi-database-export', title: 'Data', path: '/data' },
        { icon: 'mdi-alpha-t-box-outline', title: 'Site', path: '/site' },
        { icon: 'mdi-message-bulleted', title: 'Message', path: '/message' },
        { icon: 'mdi-credit-card-plus', title: 'Keyword', path: '/keyword' },
      ],
      newKeyword: null,
    };
  },
  computed: {
    ...mapGetters(['messagePayload']),
    showModal: {
      get: function() {
        return this.$store.getters.showModal;
      },
      set: function() {
        this.closeModal();
      },
    },
  },
  methods: {
    ...mapActions(['openModal', 'closeModal']),
    ok() {
      if (this.messagePayload.input) {
        this.messagePayload.ok(this.messagePayload.inputValue);
        this.messagePayload.inputValue = '';
      } else {
        this.messagePayload.ok();
      }
      this.closeModal();
    },
    yes() {
      if (this.messagePayload.input) {
        this.messagePayload.yes(this.messagePayload.inputValue);
        this.messagePayload.inputValue = '';
      } else {
        this.messagePayload.yes();
      }
      this.closeModal();
    },
    async addKeyword() {
      if (_isEmpty(this.newKeyword)) {
        this.$store.dispatch('openModal', {
          title: '키워드 입력',
          message: '키워드를 입력해 주세요.',
        });
        return;
      }
      const res = await this.axios.post('/api/keywords', {
        keyword: this.newKeyword,
      });
      if (res.data.header === 'SUCCESS') {
        this.newKeyword = '';
        if (this.$router.currentRoute.name === 'keyword') {
          this.$router.go();
        } else {
          this.$router.push({ name: 'keyword' });
        }
      }
    },
  },
  components: {
    Loader,
  },
};
</script>

<style>
.toast {
  border-radius: 10px;
}
/* .toast {
  margin-top: 60px !important;
}

@media screen and (max-width: 700px) {
  .toast {
    margin-top: 130px !important;
  }
} */
</style>
