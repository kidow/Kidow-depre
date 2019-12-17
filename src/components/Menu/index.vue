<template>
  <div class="menu-container">
    <i class="fas fa-bars"></i>
  </div>
</template>

<script>
export default {
  name: 'VueMenu'
}
</script>

<style lang="scss" scoped>
.menu-container {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  color: $oc-gray-8;
  cursor: pointer;
  @media screen and (min-width: 1128px) {
    top: 40px;
    right: 60px;
    font-size: 32px;
  }
}
</style>