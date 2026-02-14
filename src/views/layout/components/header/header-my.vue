<template>
  <m-popover>
    <template #reference>
      <div
        v-if="session.userInfo._id"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="`${session.userInfo.avatar}`"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          v-if="session.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>
    <template v-if="session.token" #default>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
          @click="onItemClick(item.path)"
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
    </template>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useSession from '@/store/session'
import { confirm } from '@/libs'
const session = useSession()
const router = useRouter()
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
const onToLogin = () => {
  session.changeRouterType('push')
  router.push('/login')
}
const onItemClick = (path) => {
  if (path) {
    session.changeRouterType('push')
    router.push(path)
  } else {
    confirm('确定退出登录吗？').then(() => {
      session.logout()
    })
  }
}
</script>

<style lang="scss" scoped></style>
