<template>
  <div id="body" @click="PiPStart">
    <RiPauseCircleLine id="pause" :style="{ display: isCountdown ? 'none' : 'block' }" />
    <div id="container">
      <div class="countdown mono" id="countdown1">
        {{ result }}
      </div>
      <div
        class="countdown mono"
        id="countdown2"
        :style="{ clipPath: `inset(0 0 ${PiPProgress}% 0)` }"
      >
        {{ result }}
      </div>
    </div>
    <div id="todo-name">
      {{ displayContent }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, inject } from 'vue'
import { RiPauseCircleLine } from '@/assets/icons'
import { displayContent } from '@/store/displayContent'
const isCountdown = inject('isCountdown')
const remain = inject('remain')
const duration = inject('duration')
const PiPWindow = inject('PiPWindow')

const result = computed(() => {
  const time = remain.value || duration.value
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
const PiPProgress = computed(() => {
  if (!duration.value) return 100
  return Math.max(0, Math.min(100, (remain.value / duration.value) * 100))
})

function PiPStart() {
  if (isCountdown) return
  else console.log('PiP to control Pomodoro, please stand by.')
}

onMounted(() => {
  if (PiPWindow) {
    const setStyleVars = () => {
      const styles = getComputedStyle(document.documentElement)
      const vars = ['--bgc2', '--font1', '--font2', '--theme1', '--theme3']
      vars.forEach((varName) => {
        const value = styles.getPropertyValue(varName).trim()
        if (value) {
          PiPWindow.document.documentElement.style.setProperty(varName, value)
        }
      })
    }
    setStyleVars()
    const observer = new MutationObserver(() => {
      setStyleVars()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    const handleClose = () => {
      observer.disconnect()
    }
    PiPWindow.addEventListener('pagehide', handleClose)
    onUnmounted(() => {
      observer.disconnect()
      PiPWindow.removeEventListener('pagehide', handleClose)
    })
  }
})
</script>
