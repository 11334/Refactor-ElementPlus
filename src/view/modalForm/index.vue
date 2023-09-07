<template>
    <el-button type="primary" @click="open">open</el-button>
    <!-- 想要直接修改visible 就用 v-model传值的方式 -->
    <m-modal-form title="编辑用户" width="50%" v-model:visible="visible">
        <template #footer>
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="visible = false">
                确认
            </el-button>
        </template>
    </m-modal-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let visible = ref<boolean>(false)
let open = () => {
    visible.value = true
}
</script>

<style scoped></style>