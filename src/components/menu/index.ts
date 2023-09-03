import { App } from 'vue'
import menu from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    // 这是 vue.use的使用  要么这是一个函数 函数名是install
    // 要么是一个对象，对象里面的属性叫install
    install(app: App) {
        // 注册为全局组件
        app.component('m-menu', menu)
    }
}