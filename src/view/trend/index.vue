<template>
    <div>
        <!-- <div class="flex">
            <div><m-trend text="营业额"></m-trend></div>
            <div><m-trend text="销售额" type="down"></m-trend></div>
        </div>
        <div class="flex">
            <div><m-trend text="营业额" upIconColor="red"></m-trend></div>
            <div><m-trend text="销售额" type="down" downIconColor="blue"></m-trend></div>
        </div> -->

        <!-- 匿名插槽 slots.default存在-->
        <!-- <m-trend text="销售业绩">营业额</m-trend> -->
        <!-- 非匿名插槽 slots.default不存在-->
        <!-- <m-trend text="销售业绩"></m-trend> -->

        <!-- <m-trend text="销售额" reverseColor upIconColor="#ff0"></m-trend>
        <m-trend text="营业额" type="down"></m-trend> -->

        <!-- <m-trend text="营业额" upTextColor="blue"></m-trend>
        <m-trend text="销售额" downTextColor="red" type="down"></m-trend> -->

        <m-trend upIcon="CaretTop">营业额</m-trend>
        <m-trend type="down" downIcon="CaretBottom">销售额</m-trend>
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