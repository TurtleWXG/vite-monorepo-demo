<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  itemNum: {
    type: Number,
    default: 6,
  },
})

const activeIndex = ref(0)
const items = ref<number[]>([])

// 初始化项目数组
watch(
  () => props.itemNum,
  (val) => {
    items.value = Array.from({ length: val }, (_, i) => i)
  },
  { immediate: true },
)

function arrangeArc() {
  const container = document.getElementById('container')
  if (!container) return

  const children = Array.from(container.children) as HTMLElement[]
  const totalItems = children.length

  // 参数配置
  const radius = 200 // 弧线半径
  const totalAngle = 160 // 总角度（建议160度更自然）
  const centerOffset = -80 // 垂直偏移

  children.forEach((item, index) => {
    if (index === activeIndex.value) {
      // 当前选中项居中
      item.style.transform = `translate(-50%, calc(-50% + ${centerOffset}px)) scale(1.8)`
      item.style.zIndex = '10'
    } else {
      // 其他项弧形排列
      const positionIndex = index < activeIndex.value ? index : index - 1
      const angle = (totalAngle / (totalItems - 2)) * positionIndex - totalAngle / 2
      const radian = (angle * Math.PI) / 180

      const x = Math.sin(radian) * radius
      const y = Math.cos(radian) * radius + centerOffset

      item.style.transform = `translate(
        calc(-50% + ${x}px), 
        calc(-50% + ${y}px)
      )  scale(1)`
      item.style.zIndex = '1'
    }
  })
}

function handleItemClick(index: number) {
  if (index !== activeIndex.value) {
    activeIndex.value = index
    arrangeArc()
  }
}

onMounted(() => {
  arrangeArc()
  window.addEventListener('resize', arrangeArc)
})
</script>

<template>
  <div class="arc-container" id="container">
    <div
      v-for="(n, index) in items"
      :key="n"
      class="item"
      :class="{ active: index === activeIndex }"
      @click="handleItemClick(index)"
    >
      {{ n + 1 }}
    </div>
  </div>
</template>

<style scoped>
.arc-container {
  position: relative;
  width: 500px;
  height: 350px;
  background: #f0f0f0;
  margin: 0 auto;
}

.item {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #4ecdc4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  left: 50%;
  top: 50%;
  transition:
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.3s ease;
  will-change: transform;
}

.item.active {
  background: #ff6b6b;
  /* transform: translate(-50%, -50%) scale(1.6); */
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3));
}

/* .item:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
} */
</style>
