import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { globalRegister } from './global'
import useLogChar from '@/hooks/useLogChar'
import '@/global/global.less'
import 'github-markdown-css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalRegister)
app.mount('#app')

useLogChar()
