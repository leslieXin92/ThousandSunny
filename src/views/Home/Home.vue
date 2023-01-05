<template>
  <h1>Home</h1>
  <iframe :src='src' width='100%' height='100%'></iframe>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const src = ref('')
onMounted(() => {
  src.value = './three/index.html'
})
</script>

<style scoped lang='less'>
</style>
