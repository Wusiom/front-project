<template>
  <!-- 头部图标：PC端 -->
  <div class="hidden pt-5 h-8 xl:block">
    <img
      v-lazy
      src="https://res.lgdsunday.club/signlogo.png"
      alt=""
      class="m-auto"
    />
  </div>
  <div class="h-[111px] xl:hidden">
    <img
      v-lazy
      src="https://res.lgdsunday.club/login-bg.png"
      alt=""
      class="dark:hidden"
    />
    <img
      v-lazy
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      alt=""
      srcset=""
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
