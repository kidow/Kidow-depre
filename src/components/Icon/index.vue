<template>
  <a-icon
    class="button"
    :type="type"
    style="font-size: 22px; margin-right: 6px"
    theme="filled"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: 'VueIcon',
  props: {
    type: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>