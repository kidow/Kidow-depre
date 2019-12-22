<template>
  <div class="blank">
    <div style="text-align:center">
      <a-empty>
        <p slot="description">{{ $t('404')}}</p>
      </a-empty>
      <a-button type="primary" @click="$router.push('/')">{{ $t('home')}}</a-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank'
}
</script>

<style lang="scss" scoped>
.blank {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>