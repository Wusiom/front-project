<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <header-vue />
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="handleSubmit">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="loginForm.username"
        ></vee-field>
        <vee-error-message
          name="username"
          class="text-sm text-red-600 block mt-0.5 text-left"
        ></vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="loginForm.password"
        ></vee-field>
        <vee-error-message
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left"
        ></vee-error-message>
        <div class="pt-1 pb-3 leading-0 text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            注册
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          @click="onLoginHandler"
          :loading="loading"
          :isActiveAnim="false"
          >登录</m-button
        >
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon name="qq" class="w-4 cursor-pointer"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon name="wexin" class="w-4 cursor-pointer"></m-svg-icon>
      </div>
    </div>
    <!-- 人类行为验证模块 -->
    <slider-captcha-vue
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import SliderCaptchaVue from './slider-captcha.vue'
import { ref } from 'vue'
import useSession from '@/store/session'
import { useRouter } from 'vue-router'
const session = useSession()
const router = useRouter()
const handleSubmit = (values) => {
  console.log(values)
}

const isSliderCaptchaVisible = ref(false)

const onToRegister = () => {
  session.changeRouterType('push')
  router.push('/register')
}

const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}
// 人类行为通过
const onCaptchaSuccess = async () => {
  isSliderCaptchaVisible.value = true
  onLogin()
}

const loading = ref(false)
const onLogin = async () => {
  loading.value = true
  try {
    await session.login({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  session.changeRouterType('push')
  router.push('/')
}
const loginForm = ref({
  username: '',
  password: ''
})
</script>

<style lang="scss" scoped></style>
