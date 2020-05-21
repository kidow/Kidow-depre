export const actions = {
  async REQUEST_PERMISSION() {
    console.dir(this.$messaging)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
      await this.$messaging.requestPermission()
      const token = await this.$messaging.getToken()
      if (!token) return
      console.log('token', token)
    } catch (err) {
      console.dir(err)
    }
  }
}
