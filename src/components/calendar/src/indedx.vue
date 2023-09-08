<template>
    <div id="calendar"></div>
</template>

<script setup lang="ts">
import { Calendar } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'
import { PropType, onMounted, ref } from 'vue';
import { EventItem } from './type'

let props = defineProps({
    // 语言 
    local: {
        type: String,
        default: 'zh-cn'
    },
    // 视图模式
    initialView: {
        type: String,
        default: 'dayGridMonth'
    },
    // 按钮文字
    buttonText: {
        type: Object,
        // Object 类型默认值应该写成箭头函数
        default: () => {
            return {
                today: '今天',
                monthj: '月',
                week: '周',
                day: '日',
                prevYear: '上一年',
                nextYear: '下一年',
                prev: '上一月',
                next: '下一月'
            }
        }
    },
    // 头部工具栏
    headerToolbar: {
        type: Object,
        default: () => {
            return {
                start: 'title',
                center: '',
                end: 'prevYear today next'
            }
        }
    },
    // 底部工具栏
    footerToolbar: {
        type: Object,
        default: () => { }
    },
    // 事件源
    events: {
        type: Array as PropType<EventItem[]>,
        default: () => []
    }
})

// 日历实例
let calendar = ref<Calendar>()

// 渲染日历的方法
let renderCalendar = () => {
    let el = document.getElementById('calendar')
    if (el) {
        calendar.value = new Calendar(el, {
            // 日历插件   官方提供
            plugins: [daygrid, interaction],
            locale: props.local,
            initialView: props.initialView,
            buttonText: props.buttonText,
            headerToolbar: props.headerToolbar,
            footerToolbar: props.footerToolbar,
            // eventSources 表示当前事件源
            eventSources: [
                {
                    //渲染日历的事件
                    events(e, callback) { 
                        if (props.events.length) {                            
                            return callback(props.events)
                        }
                        else callback([])
                    }
                }
            ]
        })
        calendar.value.render()
    }
}

onMounted(() => {
    renderCalendar()
})
</script>

<style scoped></style>