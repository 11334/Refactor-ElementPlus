<template>
    <el-form :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
        <el-form-item v-for="(item, index) in options" :key="index"  :prop="item.prop" :label="item.label">
            <!-- component : 表单的什么元素是输入框还是单选按钮还是复选框？  v-model="model[item.prop!] 绑定表单其中一个元素的数据  v-bind="item.attrs" 绑定该表单元素的一些特殊操作比如显示密码、一键清空
            -->
            <component v-bind="item.attrs" :is="`el-${item.type}`"
                v-model="model[item.prop!]"
            ></component>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';
import { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep'

let props = defineProps({
    // 表单的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    }
})

// Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则绑定到el-form，并将 el-form-Item 的 prop 属性设置为需要验证的特殊键值即可(要与rules校验的属性名一致) 
// :model 为表单数据对象 表示这个表单都提交什么数据
let model = ref<any>({})
let rules = ref<any>({})
onMounted(() => {
    // 初始值为空
    // let m: any = { username: '', password: '' }
    let m: any = { }
    let r: any = {}
    
    //从父组件准备好的数据 options中 遍历一个一个的对象 
    props.options.map((item: FormOptions) => {
        // 将一个对象的prop(唯一标识) 赋值给m和r两个对象当做属性
        // item就是option中一个一个完整的对象
        m[item.prop!] = item.value //m属性名是第n个对象的prop 拿当前对象的value给他赋值  遍历结束会得到 由 所有option对象的value属性(作为m的属性) 组成的对象 m
        r[item.prop!] = item.rules //r属性名是第n个对象的prop 拿当前对象的rules给他赋值  遍历结束会得到 由 所有option对象的rules属性(作为r的属性) 组成的对象 r        
    })
    // map 遍历数组时,回调函数的参数就是数组元素本身,赋值给其他变量只是拷贝了对象的引用,而不是深拷贝对象本身 然而model会双向绑定会修改源对象的值所以在这里要用深拷贝算法 从lodash中使用cloneDeep
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)    
})
</script>

<style scoped></style>