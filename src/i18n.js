import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function loadLocaleMessage() {
  const locales = require.context("./locales", true, /[a-z0-9-_,\S]+\.json$/i);

  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/a-z0-9]+\./i);
    if (matched && matched.length > -1) {
      const locale = matched[key];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
function getLanguage() {
  var osLan = sessionStorage.getLanguage;
  if (typeof osLan === undefined) {
    osLan = window.navigator.userLanguage || window.navigator.language;
    if ("en_US".indexOf(osLan) > -1) {
      osLan = "ENG";
    } else if ("ko_KR".indexOf(osLan) > -1) {
      osLan = "KOR";
    } else {
      osLan = "KOR";
    }
    sessionStorage.language = osLan;
  }
  return osLan;
}

export default new VueI18n({
  locale: getLanguage(),
  fallbackLocale: getLanguage(),
  messages: loadLocaleMessage()
});
