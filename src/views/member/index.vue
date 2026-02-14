<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-=800 duration-400 xl:pt-1">
    <div
      class="max-w-5xl mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4"
    >
      <!-- 移动端navbar处理 -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
        精选会员
      </m-navbar>
      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选会员
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP,畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item-vue
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay(item)"
          />
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
      </div>
      <payment-vue />
    </div>
  </div>
</template>
<script>
export default {
  name: 'member'
}
</script>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import useSession from '@/store/session'
import { getVipPayList } from '@/api/pay'
import PayMenuItemVue from './components/pay-menu-item.vue'
import PaymentVue from './components/payment/index.vue'
// 列表数据
const vipPayListData = ref([])
const getVipPayListData = async () => {
  const res = await getVipPayList()
  vipPayListData.value = res
  currentPayData.value = vipPayListData.value[0]
}
getVipPayListData()

// navbar 处理
const session = useSession()
const router = useRouter()
const onNavbarLeftClick = () => {
  session.changeRouterType('back')
  router.back()
}

// 选中支付项
const currentPayData = ref({})
const onChangeCurrentPay = (item) => {
  currentPayData.value = item
}
</script>

<style lang="scss" scoped></style>
