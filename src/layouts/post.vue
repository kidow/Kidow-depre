<template>
  <nuxt />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async mounted() {
    await this.$store.dispatch('auth/SIGN_IN_ANONYMOUS')
    this.$store.dispatch('firebase/REQUEST_PERMISSION', this.uid)
  },
  computed: {
    ...mapGetters({
      uid: 'auth/GET_USER_ID'
    })
  }
}
</script>
