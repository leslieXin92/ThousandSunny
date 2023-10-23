<template>
  <el-container>
    <el-header v-if='isNotFound'>
      <PageHeader />
    </el-header>

    <el-main>
      <router-view v-slot='{ Component }'>
        <Transition>
          <keep-alive include='List'>
            <component :is='Component' />
          </keep-alive>
        </Transition>
      </router-view>
    </el-main>

    <el-footer v-if='isNotFound'>
      <PageFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang='ts'>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader/index.vue'
import PageFooter from '@/components/PageFooter/index.vue'

const route = useRoute()

const isNotFound = shallowRef(false)

watch(() => route.name, (val) => {
  isNotFound.value = val !== 'NotFound'
})
</script>

<style lang='scss' scoped>
.el-container {
  min-width: 1000px;
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
