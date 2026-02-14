<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-2 guide-home"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png
"
        alt=""
        @click="onToHome"
      />
      <HeaderSearch class="mr-1" />
      <HeaderTheme class="mr-1" />
      <HeaderMy />
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'
import { useRouter } from 'vue-router'
import useSession from '@/store/session'
const session = useSession()
const router = useRouter()
const onToHome = () => {
  session.changeRouterType('push')
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
