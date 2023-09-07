<template>
    <el-dialog 
        v-model="dialogVisible"
        v-bind="$attrs"
    >
        <template #default>
            表单
        </template>
        <template #footer>
            <!-- footer是组件自己的插槽   我们应该自定义一个自己的插槽 -->
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
let props = defineProps({
    visible: {
        type: Boolean,
        default:false
    }
})
let emits = defineEmits(['update:visible'])
// 弹出框的显示与隐藏
let dialogVisible = ref<boolean>(props.visible)
watch(() =>props.visible,val=> { 
    dialogVisible.value = val
})
watch(() =>dialogVisible.value,val=> { 
    // dialogVisible.value 改变成 false了但是父组件的没有改
    // 将修改后的值分发出去 由于父组件绑定了 v-model:visible 就会自动修改
    // 注意 update:visible  与 v-model:visible 冒号后面的名字要一致
    emits('update:visible',val)
})
</script>

<style scoped>

</style>