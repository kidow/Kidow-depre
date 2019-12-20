<template>
  <div class="flex">
    <div style="width: 90px;">
      <strong>{{ name }}</strong>
    </div>
    <div style="flex: 1">
      <vue-tag v-for="(item, i) in list" :key="i" :brand="i === 0">{{ item }}</vue-tag>
    </div>
  </div>
</template>

<script>
import VueTag from '~/components/Tag'
export default {
  name: 'VueTags',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    list: {
      type: Array,
      default: _ => [],
      required: true
    }
  },
  components: {
    VueTag
  }
}
</script>