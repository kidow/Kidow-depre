<template>
  <div class="container">
    <h1 class="title" v-scroll-reveal="{ origin: 'bottom', distance: '20px' }">
      {{ $t('name') }} {{ $t('age') }}
      <br />
      {{ $t('job') }}
    </h1>
    <nuxt />
    <a href="https://github.com/kidow" target="_blank" class="github button">
      <a-icon type="github" />
    </a>
    <a-icon type="global" class="global button" @click="changeLocale" />
    <a-back-top />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    changeLocale() {
      let date = new Date()
      let locale = ''
      if (!this.locale || this.locale === 'ko') locale = 'en'
      else locale = 'ko'
      date.setTime(date.getTime() + 365 * 60 * 60 * 24 * 1000)
      document.cookie =
        'locale=' + locale + ';expires=' + date.toUTCString() + ';path=/'
      this.$analytics.logEvent('언어 클릭')
      location.reload()
    }
  },
  computed: {
    ...mapGetters({
      locale: 'GET_CURRENT_LOCALE',
      uid: 'auth/GET_USER_ID'
    }),
    isMobile() {
      return this.$device.isMobile
    }
  },
  async mounted() {
    await this.$store.dispatch('auth/SIGN_IN_ANONYMOUS')
    this.$store.dispatch('firebase/REQUEST_PERMISSION', this.uid)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 150px 0;
  width: $xxl;
  @media screen and (max-width: $xxl) {
    width: $xl;
    padding: 30px 18px;
  }
  @media screen and (max-width: $xl) {
    width: $lg;
  }
  @media screen and (max-width: $md) {
    width: $sm;
  }
  @media screen and (max-width: $sm) {
    width: 100%;
  }
  .title {
    color: $font-primary-color;
    font-size: 40px;
    line-height: 1.4;
    font-weight: bold;
    @media screen and (max-width: $md) {
      width: 80%;
    }
  }
}

.github,
.global {
  position: absolute;
  top: 0;
  color: #fff;
  right: 20px;
  font-size: 36px;
  @media screen and (max-width: $md) {
    top: 10px;
    font-size: 26px;
  }
}

.global {
  top: 70px;
  @media screen and (max-width: $md) {
    top: 60px;
  }
}
</style>
