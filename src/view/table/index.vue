<template>
    <m-table :data="tableData" :options="options" elementLoadingText="加载中..." elementLoadingBackground="rgba(0,0,0,0.8)"
        :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50" @confirm="confirm" @cancel="cancel"
        editIcon="Bottom" isEditRow v-model:editRowIndex="editRowIndex">
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
        <template #editRow="{ scope }">
            <el-button size="small" type="primary">确认</el-button>
            <el-button size="small" type="danger">取消</el-button>
        </template>
        <template #editCell="{ scope }">
            <div style="display:flex;">
                <el-button size="small" type="primary">确认</el-button>
                <el-button size="small" type="danger">取消</el-button>
            </div>
        </template>
    </m-table>
</template>

<script setup lang="ts">
import { TableOptions } from '../../components/table/src/type'
import { ref,onMounted } from 'vue'
import axios from 'axios'
interface TableData {
    date: string,
    name: string,
    address: string
}

let tableData = ref<TableData[]>([
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
])
// setTimeout(() => {
// 表格数据
// tableData.value = [

// ]
// }, 3000)

let editRowIndex = ref<string>('')
// 当前是哪一页
let current = ref<number>(1)
// 定义总数
let total = ref<number>(0)
let pageSize = ref<number>(10)
onMounted(() => { 
    axios.post('api/list', {
        current: current.value,
        pageSize:pageSize.value
    }).then((res: any) => {
        tableData.value = res.data.data.rows
        total.value = res.data.data.total
        console.log(res.data)
    })
})


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
        slot: 'date',
        editable: true
        // width:180
    },
    {
        label: '姓名',
        prop: 'name',
        align: 'center',
        slot: 'name',
    },
    {
        label: '地址',
        prop: 'address',
        align: 'center',
        editable: true
    },
    {
        label: '操作',
        align: 'center',
        action: true
    },
]

let edit = (scope: any) => {
    // 可以做需求了
    // console.log('父组件', scope);
    // editRowIndex：点击了哪个按钮的标识，='edit' 针对编辑给的标识 以后点击什么自定义标识名   代表这个按钮做了什么事情
    editRowIndex.value = 'edit'
}

let confirm = (scope: any) => {
    console.log('父组件', scope);

}
let cancel = (scope: any) => {
    console.log(scope);
}
</script>

<style lang="scss" scoped>
svg {
    width: 1em;
    height: 1em;
}
</style>