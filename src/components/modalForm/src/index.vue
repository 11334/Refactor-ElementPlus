<template>
    <div :class="{'m--choose-icon-dialog-body-height':isScroll}">
        <el-dialog v-model="dialogVisible" v-bind="$attrs">
            <template #default>
                <m-form ref="form" :options="options" label-width="100px" @on-change="onChange"
                    @before-upload="beforeUpload" @on-preview="onPreview" @on-remove="onRemove"
                    @before-remove="beforeRemove" @on-success="onSuccess" @on-exceed="onExceed">
                    <template #uploadArea>
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <slot name="uploadTip"></slot>
                    </template>
                </m-form>
            </template>
            <template #footer>
                <!-- footer是组件自己的插槽   我们应该自定义一个自己的插槽  返回的是当前组件实例对象-->
                <slot name="footer" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { FormOptions } from '../../form/src/types/types';
import { FormInstance } from 'element-plus';
let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    // 表单的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    // 只在屏幕内滚动
    isScroll: {
        type: Boolean,
        default: false
    },
    // 下面全是处理上传的事件
    onChange: {
        type: Function
    },
    beforeUpload: {
        type: Function
    },
    onPreview: {
        type: Function
    },
    onRemove: {
        type: Function
    },
    beforeRemove: {
        type: Function
    },
    onSuccess: {
        type: Function
    },
    onExceed: {
        type: Function
    },
})
// 表单实例
let form = ref<FormInstance | null>()
let emits = defineEmits(['update:visible'])
// 弹出框的显示与隐藏
let dialogVisible = ref<boolean>(props.visible)
watch(() => props.visible, val => {
    dialogVisible.value = val
})
watch(() => dialogVisible.value, val => {
    // dialogVisible.value 改变成 false了但是父组件的没有改
    // 将修改后的值分发出去 由于父组件绑定了 v-model:visible 就会自动修改
    // 注意 update:visible  与 v-model:visible 冒号后面的名字要一致
    emits('update:visible', val)
})
</script>

<style scoped></style>