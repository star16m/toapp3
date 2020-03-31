<template>
  <div>
    <v-textarea v-model="debugMessages" />
    <data-card />
  </div>
</template>
<script>
import DataCard from '@/components/DataCard.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    DataCard,
  },
  computed: {
    ...mapGetters(['debugMessages']),
  },
};
</script>
