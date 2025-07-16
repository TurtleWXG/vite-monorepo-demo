<script setup lang="ts">
import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { AnyObject } from '@gx-web/tool'

defineOptions({
  name: 'InnerLink'
})

function paramsToStr(params: AnyObject, isPrefix = false) {
  /** 对象组装成为字符串键值对数组 (key=value)[] */
  const keyValuePair = Object.entries(params).reduce<string[]>((acc, cur) => {
    acc.push(`${cur[0]}=${cur[1]}`)
    return acc
  }, [])
  return `${isPrefix ? '?' : ''}${keyValuePair.join('&')}`
}

const route = useRoute()

/** 跳转第三方url */
const url = computed(() => `${route.name as string}${paramsToStr(unref(params), true)}`)

/** 根据配置判断是否需要带参数跳转 */
const params = computed(() => {
  const props = (route.meta?.props || '') as string
  if (props) {
    return getSessionData(JSON.parse(props))
  } else {
    return {}
  }
})

/** 根据参数读取 session 内缓存 */
const getSessionData = (props: AnyObject<string>) => {
  return Object.entries(props).reduce<AnyObject>((acc, [key, value]) => {
    const findKeys = value.split('.')
    const sessionStr = sessionStorage.getItem(findKeys[0])
    if (sessionStr) {
      const session = JSON.parse(sessionStr)
      acc[key] = findKeys.slice(1).reduce((acc, cur) => {
        acc = session?.[cur] || undefined
        return acc
      }, '')
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}

// TODO: 待完善高度处理
const height = `${document.documentElement.clientHeight - 175}px`

const style = { height }
</script>

<template>
  <div :style="style">
    <iframe :src="url" frameborder="no" style="width: 100%; height: 100%" scrolling="auto"></iframe>
  </div>
</template>
