<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 px-1">
    <navigation />
    <div class="max-w-7xl mx-auto relative mt-1 mb-1 xl:mt-4">
      <list />
    </div>
  </div>
</template>

<script setup>
import Navigation from './components/navigation/index.vue'
import List from './components/list/index.vue'
</script>

<style lang="scss" scoped></style>
