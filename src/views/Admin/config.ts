import { VueElement } from 'vue'
import CreateBlog from './BlogModule/CreateBlog/CreateBlog.vue'
import BlogManage from './BlogModule/BlogManage/BlogManage.vue'
import CreateProject from './ProjectModule/CreateProject/CreateProject.vue'
import ProjectManage from './ProjectModule/ProjectManage/ProjectManage.vue'
import CreateShard from './MirrorModule/CreateShard/CreateShard.vue'
import MirrorManage from './MirrorModule/MirrorManage/MirrorManage.vue'
import { ISubMenuList } from '@/components/AdminMenu/type'
import { CurComponentNameType } from './type'

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
