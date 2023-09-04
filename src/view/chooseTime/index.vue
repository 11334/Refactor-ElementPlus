<template>
    <m-choose-time 
    :startOptions="startOptions"
    @startChange="startChange" @endChange="endChange"></m-choose-time>
</template>

<script setup lang="ts">
interface endValue {
    startTime: string,
    endTime: string
}
let startChange = (val: string) => { 
    console.log('startChange',val);
}
let endChange = (val: endValue)=>{ 
    console.log('endChange',val)
}
let startOptions = {
    size: 'small',
    clearable:false
}
</script>

<style scoped>

</style>