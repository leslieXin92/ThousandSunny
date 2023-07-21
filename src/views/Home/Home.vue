<template>
  <div class='container' ref='threeEl'></div>
</template>

<script setup lang='ts'>
import useThree from '@/hooks/useThree'

const { threeEl } = useThree()
</script>

<style scoped lang='less'>
.container {
  width: calc(100vw - 40px);
  height: calc(100vh - 196px);
  overflow: visible;
}
</style>
