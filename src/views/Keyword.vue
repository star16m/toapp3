<template>
    <div class="keyword">
        <v-container fluid grid-system-md>
            <vue-good-table :columns="columns" :rows="keywords" theme="black-rhino" @on-row-click="onRowClick" />
        </v-container>
        <v-container>
            <v-layout fluid justify-end>
                <v-flex shrink>
                    <v-btn color="primary" @click="inputKeyword">키워드 입력</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty';
export default {
    data: () => ({
        keywords: [],
        columns: [
            { label: 'id', field: 'id', type: 'number', width: '100px' },
            { label: '키워드', field: 'keyword' },
        ],
    }),
    created() {
        this.fetchKeywords();
    },
    methods: {
        fetchKeywords() {
            this.axios.get('/api/keywords').then(res => (this.keywords = res.data.body));
        },
        onRowClick(params) {
            if (params.row.keyword) {
                this.$store.dispatch('openModal', {
                    title: 'keyword 삭제',
                    message: '키워드 [' + params.row.keyword + '] 를 삭제 하시겠습니까?',
                    yes: () => {
                        this.axios.delete('/api/keywords/' + params.row.id).then(res => {
                            if (res.data.header === 'SUCCESS') {
                                this.fetchKeywords();
                            } else {
                                alert(res.data.header);
                            }
                        });
                    },
                });
            }
        },
        inputKeyword() {
            this.$store.dispatch('openModal', {
                title: 'Keyword',
                message: '키워드를 입력해 주세요.',
                input: 'keyword',
                ok: inputValue => {
                    if (_isEmpty(inputValue)) {
                        this.$store.dispatch('openModal', {
                            title: '키워드 입력',
                            message: '키워드를 입력해 주세요.',
                        });
                        return;
                    }
                    this.axios
                        .post('/api/keywords', {
                            keyword: inputValue,
                        })
                        .then(res => {
                            if (res.data.header === 'SUCCESS') {
                                this.keywords.push(res.data.body);
                            } else {
                                alert(this.$t('response.' + res.data.header));
                            }
                        });
                },
            });
        },
    },
};
</script>
