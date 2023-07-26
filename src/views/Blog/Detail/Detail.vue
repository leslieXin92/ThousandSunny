<template>
  <article class='blogItem markdown-body'>
    <div class='header'>
      <el-page-header @back='goBack'>
        <template #content>
          <div class='title' ref='titleRef'>{{ title }}</div>
        </template>
      </el-page-header>

      <el-tooltip
        v-if='titleRef && isLogin'
        v-model:visible='visible'
        :virtual-ref='titleRef'
        trigger='contextmenu'
        effect='light'
        :showArrow='false'
        virtual-triggering
      >
        <template #content>
          <el-button
            size='small'
            style='color: darkcyan'
            link
            @click='skipToUpdate'
          >
            Update
          </el-button>
        </template>
      </el-tooltip>
    </div>

    <div class='content' v-html='content' />
  </article>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import useBlogItem from '@/hooks/useBlogItem'

const router = useRouter()
const { id, title, content } = useBlogItem('show')

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const titleRef = ref()
const visible = ref(false)

const goBack = () => {
  router.back()
}

const skipToUpdate = () => {
  router.push(`/blog/update/${id.value}`)
}
</script>

<style scoped lang='less'>
.blogItem {
  width: 900px;
  margin: 0 auto;
  background-color: #fff;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;

    .el-page-header {
      font-weight: bold;
      text-shadow: 2px 2px rgba(0, 139, 139, 0.1);
      color: darkcyan;

      :deep(.el-page-header__title) {
        font-size: 16px;
      }

      .title {
        font-size: 28px;
        color: darkcyan;
      }
    }
  }

  .content {
    padding: 10px;
    line-height: 35px;

    :deep(li) {
      list-style: initial;
    }

    :deep(pre) {
      line-height: 26px;
    }
  }
}
</style>
