<template>
    <m-table :data="tableData" :options="options">
        <template #date="{ scope }">
            <el-icon-timer></el-icon-timer>
            <!-- scope.row -->
            {{ scope.row.date }}
        </template>
        <!-- 插槽能在子组件分发出去  父组件应用的时候可以自己定义这些插槽的结构，使组件更加灵活 -->
        <!-- scope一定要解构出来 -->
        <template #name="{scope}">
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

// 表格数据
let tableData = [
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