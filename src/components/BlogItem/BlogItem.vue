<template>
  <article class='blogItem markdown-body'>
    <div class='header'>
      <el-page-header @back='goBack'>
        <template #content>
          <div class='title'>{{ blogDetail.title }}</div>
        </template>
      </el-page-header>
    </div>

    <div class='content' v-html='blogDetail.content'></div>
  </article>
</template>

<script setup lang='ts'>
import { reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMarkdown2HTML } from '@/hooks/useMarkdown2HTML'
import { mockQueryBlogItem } from './mock'

const route = useRoute()
const router = useRouter()

const blogDetail = reactive({
  title: '',
  content: ''
})

const id = computed(() => {
  return Number(route.params.id)
})

watch(
  id,
  async (newValue) => {
    const blogItem = await mockQueryBlogItem(newValue)
    blogDetail.content = useMarkdown2HTML(blogItem.content)
    blogDetail.title = blogItem.title
  },
  { immediate: true }
)

const goBack = () => {
  router.back()
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
