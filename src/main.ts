import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'
import mUI from './components'
const app = createApp(App)

for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}
// 全局注册图标  牺牲一点性能
//  el-icon-xxx
for (let i in Icons) { 
    // 注册全部组件
    // console.log(`el-icon${toLine(i)}`);
    
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])    
}

app.use(router).use(ElementPlus).use(mUI)
app.mount('#app')
