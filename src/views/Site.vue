<template>
  <div class="site">
    <v-container fluid grid-system-md>
      <vue-good-table
        :columns="columns"
        :rows="sites"
        theme="black-rhino"
        :select-options="{ enabled: false, disableSelectInfo: true }"
      >
        <div slot="emptystate">{{ $t('dataInfo.EMPTY_DATA') }}</div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'delete'">
            <v-btn color="error" @click.stop="deleteSite(props.row.id)">삭제</v-btn>
          </span>
          <span v-if="props.column.field == 'editDetail'">
            <v-btn color="info" @click.stop="editSite(props.row.id)">편집</v-btn>
          </span>
          <span v-if="props.column.field == 'copy'">
            <v-btn color="warn" @click.stop="copySite(props.row.id)">복제</v-btn>
          </span>
          <span v-if="props.column.field == 'enable'">
            <v-btn v-if="props.row.useable" color="warn" @click.stop="useableSite(props.row)">비활성화</v-btn>
            <v-btn v-else color="primary" @click.stop="useableSite(props.row)">활성화</v-btn>
          </span>
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </v-container>
    <v-container>
      <v-layout fluid justify-end>
        <v-flex shrink>
          <ValidationObserver ref="obs" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(save)" id="siteForm">
              <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
                <v-dialog v-model="dialog" max-width="800px" content-class="dlgNewEditItem">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on" class="btnNewItem">
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      {{ $t('common.NEW_ITEM', { item: $t('common.SITE') }) }}
                    </v-btn>
                  </template>
                  <v-card light>
                    <v-card-title>
                      <span class="headline">새로운 SITE</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 md6>
                            <VTextFieldWithValidation
                              rules="required|min:4|max:20"
                              v-model="site.name"
                              id="name"
                              name="name"
                              :counter="20"
                              :data-vv-as="$t('site.NAME')"
                              :label="$t('site.NAME')"
                            />
                          </v-flex>
                          <v-flex xs12 md6>
                            <VTextFieldWithValidation
                              rules="required|min:10|max:120"
                              v-model="site.searchUrl"
                              id="url"
                              name="url"
                              :counter="120"
                              :data-vv-as="$t('site.URL')"
                              :label="$t('site.URL')"
                            />
                          </v-flex>
                          <v-flex xs12 md12>
                            <VTextFieldWithValidation
                              rules="required|min:4|max:255"
                              v-model="site.pageSelector"
                              id="pageSelector"
                              name="pageSelector"
                              :counter="120"
                              :data-vv-as="$t('site.PAGE_SELECTOR')"
                              :label="$t('site.PAGE_SELECTOR')"
                            />
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" tile outlined @click="close" class="btnCancel">
                        <v-icon left>mdi-cancel</v-icon>
                        {{ $t('common.CANCEL') }}
                      </v-btn>
                      <v-btn
                        color="primary"
                        tile
                        outlined
                        type="submit"
                        class="btnSave"
                        form="siteForm"
                      >
                        <v-icon left>mdi-pencil</v-icon>
                        {{ $t('common.SAVE') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-form>
          </ValidationObserver>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import VTextFieldWithValidation from '@/components/forms/VTextFieldWithValidation';
import { ValidationObserver } from 'vee-validate';
export default {
  watch: {
    dialog(value) {
      return value ? true : this.close();
    },
  },
  data() {
    return {
      sites: [],
      dialog: false,
      columns: [
        { label: this.$t('site.columns.id'), field: 'id', type: 'number' },
        { label: this.$t('site.columns.name'), field: 'name' },
        { label: this.$t('site.columns.searchUrl'), field: 'searchUrl' },
        { label: this.$t('site.columns.delete'), field: 'delete' },
        { label: this.$t('site.columns.editDetail'), field: 'editDetail' },
        { label: this.$t('site.columns.copy'), field: 'copy' },
        { label: this.$t('site.columns.enable'), field: 'enable' },
      ],
      site: {},
      defaultSite: {},
      siteExtractResultList: [],
      foundedElementsNum: 0,
    };
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  methods: {
    async retrieveSite() {
      const res = await this.axios.get('/api/sites');
      this.sites = res.data;
      if (this.sites.length > 0) {
        this.refreshEnabledCheckbox();
      }
    },
    async deleteSite(siteId) {
      const res = await this.axios.delete(`/api/site/${siteId}`);
      if (res.data.header === 'SUCCESS') {
        this.retrieveSite();
      }
    },
    editSite(siteId) {
      this.$router.push({ name: 'SiteInput', params: { siteId } });
    },
    async useableSite(site) {
      const siteId = site.id;
      await this.$axios.patch(`/api/site/${siteId}/useable`, {
        id: siteId,
        request: !site.useable,
      });
      this.retrieveSite();
    },
    refreshEnabledCheckbox() {
      this.sites.forEach(site => this.$set(site, 'vgtSelected', site.useable));
    },
    enableSiteStyle(row) {
      return row.useable ? 'accent' : '';
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.site = Object.assign({}, this.defaultSite);
        requestAnimationFrame(() => {
          this.$refs.obs.reset();
        });
      }, 300);
    },
    async copySite(siteId) {
      const res = await this.axios.post(`/api/site/${siteId}/copy`, {
        id: this.site.id,
      });
      if (res.data.header === 'SUCCESS') {
        this.retrieveSite();
      } else {
        alert(this.$t('response.' + res.data.header));
      }
    },
    async save() {
      if (_isEmpty(String(this.site.searchUrl))) {
        alert('url is not empty!!');
        return;
      }
      if (!_includes(String(this.site.searchUrl), '[KEYWORD]')) {
        alert(this.$t('errors.BAD_SEARCH_URL'));
        return;
      }
      await this.axios
        .post('/api/site', {
          id: this.site.id,
          name: this.site.name,
          searchUrl: this.site.searchUrl,
          pageSelector: this.site.pageSelector,
          useable: false,
        })
        .then(res => {
          if (res.data.header === 'SUCCESS') {
            const siteId = res.data.body.id;
            this.$router.push({ name: 'SiteInput', params: { siteId } });
          } else {
            alert(this.$t('response.' + res.data.header));
          }
        });
    },
  },
  mounted() {
    this.site = {};
    this.retrieveSite();
  },
};
</script>
