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
        :picture-pre-reading="false"
        class="px-1 w-full"
      >
        <template v-slot="{ item, width, index }">
          <item :data="item" :width="width" :index="index" />
        </template>
      </m-waterfall>
    </m-infinite-list>
  </div>
</template>

<script setup>
import Item from './item.vue'
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
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
</script>

<style lang="scss" scoped></style>
