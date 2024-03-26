<template>
  <div class='blogItem'>
    <div class='header'>
      <el-page-header @back='goBack'>
        <template #content>
          <div class='title' ref='titleRef'>{{ title }}</div>
        </template>
      </el-page-header>

      <el-tooltip
        v-if='titleRef && isLogin'
        class='tooltip'
        v-model:visible='tooltipVisible'
        :virtual-ref='titleRef'
        trigger='contextmenu'
        effect='light'
        :showArrow='false'
        virtual-triggering
      >
        <template #content>
          <el-button
            type='primary'
            size='small'
            link
            @click='skipToUpdate'
          >
            Update
          </el-button>

          <el-divider border-style='dashed' />

          <el-button
            type='primary'
            size='small'
            link
            @click='openDialog'
          >
            Delete
          </el-button>
        </template>
      </el-tooltip>
    </div>

    <MdEditor type='readonly' :value='content' />

    <JDialog
      :title='title'
      :visible='dialogVisible'
      :confirmLoading="loading"
      @operate='handleOperate'
    >
      Confirm to delete ?
    </JDialog>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import JDialog from '@/libComponents/JDialog/index.vue'
import MdEditor from '@/components/MdEditor/index.vue'
import { useUserStore } from '@/store/useUserStore'
import useBlogItem from '@/hooks/useBlogItem'
import usePermission from '@/hooks/usePermission'
import message from '@/utils/message'
import { deleteBlog } from '@/service/blog'
import type { OperateType } from '@/libComponents/JDialog/type'

const router = useRouter()
const { id, title, content } = useBlogItem('show')

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const titleRef = ref()
const tooltipVisible = ref(false)

const loading = ref(false)

const goBack = () => {
  router.back()
}

const skipToUpdate = () => {
  router.push(`/blog/update/${id.value}`)
}

const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}

const handleOperate = async (type: OperateType) => {
  if (type === 'cancel') return dialogVisible.value = false
  const auth = usePermission('superAdmin')
  if (!auth) return message.error('Unauthorized!')
  try {
    loading.value = true
    await deleteBlog(id.value)
    router.back()
  } finally {
    dialogVisible.value = false
  }
}
</script>

<style lang='scss' scoped>
.blogItem {
  width: 900px;
  margin: 0 auto;

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
}

.el-popper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-button {
    margin: 5px 0;
    width: 50px;
  }

  .el-divider {
    margin: 5px 0;
  }
}
</style>
