<template>
  <div style="display:flex;">
    <div style="margin-right:20px;">
      <el-date-picker v-model="startDate" type="date" :placeholder="startPlaceholder" :disabled-date="startDateDisabled"
        v-bind="$attrs.startOptions" />
    </div>
    <div>
      <el-date-picker v-model="endDate" type="date" :placeholder="endPlaceholder" :disabled="endDisabled"
        :disabled-date="endDateDisabled" v-bind="$attrs.endOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
let endDisabled = ref<boolean>(true)
let emits = defineEmits(['startChange', 'endChange'])
// 开始日期
let startDate = ref<Date | null>(null)
// 结束日期
let endDate = ref<Date | null>(null)
// 禁用开始日期的函数
let startDateDisabled = (time: Date) => {
  if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60
}
// 禁用结束日期的函数
let endDateDisabled = (time: Date) => {
  if (startDate.value) return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60
}
// 监听开始的时间
watch(() => startDate.value, val => {
  if (!val) {
    endDisabled.value = true
  } else {
    emits('startChange', val)
    endDisabled.value = false
  }
})
// 监听结束的时间
watch(() => endDate.value, val => {
  if (val) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: val
    })
  }
})

let props = defineProps({
  // 开始日期占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  // 结束日期占位符
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  // 是否禁用今天之前的日期
  disableToday: {
    type: Boolean,
    default: true
  },
})


</script>

<style scoped></style>