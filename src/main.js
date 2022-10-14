import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import 'element-plus/dist/index.css'
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import './style.css'
import App from './App.vue'
// 引入router
import { router } from './router'
import store from './store'
import './permission.js'
import "nprogress/nprogress.css"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册router
app.use(store)
app.use(router)
// 注册ElementPlus
app.use(ElementPlus)
app.mount('#app')
