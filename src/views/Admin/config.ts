import { VueElement } from 'vue'
import CreateBlog from './BlogModule/CreateBlog/CreateBlog.vue'
import BlogManage from './BlogModule/BlogManage/BlogManage.vue'
import CreateProject from './ProjectModule/CreateProject/CreateProject.vue'
import ProjectManage from './ProjectModule/ProjectManage/ProjectManage.vue'
import CreateShard from './MirrorModule/CreateShard/CreateShard.vue'
import MirrorManage from './MirrorModule/MirrorManage/MirrorManage.vue'
import { ISubMenuList } from '@/components/AdminMenu/type'
import { CurComponentNameType } from './type'
import { JTableHeaderType } from '@/components/JTable/type'

export const subMenuList: ISubMenuList[] = [
  {
    title: 'Blog Module',
    key: 'blog',
    icon: 'blog',
    menuItemList: [
      { title: 'Create Blog', key: 'createBlog' },
      { title: 'Blog Manage', key: 'blogManage' }
    ]
  },
  {
    title: 'Project Module',
    key: 'project',
    icon: 'project',
    menuItemList: [
      { title: 'Create Project', key: 'createProject' },
      { title: 'Project Manage', key: 'projectManage' }
    ]
  },
  {
    title: 'Mirror Module',
    key: 'mirror',
    icon: 'mirror',
    menuItemList: [
      { title: 'Create Shard', key: 'createShard' },
      { title: 'Mirror Manage', key: 'mirrorManage' }
    ]
  }
]

export const componentMap: Record<CurComponentNameType, VueElement> = {
  createBlog: CreateBlog,
  blogManage: BlogManage,
  createProject: CreateProject,
  projectManage: ProjectManage,
  createShard: CreateShard,
  mirrorManage: MirrorManage
}

// 序号、名称、发布日期、类别、隐私、操作
const blogTableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'category', label: 'Category' } },
  { attrs: { prop: 'visibility', label: 'Visibility' }, filterMap: { 0: 'public', 1: 'private' } },
  { attrs: { type: 'operate', label: 'Operation' } }
]

// 序号、名称、技术栈、开始时间、结束时间、用时、操作
const projectTableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'projectName', label: 'Project Name' } },
  { attrs: { prop: 'technologyStack', label: 'Technology Stack' } },
  { attrs: { prop: 'startTime', label: 'Start Time' } },
  { attrs: { prop: 'endTime', label: 'End Time' } },
  { attrs: { prop: 'timeSpent', label: 'Time Spent' } },
  { attrs: { prop: 'onlineAddress', label: 'Online Address' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]

// 序号、日期、任务名称、任务详情、操作
const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'date', label: 'Date' } },
  { attrs: { prop: 'taskName', label: 'Task Name' } },
  { attrs: { prop: 'taskDetails', label: 'Task Details' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]
