<template>
  <el-container>
    <el-header>
      <PageHeader v-show='isNotFound' />
    </el-header>

    <el-main>
      <router-view v-slot='{ Component }'>
        <Transition>
          <component :is='Component' />
        </Transition>
      </router-view>
    </el-main>

    <el-footer>
      <PageFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'

const route = useRoute()

const isNotFound = computed(() => {
  return route.name !== 'NotFound'
})
</script>

<style lang='less' scoped>
.el-container {
  min-width: 1000px;
  max-width: 1920px;
  margin: 0 auto;

  .el-header {
    height: 100px;
  }

  .el-main {
    min-height: calc(100vh - 150px);
  }

  .el-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 14px;
    color: #bcbcbc;
  }
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
