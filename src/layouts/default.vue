<template>
  <div class="container">
    <h1 class="title" v-scroll-reveal="{ origin: 'bottom', distance: '20px' }">
      {{ $t('name') }} {{ $t('age')}}
      <br v-if="$device.isMobile" />
      {{ $t('job')}}
    </h1>
    <nuxt />
    <a-icon type="github" class="github button" @click="onGithubOpen" />
    <a-icon type="global" class="global button" @click="changeLocale" />
    <a-back-top />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    onGithubOpen() {
      window.open('https://github.com/kidow', '_blank')
    },
    changeLocale() {
      let date = new Date()
      let locale = ''
      if (!this.locale || this.locale === 'ko') locale = 'en'
      else locale = 'ko'
      date.setTime(date.getTime() + 365 * 60 * 60 * 24 * 1000)
      document.cookie =
        'locale=' + locale + ';expires=' + date.toUTCString() + ';path=/'

      location.reload()
    }
  },
  computed: {
    ...mapGetters({
      locale: 'GET_CURRENT_LOCALE'
    })
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
    color: $font-color;
    font-size: 40px;
    font-weight: bold;
  }
}

.github,
.global {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 36px;
  @media screen and (max-width: $md) {
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