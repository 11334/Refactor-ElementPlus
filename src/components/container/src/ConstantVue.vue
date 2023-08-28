<script lang="ts" setup>
import NavHeader from './navHeader/NavHeader.vue'
import NavSide from './navSide/NavSide.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
</script>
<template>
    <el-container class="el-container">
        <el-aside width="auto">
            <nav-side v-model:collapse="isCollapse" />
        </el-aside>
        <el-container>
            <el-header>
                <!-- 通过v-model的方式传值collapse 子组件就能改这个值 -->
                <nav-header v-model:collapse="isCollapse" />
            </el-header>
            <el-main> <router-view></router-view> </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>


<style lang="scss" scoped></style>