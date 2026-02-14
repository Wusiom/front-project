<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      @click="onToPinsClick"
    >
      <img
        ref="imgTarget"
        v-lazy
        :src="data.photo"
        alt="photo"
        class="w-full rounded bg-transparent"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px',
          backgroundColor: randomRGB()
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <m-button @click="onShareClick" class="absolute top-1.5 left-1.5"
          >分享</m-button
        >
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullscreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p
      class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1"
    >
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy :src="data.avatar" alt="" class="w-2 h-4 rounded-full" />
      <span class="text-xs text-zinc-900 dark:text-zinc-300 ml-1">{{
        data.author
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useFullscreen, useElementBounding } from '@vueuse/core'
import { computed, ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['click'])
const onDownload = () => {
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photo)
  }, 100)
}
const imgTarget = ref(null)
const { enter: onImgFullscreen } = useFullscreen(imgTarget)

// 记录图片中心点 x|y位置 + 图片宽度|高度的一半
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgTarget)
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})

/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emit('click', {
    id: props.data.id,
    localtion: imgContainerCenter.value
  })
}

const onShareClick = () => {
  weiboShare(
    props.data.photo,
    `https://imooc-front.lgdsunday.club/pins/${props.data.id}`
  )
}
</script>

<style lang="scss" scoped></style>
