<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import variable from '@admin/styles/global.module.scss'

const { namespace = variable['el-namespace'] } = defineProps<{
  namespace: string
}>()
</script>

<template>
  <el-config-provider :locale="zhCn" :namespace>
    <slot></slot>
  </el-config-provider>
</template>

<style scoped></style>
