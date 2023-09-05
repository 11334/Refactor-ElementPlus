<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="430" trigger="click">
    <template #reference>
      <div class="result">
        <div>{{ result }}</div>
        <div>
          <el-icon-arrowdown :class="{ 'rotate': visible }" />
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
        <el-col :span="15">
          <el-select style="padding-top: 3px;" v-model="selectValue" filterable placeholder="Select" size='small'>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <div class="city">
        <!-- 循环对象第一个参数是 value 第二个才是key -->
        <!-- 方法一 -->
        <!-- <div v-for="(value,key) in cities">{{ key }}</div> -->
        <!-- 方法二  Object.keys拿到对象所有的键-->
        <div class="city-item" v-for="(item, index) in Object.keys(cities)">{{ item }}</div>
      </div>
      <el-scrollbar max-height="300px">
        <template v-for="(value, key) in cities" :key="key">
          <el-row style="margin-bottom: 10px;">
            <el-col :span=2>{{ key }}:</el-col>
            <el-col class="city-name" :span="22">
              <div v-for="(item, index) in value" :key="item.id">
                <div class="city-name-city">{{ item.name }}</div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import city from '../lib/city'
let result = ref<string>('请选择')
let visible = ref<boolean>(false)
let radioValue = ref<string>('按城市')
let selectValue = ref<string>('')
let cities = ref(city.cities)
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

.rotate {
  transform: rotate(180deg);
}

svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  /*
    - 对所有属性都添加过渡效果
    - 过渡过程持续0.25秒
    - 过渡时序函数为linear,表示过渡速度线性均匀
  */
  transition: all 0.25s linear;
}

.city {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;

  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    border: 1px solid #eee;
  }
}

.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &-city {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    // border: 1px solid #eee;
  }
}
</style>