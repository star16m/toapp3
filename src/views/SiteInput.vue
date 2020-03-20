<template>
    <div class="site">
        <v-container v-if="hasSiteId">
            <h1>{{ `[${site.id}] - [${site.name}] 상세편집` }}</h1>
            <v-row>
                <v-col>
                    <v-textarea
                        readonly
                        outlined
                        name="siteSource"
                        label="Site source"
                        rows="8"
                        v-model="siteSource"
                        background-color="grey lighten-2"
                    ></v-textarea>
                </v-col>
                <v-col v-if="accessDetail">
                    <v-textarea
                        readonly
                        outlined
                        name="siteDetailSource"
                        label="Site Detail Source"
                        rows="8"
                        v-model="siteDetailSource"
                        background-color="grey lighten-2"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field v-model="site.name" :counter="20" outlined label="사이트 명"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-model="site.searchUrl" :counter="120" outlined label="사이트 검색 URL" @keyup.enter="changeSelector"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        label="pageSelector(각 row 를 포함하는 selector)"
                        placeholder="상세 페이지 검색 selector"
                        outlined
                        v-model="site.pageSelector"
                        @keyup.enter="changeSelector"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        label="nameSelector(pageSelector 에서 이름을 추출하는 selector)"
                        placeholder=" nameSelector(pageSelector 에서 이름을 추출하는 selector)"
                        outlined
                        v-model="site.nameSelector"
                        @keyup.enter="changeSelector"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="sizeSelector(pageSelector 에서 사이즈를 추출하는 selector)"
                        placeholder="sizeSelector(pageSelector 에서 사이즈를 추출하는 selector)"
                        outlined
                        v-model="site.sizeSelector"
                        @keyup.enter="changeSelector"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="dateSelector(pageSelector 에서 날짜를 추출하는 selector)"
                        placeholder="dateSelector(pageSelector 에서 날짜를 추출하는 selector)"
                        outlined
                        v-model="site.dateSelector"
                        @keyup.enter="changeSelector"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="accessDetail">
                <v-col>
                    <h1>상세 페이지용</h1>
                    <ul>
                        <li>이름이나 size selector 를 지정하지 않는 경우 list 에서 구한 것으로 사용합니다.</li>
                    </ul>
                </v-col>
            </v-row>
            <v-row v-if="accessDetail">
                <v-col>
                    <v-select
                        v-model="selectedSite"
                        :items="siteExtractResultList"
                        :label="'[' + siteExtractResultList.length + '] 개 사이트 링크'"
                        dense
                        outlined
                        item-text="title"
                        item-value="linkURL"
                        return-object
                    ></v-select>
                </v-col>
            </v-row>
            <v-row v-if="accessDetail">
                <v-col>
                    <v-text-field
                        label="torrentNameSelector(상세 페이지에서 이름을 추출하기 위한 selector)"
                        placeholder="상세 페이지에서 이름을 추출하기 위한 selector"
                        outlined
                        v-model="site.torrentNameSelector"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="torrentNameReplace(상세 페이지에서 이름을 추출 한 후, replace 처리를 위한 regex)"
                        placeholder="상세 페이지에서 이름을 추출 한 후, replace 처리를 위한 regex"
                        outlined
                        v-model="site.torrentNameReplace"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="accessDetail">
                <v-col>
                    <v-text-field
                        label="torrentSizeSelector(상세 페이지에서 파일 사이즈를 추출하기 위한 selector)"
                        placeholder="상세 페이지에서 파일 사이즈를 추출하기 위한 selector"
                        outlined
                        v-model="site.torrentSizeSelector"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="torrentSizeReplace(상세 페이지에서 파일 사이즈를 추출 한 후, replace 처리를 위한 regex)"
                        placeholder="상세 페이지에서 파일 사이즈를 추출 한 후, replace 처리를 위한 regex"
                        outlined
                        v-model="site.torrentSizeReplace"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="accessDetail">
                <v-col>
                    <v-text-field
                        label="torrentMagnetHashSelector(상세 페이지에서 MagnetHash 를 추출하기 위한 selector)"
                        placeholder="상세 페이지에서 MagnetHash 를 추출하기 위한 selector"
                        outlined
                        v-model="site.torrentMagnetHashSelector"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="torrentMagnetHashReplace(상세 페이지에서 이름을 추출 한 후, replace 처리를 위한 regex)"
                        placeholder="상세 페이지에서 이름을 추출 한 후, replace 처리를 위한 regex"
                        outlined
                        v-model="site.torrentMagnetHashReplace"
                        @keyup.enter="changeDetailSelector"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" tile outlined @click="changeSelector" class="btnSave"> <v-icon left>mdi-check</v-icon>체크 </v-btn>&nbsp;
                    <v-btn v-if="accessDetail" color="primary" tile outlined @click="changeDetailSelector" class="btnSave">
                        <v-icon left>mdi-check-all</v-icon>상세 체크 </v-btn
                    >&nbsp;
                    <v-btn color="primary" tile outlined @click="save" class="btnSave"> <v-icon left>mdi-cloud-download-outline</v-icon>저장 </v-btn>
                </v-col>
            </v-row>
            <v-bottom-sheet v-model="dialog4extractResultList" persistent>
                <v-sheet class="text-center" height="500px">
                    <v-card light>
                        <v-card-text>
                            <div>{{ siteExtractResultList.length + '개의 링크를 찾았습니다.' + (accessDetail ? '상세 조회 가능합니다.' : '') }}</div>
                            <v-btn class="mt-6" color="error" @click="dialog4extractResultList = !dialog4extractResultList">close</v-btn>
                        </v-card-text>
                        <v-simple-table :dense="true" fixed-header height="500">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">title</th>
                                        <th class="text-left">linkURL</th>
                                        <th class="text-left">size</th>
                                        <th class="text-left">date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(r, i) in siteExtractResultList" :key="i">
                                        <td>{{ r.title }}</td>
                                        <td>{{ r.linkURL }}</td>
                                        <td>{{ r.size }}</td>
                                        <td>{{ r.date }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-sheet>
            </v-bottom-sheet>
            <v-bottom-sheet v-model="dialog4extractDetailResultList" persistent>
                <v-sheet class="text-center">
                    <v-card light>
                        <v-card-actions>
                            <v-btn class="mt-6" color="error" @click="dialog4extractDetailResultList = !dialog4extractDetailResultList">close</v-btn>
                        </v-card-actions>
                        <v-card-title>
                            <div>상세 페이지 추출 정보</div>
                        </v-card-title>
                        <v-card-text>
                            <v-list-item>
                                <v-list-item-subtitle>이름: {{ detailSiteExtractResult.torrentName }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle>사이즈: {{ detailSiteExtractResult.torrentSize }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle>magnet: {{ detailSiteExtractResult.torrentMagnet }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-bottom-sheet>
        </v-container>
    </div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
export default {
    data: () => ({
        site: {},
        siteSource: '',
        siteDetailSource: '',
        accessDetail: false,
        dialog4extractResultList: false,
        dialog4extractDetailResultList: false,
        siteExtractResultList: [],
        detailSiteExtractResult: {},
        selectedSite: {},
    }),
    computed: {
        hasSiteId() {
            return !_isEmpty(this.site);
        },
        hasDetails() {
            return (
                this.detailSiteExtractResult &&
                (!_isEmpty(this.detailSiteExtractResult.torrentName) ||
                    !_isEmpty(this.detailSiteExtractResult.torrentSize) ||
                    !_isEmpty(this.detailSiteExtractResult.torrentMagnet))
            );
        },
    },
    async mounted() {
        let siteId = this.$route.params.siteId;
        this.downloadSite(siteId);
    },
    methods: {
        async downloadSite(siteId) {
            const res = await this.axios.post(`/api/site/${siteId}`);
            if (res.data.header === 'SUCCESS') {
                this.site = res.data.body.site;
                this.siteSource = res.data.body.result;
            }
        },
        async changeSelector() {
            this.fetchListPage();
        },
        async changeDetailSelector() {
            this.fetchDetailPage();
        },
        async fetchListPage() {
            const siteId = this.site.id;
            const res = await this.axios.post(`/api/site/${siteId}/find`, this.site);
            if (res.data.header === 'SUCCESS') {
                this.siteSource = res.data.body.result;
                if (res.data.body.extractResultList.length > 0) {
                    this.siteExtractResultList = res.data.body.extractResultList;
                    this.accessDetail = this.siteExtractResultList.length > 0;
                    this.dialog4extractResultList = true;
                } else {
                    this.siteExtractResultList = [];
                }
            } else if (res.data.header === 'NOT_FOUND') {
                alert(this.$t('response.' + res.data.header, { subject: '다운로드 페이지' }));
                this.siteSource = '';
                this.siteExtractResultList = [];
            } else {
                alert(this.$t('response.' + res.data.header));
                this.siteSource = '';
                this.siteExtractResultList = [];
            }
        },
        async fetchDetailPage() {
            if (_isEmpty(this.selectedSite.linkURL)) {
                alert(this.$t('errors.SELECT_DETAIL_SITE'));
                return;
            }
            const siteId = this.site.id;
            const requestDetailPage = {};
            requestDetailPage.site = Object.assign({}, this.site);
            requestDetailPage.detailPageUrl = this.selectedSite.linkURL;
            requestDetailPage.title = this.selectedSite.title;
            requestDetailPage.size = this.selectedSite.size;
            const res = await this.axios.post(`/api/site/${siteId}/findDetail`, requestDetailPage);
            if (res.data.header === 'SUCCESS') {
                this.siteDetailSource = res.data.body.detailPageSource; // await JSON.stringify(res.data.body.extractDetailResult);
                if (res.data.body.extractDetailResult === null) {
                    this.detailSiteExtractResult = {};
                } else {
                    this.detailSiteExtractResult = res.data.body.extractDetailResult;
                }
                this.dialog4extractDetailResultList = this.hasDetails;
            } else if (res.data.header === 'NOT_FOUND') {
                alert(this.$t('response.' + res.data.header, { subject: '상세페이지' }));
                this.siteDetailSource = '';
            } else {
                alert(this.$t('response.' + res.data.header));
                this.siteDetailSource = '';
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
                    nameSelector: this.site.nameSelector,
                    sizeSelector: this.site.sizeSelector,
                    dateSelector: this.site.dateSelector,
                    torrentNameSelector: this.site.torrentNameSelector,
                    torrentNameReplace: this.site.torrentNameReplace,
                    torrentSizeSelector: this.site.torrentSizeSelector,
                    torrentSizeReplace: this.site.torrentSizeReplace,
                    torrentMagnetHashSelector: this.site.torrentMagnetHashSelector,
                    torrentMagnetHashReplace: this.site.torrentMagnetHashReplace,
                })
                .then(res => {
                    if (res.data.header === 'SUCCESS') {
                        this.$router.push({ name: 'site' });
                    } else {
                        alert(this.$t('response.' + res.data.header));
                    }
                });
        },
    },
};
</script>

<style></style>
