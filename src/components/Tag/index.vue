<template>
  <a-tag style="margin-bottom: 4px;" :color="brand ? 'orange' : ''">
    <slot />
  </a-tag>
</template>

<script>
export default {
  name: 'VueTag',
  props: {
    brand: {
      type: Boolean,
      default: false
    }
  }
}
</script>