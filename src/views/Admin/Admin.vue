<template>
  <div class='admin'>
    <AdminMenu
      class='menu'
      :subMenuList='subMenuList'
      :defaultActive='curComponentName'
      @changeMenu='changeMenu'
    />

    <div class='curComponent'>
      <Component :is='curComponent' />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import AdminMenu from '@/components/AdminMenu/AdminMenu.vue'
import { subMenuList, componentMap } from './config'
import { CurComponentNameType } from './type'

const curComponentName = ref<CurComponentNameType>('createBlog')

const curComponent = computed(() => {
  return componentMap[curComponentName.value]
})

const changeMenu = (menu: CurComponentNameType) => {
  curComponentName.value = menu
}
</script>

<style scoped lang='less'>
.admin {
  display: flex;
  min-height: calc(100vh - 190px);

  .menu {
    width: 250px;
  }

  .curComponent {
    flex: 1;
    padding: 20px;
  }
}
</style>
