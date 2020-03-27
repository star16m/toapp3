<template>
  <div class="message">
    <v-container fluid grid-system-md>
      <vue-good-table :columns="columns" :rows="messages" @on-row-click="onRowClick" theme="black-rhino">
        <div slot="emptystate">{{ $t('dataInfo.EMPTY_DATA') }}</div>
      </vue-good-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      columns: [
        {
          label: this.$t('message.columns.id'),
          field: 'id',
          type: 'number',
        },
        {
          label: this.$t('message.columns.type'),
          field: 'type',
        },
        {
          label: this.$t('message.columns.createDate'),
          field: 'createDate',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd HH:mm:ss',
          dateOutputFormat: 'MM-dd HH:mm:ss',
        },
        {
          label: this.$t('message.columns.message'),
          field: 'message',
        },
      ],
    };
  },
  async mounted() {
    this.$store.dispatch('openLoader');
    const res = await this.axios.get('/api/messages');
    if (res.data.header === 'SUCCESS') {
      this.messages = res.data.body;
    }
    this.$store.dispatch('closeLoader');
  },
  methods: {
    onRowClick(params) {
      if (params.row && params.row.message) {
        this.$store.dispatch('openModal', {
          title: 'message',
          message: '[' + params.row.createDate + ']' + params.row.message,
        });
      }
    },
  },
};
</script>
