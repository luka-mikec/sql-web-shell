module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: process.env.VUE_APP_BASE_URL,

  pluginOptions: {
    i18n: {
      locale: 'hr',
      fallbackLocale: 'hr',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
