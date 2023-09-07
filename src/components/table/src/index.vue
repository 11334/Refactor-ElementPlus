<template>
    <el-table :data="data" v-loading="isLoading" :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground" :element-loading-spinner="elementLoadingSpinner"
        :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox">
        <template v-for="(item, index) in tableOptions" :key="index">
            <!-- 传slot -->
            <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <template #default="scope">

                    <template v-if="(scope.$index + scope.column.id) === currentEdit">
                        <!-- 输入框 -->
                        <div style="display: flex;">
                            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                            <div @click="clickEditCell">
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
                        <span v-else>{{ scope.row[item.prop!] }}</span>
                        <!-- 是否可编辑 -->
                        <component :is="`el-icon-${toLine(editIcon)}`" class="edit" @click="clickEdit(scope)"
                            v-if="item.editable"></component>
                    </template>
                </template>
            </el-table-column>
        </template>

        <!-- 操作表格 -->
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
import { PropType, computed, ref } from 'vue'
import { TableOptions } from './type';
import { toLine } from '../../../utils';


let props = defineProps({
    // 接收表格的配置类型
    options: {
        type: Array as PropType<TableOptions[]>,
        require: true
    },
    // 接收表格的数据类型
    data: {
        type: Array as PropType<any[]>,
        required: true,
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
    }
})

// 分发事件
let emits = defineEmits(['check', 'close'])

// 当前点击的单元格
let currentEdit = ref<string>('')

// 点击编辑图标
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
    emits('check', scope)
}
// 点击 ×
let close = (scope: any) => {
    emits('close', scope)
}

//过滤操作选项之后的配置
let tableOptions = computed(() => props.options!.filter(item => !item.action))

// 找出操作项的配置
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