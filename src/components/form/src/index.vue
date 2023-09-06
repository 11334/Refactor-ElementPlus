<template>
    <!-- validate-on-rule-change 是否在 rules 属性改变后立即触发一次验证 -->
    <el-form v-if="model" :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
        <template v-for="(item, index) in options" :key="index">

            <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
                <!-- component : 表单的什么元素是输入框还是单选按钮还是复选框？  v-model="model[item.prop!] 绑定表单其中一个元素的数据  v-bind="item.attrs" 绑定该表单元素的一些特殊操作比如显示密码、一键清空-->
                <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"
                    :placeholder="item.placeholder" v-if="item.type !== 'upload'"></component>
                <el-upload v-else v-bind="item.uploadAttrs" :on-preview="onPreview" :on-success="onSuccess"
                    :on-remove="onRemove" :on-error="onError" :on-progress="onProgress" :on-change="onChange"
                    :before-upload="beforeUpload" :before-remove="beforeRemove" :http-request="httpRequest"
                    :on-exceed="onExceed">
                    <!-- 之前做什么项目  做什么模块！模块功能描述怎么做  爱好  其他学习 重在沟通 -->
                    <!-- 项目公司随便编 或者切换城市选一个公司 不查  项目问题:第三方包包名叫啥    toB  toC-->
                    <!-- 八股文   功能实现方案  唠嗑 -->
                    <!-- 上传文件的载体  点击这个区域触发上传操作-->
                    <slot name="uploadArea"></slot>
                    <!-- 上传提示 -->
                    <slot name="uploadTip"></slot>
                </el-upload>
            </el-form-item>


            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component :placeholder="item.placeholder" v-bind="item.attrs" :is="`el-${item.type}`"
                    v-model="model[item.prop!]">
                    <component v-for="(child, i) in item.children" :key="i" :label="child.label" :value="child.value"
                        :is="`el-${child.type}`">
                    </component>
                </component>
            </el-form-item>

        </template>
    </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from 'vue';
import { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep'

let emits = defineEmits(["on-preview", "on-success"
    , "on-remove", "on-error", "on-progress", "on-change"
    , "before-upload", "before-remove", 'on-exceed', "http-request"])

let props = defineProps({
    // 表单的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    }
})

// Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则绑定到el-form，并将 el-form-Item 的 prop 属性设置为需要验证的特殊键值即可(要与rules校验的属性名一致) 
// :model 为表单数据对象 表示这个表单都提交什么数据
let model = ref<any>(null)
let rules = ref<any>(null)

// 初始化表单的方法
let initForm = () => {
    if (props.options && props.options.length) {
        // 初始值为空
        // let m: any = { username: '', password: '' }
        let m: any = {}
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
    }
}
onMounted(() => {
    initForm()
})
// 监听父组件传递进来的options是否改变 实时监听
watch(() => props.options, () => {
    initForm()
}, { deep: true })

// 上传组件的所有方法
let onPreview = (file: any) => {
    console.log('onPreview');
    emits('on-preview', file)
}
let onRemove = (file: any, fileList: any) => {
    console.log('onRemove');
    emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: any, fileList: any) => {
    console.log('onSuccess');
    emits('on-success', { response, file, fileList })
}
let onError = (error: any, file: any, fileList: any) => {
    console.log('onError');
    emits('on-error', { error, file, fileList })
}
let onProgress = (event: any, file: any, fileList: any) => {
    console.log('onProgress');
    emits('on-progress', { event, file, fileList })
}
let onChange = (file: any, fileList: any) => {
    console.log('onChange');
    emits('on-change', { file, fileList })
}
let beforeUpload = (file: any) => {
    console.log('beforeUpload');
    emits('before-upload', file)
}
let beforeRemove = (file: any, fileList: any) => {
    console.log('beforeRemove');
    emits('before-remove', { file, fileList })
}
let onExceed = (file: any, fileList: any) => {
    console.log('onExceed');
    emits('on-exceed', { file, fileList })
}
let httpRequest = () => {
    emits('http-request')
}
</script>

<style scoped></style>