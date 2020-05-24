export const state = () => ({
  token: ''
})

export const mutations = {
  SAVE_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async REQUEST_PERMISSION({ commit }) {
    console.dir(this.$messaging)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
      await this.$messaging.requestPermission()
      const token = await this.$messaging.getToken()
      console.log('token', token)
      if (!token) return
      const tokenRef = await this.$database
        .collection('tokens')
        .where('token', '==', token)
        .get()
      if (tokenRef.docs.length) {
        commit('SAVE_TOKEN', tokenRef.docs[0].data().token)
      } else {
        await this.$database
          .collection('tokens')
          .add({ token, date: new Date() })
        commit('SAVE_TOKEN', token)
      }
    } catch (err) {
      console.dir(err)
    }
  },
  async SEND_TO_DEVICE() {}
}
