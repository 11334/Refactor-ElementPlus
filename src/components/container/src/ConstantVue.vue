<script lang="ts" setup>
import { ref } from 'vue'
const isCollapse = ref(false)
let toggle = () => {
    isCollapse.value = !isCollapse.value
}
</script>
<template>
    <el-container class="el-container">
        <el-aside width="auto">
            <el-menu 
                :collapse="isCollapse" 
                default-active="2" 
                class="el-menu-vertical-demo"            >
                <el-menu-item index="1">
                    <el-icon-menu></el-icon-menu>
                    <span>导航1</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon-menu></el-icon-menu>
                    <span>导航2</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon-menu></el-icon-menu>
                    <span>导航3</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <span @click="toggle">
                    <el-icon-expand v-if="isCollapse"></el-icon-expand>
                    <el-icon-fold v-else></el-icon-fold>
                </span>
            </el-header>
            <el-main> <router-view></router-view> </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px; //菜单不收缩的时候宽度是多少
}
</style>