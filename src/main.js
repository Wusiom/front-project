import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { useRem } from './utils/flexible'
import libs from './libs'
import 'virtual:svg-icons-register'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useTheme from './utils/theme'
import directives from './directives'
import './permission'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
useRem()
createApp(App).use(router).use(libs).use(pinia).use(directives).mount('#app')
useTheme()
