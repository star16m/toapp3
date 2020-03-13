<template>
    <div>
        <label>hahah {{ $route.params.siteId }} ha</label>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field v-model="site.name" label="사이트명" required></v-text-field>
            <v-text-field v-model="site.searchUrl" label="searchUrl" required></v-text-field>
            <v-text-field v-model="site.pageSelector" label="pageSelector" required></v-text-field>
            <v-text-field v-model="site.nameSelector" label="nameSelector" required></v-text-field>
            <v-text-field v-model="site.sizeSelector" label="sizeSelector" required></v-text-field>
            <v-text-field v-model="site.dateSelector" label="dateSelector" required></v-text-field>
            <v-text-field v-model="site.torrentNameSelector" label="torrentNameSelector" required></v-text-field>
            <v-text-field v-model="site.torrentNameReplace" label="torrentNameReplace" required></v-text-field>
            <v-text-field v-model="site.torrentSizeSelector" label="torrentSizeSelector" required></v-text-field>
            <v-text-field v-model="site.torrentSizeReplace" label="torrentSizeReplace" required></v-text-field>
            <v-text-field
                v-model="site.torrentMagnetHashSelector"
                label="torrentMagnetHashSelector"
                required
            ></v-text-field>
            <v-text-field
                v-model="site.torrentMagnetHashReplace"
                label="torrentMagnetHashReplace"
                required
            ></v-text-field>

            <!-- 
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4">
        Reset Form
      </v-btn>

      <v-btn color="warning">
        Reset Validation
      </v-btn> -->
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'SiteInput',
    props: {
        value: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        placeholder: { type: String, required: false },
    },
    data: () => ({
        site: {},
        checkbox: {},
        select: {},
        items: [{ name: 'haha', value: 1 }],
        valid: {},
        lazy: true,
    }),
    methods: {
        updateValue: function(e) {
            this.$emit('input', e.target.value);
        },
        retrieveSite(siteId) {
            this.axios.get('/rest/api/site/' + encodeURIComponent(siteId)).then(res => (this.site = res.data.data));
        },
    },
    created() {
        this.retrieveSite(this.$route.params.siteId);
    },
};
</script>
