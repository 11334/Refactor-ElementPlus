<template>
  <div class="m-list-el-tab-pane">
    <el-tabs>
      <!-- 展示型数据下标不变可以用index做key值  -->
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
        <el-scrollbar max-height="300px">
          <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content" :key="index1">
            <div v-if="item1.avatar" class="avatar">
              <el-avatar size="small" :src="item1.avatar" />
            </div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag v-if="item1.tag" :type="item1.tagType" size="small">{{ item1.tag }}</el-tag>
              </div>
              <div v-if="item1.desc" class="time">{{ item1.desc }}</div>
              <div v-if="item1.time" class="time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div @click="clickAction(action, i)" class="a-item" :class="{ border: i !== actions.length }"
              v-for="(action, i) in actions" :key="i">
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// 在 Vue 中,PropType 是用来定义组件 props 的类型的
import { PropType } from 'vue'
import { ListOptions, ActionOptions,ListItem } from './types.ts'
import { toLine } from '../../../utils';
// import {toLine} from '../../../utils'
defineProps({
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
    required: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [] //非必要类型  可以是空数组
  }
})

let emits = defineEmits(['clickItem','clickAction'])
let clickItem = (item: ListItem, index: number) => {
  emits('clickItem', {item,index})
}
let clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', {item,index})

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background: #e6f6ff;
  }

  .avatar {
    flex: 1;
  }

  .content {
    flex: 3;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.actions {
  height: 25px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 12px;
  cursor: pointer;
  .a-item {
    height: 30px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}

.border {
  border-right: 1px solid #eee;
}
</style>