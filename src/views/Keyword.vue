<template>
  <div class="keyword">
    <v-container fluid grid-system-md>
      <vue-good-table
        :columns="columns"
        :rows="keywords"
        theme="black-rhino"
        @on-row-click="onRowClick"
      >
        <div slot="emptystate">{{ $t('dataInfo.EMPTY_DATA') }}</div>
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'collect'" class="text-center">
            <v-btn
              :disabled="props.row.download"
              color="primary"
              @click.stop="collectData(props.row)"
              small
            >{{ $t('common.COLLECT') }}</v-btn>
          </div>
          <div v-else>{{ props.formattedRow[props.column.field] }}</div>
        </template>
      </vue-good-table>
    </v-container>
    <v-container>
      <v-layout fluid>
        <v-flex>
          <v-btn color="primary" @click="inputKeyword">키워드 입력</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty';
import toast from '@/plugins/toast';
export default {
  data() {
    return {
      keywords: [],
      columns: [
        { label: this.$t('keyword.columns.id'), field: 'id', type: 'number', width: '100px' },
        { label: this.$t('keyword.columns.keyword'), field: 'keyword' },
        { label: this.$t('keyword.columns.collect'), field: 'collect' },
      ],
    };
  },
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
              }
            });
          },
        });
      }
    },
    async collectData(keyword) {
      const keywordId = keyword.id;
      await this.axios.post(`/api/keywords/${keywordId}/collect`);
      toast.success(this.$t('messages.tryCollect', { keywordText: keyword.keyword }));
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
                toast.success(this.$t('messages.successAddKeyword', { keyword: inputValue }));
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
