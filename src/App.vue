<script setup>
import useSession from '@/store/session'
const session = useSession()
</script>

<template>
  <!-- 一级路由 出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      :routerType="session.getRouterType"
      :mainComponentName="home"
    />
  </div>
</template>
