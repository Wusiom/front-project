import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
// 判断当前是否为移动设备
export const isMobileTerminal = computed(() => {
  // 方式1：
  console.log(navigator.userAgent, 'navigator.userAgent');
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  // return width.value < PC_DEVICE_WIDTH
})

// 初始化rem基准值，最大为 40px
export const useRem = () => {
  // 定义最大的fontsize
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    // 获取根元素 fontSize 标准，屏幕宽度/10
    let fontSize = window.innerWidth / 10
    console.log(fontSize, 'fontSize')
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}