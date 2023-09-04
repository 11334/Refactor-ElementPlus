<template>
    <el-popover
        placement="bottom"
        :width="300"
        trigger="click"
      >
      <template #default>
        <!-- 放自己的插槽 -->
        <slot></slot>
      </template>
        <template #reference>
           <!-- value显示多少消息 -->
      <el-badge style="cursor:pointer;" :value="value" :max="max" :is-dot="isDot">
          <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import { toLine } from '../../../utils';
let props = defineProps({
    // 显示图标
    icon: {
        type: String,
        default: 'Bell'
    },
    // 消息数量
    value: {
        type: [String, Number],
        default: ''
    },
    // 最大值
    max: {
        type: Number,
    },
    // 是否显示小圆点
    isDot: {
        type:Boolean,
        default:false
    }
})
</script>

<style scoped>
svg{
    width: 1em;
    height: 1em;
}
</style>