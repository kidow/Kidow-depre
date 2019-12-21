<template>
  <div class="container">
    <h1 class="title">
      김동욱. 26세.
      <br v-if="$device.isMobile" />웹 개발자.
    </h1>
    <a-tabs :animated="false" :tabBarGutter="0">
      <a-tab-pane tab="활동" key="1"></a-tab-pane>
      <a-tab-pane tab="소개" key="2"></a-tab-pane>
      <a-tab-pane tab="스택" key="3"></a-tab-pane>
      <a-tab-pane tab="이력" key="4"></a-tab-pane>
    </a-tabs>
    <div style="padding-top: 60px">
      <nuxt />
    </div>
    <a-icon
      type="bulb"
      class="bulb button"
      @click="theme = !theme"
      :theme="theme ? 'filled' : 'outlined'"
    />
    <a-back-top />
  </div>
</template>

<script>
export default {
  data: _ => ({
    theme: true
  })
}
</script>

  <style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 150px 0;
  width: 1400px;
  @media screen and (max-width: 1400px) {
    width: 100%;
    padding: 30px 18px;
  }
  .title {
    color: $font-color;
    font-size: 40px;
    font-weight: bold;
  }
}

.bulb {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 26px;
}
</style>