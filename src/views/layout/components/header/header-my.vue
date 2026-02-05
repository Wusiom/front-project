<template>
  <m-popover>
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <!-- <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg'"
        /> -->
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
const menuArr = [
  {
    id: '0',
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: '1',
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: '2',
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<style lang="scss" scoped></style>
