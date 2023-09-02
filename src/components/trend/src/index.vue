<template>
    <div class="trend">
        <div class="text">
            <slot v-if="slots.default"></slot>
            <div v-else>{{ text }}</div>
        </div>
        <div class="icon">
            <el-icon-arrowup :style="{ color: !reverseColor ? upIconColor : '#f5222d' }"
                v-if="type === 'up'"></el-icon-arrowup>
            <el-icon-arrowdown :style="{ color: !reverseColor ? downIconColor : '#52c41a' }" v-else></el-icon-arrowdown>
        </div>
    </div>
</template>

<script setup lang="ts">
// useSlots能够看当前插槽(当前组件)使用了几次
import { useSlots} from 'vue'
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
    // 颜色反转只在默认的颜色上生效  如果使用了自定义颜色，这个属性就不生效
    // 这个属性只要绑定在组件上 就会 变为 true  不加在组件上 默认 false
    // 这个属性加到组件上就说明 我这个组件的 icon 颜色 不能改变了 必须用默认的
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
    }
})

let slots = useSlots()
console.log(slots);

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