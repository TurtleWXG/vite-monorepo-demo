<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from 'vue'
import { useAppStore } from '@mgmt/store/modules'
import { useDesign } from '@mgmt/hooks'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('logo')

const appStore = useAppStore()

const show = ref(true)

const title = computed(() => appStore.getTitle)

const layout = computed(() => appStore.getLayout)

const collapse = computed(() => appStore.getCollapse)

onMounted(() => {
  if (unref(collapse)) show.value = false
})

watch(
  () => collapse.value,
  (collapse: boolean) => {
    if (unref(layout) === 'topLeft' || unref(layout) === 'cutMenu') {
      show.value = true
      return
    }
    if (!collapse) {
      setTimeout(() => {
        show.value = !collapse
      }, 400)
    } else {
      show.value = !collapse
    }
  }
)

watch(
  () => layout.value,
  (layout) => {
    if (layout === 'top' || layout === 'cutMenu') show.value = true
    else show.value = !unref(collapse)
  }
)
</script>

<template>
  <router-link
    class="flex !h-[var(--logo-height)] items-center cursor-pointer pl-8px relative dark:bg-[var(--el-bg-color)]"
    :class="[prefixCls, layout !== 'classic' ? `${prefixCls}__Top` : '']"
    to="/"
  >
    <img
      :src="appStore.logoImg"
      class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
      alt=""
    />
    <div
      v-if="show"
      class="ml-10px text-16px font-700"
      :class="[
        {
          'text-[var(--logo-title-text-color)]': layout === 'classic',
          'text-[var(--top-header-text-color)]':
            layout === 'topLeft' || layout === 'top' || layout === 'cutMenu'
        }
      ]"
    >
      {{ title }}
    </div>
  </router-link>
</template>
