import { useIntersectionObserver } from "@vueuse/core";
export default {
  mounted(el) {
    // 拿到当前src
    const imgSrc = el.src
    el.src = ''
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })

  }
}