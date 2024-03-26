<template>
  <div class="project">
    <div
      class="projectGroup"
      v-for="grouped in groupedProjectList"
      :key="grouped.title"
    >
      <el-divider contentPosition="center" borderStyle="dashed">
        {{ grouped.title }}
      </el-divider>

      <template v-if='grouped.list.length'>
        <ElRow :gutter="30">
          <ElCol
            v-for="item in grouped.list"
            :key="item.id"
            :span="8"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
          >
            <div class="projectItem hoverProjectItem" @click="clickProject(item.id)">
              <div class="icon">
                <img :src="item.coverIcon" alt="" />
              </div>
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="description">{{ item.description }}</div>
              </div>
            </div>
          </ElCol>
        </ElRow>
      </template>

      <template v-else>
        <ElCol
          :span="8"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <div class="projectItem">
            <div class="icon">
              <img src="@/assets/unboxing.gif" alt="" />
            </div>
            <div class="info">
              <div class="name">No projects yet ~~</div>
            </div>
          </div>
        </ElCol>
      </template>
    </div>

    <!--  create & show & update dialog  -->
    <JDialog
      :title="formData?.name || 'Create Project'"
      :visible="dialogVisible"
      :showFooter="['create', 'update'].includes(curType)"
      :titleContextMenu="titleContextMenu"
      @changeVisible="changeVisible"
      @titleClickCallback="titleClickCallback"
    >
      {{ curType }}
      {{ formData }}
      {{ editable }}
      <template #footer>
        <el-button @click="operate('cancel')">Cancel</el-button>
        <el-button
          color='#008b8b'
          :loading="loading"
          @click="operate('confirm')"
        >
          Confirm
        </el-button>
      </template>
    </JDialog>

    <!--  delete dialog  -->
    <JDialog
      v-if="formData"
      :title="formData!.name"
      :visible="deleteDialogVisible"
      :titleContextMenu="titleContextMenu"
      @changeVisible='changeDeleteVisible'
      @operate='deleteOperate'
      @titleClickCallback="titleClickCallback"
    >
      <span>Are you sure to delete </span>
      <i><b style="color: darkcyan">{{ formData?.name }}</b></i> ?

      <template #footer>
        <el-button @click="deleteOperate('cancel')">Cancel</el-button>
        <el-button
          color='#008b8b'
          :loading="loading"
          @click="deleteOperate('confirm')"
        >
          Delete
        </el-button>
      </template>
    </JDialog>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { groupBy } from 'lodash'
import JDialog from '@/libComponents/JDialog/index.vue'
import { getProjectList } from '@/service/project'
import { useProjectStore } from '@/store/useProjectStore'
import usePermission from '@/hooks/usePermission'
import message from '@/utils/message'
import type { CreateProjectParams, ProjectItem, ProjectStatus, UpdateProjectParams } from '@/service/project/type'
import type { OperateType } from '@/libComponents/JDialog/type'

const projectList = ref<ProjectItem[]>([])
const groupedProjectList = ref<{ title: string, list: ProjectItem[] }[]>()

const handleGetProjectList = async () => {
  const { data } = await getProjectList()
  projectList.value = data
}

watch(projectList, (newList) => {
  const grouped = groupBy(newList, 'status')
  const titleMap: Record<ProjectStatus, string> = {
    pending: 'Schedule',
    doing: 'Current Focus',
    done: 'Completed'
  }
  groupedProjectList.value = ['doing', 'done', 'pending'].map(key => ({
    title: titleMap[key as ProjectStatus],
    list: grouped[key] || []
  }))
})

onMounted(async () => {
  await handleGetProjectList()
})

const curProjectId = ref<number>()

const clickProject = (projectId: number) => {
  curProjectId.value = projectId
  handleShowProject(projectId)
}

const projectStore = useProjectStore()
const { curType, dialogVisible, loading, editable, formData } = storeToRefs(projectStore)
const {
  changeCurType,
  changeDialogVisible,
  handleCreateProject,
  handleShowProject,
  handleEditProject,
  handleDeleteProject
} = projectStore

const tooltipVisible = ref(false)

const titleClickCallback = () => {
  tooltipVisible.value = !tooltipVisible.value
}

const changeVisible = (newVisible: boolean) => {
  if (!newVisible) changeCurType('show')
  changeDialogVisible(newVisible)
}

const showCallback = () => {
  changeCurType('show')
  deleteDialogVisible.value = false
  changeDialogVisible(true)
}

const updateCallback = () => {
  changeCurType('update')
  deleteDialogVisible.value = false
  changeDialogVisible(true)
}

const deleteCallback = () => {
  changeCurType('delete')
  changeDialogVisible(false)
  deleteDialogVisible.value = true
}

const titleContextMenu = computed(() => {
  const contextMenu = [
    { label: 'show', callback: showCallback },
    { label: 'update', callback: updateCallback },
    { label: 'delete', callback: deleteCallback }
  ]
  return contextMenu.filter(i => i.label !== curType.value && curType.value !== 'create')
})

const normalPermission = usePermission('normal')
const adminPermission = usePermission('admin')
const superAdminPermission = usePermission('superAdmin')

const operate = async (type: OperateType) => {
  if (type === 'cancel') return changeDialogVisible(false)
  if (curType.value === 'create') {
    if (!normalPermission) return message.error('Unauthorized!')
    await handleCreateProject({} as CreateProjectParams)
  }
  if (curType.value === 'update') {
    if (!adminPermission) return message.error('Unauthorized!')
    await handleEditProject({} as UpdateProjectParams, curProjectId.value!)
  }
  changeDialogVisible(false)
  await handleGetProjectList()
}

// delete dialog
const deleteDialogVisible = ref(false)

const changeDeleteVisible = (newVisible: boolean) => {
  deleteDialogVisible.value = newVisible
  if (!newVisible) changeCurType('show')
}

const deleteOperate = async (type: OperateType) => {
  if (type === 'cancel') return changeDeleteVisible(false)
  if (!superAdminPermission) return message.error('Unauthorized!')
  await handleDeleteProject(curProjectId.value!)
  changeDeleteVisible(false)
  await handleGetProjectList()
}
</script>

<style lang='scss' scoped>
.project {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;

  .projectGroup {
    margin-bottom: 50px;

    :deep(.el-divider) {
      width: 400px;

      .el-divider__text {
        font-size: 20px;
        font-weight: bold;
        opacity: 0.8;
        color: darkcyan;
      }
    }

    .el-col {
      margin-bottom: 30px;

      .hoverProjectItem {
        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
        }
      }

      .projectItem {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 80px;
        padding: 0 10px 0 10px;
        border-radius: 5px;

        .icon {
          width: 50px;
          height: 50px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }

        .info {
          flex: 0.9;
          align-content: center;
          height: 100%;
          margin-left: 10px;

          .name {
            font-size: 18px;
            font-weight: bold;
            color: #999;
          }

          .description {
            margin-top: 5px;
            font-size: 14px;
            opacity: 0.6;
            color: #666;
          }
        }
      }
    }
  }
}

.el-popper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: red;

  .el-button {
    margin: 5px 0;
    width: 50px;
  }

  .el-divider {
    margin: 5px 0;
  }
}
</style>
