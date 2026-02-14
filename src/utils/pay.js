import { getAliPay } from '@/api/pay'
import { isMobileTerminal } from '@/utils/flexible'

export const alipay = async (title, desc) => {
  // encode 的支付地址
  const { encodeURI } = await getAliPay(title, '0.01', desc, isMobileTerminal.value)
  console.log(encodeURI, 'encodeUrl');
  // 解构
  window.location.href = decodeURIComponent(encodeURI)
}