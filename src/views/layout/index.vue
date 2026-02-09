<template>
  <div class="h-screen">
    <Header class="h-(--header-height)" />
    <div class="h-(--main-height)">
      <Main />
    </div>
    <Floating />
  </div>
</template>

<script setup>
import Header from './components/header/index.vue'
import Floating from './components/floating/index.vue'
import Main from './components/main.vue'
</script>

<style lang="scss" scoped></style>
