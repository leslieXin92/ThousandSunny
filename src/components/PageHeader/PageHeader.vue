<template>
  <div class='PageHeader'>
    <div
      v-for='item in showMenuList'
      :key='item.label'
      :class="['menuItem', { active: route.path.includes(item.routePath.toLowerCase()) }]"
      @click='skipMenu(item.routePath)'
      @contextmenu.prevent='handleContextmenu'
    >
      {{ item.label }}
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
          size='small'
          style='color: darkcyan'
          link
          @click='skipMenu(i.routePath)'
        >
          {{ i.label }}
        </el-button>
      </template>
    </el-tooltip>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import { IMenuItem } from './type'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const curMenuRef = ref<HTMLElement>()
const visible = ref(false)

const menuList = ref<IMenuItem[]>([
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
    condition: true
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
  return showMenuList.value.find(item => item.label === curMenuRef.value?.innerText)?.contextmenuList || []
})

const skipMenu = (routePath: string) => {
  router.push({
    path: routePath
  })
}

const handleContextmenu = (e: MouseEvent) => {
  if ((e.currentTarget as HTMLElement).innerText! !== curMenuRef.value?.innerText) {
    visible.value = false
  }
  curMenuRef.value = e.currentTarget as HTMLElement
  visible.value = !visible.value
}

watch(visible, (newVisible) => {
  if (!newVisible) return
  setTimeout(() => {
    visible.value = false
  }, 2000)
})
</script>

<style scoped lang='less'>
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
}
</style>
