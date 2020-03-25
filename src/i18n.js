import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessage() {
  const locales = require.context('./locales', true, /[a-z0-9-_]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/^.+\/([a-z0-9-_]+)\.json$/i);
    if (matched && matched.length > -1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
function getLanguage() {
  var osLan = sessionStorage.getLanguage;
  if (osLan === undefined) {
    osLan = window.navigator.userLanguage || window.navigator.language;
    if ('en_US'.indexOf(osLan) > -1) {
      osLan = 'en';
    } else if ('ko_KR'.indexOf(osLan) > -1) {
      osLan = 'ko';
    } else {
      osLan = 'ko';
    }
  }
  sessionStorage.language = osLan;
  return osLan;
}

export default new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'ko',
  messages: loadLocaleMessage(),
});
