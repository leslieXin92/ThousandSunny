import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { createProject, deleteProject, getProjectItem, updateProject } from '@/service/project'
import type { CreateProjectParams } from '@/service/project/type'

type HandleProjectType = 'create' | 'show' | 'update' | 'delete'

const initFormData: CreateProjectParams = {
  name: '',
  coverIcon: '',
  technologyStack: [],
  status: 'pending'
}

export const useProjectStore = defineStore(
  'project',
  () => {
    const curType = ref<HandleProjectType>('show')
    const changeCurType = (newType: HandleProjectType) => {
      curType.value = newType
    }

    const dialogVisible = ref(false)
    const changeDialogVisible = (newVisible: boolean) => {
      dialogVisible.value = newVisible
    }

    const formData = ref<CreateProjectParams>(initFormData)

    watch(curType, (newType) => {
      if (newType === 'create') formData.value = initFormData
    })

    const editable = computed(() => {
      return ['create', 'update'].includes(curType.value)
    })

    const loading = ref(false)

    const handleCreateProject = async (formData: CreateProjectParams) => {
      try {
        loading.value = true
        await createProject(formData)
        changeDialogVisible(false)
      } finally {
        loading.value = false
      }
    }

    const handleShowProject = async (id: number) => {
      try {
        loading.value = true
        const { data } = await getProjectItem(id)
        changeDialogVisible(true)
        formData.value = data
      } finally {
        loading.value = false
      }
    }

    const handleEditProject = async (newFormData: CreateProjectParams, projectId: number) => {
      try {
        loading.value = true
        await updateProject({ ...newFormData, id: projectId })
        formData.value = newFormData
      } finally {
        loading.value = false
      }
    }

    const handleDeleteProject = async (projectId: number) => {
      try {
        loading.value = true
        await deleteProject(projectId)
      } finally {
        loading.value = false
      }
    }

    return {
      curType,
      dialogVisible,
      loading,
      editable,
      formData,
      changeCurType,
      changeDialogVisible,
      handleCreateProject,
      handleShowProject,
      handleEditProject,
      handleDeleteProject
    }
  }
)
