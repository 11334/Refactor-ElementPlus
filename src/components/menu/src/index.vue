<template>
  <!-- v-bind="$attrs" props没有接收的属性都会绑定到这个标签上 该生效的都生效 -->
  <div>
    <el-menu :default-active="defaultActive" 
      v-bind="$attrs"
      :router="router">
      <!-- 
                <template> 标签的作用是作为 v-for 循环的容器
                <template> 语义更加明确,不会增加无意义的 DOM 节点
                如果不使用 <template>,也可以在外层再包一层标签来达到同样效果
            -->
      <template v-for="(item, index) in data" :key="index">
        <el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
          <component v-if="item.icon" :is="`el-icon-${toLine(item.icon)}`"></component>
          <span>{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
          <template #title>
            <component v-if="item.icon" :is="`el-icon-${toLine(item.icon)}`"></component>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item1, index1) in item.children" :index="item1.index" :key="index1">
            <component v-if="item1.icon" :is="`el-icon-${toLine(item1.icon)}`"></component>
            <span>{{ item1.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { toLine } from '../../../utils/index'
import { PropType } from 'vue'
import { MenuItem } from './type'

let props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default:''
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default:false
  }
})
console.log(props.data);

</script>

<style lang="scss" scoped>
svg{
  margin-right: 4px;
}
</style>