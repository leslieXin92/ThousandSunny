import type { FormRules } from 'element-plus'
import type { Schema } from '@/libComponents/JForm/type'

export const projectSchema: Schema[] = [
  {
    component: 'input',
    key: 'name',
    itemAttrs: {
      label: 'name',
      labelWidth: 130
    },
    attrs: {
      type: 'text',
      placeholder: 'project name'
    }
  },
  {
    component: 'input',
    key: 'description',
    itemAttrs: {
      label: 'description',
      labelWidth: 130
    },
    attrs: {
      type: 'text',
      placeholder: 'project description'
    }
  },
  {
    component: 'upload',
    key: 'coverIcon',
    custom: true,
    itemAttrs: {
      label: 'cover',
      labelWidth: 130
    },
    attrs: {
      options: [
        { label: 1, value: 1 }
      ]
    }
  },
  {
    component: 'select',
    key: 'technologyStack',
    itemAttrs: {
      label: 'technology stack',
      labelWidth: 130
    },
    attrs: {
      options: [
        'Vue',
        'React',
        'Typescript',
        'Webpack',
        'Vite',
        'Koa'
      ].map(i => ({ label: i, value: i })),
      multiple: true,
      filterable: true,
      allowCreate: true
    }
  },
  {
    component: 'select',
    key: 'status',
    itemAttrs: {
      label: 'status',
      labelWidth: 130
    },
    attrs: {
      options: [
        { label: '🟡 pending', value: 'pending' },
        { label: '🟢 doing', value: 'doing' },
        { label: '🔵 done', value: 'done' }
      ],
      clearable: false
    }
  },
  {
    component: 'input',
    key: 'codeAddress',
    itemAttrs: {
      label: 'code address',
      labelWidth: 130
    },
    attrs: {
      type: 'text',
      placeholder: 'code address'
    }
  },
  {
    component: 'input',
    key: 'onlineAddress',
    itemAttrs: {
      label: 'online address',
      labelWidth: 130
    },
    attrs: {
      type: 'text',
      placeholder: 'online address'
    }
  },
  {
    component: 'datePicker',
    key: 'startAt',
    itemAttrs: {
      label: 'start time',
      labelWidth: 130
    },
    attrs: {
      placeholder: 'project start time',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    component: 'datePicker',
    key: 'doneAt',
    itemAttrs: {
      label: 'done time',
      labelWidth: 130
    },
    attrs: {
      placeholder: 'project done time',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  }
]

export const projectRules: FormRules = {
  name: [
    {
      required: true,
      message: 'Please Input Activity Username',
      trigger: 'blur'
    }
  ],
  description: [],
  coverIcon: [
    {
      required: true,
      message: 'Please Upload cover icon',
      trigger: 'blur'
    }
  ],
  technologyStack: [],
  status: [],
  codeAddress: [],
  onlineAddress: [],
  startAt: [],
  doneAt: []
}
