<template>
  <div>
    <m-infinite-list
      v-model="isLoading"
      :is-finished="isFinished"
      @on-load="getPexelsData"
    >
      <m-waterfall
        :data="pexelsList"
        :column="isMobileTerminal ? 2 : 5"
        :column-spacing="20"
        :row-spacing="20"
        :picture-pre-reading="true"
        class="px-1 w-full"
      >
        <template v-slot="{ item, width, index }">
          <item
            :data="item"
            :width="width"
            :index="index"
            @click="onToPins(item)"
          />
        </template>
      </m-waterfall>
    </m-infinite-list>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
import Item from './item.vue'
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import useSessionStore from '@/store/session'
import Pins from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
const sessionStore = useSessionStore()
const pexelsList = ref([])

let query = {
  page: 1,
  size: 15
}

const isLoading = ref(false)
const isFinished = ref(false)

const getPexelsData = async () => {
  if (isFinished.value) return
  isLoading.value = true
  // 完成第一次请求之后，后续请求需要累加页码
  if (pexelsList.value.length) {
    query.page++
  }
  const res = await getPexelsList(query)
  pexelsList.value = [...pexelsList.value, ...res.list]
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  isLoading.value = false
}
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  pexelsList.value = []
  isFinished.value = false
}

watch(
  () => sessionStore.currentCategory,
  (newVal) => {
    resetQuery({ page: 1, categoryId: newVal.id })
  }
)
watch(
  () => sessionStore.searchText,
  (newVal) => {
    resetQuery({ page: 1, searchText: newVal })
  }
)

// 控制pins展示
const isVisiblePins = ref(false)
const currentPins = ref({})
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    onComplete: done
  })
}

useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
</script>

<style lang="scss" scoped></style>
