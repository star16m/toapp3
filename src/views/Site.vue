<template>
  <div class="site">
    <v-container fluid grid-system-md>
      <vue-good-table
        :columns="columns"
        :rows="sites"
        :row-style-class="enableSiteStyle"
        theme="black-rhino"
        @on-row-click="onRowClick"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <v-btn color="Warn" @click.stop="editSite(props.row.id)"
              >편집</v-btn
            >
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </v-container>
    <v-container>
      <v-layout row wrap justify-end>
        <v-flex shrink>
          <v-btn color="primary" @click.stop="createNewSite"
            >신규 site 입력</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    sites: [],
    columns: [
      { label: "id", field: "id", type: "number" },
      { label: "사이트명", field: "name" },
      { label: "검색URL", field: "searchUrl" },
      { label: "편집", field: "edit" }
    ]
  }),
  methods: {
    retrieveSite() {
      this.axios.get("/rest/api/sites").then(res => (this.sites = res.data));
    },
    editSite(siteId) {
      this.$router.push({ name: "SiteInput", params: { siteId } });
    },
    createNewSite() {
      console.log("do create new Site!!");
    },
    onRowClick(params) {
      console.log(params);
      this.$store.dispatch("openModal", {
        title: "haha",
        message:
          "사이트 [" +
          params.row.name +
          "] 을 " +
          (params.row.useable ? "비활성화" : "활성화") +
          "하시겠습니까?",
        yes: function() {
          this.axios
            .post("/rest/api/sites/enabled", {
              id: params.row.id,
              useable: !params.row.useable
            })
            .then(res => {
              console.log("res => " + res);
              params.row.useable = !params.row.useable;
            });
        }
      });
    },
    enableSiteStyle(row) {
      return row.useable ? "accent" : "";
    }
  },
  created() {
    this.retrieveSite();
  }
};
</script>
