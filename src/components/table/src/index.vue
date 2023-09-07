<template>
    <div>
        table
    </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
import { TableOptions } from './type';
let props = defineProps({
    // 表格的配置
    options: {
        type: Array as PropType<TableOptions[]>,
        require:true
    },
    // 表格数据
    data: {
        type: Array as PropType<any[]>,
        required:true,
    }
})
</script>

<style scoped>

</style>