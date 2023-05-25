import { onMounted, onUnmounted, ref } from 'vue'
import throttle from './throttle'
export default function useScroll(elRef?: any) {
    let el = window
    const isReachBottom = ref<boolean>(false)
    const clientHeight = ref<number>(0)
    const scrollTop = ref<number>(0)
    const scrollHeight = ref<number>(0)

    const scrollListenerHandler: any = throttle(() => {
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollHeight.value = document.documentElement.scrollHeight
            scrollTop.value = document.documentElement.scrollTop
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }
        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            // homeStore.fetchHouselistData()
            isReachBottom.value = !isReachBottom.value
        }
    }, 800)
    onMounted(() => {
        if (elRef) {
            el = elRef.value
        }
        el.addEventListener("scroll", scrollListenerHandler)
    })
    onUnmounted(() => {
        el.removeEventListener("scroll", scrollListenerHandler)
    })
    return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}