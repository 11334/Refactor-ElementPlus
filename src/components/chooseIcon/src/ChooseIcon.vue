<template>
    <el-button @click="handleClick" type="primary">
        <slot></slot>
    </el-button>
    <div class="m--choose-icon-dialog-body-height">
        <el-dialog :title="title" v-model="dialogVisible">
            <!-- Object.keys(ElIcons) 表示获得对象ElIcons中所有的键名 -->
            <div class="container">
                <div class="item" v-for="(item, index) in Object.keys(ElIcons)" :key="index">
                    <!-- 图标已经全部注册成了全局组件 el-icon-xxx -->
                    <!-- component是vue自带的 is里面写什么 渲染出来就是一个什么标签 -->
                    <div class="text">
                        <component :is="`el-icon-${toLine(item)}`"></component>
                    </div>
                    <div class="icon">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
// ElIcons 是对象类型的
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '../../../utils'
const props = defineProps<{
    // 弹出框的标题  
    title: string,
    // 控制弹出框的显示与隐藏
    visible: boolean
}
>()

let dialogVisible = ref<boolean>(props.visible)
let emits = defineEmits(['update:visible'])
/*
在这个例子中,defineEmits()的作用主要有:
1. 定义组件可以emit触发的事件
通过defineEmits(['update:visible'])明确定义了这个组件可以触发update:visible事件。
2. 进行事件校验
在handleClick函数中调用emits('update:visible', !props.visible),这里会自动校验update:visible事件是否在defineEmits中定义过。如果未定义,会给出警告。
3. 提高可读性
通过defineEmits定义事件,可以让阅读代码的人更清晰地知道这个组件可以触发哪些事件。
4. 提供代码补全
在支持的编辑器中,defineEmits可以给予更好的代码补全提示,知道可以emit哪些事件。
5. TypeScript类型检查
在TS中可以利用defineEmits定义事件接口,进行事件数据的校验。
总之,在这个例子中,defineEmits主要用于定义组件可以触发的事件,进行校验与提高可读性,以及支持TS类型检查。
*/
let handleClick = () => {
    // 需要修改父组件的数据 
    emits('update:visible', !props.visible)
}
// 监听visible的变化，只能监听第一次的变化
watch(() => props.visible, val => {
    dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    // 垂直方向居中
    align-items: center;
    // 换行
    flex-wrap: wrap;
}

.item {
    // 每五个一换行
    width: 25%;
    display: flex;
    flex-direction: column;
    // 垂直方向居中
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    height: 70px;
}

.text {
    font-size: 14px;
}

.icon {
    flex: 1
}

svg {
    width: 2em;
    height: 2em;
}
</style>