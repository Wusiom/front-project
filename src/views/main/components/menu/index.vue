<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-zinc-900 text-xl font-bold mb-2 px-1 dark:text-zinc-200">
      所有分类
    </h2>
    <ul class="overflow-y-auto">
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        class="px-1 py-1.5 text-lg text-zinc-900 duration-100 active:bg-zinc-100 dark:text-zinc-300 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categorys: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['onItemClick'])
</script>

<style lang="scss" scoped></style>
