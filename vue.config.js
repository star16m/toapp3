const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../toapp/src/main/resources/static'),
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  },
};
