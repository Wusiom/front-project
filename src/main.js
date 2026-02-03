import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { useRem } from './utils/flexible'
import libs from './libs'
import 'virtual:svg-icons-register'
useRem()
createApp(App).use(router).use(libs).mount('#app')
