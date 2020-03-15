<template>
    <div class="site">
        <v-container fluid grid-system-md>
            <vue-good-table
                :columns="columns"
                :rows="sites"
                :row-style-class="enableSiteStyle"
                theme="black-rhino"
                @on-row-click="onRowClick"
            >
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'edit'">
                        <v-btn color="Warn" @click.stop="editSite(props.row)">편집</v-btn>
                    </span>
                    <span v-if="props.column.field == 'delete'">
                        <v-btn color="Warn" @click.stop="deleteSite(props.row.id)">삭제</v-btn>
                    </span>
                    <span v-if="props.column.field == 'download'">
                        <v-btn color="Warn" @click.stop="downloadSite(props.row.id)">다운로드</v-btn>
                    </span>
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
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
                                        <v-btn color="primary" v-on="on" class="btnNewItem pr-4">
                                            <v-icon class="mr-2">mdi-plus</v-icon>
                                            {{ $t('common.NEW_ITEM', { item: $t('common.SITE') }) }}
                                        </v-btn>
                                    </template>
                                    <v-card light>
                                        <v-card-title>
                                            <span class="headline">{{
                                                newSiteMode ? '새로운 SITE' : 'SITE 수정'
                                            }}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container grid-list-md>
                                                <v-layout wrap>
                                                    <template v-if="site._id">
                                                        <v-flex xs12 md4>
                                                            <label for="createdAt">{{ $t('common.CREATED') }}</label>
                                                            <div name="createdAt">
                                                                {{ getFormat(site.createdAt) }}
                                                            </div>
                                                        </v-flex>
                                                        <v-flex xs12 md4>
                                                            <label for="updatedAt">{{ $t('common.UPDATED') }}</label>
                                                            <div name="updatedAt">
                                                                {{ getFormat(site.updatedAt) }}
                                                            </div>
                                                        </v-flex>
                                                        <v-flex xs12 md4>
                                                            <label for="verified">{{ $t('site.NAME') }}</label>
                                                            <div name="verified"></div>
                                                        </v-flex>
                                                    </template>
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
                                                </v-layout>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" tile outlined @click="close" class="btnCancel">
                                                <v-icon left>mdi-cancel</v-icon>{{ $t('common.CANCEL') }}
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                tile
                                                outlined
                                                type="submit"
                                                class="btnSave"
                                                form="siteForm"
                                            >
                                                <v-icon left>mdi-pencil</v-icon>{{ $t('common.SAVE') }}
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
        <v-container>
            <v-flex
                >다운로드 한 사이트 : {{ this.downloadedSiteId === undefined ? '없음' : this.downloadedSiteId }}</v-flex
            >
        </v-container>
        <v-container v-if="this.downloadedSiteId !== undefined">
            <v-layout fluid>
                <v-textarea outlined name="input-8-4" label="Site detail" v-model="siteDetail"></v-textarea>
            </v-layout>
            <v-text-field
                label="Outlined"
                placeholder="상세 페이지 검색 selector"
                outlined
                v-model="pageSelector"
                @keyup="changePageSelector"
            ></v-text-field>
            <v-btn color="primary" tile outlined @click="dialogSite = true" class="btnSave">
                <v-icon left>mdi-cloud-download-outline</v-icon>화면확인
            </v-btn>
            <v-dialog v-model="dialogSite" max-width="800px" content-class="dlgNewEditItem">
                <v-sheet class="pa-12" color="grey lighten-3" v-html="siteDetail"> </v-sheet>
            </v-dialog>
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
    data: () => ({
        sites: [],
        dialog: false,
        dialogSite: false,
        columns: [
            { label: 'id', field: 'id', type: 'number' },
            { label: '사이트명', field: 'name' },
            { label: '검색URL', field: 'searchUrl' },
            { label: '편집', field: 'edit' },
            { label: '삭제', field: 'delete' },
            { label: '다운로드', field: 'download' },
        ],
        site: {},
        defaultSite: {},
        siteDetail: '',
        downloadedSiteId: null,
        pageSelector: '',
    }),
    components: {
        ValidationObserver,
        VTextFieldWithValidation,
    },
    computed: {
        newSiteMode() {
            return this.site.id === undefined;
        },
    },
    mounted() {
        this.downloadedSiteId = undefined;
    },
    methods: {
        retrieveSite() {
            this.axios.get('/api/sites').then(res => (this.sites = res.data));
        },
        editSite(site) {
            this.site = Object.assign({}, site);
            this.dialog = true;
        },
        async deleteSite(siteId) {
            const res = await this.axios.delete(`/api/site/${siteId}`);
            if (res.data.header === 'SUCCESS') {
                this.retrieveSite();
            }
        },
        async downloadSite(siteId) {
            const res = await this.axios.post(`/api/site/${siteId}`);
            if (res.data.header === 'SUCCESS') {
                this.downloadedSiteId = siteId;
                this.siteDetail = res.data.body;
            }
        },
        changePageSelector() {
            this.findDetail(this.downloadedSiteId, this.pageSelector);
        },
        async findDetail(siteId, pageSelector) {
            const res = await this.axios.post(`/api/site/${siteId}/find`, {
                pageSelector,
            });
            if (res.data.header === 'SUCCESS') {
                this.siteDetail = res.data.body;
            }
        },
        onRowClick(params) {
            console.log(params);
            this.$store.dispatch('openModal', {
                title: 'haha',
                message:
                    '사이트 [' +
                    params.row.name +
                    '] 을 ' +
                    (params.row.useable ? '비활성화' : '활성화') +
                    '하시겠습니까?',
                yes: function() {
                    this.axios
                        .post('/api/sites/enabled', {
                            id: params.row.id,
                            useable: !params.row.useable,
                        })
                        .then(() => (params.row.useable = !params.row.useable));
                },
            });
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
                })
                .then(res => {
                    if (res.data.header === 'SUCCESS') {
                        this.close();
                        this.retrieveSite();
                    } else {
                        alert(this.$t('response.' + res.data.header));
                    }
                });
        },
    },
    created() {
        this.retrieveSite();
    },
};
</script>
