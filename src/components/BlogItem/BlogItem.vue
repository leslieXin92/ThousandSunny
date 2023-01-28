<template>
  <article class='blogItem'>
    <div class='header'>
      <el-page-header @back='goBack'>
        <template #content>
          <div class='title'>{{ blogDetail.title }}</div>
        </template>
      </el-page-header>
    </div>

    <div class='markdown-body' v-html='blogDetail.content'></div>
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
  width: 1000px;
  min-height: 1000px;
  margin: 0 auto;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 80px;
    padding: 0 50px;
    border-bottom: 1px solid #eee;
    background-color: #fff;

    .el-page-header {
      font-weight: bold;
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

  .markdown-body {
    padding: 0 50px;

    :deep(*) {
      line-height: 40px;
    }

    :deep(h1) {
      margin: 20px 0;
    }

    :deep(h2) {
      margin: 20px 0;
    }

    :deep(h3) {
      margin: 10px 0;
    }
  }
}
</style>
