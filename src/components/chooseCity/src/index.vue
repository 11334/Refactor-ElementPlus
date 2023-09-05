<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="430" trigger="click">
    <template #reference>
      <div class="result">
        <div style="margin-right: 10px;">{{ result }}</div>
        <div>
          <el-icon-arrowdown v-if="!visible" />
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="9">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col  :span="15">
            <el-select style="padding-top: 3px;" v-model="selectValue" filterable placeholder="Select"
            size='small'
            >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
        </el-col>
      </el-row>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let result = ref<string>('请选择')
let visible = ref<boolean>(false)
let radioValue = ref<string>('按城市')
let selectValue = ref<string>('')
const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
])
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}

svg {
  width: 1em;
  height: 1em;
}

.container {
  // display: flex;
  // align-items: center;
}
</style>