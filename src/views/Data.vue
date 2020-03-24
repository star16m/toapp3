<template>
    <div>
        <v-container fluid grid-system-md>
            <v-select
                v-model="selectedKeyword"
                :items="apiFilters"
                label="데이터 조회"
                item-value="filterTarget"
                item-text="`$t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget })`"
                outlined
                single-line
                @change="changeKeyword"
                return-object
            >
                <template
                    slot="selection"
                    slot-scope="data"
                >{{ $t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget }) + ' [' + data.item.filteredResult + ']' }}</template>
                <template
                    slot="item"
                    slot-scope="data"
                >{{ $t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget }) + ' [' + data.item.filteredResult + ']' }}</template>
            </v-select>
            <vue-good-table
                dense
                :columns="columns"
                :rows="datas"
                :row-style-class="downloadedDataStyle"
                theme="black-rhino"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field == 'download'">
                        <v-btn
                            v-if="!props.row.download"
                            color="primary"
                            @click.stop="downloadData(props.row)"
                            small
                        >{{ $t('common.DOWNLOAD') }}</v-btn>
                        <template v-else>다운중</template>
                    </div>
                    <div v-else>{{ props.formattedRow[props.column.field] }}</div>
                </template>
            </vue-good-table>
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
        apiFilters: [],
        selectedKeyword: null,
    }),
    computed: {
        dataLength() {
            return this.datas.length;
        },
    },
    methods: {
        async retrieveData() {
            const res = await this.axios.get('/api/data-info');
            this.apiFilters = res.data.body;
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
            return row.download ? 'white' : 'gray';
        },
        async changeKeyword() {
            const res = await this.axios.post('/api/datas/filter', {
                request: {
                    filterRequestType: this.selectedKeyword.filterRequestType,
                    filterTarget: this.selectedKeyword.filterTarget,
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
