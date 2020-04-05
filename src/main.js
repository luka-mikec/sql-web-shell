import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import i18n from './i18n'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {

    };
  },
  computed: {
    debug_mode() {
      return process.env.VUE_APP_DEBUG_MODE !== "false";
    },
    external_links() {
      return process.env.VUE_APP_external_links_titles.split(',').map( (title, i) => ({
        title,
        url: process.env.VUE_APP_external_links_urls.split(',')[i]
      }));
    },
    authenticate_url() {
      return process.env.VUE_APP_AUTH_URL;
    },
    my_base_url() {
      return process.env.VUE_APP_BASE_URL;
    },
    mysql_data_dir() {
      return process.env.VUE_APP_mysql_data_dir;
    },
    api_url() {
      return process.env.VUE_APP_API_URL;
    },
    files_url() {
      return process.env.VUE_APP_FILES_URL;
    },
  },
});

new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
