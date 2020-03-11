<template>
  <v-container fluid grid-system-md>
    <vue-good-table
      :columns="columns"
      :rows="datas"
      :row-style-class="downloadedDataStyle"
      theme="black-rhino"
      @on-row-click="onRowClick"
    />
  </v-container>
</template>
<script>
export default {
  data: () => ({
    datas: [],
    columns: [
      { label: "keyword", field: "keyword" },
      { label: "size", field: "size" },
      { label: "title", field: "title" }
    ]
  }),
  methods: {
    retrieveData() {
      this.axios.get("/rest/api/datas").then(res => (this.datas = res.data));
    },
    onRowClick(params) {
      if (params.row.download) {
        alert("이미 다운로드된 data 입니다.");
        return;
      }
      this.$store.dispatch("openModal", {
        title: "다운로드",
        message: "[" + params.row.title + "] 을 다운로드하시겠습니까?",
        yes: function() {
          this.axios
            .post("/rest/api/data/download", {
              magnetCode: params.row.magnetCode
            })
            .then(res => {
              console.log("res.data : " + res.data);
              params.row.download = !params.row.download;
            });
        }
      });
    },
    downloadedDataStyle(row) {
      return row.download ? "gray" : "accent";
    }
  },
  created() {
    this.retrieveData();
  }
};
</script>
