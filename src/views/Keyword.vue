<template>
  <div class="keyword">
    <v-container fluid grid-system-md>
      <vue-good-table
        :columns="columns"
        :rows="keywords"
        theme="black-rhino"
        @on-row-click="onRowClick"
      />
    </v-container>
    <v-container>
      <v-layout row wrap justify-end>
        <v-flex shrink>
          <v-btn color="primary" @click="inputKeyword">입력</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    keywords: [],
    columns: [
      { label: "id", field: "id", type: "number" },
      { label: "키워드", field: "keyword" }
    ]
  }),
  created() {
    this.selectAllKeyword();
  },
  methods: {
    selectAllKeyword() {
      this.axios
        .get("/rest/api/keywords")
        .then(res => (this.keywords = res.data));
    },
    onRowClick(params) {
      if (params.row.keyword) {
        this.$store.dispatch("openModal", {
          title: "keyword 삭제",
          message: "키워드 [" + params.row.keyword + "] 를 삭제 하시겠습니까?",
          yes: () => {
            this.axios
              .delete("/rest/api/keywords/" + params.row.id)
              .then(res => {
                if (res.data.responseCode === "SUCCESS") {
                  this.selectAllKeyword();
                } else {
                  alert(res.data.responseCode);
                }
              });
          }
        });
      }
    },
    inputKeyword() {
      this.$store.dispatch("openModal", {
        title: "Keyword",
        message: "키워드를 입력해 주세요.",
        input: "keyword",
        ok: inputValue => {
          this.axios
            .post("/rest/api/keywords/input", {
              keyword: inputValue
            })
            .then(res => {
              if (res.data.responseCode === "SUCCESS") {
                this.keywords.push(res.data.data);
              } else {
                alert(res.data.responseCode);
              }
            });
        }
      });
    }
  }
};
</script>
