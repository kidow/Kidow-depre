import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cookieparser from 'cookieparser'

Vue.use(VueI18n)

export default ({ app, req, store }) => {
  let locale = store.getters['GET_CURRENT_LOCALE']

  if (!locale) {
    let cookies = null
    let raw_cookies = process.server ? req.headers.cookie : document.cookie

    if (raw_cookies) cookies = cookieparser.parse(raw_cookies)

    if (cookies) {
      locale = cookies.locale
      if (locale) store.commit('SET_LOCALE', locale, 365)
    }
  }

  app.i18n = new VueI18n({
    locale,
    fallbackLocale: 'ko',
    messages: {
      en: require('./locales/en.json'),
      ko: require('./locales/ko.json')
    }
  })
}
