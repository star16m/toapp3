<template>
  <div>
    <data-card />
  </div>
</template>
<script>
export default {
  components: {
    DataCard: () => ({
      component: import(/* webpackChunkName: 'data-card' */ '@/components/DataCard.vue'),
    }),
  },
};
</script>
