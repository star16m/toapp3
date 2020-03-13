<template>
    <div class="message">
        <v-container fluid grid-system-md>
            <vue-good-table :columns="columns" :rows="messages" @on-row-click="onRowClick" theme="black-rhino" />
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        messages: [],
        columns: [
            {
                label: 'id',
                field: 'id',
                type: 'number',
            },
            {
                label: 'type',
                field: 'type',
            },
            {
                label: 'createDate',
                field: 'createDate',
                type: 'date',
                dateInputFormat: 'yyyy-MM-dd HH:mm:ss',
                dateOutputFormat: 'yyyy-MM-dd HH:mm:ss',
            },
            {
                label: 'message',
                field: 'message',
            },
        ],
    }),
    created() {
        this.axios.get('/api/messages').then(res => {
            if (res.data.header === 'SUCCESS') {
                this.messages = res.data.body;
            }
        });
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
