<template>
    <m-choose-time :startOptions="startOptions" @startChange="startChange" @endChange="endChange"
        v-bind="$attrs.startOptions"></m-choose-time>

    <m-choose-date :startOptions="startOptions" @startChange="dateStartChange" @endChange="dateEndChange"
        v-bind="$attrs.endOptions" :disableToday="false"></m-choose-date>
</template>

<script setup lang="ts">
interface endValue {
    startTime: string,
    endTime: string
}
interface endDateValue {
    startDate: Date,
    endDate: Date
}
let startChange = (val: string) => {
    console.log('startChange', val);
}
let endChange = (val: endValue) => {
    console.log('endChange', val)
}
let dateStartChange = (val: Date) => {
    console.log('dateStartChange' + val);
}
let dateEndChange = (val: endDateValue) => {
    console.log(val);
}
let startOptions = {
    size: 'small',
    clearable: false
}
</script>

<style scoped></style>