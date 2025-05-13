<template>
  <ElScrollbar>
    <div class="full-view">
      <div class="search-view">
        <ElForm inline>
          <ElFormItem label="用户名">
            <ElInput v-model="form.username" placeholder="请输入用户名" />
          </ElFormItem>
        </ElForm>
      </div>
      <div class="table-view">
        <ElTable :data="tableData" height="100%">
          <ElTableColumn prop="date" label="Date" width="180" />
          <ElTableColumn prop="name" label="Name" width="180" />
          <ElTableColumn prop="address" label="Address" />
        </ElTable>
      </div>
    </div>
  </ElScrollbar>
</template>

<script lang="ts" setup>
import { useStateRef } from '@gx-web/tool'

const [form] = useStateRef(() => ({
  username: '',
}))

const tableData = Array.from({ length: 100 }, (_, i) => ({
  date: '2016-05-03',
  name: '王小虎',
  address: `上海市普陀区金沙江路 1518 弄${i}`,
}))
</script>

<style lang="scss" scoped>
.full-view {
  display: flex;
  flex-direction: column;
  position: absolute;
  inset: 0;

  .table-view {
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }
}
</style>
