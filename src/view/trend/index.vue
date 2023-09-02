<template>
    <div>
        <div class="flex">
            <div><m-trend text="营业额"></m-trend></div>
            <div><m-trend text="销售额" type="down"></m-trend></div>
        </div>
        <div class="flex">
            <div><m-trend text="营业额" upIconColor="red"></m-trend></div>
            <div><m-trend text="销售额" type="down" downIconColor="blue"></m-trend></div>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    div{
        margin-right: 10px;
    }
}
</style>