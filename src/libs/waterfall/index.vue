<template>
  <div>
    <div
      class="relative"
      ref="containerTarget"
      :style="{ height: containerHeight + 'px' }"
    >
      <!-- 根据列数计算列宽，有了数据之后进行渲染（需在 DOM 中以便测量高度） -->
      <template v-if="columnWidth && data.length">
        <!-- 通过动态的style来计算对应的列宽、left、top，_style 未计算完成时透明隐藏避免左上角堆叠 -->
        <div
          class="m-waterfall-item absolute duration-300"
          :style="{
            width: columnWidth + 'px',
            left: item._style?.left + 'px',
            top: item._style?.top + 'px',
            opacity: item._style ? 1 : 0
          }"
          v-for="(item, index) in data"
          :key="nodeKey ? item[nodeKey] : index"
        >
          <slot :item="item" :width="columnWidth" :index="index"></slot>
        </div>
      </template>
      <div v-else>加载中</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import {
  getAllImg,
  onCompleteImgs,
  getImgElements,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  // 标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
// 每一行在高度最小的开始
// 容器高度
const containerHeight = ref(0)
// 每列高度的容器
const columnHeightObj = ref({})
// 构建记录各列的高度的对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度（不含 padding\margin\border）
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)

// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseInt(paddingLeft)
  // 容器总宽度
  containerWidth.value =
    containerTarget.value.clientWidth -
    parseInt(paddingLeft) -
    parseInt(paddingRight)
}

// 计算列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return props.columnSpacing * (props.column - 1)
})
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
// 渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    increaseColumnHeight(index)
  })
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
  // 最小高度所在的列 * (列宽 + 间距)
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

/**
 * 返回下一个 item 的 top
 */
const getItemTop = () => {
  // 列高对象中的最小的高度
  return getMinHeight(columnHeightObj.value)
}

// 指定列高度自增
const increaseColumnHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 最小高度所在的列的高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

onMounted(() => {
  useColumnWidth()
})

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 图片高度未知
let itemHeights = []
// 监听图片加载完成
const waitImgComplete = () => {
  itemHeights = []
  let itemElements = [...document.querySelectorAll('.m-waterfall-item')]
  //获取所有元素的img标签
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  onCompleteImgs(allImgs).then(() => {
    // 图片加载完成之后，获取图片的高度
    itemElements.forEach((itemElement) => {
      itemHeights.push(itemElement.clientHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

// 不需要图片预读取，图片高度已知
const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...document.querySelectorAll('.m-waterfall-item')]
  itemElements.forEach((itemElement) => {
    itemHeights.push(itemElement.clientHeight)
  })
  useItemLocation()
}

// 监听触发对应的钩子
watch(
  () => props.data,
  (val) => {
    const resetColumnHeight = val.every((item) => !item._style)
    if (resetColumnHeight) {
      useColumnHeightObj()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        console.log('waitImgComplete')
        waitImgComplete()
      } else {
        console.log('useItemHeight')
        useItemHeight()
      }
    })
  },
  { immediate: true, deep: true }
)
const reset = () => {
  setTimeout(() => {
    useColumnWidth()
    // 重置所有的定位数据，因为data进行深度监听，所以会触发data的watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      // 在图片预读取的情况下，需要为列宽滞空，滞空后会重新渲染
      columnWidth.value = 0
      nextTick(reset)
    } else {
      reset()
    }
  }
)
</script>

<style lang="scss" scoped></style>
