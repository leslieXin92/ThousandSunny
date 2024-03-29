<template>
  <div class='PageHeader'>
    <div
      v-for='item in showMenuList'
      :key='item.label'
      :class="['menuItem', { active: route.path.includes(item.routePath.toLowerCase()) }]"
      @click='skipMenu(item.routePath)'
      @contextmenu.prevent='handleContextMenu'
    >
      {{ item.label }}
    </div>

    <div class='toggleThemeBtn' @click='toggleTheme'>
      <img v-show='!isDark' src='@/assets/light.png' alt='' />
      <img v-show='isDark' src='@/assets/dark.png' alt='' />
    </div>

    <el-tooltip
      v-if='curMenuRef && curContextmenuList.length'
      :visible='visible'
      :virtualRef='curMenuRef'
      virtualTriggering
      trigger='contextmenu'
      effect='light'
      :showArrow='false'
      :popperOptions="{
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              enabled: false,
            },
          },
        ],
      }"
    >
      <template #content>
        <el-button
          v-for='i in curContextmenuList'
          :key='i.label'
          type='primary'
          size='small'
          link
          @click='clickContextmenu(i)'
        >
          {{ i.label }}
        </el-button>
      </template>
    </el-tooltip>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDark } from '@vueuse/core'
import { useUserStore } from '@/store/useUserStore'
import { useProjectStore } from '@/store/useProjectStore'
import type { ContextmenuItem, MenuItem } from './type'

const isDark = useDark()
const toggleTheme = () => isDark.value = !isDark.value

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const curMenuRef = ref<HTMLElement>()
const visible = ref(false)

// project module
const projectStore = useProjectStore()
const { changeDialogVisible, changeCurType } = projectStore
const createProject = () => {
  router.push({ path: '/project' })
  changeCurType('create')
  changeDialogVisible(true)
}

const menuList = ref<MenuItem[]>([
  {
    label: 'Leslie',
    routePath: '/home',
    condition: true
  },
  {
    label: 'Blog',
    routePath: '/blog',
    condition: true,
    contextmenuList: [
      {
        label: 'Create',
        routePath: '/blog/create',
        condition: isLogin
      }
    ]
  },
  {
    label: 'Project',
    routePath: '/project',
    condition: true,
    contextmenuList: [
      {
        label: 'Create',
        condition: isLogin,
        customClickCallback: createProject
      }
    ]
  },
  {
    label: 'Mirror',
    routePath: '/mirror',
    condition: true
  },
  {
    label: 'Admin',
    routePath: '/admin',
    condition: isLogin
  }
])

const showMenuList = computed(() => {
  return menuList.value.map(item => ({
    ...item,
    contextmenuList: item.contextmenuList?.filter(item => item.condition) || []
  })).filter(item => item.condition)
})

const curContextmenuList = computed(() => {
  return (showMenuList.value.find(item => item.label === curMenuRef.value?.innerText)?.contextmenuList || []) as ContextmenuItem[]
})

const skipMenu = (routePath: string) => {
  router.push({ path: routePath })
}

// handle context menu
const handleContextMenu = (e: MouseEvent) => {
  if ((e.currentTarget as HTMLElement).innerText! !== curMenuRef.value?.innerText) {
    visible.value = false
  }
  curMenuRef.value = e.currentTarget as HTMLElement
  visible.value = !visible.value
}

// handle click contextmenu
const clickContextmenu = (i: ContextmenuItem) => {
  if (i.customClickCallback) return i.customClickCallback()
  if (i.routePath) skipMenu(i.routePath)
}

watch(visible, (newVisible) => {
  if (!newVisible) return
  setTimeout(() => {
    visible.value = false
  }, 2000)
})
</script>

<style scoped lang='scss'>
.PageHeader {
  display: flex;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #dedede;

  .menuItem {
    margin: 0 20px;
    cursor: pointer;
    font-size: 20px;
    font-style: oblique;

    &:first-child {
      flex: 1;
      font-size: 34px;
      font-weight: bold;
    }

    &:hover {
      color: rgba(0, 139, 139, 0.6);
    }
  }

  .active {
    color: darkcyan;
  }

  .toggleThemeBtn {
    width: 25px;
    cursor: pointer;

    img {
      width: 100%;
    }
  }
}
</style>
