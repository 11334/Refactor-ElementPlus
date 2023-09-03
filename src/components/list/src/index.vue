<template>
  <div>
    list
  </div>
</template>

<script setup lang="ts">
// 在 Vue 中,PropType 是用来定义组件 props 的类型的
import { PropType } from 'vue'
import { ListOptions, ActionOptions } from './types.ts'
let props = defineProps({
  list: {
    // 列表的内容
    /*
      1. list 表示这个 prop 的名称。
      2. type: Array 表示这个 prop 的类型是数组。
      3. as PropType<ListOptions[]> 用于类型断言,明确表示这个数组的每个元素都是 ListOptions 类型。
      4. ListOptions 应该是你在组件中预先定义的一个接口或类型。
      5. PropType<T> 表示使用 PropType 对类型 T 进行包装。
      所以综合起来,这段代码的意思是:
      定义一个名为 list 的 prop,它的类型是一个 ListOptions 元素组成的数组,并使用 PropType 进行了类型定义。
    */
    type: Array as PropType<ListOptions[]>,
    /*
      1. 在使用该组件时,list prop 是必须传递的。
      2. 如果没有传递 list prop,Vue 会在浏览器控制台输出警告。
      3. 如果 list 的值是 undefined,则 Vue 同样会输出警告。
        这样可以确保使用该组件的人员必须传递 list prop,避免数据错误。
        没有 required 的 prop 默认是可选的,使用组件时可以不传,这时该 prop 的值将是 undefined。
        所以在 prop 类型定义中加上 required: true 主要有两个作用:
        1. 明确该 prop 在使用时是必填项
        2. 如果没有传入就会输出警告提醒
    */ 
    required:true
  },
  // 操作的内容
  actions: {
    type:Array as PropType<ActionOptions[]>,
    default: ()=>[] //非必要类型  可以是空数组
  }
})
</script>

<style scoped></style>