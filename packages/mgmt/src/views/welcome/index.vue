<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Welcome'
})

const input = ref('')

onMounted(() => {
  ElMessage.success('测试')
  ElNotification({
    title: '标题名称',
    dangerouslyUseHTMLString: true,
    message: '<strong>我是加粗的</strong>'
  })
})
</script>

<template>
  <div class="home">
    home
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <el-date-picker v-model="input" type="date" placeholder="Pick a day" />
    <el-button type="primary">111</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
