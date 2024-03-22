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
            <div class="projectItem">
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
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue'
import { groupBy } from 'lodash'
import { getProjectList, getProjectItem } from '@/service/project'
import type { ProjectItem, ProjectStatus } from '@/service/project/type'

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

      .projectItem {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 80px;
        padding: 0 10px 0 10px;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background-color: #f5f5f5;
        }

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
</style>
