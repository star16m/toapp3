<template>
  <div>
    <v-container fluid grid-system-md>
      <v-select
        v-model="selectedKeyword"
        :items="apiFilters"
        :label="$t('common.SEARCH_DATA')"
        item-value="filterTarget"
        item-text="`$t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget })`"
        outlined
        single-line
        @change="changeKeyword"
        return-object
      >
        <template slot="selection" slot-scope="data">
          <v-flex>
            {{ $t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget }) }}
            <v-badge color="green" :content="data.item.filteredResult"></v-badge>
          </v-flex>
        </template>
        <template slot="item" slot-scope="data">
          <v-flex>{{ $t('dataInfo.' + data.item.filterRequestType, { target: data.item.filterTarget }) }}</v-flex>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">{{ data.item.filteredResult }}</v-avatar>datas
          </v-chip>
        </template>
      </v-select>
      <vue-good-table
        :columns="columns"
        :rows="datas"
        :row-style-class="downloadedDataStyle"
        theme="black-rhino my-table"
        :line-numbers="true"
      >
        <div slot="emptystate">{{ $t('dataInfo.EMPTY_DATA') }}</div>
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'keyword'">
            <v-tooltip top>
              <span>{{ props.formattedRow[props.column.field] }}</span>
              <template v-slot:activator="{ on }">
                <span dark v-on="on">{{ props.formattedRow[props.column.field] | cut(1) }}</span>
              </template>
            </v-tooltip>
          </div>
          <div v-else-if="props.column.field == 'date'" class="text-center">
            <div>{{ props.row.date | dateParse('YYYY-MM-DD') | dateFormat('MM/DD') }}</div>
            <div>{{ '\n' + props.row.size + '\n' }}</div>
            <v-btn
              :disabled="props.row.download"
              color="primary"
              @click.stop="downloadData(props.row)"
              small
            >{{ $t('common.DOWNLOAD') }}</v-btn>
          </div>
          <div v-else>{{ props.formattedRow[props.column.field] }}</div>
        </template>
      </vue-good-table>
    </v-container>
  </div>
</template>
<script>
import _isEmpty from 'lodash/isEmpty';
export default {
  data() {
    return {
      datas: [],
      columns: [
        { label: this.$t('data.columns.keyword'), field: 'keyword', type: 'string' },
        { label: this.$t('data.columns.info'), field: 'date' },
        { label: this.$t('data.columns.title'), field: 'title' },
      ],
      apiFilters: [],
      selectedKeyword: {},
    };
  },
  methods: {
    async retrieveData() {
      const res = await this.axios.get('/api/data-info');
      this.apiFilters = res.data.body;

      if (!_isEmpty(this.$route.params)) {
        this.selectedKeyword = await this.$route.params;
        localStorage.setItem('selectedKeyword', JSON.stringify(this.selectedKeyword));
      } else if (this.apiFilters) {
        this.selectedKeyword = JSON.parse(localStorage.getItem('selectedKeyword')) || this.apiFilters.find(f => f.filterRequestType === 'ALL');
      }
      this.changeKeyword();
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
      localStorage.setItem('selectedKeyword', JSON.stringify(this.selectedKeyword));
    },
  },
  mounted() {
    this.retrieveData();
  },
};
</script>
