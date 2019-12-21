export const state = () => ({
  locale: null
})

export const getters = {
  GET_CURRENT_LOCALE: state => state.locale
}

export const mutations = {
  SET_LOCALE(state, locale) {
    state.locale = locale
  }
}
