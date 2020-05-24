export const state = () => ({
  token: ''
})

export const mutations = {
  SAVE_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async REQUEST_PERMISSION({ commit }, userId) {
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted')
        return console.log('permission is not granted!')
      await this.$messaging.requestPermission()
      const token = await this.$messaging.getToken()
      if (!token) return console.log('no token')
      const tokenRef = await this.$database
        .collection('tokens')
        .where('token', '==', token)
        .get()
      if (tokenRef.docs.length) {
        commit('SAVE_TOKEN', tokenRef.docs[0].data().token)
      } else {
        await this.$database
          .collection('tokens')
          .add({ token, date: new Date(), userId })
        commit('SAVE_TOKEN', token)
      }
    } catch (err) {
      console.dir(err)
    }
  }
}
