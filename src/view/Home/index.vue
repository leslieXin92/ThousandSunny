<template>
  <div class='container' ref='threeRef' />
</template>

<script lang='ts' setup>
import useThree from '@/hooks/useThree'

const { threeRef } = useThree()
</script>

<style lang='scss' scoped>
.container {
  width: calc(100vw - 40px);
  height: calc(100vh - 196px);
  overflow: visible;
}
</style>
