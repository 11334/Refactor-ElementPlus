<template>
    <m-table :data="tableData" :options="options" elementLoadingText="加载中..." elementLoadingBackground="rgba(0,0,0,0.8)"
        :element-loading-svg="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <template #date="{ scope }">
            <el-icon-timer></el-icon-timer>
            <!-- scope.row -->
            {{ scope.row.date }}
        </template>
        <!-- 插槽能在子组件分发出去  父组件应用的时候可以自己定义这些插槽的结构，使组件更加灵活 -->
        <!-- scope一定要解构出来 -->
        <template #name="{ scope }">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                    <div>name: {{ scope.row.name }}</div>
                    <div>address: {{ scope.row.address }}</div>
                </template>
                <template #reference>
                    <el-tag>{{ scope.row.name }}</el-tag>
                </template>
            </el-popover>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
            <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
        </template>
    </m-table>
</template>

<script setup lang="ts">
import { TableOptions } from '../../components/table/src/type'
import { ref } from 'vue'

interface TableData {
    date: string,
    name: string,
    address: string
}

let tableData = ref<TableData[]>([])
setTimeout(() => {
    // 表格数据
    tableData.value = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
}, 3000)

const svg = `
        <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `

// 表格配置
let options: TableOptions[] = [
    {
        label: '日期',
        prop: 'date',
        align: 'center',
        slot: 'date'
        // width:180
    },
    {
        label: '姓名',
        prop: 'name',
        align: 'center',
        slot: 'name'
    },
    {
        label: '地址',
        prop: 'address',
        align: 'center',
    },
    {
        label: '操作',
        align: 'center',
        action: true
    },
]

let edit = (scope: any) => {
    console.log(scope);

}
</script>

<style lang="scss" scoped>
svg {
    width: 1em;
    height: 1em;
}
</style>