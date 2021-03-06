import { onMounted, onUnmounted, ref, Ref } from 'vue'
export default function useClickOutside(el: Ref<HTMLElement | null>): Ref<boolean> {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (el.value && el.value.contains(e.target as HTMLElement)) {
      isClickOutside.value = false
    } else {
      isClickOutside.value = true
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
