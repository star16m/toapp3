<template>
  <v-dialog v-model="showLoader" persistent width="300">
    <v-card color="secondary">
      <v-card-text>
        {{ $t('common.LOAD_MESSAGE') }}
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['showLoader']),
};
</script>
