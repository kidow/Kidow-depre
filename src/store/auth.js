export const state = () => ({
  userId: ''
})

export const getters = {
  GET_USER_ID: state => state.userId
}

export const mutations = {
  SAVE_USER_ID(state, userId) {
    state.userId = userId
  }
}

export const actions = {
  SIGN_IN_ANONYMOUS({ dispatch, state }) {
    if (state.userId) return
    return new Promise(async (resolve, reject) => {
      try {
        await this.$auth().signInAnonymously()
        await dispatch('ME')
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  ME({ commit }) {
    return new Promise((resolve, reject) => {
      this.$auth().onAuthStateChanged(user => {
        if (user) {
          commit('SAVE_USER_ID', user.uid)
          resolve(user)
        } else resolve(false)
      })
    })
  }
}
