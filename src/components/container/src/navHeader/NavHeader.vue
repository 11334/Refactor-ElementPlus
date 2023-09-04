<!-- 改头部 -->
<template>
    <div class="header">
        <span @click="toggle">
            <el-icon-expand v-if="collapse"></el-icon-expand>
            <el-icon-fold v-else></el-icon-fold>
        </span>
    </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
    collapse: boolean
}>()
console.log(props);

// defineProps({
//     collapse: {
//         type: Boolean
//     }
// })
let emits = defineEmits(['update:collapse'])
let toggle = () => {
    // 需要修改父组件的数据
    emits('update:collapse',!props.collapse)
}
</script>

<style lang="scss" scoped>

.header{
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center; //垂直方向居中
}
svg{
    width: 1em;
    height: 1em;
}
</style>