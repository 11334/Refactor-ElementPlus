<template>
  <div>
    <m-form ref="form" label-width="100px" :options="options" @on-change="handleChange"
      @before-upload="handleBeforeUpload" @on-preview="handlePreview" @on-remove="handleRemove"
      @before-remove="beforeRemove" @on-success="handleSuccess" @on-exceed="handleExceed">
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color:#ccc;font-size: 12px;">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <!-- 作用域插槽的作用：子组件能够通过插槽的形式分发数据给父组件 -->
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </m-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '../../components/form/src/types/types';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { ref } from 'vue'

interface Scope {
  form: FormInstance,
  model: any
}

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
    value: '123',
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
let form = ref()

// scope是表单实例
let submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      // 验证成功
      console.log(scope.model);
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误，请检查')
    }
  })
}
// 重置表单
let resetForm = () => {
  form.value.resetFields()
}
// 两个参数的是分发出来的对象 val
let handleRemove = (val: any) => {
  console.log('handleRemove');
  console.log(val)
}

let handlePreview = (file: any) => {
  console.log('handlePreview');
  console.log(file)

}
let beforeRemove = (val: any) => {
  console.log('beforeRemove');
  return ElMessageBox.confirm(
    `Cancel the transfer of ${val.file.name} ?`
  )
}
let handleExceed = (val: any) => {
  console.log('handleExceed');
  ElMessage.warning(
    `The limit is 3, you selected ${val.files.length}
      files this time, add up to ${val.files.length + val.fileList.length}`)
}
let handleSuccess = (val: any) => {
  console.log('onSuccess');
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('onChange');
  console.log(val);
}
let handleBeforeUpload = (file: any) => {
  console.log('before-upload');
  console.log(file);
}
</script>

<style scoped></style>