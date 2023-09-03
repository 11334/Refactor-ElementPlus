<template>
    <div class="trend">
        <div class="text" :style="{ color: textColor }">
            <slot v-if="slots.default"></slot>
            <div v-else>{{ text }}</div>
        </div>
        <div class="icon">
            <component :is='`el-icon-${toLine(upIcon)}`' :style="{ color: !reverseColor ? upIconColor : '#f5222d' }"
                v-if="type === 'up'"></component>
            <component :is='`el-icon-${toLine(downIcon)}`' :style="{ color: !reverseColor ? downIconColor : '#52c41a' }"
                v-else></component>
        </div>
    </div>
</template>

<script setup lang="ts">
// useSlots能够看当前插槽(当前组件)使用了几次
import { useSlots, computed } from 'vue'
import { toLine } from '../../../utils';
let props = defineProps({
    // 标记当前趋势是上升(up)还是下降(down)
    type: {
        type: String,
        default: 'up'
    },
    /*趋势显示id文字
        1、父组件传递过来的数据
        2、插槽
    */
    text: {
        type: String,
        default: '文字'
    },

    /* 
    // 颜色反转只在默认的颜色上生效  如果使用了自定义颜色，这个属性就不生效
    // 这个属性只要绑定在组件上 就会 变为 true  不加在组件上 默认 false
    // 这个属性加到组件上就说明 我这个组件的 icon 颜色 不能改变了 必须用默认的

    // 子组件默认属性值为 false
    // 父组件绑定了该属性但没有传值
    // 此时子组件收到的属性值为 true, 不再是默认的 false

    // 这是 Vue 的设计导致的, 组件在绑定了一个属性后, 默认将其视为“开启”状态, 值为 true。
    // 如果要传 false, 父组件绑定时必须显式传值:
    */
    reverseColor: {
        type: Boolean,
        default: false
    },
    // 上升趋势的图标颜色
    upIconColor: {
        type: String,
        default: '#f5222d'
    },
    // 下降趋势的图标颜色
    downIconColor: {
        type: String,
        default: '#52c41a'
    },
    // 上升趋势的文字颜色
    upTextColor: {
        type: String,
        default: 'rgb(0,0,0)'
    },
    // 下降趋势的文字颜色
    downTextColor: {
        type: String,
        default: 'rgb(0,0,0)'
    },
    // 上升趋势的图标
    upIcon: {
        type: String,
        default: 'Arrowup'
    },
    // 下降趋势的图标
    downIcon: {
        type: String,
        default: 'Arrowdown'
    }
})
// 获取插槽内容
let slots = useSlots()
// 文字颜色   根据type发生改变
let textColor = computed(() => {
    return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang="scss" scoped>
.trend {
    display: flex;
    align-items: center;

    .text {
        font-size: 16px;
        margin-right: 4px;
    }

    .icon {
        svg {
            width: 1em;
            height: 1em;
        }
    }
}
</style>