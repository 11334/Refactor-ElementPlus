import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
// 够造成一个数组
const components = [
    chooseArea,
    chooseIcon,
    trend,
    notification,
    list,
    menu,
    progress,
    chooseTime,
    chooseDate,
    chooseCity
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