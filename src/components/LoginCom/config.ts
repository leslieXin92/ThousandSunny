import type { FormRules } from 'element-plus'
import type { Schema } from '@/libComponents/JForm/type'

export const registerSchema: Schema[] = [
  {
    component: 'input',
    key: 'username',
    itemAttrs: {
      label: 'username',
      labelWidth: 90
    },
    attrs: {
      type: 'text'
    }
  },
  {
    component: 'input',
    key: 'password',
    itemAttrs: {
      label: 'password',
      labelWidth: 90
    },
    attrs: {
      type: 'text',
      showPassword: true
    }
  },
  {
    component: 'input',
    key: 'confirmPassword',
    itemAttrs: {
      label: 'confirm',
      labelWidth: 90
    },
    attrs: {
      type: 'text',
      showPassword: true
    }
  }
]

export const registerRules: FormRules = {
  username: [
    {
      required: true,
      message: 'Please Input Activity Username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please Input Activity Password',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please Input Activity Password',
      trigger: 'blur'
    }
  ]
}

export const loginSchema: Schema[] = [
  {
    component: 'input',
    key: 'username',
    itemAttrs: {
      label: 'username',
      labelWidth: 90
    },
    attrs: {
      type: 'text'
    }
  },
  {
    component: 'input',
    key: 'password',
    itemAttrs: {
      label: 'password',
      labelWidth: 90
    },
    attrs: {
      type: 'password',
      showPassword: true
    }
  }
]

export const loginRules: FormRules = {
  username: [
    {
      required: true,
      message: 'Please Input Activity Username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please Input Activity Password',
      trigger: 'blur'
    }
  ]
}
