import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import list from './list'
// 够造成一个数组
const components = [
    chooseArea,
    chooseIcon,
    trend,
    notification,
    list
]

// 最后use的是这个文件中的组件
export default {
    install(app: App) { 
        components.map(item => { 
            // app.use以后会去找item中的install方法
            app.use(item)
        })
    }
}