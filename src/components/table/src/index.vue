<template>
    <el-table :data="tableData" v-loading="isLoading" :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground" :element-loading-spinner="elementLoadingSpinner"
        :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox"
        @row-click="rowClick">
        <template v-for="(item, index) in tableOptions" :key="index">
            <!-- 传slot -->
            <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <template #default="scope">
                    <!-- 可操作行 -->
                    <template v-if="scope.row.rowEdit">
                        <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                    </template>
                    <!-- 不可操作行 -->
                    <template v-else>
                        <template v-if="(scope.$index + scope.column.id) === currentEdit">
                            <!-- 输入框 -->
                            <div style="display: flex;">
                                <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                                <div @click.stop="clickEditCell">
                                    <!-- $slots.editCell用户可以获得插槽 的name  传插槽出去切记带上  :scope="scope"-->
                                    <slot name="editCell" v-if="$slots.editCell" :scope="scope"></slot>
                                    <div class="icons" v-else>
                                        <el-icon-check @click="check(scope)" class="check"></el-icon-check>
                                        <el-icon-close @click="close(scope)" class="close"></el-icon-close>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                            <span v-else>{{ scope.row[item.prop] }}</span>
                            <!-- 是否可编辑 -->
                            <!-- 这个clickEdit事件 与上面 rowClick 编辑单元格事件产生冒泡-->
                            <component :is="`el-icon-${toLine(editIcon)}`" class="edit" @click.stop="clickEdit(scope)"
                                v-if="item.editable"></component>
                        </template>
                    </template>

                </template>
            </el-table-column>
        </template>

        <!-- 操作表格 -->
        <el-table-column :label="actionOptions!.label" :align="actionOptions!.align" :width="actionOptions!.width">
            <!-- 显示自定义列的数据===> element-plus-el-table 自带的插槽 -->
            <!-- scope中有每一行  每一列的索引 -->
            <template #default="scope">
                <!-- 可编辑状态 -->
                <slot name="editRow" v-if="scope.row.rowEdit"></slot>
                <!-- 在自带的插槽中加入自己的插槽  父组件在用的时候可以自定义内容-->
                <!-- 不可编辑状态 -->
                <slot name="action" :scope="scope" v-else></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { PropType, computed, ref, onMounted, watch } from 'vue'
import { TableOptions } from './type';
import { toLine } from '../../../utils';
import cloneDeep from 'lodash/cloneDeep'

let props = defineProps({
    // 接收表格的配置类型
    options: {
        type: Array as PropType<TableOptions[]>,
        require: true
    },
    // 接收表格的数据类型
    data: {
        type: Array,
        require: true,
    },
    // 加载文案
    elementLoadingText: {
        type: String
    },
    // 加载图标名
    elementLoadingSpinner: {
        type: String
    },
    // 加载背景颜色
    elementLoadingBackground: {
        type: String
    },
    // 加载svg
    elementLoadingSvg: {
        type: String
    },
    // 加载svg的配置
    elementLoadingSvgViewBox: {
        type: String
    },
    // 可编辑单元格显示的图标
    editIcon: {
        type: String,
        default: 'edit'
    },
    // 是否可以编辑行
    isEditRow: {
        type: Boolean,
        default: false
    },
    // 编辑行 按钮的标识
    editRowIndex: {
        type: String,
        default: ''
    }
})

// 分发事件
let emits = defineEmits(['confirm', 'cancel','update:editRowIndex'])

// 当前点击的单元格
let currentEdit = ref<string>('')

/*
    1、拷贝了一份数据  给这份数据增加了一个 rowEdit 标识 代表它是否可编辑的状态
    2、按钮操作
*/

// 拷贝一份表格的数据
// let result = cloneDeep(props.data)
// console.log('result', result);
// console.log(typeof(result));
interface TableData {
    date: string,
    name: string,
    address: string
}

let tableData = ref<any[]>(cloneDeep(props.data) as TableData[])
// 拷贝一份按钮的标识
let cloneEditRowIndex = ref<string>(props.editRowIndex)
// 点击编辑图标
onMounted(() => {
    tableData.value.map(item => {
        // 代表当前是否是可编辑的状态 给每一个item都加一个rowEdit 默认不可以 将来改这个就行
        item.rowEdit = false
    })
})
// 监听父组件传递过来的数据
watch(() => props.data, val => {
    // 如果父组件的数据变了 先更新值
    tableData.value = cloneDeep(val) as TableData[]
    tableData.value.map(item => {
        // 代表当前是否是可编辑的状态 给每一个item都加一个rowEdit 默认不可以 将来改这个就行
        item.rowEdit = false
    })
}, { deep: true })
// //  监听父组件传递过来的标识  如果标识变了更新标识
watch(() => props.editRowIndex, val => {
    if (val) {
        cloneEditRowIndex.value = val
    }
})

let clickEdit = (scope: any) => {
    // 唯一的标识
    currentEdit.value = scope.$index + scope.column.id
    console.log(scope);
}

let clickEditCell = () => {
    currentEdit.value = ''
}

// 点击 √
let check = (scope: any) => {
    emits('confirm', scope)
}
// 点击 ×
let close = (scope: any) => {
    emits('cancel', scope)
}

// 点击每一行的事件  能获得每一行和每一列的数据
let rowClick = (row: any, column: any) => {
    // console.log('row',row);
    // console.log('column',column);
    // 判断当前点击的是否是操作项的内容
    if (column.label === actionOptions.value!.label) {
        // console.log('操作项')
        // 编辑行的操作
        if (props.isEditRow && cloneEditRowIndex.value == props.editRowIndex) {
            // 点击的按钮是做可编辑操作  row代表当前一行的数据
            row.rowEdit = !row.rowEdit  //能控制显示插槽的显示与否
            // 重置其他数据的isEditRow
            tableData.value.map(item => {
                // item就是每一行
                if (item !== row) item.rowEdit = false  
            })
            // 要重置按钮的标识
            if(!row.rowEdit) emits('update:editRowIndex','')
        }
    }
}


//过滤操作选项之后的配置
let tableOptions = computed(() => props.options!.filter(item => !item.action))

// 找出需要操作项的配置  action属性代表打开操作项
let actionOptions = computed(() => props.options!.find(item => item.action))

// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length)
</script>

<style lang="scss" scoped>
.edit {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    left: 4px;
    cursor: pointer;
}

.icons {
    position: relative;
    top: 4px;
    display: flex;

    svg {
        cursor: pointer;
        width: 1em;
        height: 1em;
        margin-left: 8px;
    }

    .check {
        color: red
    }

    .close {
        color: green
    }
}
</style>