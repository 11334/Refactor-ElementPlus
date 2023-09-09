<template>
    <!-- validate-on-rule-change 是否在 rules 属性改变后立即触发一次验证 -->
    <!-- model 表单实例对象  用来统一管理表单的各个选项 -->
    <el-form ref="form" v-if="model" :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">

        <template v-for="(item, index) in options" :key="index">

            <!-- 1、不是多选按钮选项(checkbox-group)、单选按钮选项(radio-group)等有表单项子元素的表单选项-->
            <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">

                <!-- 1、不是上传选项(upload),也不是富文本选项(editor), -->
                <!-- 2、v-model="model[item.prop!] 绑定表单其中一个元素的数据  -->
                <!-- 3、v-bind="item.attrs" 绑定该表单元素的一些特殊操作比如显示密码、一键清空-->
                <!-- 4、component 用来渲染匹配的标签 -->
                <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"
                    :placeholder="item.placeholder" :prefix-icon="item.prefixIcon"
                    v-if="item.type !== 'upload' && item.type !== 'editor'">
                </component>

                <!-- 上传选项(upload) -->
                <el-upload v-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview"
                    :on-success="onSuccess" :on-remove="onRemove" :on-error="onError" :on-progress="onProgress"
                    :on-change="onChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
                    :http-request="httpRequest" :on-exceed="onExceed">

                    <!-- name="uploadArea" 上传文件的载体  点击这个区域触发上传操作-->
                    <slot name="uploadArea"></slot>
                    <!-- 上传提示 -->
                    <slot name="uploadTip"></slot>
                </el-upload>

                <!-- 富文本选项(editor) -->
                <div id="editor" v-if="item.type === 'editor'"></div>
            </el-form-item>

            <!-- 2、多选按钮选项(checkbox-group)、单选按钮选项(radio-group)等有表单项子元素的表单选项-->
            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component :placeholder="item.placeholder" v-bind="item.attrs" :is="`el-${item.type}`"
                    v-model="model[item.prop!]">
                    <component v-for="(child, i) in item.children" :key="i" :label="child.label" :value="child.value"
                        :is="`el-${child.type}`">
                    </component>
                </component>
            </el-form-item>

        </template>

        <!-- 操作表单的选项 比如提交 重置都能在父组件接收的的插槽中写 -->
        <el-form-item>
            <!-- 1、实际上没有办法直接在插槽中触发表单的方法，只能用作用域插槽 获取表单实例  通过实例调取表单方法操作表单 -->
            <!-- 2、:form="form" 将form通过作用域插槽分发出去  除了拿到表单实例以外  还要拿到表单的值 :model="model" -->
            <!-- 3、在父组件接收表单时 <template #action="scope"> 接收一个scope 这个scope名字随意 它接收了form->表单实例对象 还有 model->表单的数据-->
            <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch, nextTick } from 'vue';
import { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep'
import { FormInstance } from 'element-plus';
import E from 'wangeditor'

let emits = defineEmits(["on-preview", "on-success"
    , "on-remove", "on-error", "on-progress", "on-change"
    , "before-upload", "before-remove", 'on-exceed'])

// 定义子组件接受父组件传递的数据的类型
let props = defineProps({
    // 表单选项的配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    // 用户自定义上传方法
    httpRequest: {
        type: Function
    }
})

// ***************************************************************************************************************************
// Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则绑定到el-form，并将 el-form-Item 的 prop 属性设置为需要验证的特殊键值即可(要与rules校验的属性名一致) 
// :model 为表单数据对象 表示这个表单都提交什么数据
let model = ref<any>(null)
let rules = ref<any>(null)
let form = ref<FormInstance | null>()
let edit = ref()
// 初始化表单的方法------搭配watch深度观测-----保证从父组件接收的数据的实时性
let initForm = () => {
    if (props.options && props.options.length) {
        // 初始值为空
        // let m: any = { username: '', password: '' }
        let m: any = {}
        let r: any = {}

        //从父组件准备好的数据 options中 遍历一个一个的对象 
        props.options.map((item: FormOptions) => {
            // 将一个对象的prop(唯一标识: username、password等) 赋值给m和r两个对象当做属性
            // item就是option中一个一个完整的对象
            // 通过item.prop 将数据和校验规则关联到一起  他们的属性名是一样的
            m[item.prop!] = item.value //m属性名是第n个对象的prop 拿当前对象的value给他赋值  遍历结束会得到 由 所有option对象的value属性(作为m的属性值) 组成的对象 m    最后相当于 m{username(prop):"admin"(value) , password(prop):"111111"(value)}
            r[item.prop!] = item.rules //r属性名是第n个对象的prop 拿当前对象的rules给他赋值  遍历结束会得到 由 所有option对象的rules属性(作为r的属性) 组成的对象 r  
            if (item.type === 'editor') {
                // 初始化富文本
                // nextTick 能获取到更新之后的DOM
                nextTick(() => {
                    if (document.getElementById('editor')) {
                        const editor = new E('#editor')
                        editor.config.placeholder = item.placeholder!
                        editor.create()
                        // 初始化富文本的内容
                        editor.txt.html(item.value)
                        // 输入的过程中持续变更newHtml  带p标签
                        editor.config.onchange = (newHtml: string) => {
                            // console.log(newHtml);
                            model.value[item.prop!] = newHtml
                        }
                        // 拿到editor实例
                        edit.value = editor
                    }
                })
            }
        })
        // map 遍历数组时,回调函数的参数就是数组元素本身,赋值给其他变量只是拷贝了对象的引用,而不是深拷贝对象本身 然而model会双向绑定会修改源对象的值所以在这里要用深拷贝算法 从lodash中使用cloneDeep
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
    }
}
// 初始化表单
onMounted(() => {
    initForm()
})
// 监听父组件传递进来的options是否改变 实时监听
watch(() => props.options, () => {
    initForm()
}, { deep: true })
// ******************************************************************************************************************************

// 重置表单的方法
let resetFields = () => {
    // 重置element-plus的表单   form.value是表单实例
    form.value!.resetFields()
    // 重置富文本编辑器的内容
    // 获取到富文本的配置项
    if (props.options && props.options.length) {
        let editorItem = props.options.find(item => item.type === 'editor')!
        edit.value.txt.html(editorItem.value)
    }
}

// 分发表单验证方法
let validate = () => {
    //在 Element Plus中,可以直接调用表单组件的 validate 方法来对表单进行验证。
    // validate 方法定义在表单组件 ElForm 的实例类型 FormInstance 中
    return form.value!.validate
}
// 获取表单数据
let getFormDate = () => {
    return model.value
}
// 分发重置富文本方法   将子组件的实例和方法暴露出去
defineExpose({
    resetFields,
    validate,
    getFormDate
})


// 上传组件的所有方法
let onPreview = (file: File) => {
    emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
    emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
    // 上传图片成功  给表单上传项赋值
    // model: { prop:value}
    let uploadItem = props.options.find(item => item.type === 'upload')
    model.value[uploadItem!.prop!] = { response, file, fileList }
    emits('on-success', { response, file, fileList })
}
let onError = (error: any, file: File, fileList: FileList) => {
    emits('on-error', { error, file, fileList })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
    emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
    emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
    emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
    emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
    emits('on-exceed', { files, fileList })
}

</script>

<style lang="scss" scoped>
#editor {
    position: relative;
    z-index: 1;
}
</style>