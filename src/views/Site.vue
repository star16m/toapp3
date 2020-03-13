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
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </v-container>
        <v-container>
            <v-layout fluid justify-end>
                <v-flex shrink>
                    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
                        <v-form>
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
                                            <span class="headline">새로운 SITE</span>
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
                                                            rules="required|max:7"
                                                            v-model="site.name"
                                                            id="name"
                                                            name="name"
                                                            :counter="7"
                                                            :data-vv-as="$t('site.NAME')"
                                                            :label="$t('site.NAME')"
                                                        />
                                                    </v-flex>
                                                    <v-flex xs12 md6>
                                                        <VTextFieldWithValidation
                                                            rules="required|url|max:120"
                                                            v-model="site.url"
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
                                                @click="passes(submit)"
                                                class="btnSave"
                                                :disabled="invalid || !validated"
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
    </div>
</template>
<script>
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
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
        columns: [
            { label: 'id', field: 'id', type: 'number' },
            { label: '사이트명', field: 'name' },
            { label: '검색URL', field: 'searchUrl' },
            { label: '편집', field: 'edit' },
        ],
        site: {},
        defaultSite: {},
    }),
    components: {
        ValidationObserver,
        VTextFieldWithValidation,
    },
    methods: {
        retrieveSite() {
            this.axios.get('/api/sites').then(res => (this.sites = res.data));
        },
        editSite(site) {
            this.site = Object.assign({}, site);
            this.dialog = true;
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
                        .then(res => {
                            console.log('res => ' + res);
                            params.row.useable = !params.row.useable;
                        });
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
            const valid = await this.$validator.validateAll();
            if (valid) {
                alert('valid');
            } else {
                alert('not valid');
            }
            if (_isEmpty(String(this.site.url))) {
                alert('url is not empty!!');
                return;
            }
            alert(_has(this.site.url, '[KEYWORD]'));
            if (!_has(String(this.site.url), '[KEYWORD]')) {
                alert('URL has [KEYWORD]');
                return;
            }
            this.close();
            return;
        },
        async submit() {
            console.log('Submitting!');
        },
    },
    created() {
        this.retrieveSite();
    },
};
</script>
