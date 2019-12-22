<template>
  <nuxt style="background: #414343" />
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/SIGN_IN_ANONYMOUS')
  }
}
</script>