<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="(dataInfo, i) in dataInfoTop" :key="i" cols="12">
        <v-card :class="'data-' + dataInfo.filterRequestType" dark @click="confirms(dataInfo)">
          <v-card-title
            class="headline"
            v-text="$t('dataInfo.' + dataInfo.filterRequestType, { target: dataInfo.filterTarget })"
          ></v-card-title>
          <v-card-subtitle
            v-text="$t('dataInfo.DESCRIPTION', { target: dataInfo.filteredResult })"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="my-n2">
      <v-col md="6">
        <v-card
          class="my-2"
          v-for="(dataInfo, i) in dataInfosOdd"
          :key="i"
          :class="'data-KEYWORD' + (i * 2 + 1)"
          dark
          @click="confirms(dataInfo)"
        >
          <v-card-title
            class="headline"
            v-text="$t('dataInfo.' + dataInfo.filterRequestType, { target: dataInfo.filterTarget })"
          ></v-card-title>
          <v-card-subtitle
            v-text="$t('dataInfo.DESCRIPTION', { target: dataInfo.filteredResult })"
          />
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card
          class="my-2"
          v-for="(dataInfo, i) in dataInfosEven"
          :key="i"
          :class="'data-KEYWORD' + (i * 2 + 2)"
          dark
          @click="confirms(dataInfo)"
        >
          <v-card-title
            class="headline"
            v-text="$t('dataInfo.' + dataInfo.filterRequestType, { target: dataInfo.filterTarget })"
          ></v-card-title>
          <v-card-subtitle
            v-text="$t('dataInfo.DESCRIPTION', { target: dataInfo.filteredResult })"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row dense v-if="dataInfos == null || dataInfos.length < 1">데이터가 없습니다.</v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dataInfos: [],
    };
  },
  computed: {
    dataInfoTop() {
      return this.dataInfos.filter((v, i) => i < 3);
    },
    dataInfosOdd() {
      return this.dataInfos.filter((v, i) => i > 2 && i % 2 === 1);
    },
    dataInfosEven() {
      return this.dataInfos.filter((v, i) => i > 2 && i % 2 === 0);
    },
  },
  mounted() {
    this.fetchDataInfo();
  },
  methods: {
    confirms(dataInfo) {
      this.$router.push({
        name: 'data',
        params: {
          filterRequestType: dataInfo.filterRequestType,
          filterTarget: dataInfo.filterTarget,
        },
      });
    },
    async fetchDataInfo() {
      const res = await this.axios.get('/api/data-info');
      if (res.data.header === 'SUCCESS') {
        this.dataInfos = res.data.body;
      }
    },
  },
};
</script>

<style scoped>
.data-ALL {
  background-color: #66a06de3;
}

.data-TOP {
  background-color: #22558a;
}

.data-LAST_DAYS {
  background-color: #ff2a00e3;
}

.data-KEYWORD1 {
  background-color: #43722d;
}
.data-KEYWORD2 {
  background-color: #369d62;
}
.data-KEYWORD3 {
  background-color: #b3d12f;
}
.data-KEYWORD4 {
  background-color: #d1982f;
}
.data-KEYWORD5 {
  background-color: #763eac;
}
.data-KEYWORD6 {
  background-color: #b41010;
}
.data-KEYWORD7 {
  background-color: #faec25;
}
</style>
