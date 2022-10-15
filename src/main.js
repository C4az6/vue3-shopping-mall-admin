import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 建议放到后面,否则会被elementPlus的默认样式覆盖
import 'virtual:windi.css'
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './style.css'
import App from './App.vue'
// 引入router
import { router } from './router'
import store from './store'
import './permission.js'
import "nprogress/nprogress.css"
import permission from '~/directives/permission.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(permission);
// 注册router
app.use(store)
app.use(router)
// 注册ElementPlus
app.use(ElementPlus)
app.mount('#app')
