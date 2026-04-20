<template>
  <footer class="mono">
    <time :datetime="time.timestamp">
      {{ time.year }}-{{ pad(time.month) }}-{{ pad(time.date) }}&nbsp;{{ time.day }}&nbsp;
    </time>
    <time :datetime="time.timestamp">
      <span>{{ time.hour }}</span>
      <span class="colon" :style="{ opacity: time.blink ? 0.1 : 0.9 }">:</span>
      <span>{{ time.minute }}</span>
      <span class="colon" :style="{ opacity: time.blink ? 0.1 : 0.9 }">:</span>
      <span>{{ time.second }}</span>
    </time>
  </footer>
</template>

<script setup>
const props = defineProps({
  time: {
    type: Object,
    required: true,
  },
})

const pad = (n) => String(n).padStart(2, '0')
</script>

<style scoped>
footer {
  grid-area: footer;
  text-align: center;
}
.colon {
  transition: opacity 0.1s;
  text-shadow: 0 0 2px currentColor;
}
</style>
