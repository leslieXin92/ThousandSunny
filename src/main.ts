import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import { globalRegister } from '@/global'
import logChar from '@/utils/logChar'
import '@/global/global.scss'
import '@/theme/light.scss'
import '@/theme/dark.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(pinia)

app.mount('#app')

logChar()

console.log('test automated deployment!!!!')
