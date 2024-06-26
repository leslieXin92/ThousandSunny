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
              <img src="../../assets/no_project.gif" alt="" />
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
      @operate="operate"
    >
      <div v-if="curType === 'show'" class="projectCard">
        <div class="projectInfo">
          <div class="cover">
            <img :src="formData.coverIcon" alt="" />
          </div>

          <div class="info">
            <div class="description">{{ formData.description }}</div>

            <div>
              <ElTag
                v-for="item in formData.technologyStack"
                :key="item"
                :type="randomTagType()"
                effect="plain"
                hit
              >
                {{ item }}
              </ElTag>
            </div>

            <div v-if="formData.startAt" class="startAt">
              <div class="label">start time:</div>
              <div class="value">{{ formData.startAt }}</div>
            </div>

            <div v-if="formData.doneAt" class="doneAt">
              <div class="label">done time:</div>
              <div class="value">{{ formData.doneAt }}</div>
            </div>
          </div>
        </div>

        <div class="address">
          <div v-if="formData.codeAddress" class="codeAddress">
            <ElButton
              type='primary'
              plain
              @click="skip2web(formData.codeAddress)"
            >
              view code
            </ElButton>
          </div>

          <div v-if="formData.onlineAddress" class="onlineAddress">
            <ElButton
              type='primary'
              plain
              @click="skip2web(formData.onlineAddress)"
            >
              view online
            </ElButton>
          </div>
        </div>

      </div>

      <JForm
        v-else
        ref="JFormRef"
        :key="curType"
        :schema="showProjectSchema"
        :roles="projectRules"
        :defaultFormData="formData"
        :disabled="!editable"
      >
        <template #coverIcon="{ data }">
          <JUpload :imageUrl="data" @onChange="onUploadChange" />
        </template>
      </JForm>
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
import JForm from '@/libComponents/JForm/index.vue'
import JUpload from '@/libComponents/JFormItem/JUpload/index.vue'
import { getProjectList } from '@/service/project'
import { useProjectStore } from '@/store/useProjectStore'
import usePermission from '@/hooks/usePermission'
import message from '@/utils/message'
import { projectRules, projectSchema } from './config'
import type { CreateProjectParams, ProjectItem, ProjectStatus } from '@/service/project/type'
import type { OperateType } from '@/libComponents/JDialog/type'
import type { JFormRef } from '@/libComponents/JForm/type'

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
const JFormRef = ref<JFormRef>()

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
    // TODO - validate失效
    await JFormRef.value!.validate()
    const projectData = JFormRef.value!.getFormData() as CreateProjectParams
    await handleCreateProject(projectData)
  }
  if (curType.value === 'update') {
    if (!adminPermission) return message.error('Unauthorized!')
    // TODO - validate失效
    await JFormRef.value!.validate()
    const projectData = JFormRef.value!.getFormData() as CreateProjectParams
    await handleEditProject(projectData, curProjectId.value!)
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

// project form
const status = computed(() => {
  const formStatus = JFormRef.value?.getFormData()?.status
  return formStatus || formData.value.status
})

const showProjectSchema = ref(projectSchema)

watch(
  status,
  (newStatus) => {
    showProjectSchema.value = projectSchema.map(i => {
      if (i.key === 'startAt') return { ...i, hide: newStatus === 'pending' }
      if (i.key === 'doneAt') return { ...i, hide: newStatus !== 'done' }
      if (i.key === 'codeAddress') return { ...i, hide: newStatus === 'pending' }
      if (i.key === 'onlineAddress') return { ...i, hide: newStatus !== 'done' }
      return i
    })
  },
  { immediate: true }
)

const onUploadChange = (url: string) => {
  JFormRef.value?.setFormData('coverIcon', url)
}

const randomTagType = () => {
  const pool = ['primary', 'success', 'warning', 'danger']
  const random = Math.floor(Math.random() * 4)
  return pool[random]
}

const skip2web = (url: string) => {
  window.open(url)
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

  .projectCard {
    display: flex;
    flex-direction: column;

    .projectInfo {
      display: flex;
      justify-content: space-around;

      .cover {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 0.8;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .description {
          font-size: 16px;
          font-style: italic;
          color: #0a5050;
        }

        .el-tag {
          margin: 15px 10px 0 0;
        }

        .startAt,
        .doneAt {
          display: flex;
          margin-top: 15px;

          .label {
            color: #999;
          }

          .value {
            margin-left: 10px;
          }
        }
      }
    }

    .address {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 25px;

      .codeAddress,
      .onlineAddress {
        margin-top: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
