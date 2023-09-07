<template>
    <el-table 
        :data="data" 
        v-loading="isLoading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :element-loading-spinner="elementLoadingSpinner"
        :element-loading-svg="elementLoadingSvg"
        :element-loading-svg-view-box="elementLoadingSvgViewBox"
    >
        <template v-for="(item, index) in tableOptions" :key="index">
            <!-- 不传slot -->
            <el-table-column v-if="!item.slot" :label="item.label" :prop="item.prop" :align="item.align"
                :width="item.width"></el-table-column>
            <!-- 传slot -->
            <el-table-column v-else :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <template #default="scope">
                    <slot :name="item.slot" :scope="scope"></slot>
                </template>
            </el-table-column>
        </template>
        <el-table-column :label="actionOptions!.label" :align="actionOptions!.align" :width="actionOptions!.width">
            <!-- 显示自定义列的数据===> element-plus-el-table 自带的插槽 -->
            <!-- scope中有每一行  每一列的索引 -->
            <template #default="scope">
                <!-- 在自带的插槽中加入自己的插槽  父组件在用的时候可以自定义内容-->
                <slot name="action" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { TableOptions } from './type';


let props = defineProps({
    // 表格的配置
    options: {
        type: Array as PropType<TableOptions[]>,
        require: true
    },
    // 表格数据
    data: {
        type: Array as PropType<any[]>,
        required: true,
    },
    // 加载文案
    elementLoadingText: {
        type:String
    },
    // 加载图标名
    elementLoadingSpinner: {
        type:String
    },
    // 加载背景颜色
    elementLoadingBackground: {
        type:String
    },
    // 加载svg
    elementLoadingSvg: {
        type:String
    },
    // 加载svg的配置
    elementLoadingSvgViewBox: {
        type:String
    }
})

//过滤操作选项之后的配置
let tableOptions = computed(() => props.options!.filter(item => !item.action))

// 找出操作项的配置
let actionOptions = computed(() => props.options!.find(item => item.action))

// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length)
</script>

<style scoped></style>