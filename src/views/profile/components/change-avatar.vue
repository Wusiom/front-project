<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      @click="onConfirmClick"
    >
      确定
    </m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted } from 'vue'
import { message } from '@/libs'
import useSession from '@/store/session'
import COS from 'cos-js-sdk-v5'
import { putProfile } from '@/api/sys'
const session = useSession()

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE])

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * 确定按钮点击事件
 */
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    console.log(URL.createObjectURL(blob))
    putObjectToOSS(blob)
  })
}

/**
 * 进行 OSS 上传
 */
let ossClient = null

const putObjectToOSS = (e) => {
  if (!e) return
  // 使用环境变量，勿将密钥提交到仓库（在 .env.local 中配置）
  const secretId = import.meta.env.VITE_COS_SECRET_ID
  const secretKey = import.meta.env.VITE_COS_SECRET_KEY
  if (!secretId || !secretKey) {
    message(
      'error',
      '未配置 COS 密钥，请在 .env.local 中设置 VITE_COS_SECRET_ID 和 VITE_COS_SECRET_KEY'
    )
    return
  }
  if (!ossClient) {
    ossClient = new COS({
      SecretId: secretId,
      SecretKey: secretKey
    })
  }
  const fileTypeArr = e.type.split('/')
  const fileName = `${session.userInfo.username}/${Date.now()}.${
    fileTypeArr[fileTypeArr.length - 1]
  }`
  try {
    // 调用上传方法
    ossClient.uploadFile(
      {
        Bucket: 'wusion-front-1313850298',
        Region: 'ap-guangzhou',
        Key: `images/${fileName}`,
        Body: e
      },
      async (err, data) => {
        err ? console.error('上传失败', err) : console.log('上传成功', data)
        onChangeProfile(data.Location)
      }
    )
  } catch (e) {
    message('error', e)
  }
}

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  const img = 'https://' + avatar
  // 更新本地数据
  session.userInfo = {
    ...session.userInfo,
    avatar: img
  }
  // 更新服务器数据
  await putProfile(session.userInfo)
  // 通知用户
  message('success', '用户头像修改成功')
  // 关闭 loading
  loading.value = false
  // 关闭 dialog
  close()
}

/**
 * 关闭事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
