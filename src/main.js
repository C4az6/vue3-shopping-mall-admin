import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'


const app = createApp(App)
// 注册ElementPlus
app.use(ElementPlus)
app.mount('#app')
