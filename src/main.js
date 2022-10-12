import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
// 引入router
import router from './router'


const app = createApp(App)
// 注册router
app.use(router)
// 注册ElementPlus
app.use(ElementPlus)
app.mount('#app')
