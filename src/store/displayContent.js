import { computed, ref } from 'vue'
import { activeTodo } from './todo'
import emojis from '@/assets/json/emojis.json'

export const tip = ref(true)
export const displayContent = computed(() => {
  if (activeTodo.value) {
    tip.value = false
    return activeTodo.value.name
  } else if (tip.value) {
    return 'Select one todo to start.'
  } else {
    return pick(emojis)
  }
})
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
