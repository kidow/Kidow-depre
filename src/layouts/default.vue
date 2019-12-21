<template>
  <div class="container">
    <h1 class="title">
      김동욱. 26세.
      <br v-if="$device.isMobile" />웹 개발자.
    </h1>
    <nuxt />
    <a-icon type="github" class="github button" @click="onGithubOpen" />
    <a-icon type="global" class="global button" />
    <a-back-top />
  </div>
</template>

<script>
export default {
  methods: {
    onGithubOpen() {
      window.open('https://github.com/kidow', '_blank')
    }
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