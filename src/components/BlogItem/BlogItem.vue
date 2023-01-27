<template>
  <h1>BlogItem - {{ id }}</h1>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const id = computed(() => {
  return route.params.id
})
</script>

<style scoped lang='less'>
</style>
