<template>
    <el-button type="primary" @click="open">open</el-button>
    <!-- 想要直接修改visible 就用 v-model传值的方式 -->
    <m-modal-form 
        isScroll
        title="编辑用户" 
        width="50%" 
        v-model:visible="visible" 
        :options="options"
        :on-change="handleChange"
        :on-success="handleSuccess"
    >

        <!-- 表单组件 -->
        <!--  #footer="{form}" 解构form -->
        <template #footer="{ form }">
            <el-button @click="cancel(form)">取消</el-button>
            <el-button type="primary" @click="confirm(form)">
                确认
            </el-button>
        </template>

        <!-- 上传组件 -->
        <template #uploadArea>
            <el-button type="primary">Click to upload</el-button>
        </template>
        <template #uploadTip>
            <div style="color:#ccc;font-size: 12px;">
                jpg/png files with a size less than 500KB.
            </div>
        </template>

    </m-modal-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormOptions } from '../../components/form/src/types/types';
import { FormInstance, ElMessage } from 'element-plus';
let visible = ref<boolean>(false)
let open = () => {
    visible.value = true
}
// 表单的配置项
let options: FormOptions[] = [
    {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
        rules: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur',
            },
            {
                min: 2,
                max: 6,
                message: '用户名在2-6位之间',
                trigger: 'blur',
            },
        ],
        attrs: {
            clearable: true
        }
    },
    {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
        rules: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur',
            },
            {
                min: 6,
                max: 15,
                message: '密码在6-15位之间',
                trigger: 'blur',
            },
        ],
        attrs: {
            showPassword: true,
            clearable: true
        }
    },
    {
        type: 'select',
        label: '职位',
        value: '1',
        placeholder: '请选择职位',
        prop: 'role',
        attrs: {
            style: {
                width: '100%',
            },
        },
        rules: [
            {
                required: true,
                message: '职位不能为空',
                trigger: 'change',
            }
        ],
        children: [
            {
                type: 'option',
                label: '经理',
                value: '1'
            },
            {
                type: 'option',
                label: '主管',
                value: '2'
            },
            {
                type: 'option',
                label: '员工',
                value: '3'
            },
        ]
    },
    {
        type: 'checkbox-group',
        value: [],
        prop: 'like',
        label: '爱好',
        children: [
            {
                type: 'checkbox',
                label: '足球',
                value: '1',
            },
            {
                type: 'checkbox',
                label: '篮球',
                value: '2',
            },
            {
                type: 'checkbox',
                label: '羽毛球',
                value: '3',
            },
        ],
        rules: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'change',
            }
        ],
    },
    {
        type: 'radio-group',
        value: '',
        prop: 'gender',
        label: '性别',
        rules: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'change',
            }
        ],
        children: [
            {
                type: 'radio',
                label: '男',
                value: 'male',
            },
            {
                type: 'radio',
                label: '女',
                value: 'female',
            },
            {
                type: 'radio',
                label: '保密',
                value: 'not',
            },
        ]
    },
    {
        type: 'upload',
        label: '上传',
        prop: 'pic',
        uploadAttrs: {
            action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
            multiple: true,
            limit: 3
        },
        rules: [
            {
                required: true,
                message: '文件不能为空',
                trigger: 'blur',
            }
        ],
    },
    {
        type: 'editor',
        value: '',
        prop: 'desc',
        label: '描述',
        placeholder: '请输入描述',
        rules: [
            {
                required: true,
                message: '描述不能为空',
                trigger: 'blur',

            }
        ]
    }
]

// 点击确认
let confirm = (form: any) => {
    let validate = form.validate()
    let model = form.getFormDate()
    // 表单验证的方法
    validate((valid: any) => {
        if (valid) {
            ElMessage.success('验证成功')
            console.log(model);

        } else {
            ElMessage.error('验证失败')
        }
    })
}
// 单击取消
let cancel = (form: FormInstance) => {
    // form.value = null
    // 重置表单
    form.resetFields()
    visible.value = false
}
let handleChange = (val: any) => {
    console.log('onChange');
    console.log(val);
}
let handleSuccess = (val: any) => {
    console.log('onSuccess');
    console.log(val)
}
</script>

<style scoped></style>