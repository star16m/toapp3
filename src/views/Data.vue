<template>
    <div>
        <v-container fluid grid-system-md>
            <v-col class="d-flex" cols="12" sm="12">
                <v-select
                    v-model="selectedKeyword"
                    :items="keywords"
                    label="키워드"
                    item-text="keyword"
                    item-value="id"
                    outlined
                    @change="changeKeyword"
                    return-object
                ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
                <vue-good-table :columns="columns" :rows="datas" :row-style-class="downloadedDataStyle" theme="black-rhino">
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'download'">
                            <v-btn v-if="!props.row.download" color="primary" @click.stop="downloadData(props.row)">{{ $t('common.DOWNLOAD') }}</v-btn>
                            <template v-else>다운중</template>
                        </span>
                        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
                    </template>
                </vue-good-table>
            </v-col>
        </v-container>
    </div>
</template>
<script>
export default {
    data: () => ({
        datas: [],
        columns: [
            { label: '키워드', field: 'keyword' },
            { label: '사이즈', field: 'size' },
            { label: '일자', field: 'date' },
            { label: '제목', field: 'title' },
            { label: '다운로드', field: 'download' },
        ],
        keywords: [],
        selectedKeyword: null,
    }),
    methods: {
        async retrieveData() {
            const res = await this.axios.get('/api/keywords');
            this.keywords = res.data.body;
            const dataRes = await this.axios.get('/api/datas');
            this.datas = dataRes.data.body;
        },
        downloadData(data) {
            this.axios
                .post('/api/data/download', {
                    request: data.magnetCode,
                })
                .then((data.download = !data.download));
        },
        downloadedDataStyle(row) {
            return row.download ? 'gray' : '';
        },
        async changeKeyword() {
            const res = await this.axios.post('/api/datas/filter', {
                request: {
                    filterRequestType: 'KEYWORD',
                    filterTarget: this.selectedKeyword.id,
                },
            });
            this.datas = res.data.body;
        },
    },
    created() {
        this.retrieveData();
    },
};
</script>
