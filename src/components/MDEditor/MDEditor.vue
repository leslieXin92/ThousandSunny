<template>
  <MavonEditor
    v-model='context'
  />
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import emitter from '@/utils/mitt'

export default defineComponent({
  name: 'MDEditor',
  components: {
    MavonEditor: mavonEditor.mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const context = ref<string>(props.value)

    watch(context, (newValue) => {
      emitter.emit('change', newValue)
    })

    return { context }
  }
})
</script>

<style scoped lang='less'>
</style>
