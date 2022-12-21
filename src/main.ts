import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { globalRegister } from './global'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalRegister)
app.mount('#app')
