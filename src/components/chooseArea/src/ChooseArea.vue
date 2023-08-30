<template>
    <div>
        <el-select placeholder="请选择省份" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select :disabled="!province" style="margin:0 10px;" placeholder="请选择城市" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select :disabled="!city || !province" placeholder="请选择区域" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'
// 下拉框选择省份的值
let province = ref<string>('')
// 下拉框选择城市的值
let city = ref<string>('')
// 下拉框选择区域的值
let area = ref<string>('')
// 所有的省市区数据
let areas = ref(allAreas)

// 城市下拉框的所有的值
let selectCity = ref<any[]>([])
// 区域下拉框的所有的值
let selectArea = ref<any[]>([])
watch(() => province.value, val => {
    if (val) {
        // Array.prototype.find() 是数组中的一个方法,用于找出第一个符合条件的数组成员
        // 由于找到的元素可能为 undefined,所以使用了 可选链运算符 ! 确保一定可以读取children属性
        let cities = areas.value.find(item => item.code === province.value)!.children
        selectCity.value = cities
        // console.log(cities);
        
    }
    city.value = ''
    area.value = ''
})
watch(() => city.value, val => {
    if (val) {
        // Array.prototype.find() 是数组中的一个方法,用于找出第一个符合条件的数组成员
        // 由于找到的元素可能为 undefined,所以使用了 可选链运算符 ! 确保一定可以读取children属性
        let area = selectCity.value.find(item => item.code === city.value)!.children
        selectArea.value = area
        // console.log(area);
        
    }
    area.value=''
})
</script>

<style lang="scss" scoped></style>