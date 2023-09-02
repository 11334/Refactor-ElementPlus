<template>
    <div class="trend">
        <div class="text">
            {{ text }}
        </div>
        <div class="icon">
            <el-icon-arrowup :style="{color:upIconColor}" v-if="type==='up'"></el-icon-arrowup>
            <el-icon-arrowdown :style="{color:downIconColor}" v-else></el-icon-arrowdown>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        default:'文字'
    },
    // 上升趋势的图标颜色
    upIconColor: {
        type: String,
        default:'#f5222d'
    },
    // 下降趋势的图标颜色
    downIconColor: {
        type: String,
        default:'#52c41a'
    }
})
</script>

<style lang="scss" scoped>
.trend{
    display: flex;
    align-items: center;
    .text{
        font-size: 16px;
        margin-right: 4px;
    }
    .icon{
        svg{
            width: 1em;
            height: 1em;
        }
    }
}
</style>