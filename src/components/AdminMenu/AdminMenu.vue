<template>
  <el-menu
    activeTextColor='#008b8b'
    :defaultActive='defaultActive'
  >
    <el-sub-menu
      v-for='subMenu in subMenuList'
      :key='subMenu.key'
      :index='subMenu.key'
    >
      <template #title>
        <img
          :src='`/src/assets/${subMenu.icon}.png`'
          :alt='`${subMenu.icon}_icon`'
        />
        <span class='subMenuTitle'>{{ subMenu.title }}</span>
      </template>
      <el-menu-item
        v-for='menuItem in subMenu.menuItemList'
        :key='menuItem.key'
        :index='menuItem.key'
        @click='handleClickMenu(menuItem.key)'
      >
        <span class='menuItemTitle'>{{ menuItem.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang='ts'>
import { ISubMenuList } from './type'

interface IProps {
  subMenuList: ISubMenuList[]
  defaultActive?: string
}

interface IEmits {
  (e: 'changeMenu', menu: string): void
}

defineProps<IProps>()

const emits = defineEmits<IEmits>()

const handleClickMenu = (menu: string) => {
  emits('changeMenu', menu)
}
</script>

<style scoped lang='less'>
.subMenuTitle {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.menuItemTitle {
  margin-left: 18px;
  font-size: 16px;
}
</style>
