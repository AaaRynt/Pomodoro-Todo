<template>
<!-- <pre style="position: absolute; background: #444; opacity: 0.5; color: #fff; font-family: Consolas;">
tip: {{ tip }}
mode: {{ mode }}
isCountdown: {{ isCountdown }}
hasStarted: {{ hasStarted }}
pomodoroCount: {{ pomodoroCount }}
duration:{{ duration }}
remain: {{ remain }}
{{ pomodoroCount }}/{{ setting.interval }}
endAt: {{ endAt }}
lastTickAt: {{ lastTickAt }}
{{ activeTodo }}
{{ setting }}
progress:{{ progress.toFixed(2) }}
timer: {{ timer }}
countdownTimer: {{ countdownTimer }}
</pre> -->
  <div id="body">
    <div id="Pomodoro">
      <div id="current" :style="{ fontSize: activeTodo?.name || tip ? '1.5rem' : '3rem' }">
        {{ displayContent }}
      </div>
      <div id="box">
        <div
          id="countClock"
          :style="{
            background: `conic-gradient(var(--theme3) 0% ${progress}%,var(--theme1) ${progress}% 100%)`,
          }"
        >
          <div
            id="pomodoroClock"
            :style="{
              background:
                mode === 'long'
                  ? 'var(--theme2)'
                  : `conic-gradient(var(--theme2) 0% ${((pomodoroCount % setting.interval) * 100) / setting.interval}%,var(--bgc3) ${((pomodoroCount % setting.interval) * 100) / setting.interval}% 100%)`,
            }"
          >
            <div id="countdown" class="mono">{{ result }}</div>
          </div>
        </div>
      </div>
      <div class="button-control">
        <button
          type="button"
          :style="{
            display: isCountdown ? 'none' : 'flex',
            disabled: !activeTodo?.name && mode === 'pomodoro',
          }"
          @click="Start"
          :disabled="!activeTodo?.name && mode === 'pomodoro'"
        >
          <RiPlayLine />{{ mode === 'pomodoro' ? 'START' : 'RELAX' }}
        </button>
        <button
          type="button"
          :style="{ display: isCountdown || remain === duration ? 'none' : 'flex' }"
          @click="Again"
        >
          <RiRestartLine />Again
        </button>
        <button type="button" :style="{ display: isCountdown ? 'flex' : 'none' }" @click="Pause">
          <RiPauseLine />Pause
        </button>
        <button type="button" :style="{ display: isCountdown ? 'flex' : 'none' }" @click="Finish">
          <RiForwardEndLine />Finish
        </button>
      </div>
    </div>

    <nav>
      <RouterLink class="control" to="/chart">
        <RiFileChartLine />
        &nbspChart
      </RouterLink>
      <RouterLink class="control" to="/todos">
        <RiTodoLine />
        &nbspTo-Do
      </RouterLink>
      <RouterLink class="control" to="/setting">
        <RiSettings3Line />
        &nbspSetting
      </RouterLink>
    </nav>

    <section>
      <RouterView />
    </section>

    <footer class="mono">
      <time :datetime="time.timestamp"
        >{{ time.year }}-{{ time.month.toString().padStart(2, '0') }}-{{
          time.date.toString().padStart(2, '0')
        }}&nbsp{{ time.day }}&nbsp</time
      >
      <time :datetime="time.timestamp">
        <span>{{ time.hour }}</span>
        <span class="colon" :style="{ opacity: time.blink ? 0.1 : 0.9 }">:</span>
        <span>{{ time.minute }}</span>
        <span class="colon" :style="{ opacity: time.blink ? 0.1 : 0.9 }">:</span>
        <span>{{ time.second }}</span>
      </time>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, computed, watch } from 'vue'
import { setting } from '@/store/setting'
import {
  todos,
  completedTodos,
  activeTodo,
  pomodoroTotal,
  focusTotal,
  breakTotal,
  earlyCompletions,
} from '@/store/todo'
import { getTimeInfo } from '@/utils/getTimeInfo'
import pomodoroMp3 from '@/assets/audio/pencil_check_mark_1-88805.mp3'
import shortMp3 from '@/assets/audio/ding-126626.mp3'
import longMp3 from '@/assets/audio/ding-47489.mp3'
import {
  RiFileChartLine,
  RiForwardEndLine,
  RiPauseLine,
  RiPlayLine,
  RiRestartLine,
  RiSettings3Line,
  RiTodoLine,
} from '@/assets/icons'
import emojis from '@/assets/json/emojis.json'
import quotes from '@/assets/json/quotes.json'

const tip = ref(true)
const mode = ref('pomodoro') // ...pomodoro | short | long |...
const isCountdown = ref(false)
const hasStarted = ref(false)
const pomodoroCount = ref(0)
const duration = ref(0)
const remain = ref(0)
const endAt = ref(0)
const lastTickAt = ref(0)
const time = reactive({
  timestamp: 0,
  year: '1970',
  month: '00',
  date: '00',
  day: 'Thu',
  hour: '00',
  minute: '00',
  second: '00',
  blink: true,
})
const sounds = {
  pomodoro: new Audio(pomodoroMp3),
  short: new Audio(shortMp3),
  long: new Audio(longMp3),
}
let timer = null
let countdownTimer = null

const displayContent = computed(() => {
  if (activeTodo.value) {
    tip.value = false
    return activeTodo.value.name
  } else if (tip.value) {
    return 'Select one todo to start.'
  } else {
    return pick(emojis)
  }
})
const result = computed(() => {
  const min = Math.floor(remain.value / 60)
    .toString()
    .padStart(2, '0')
  const sec = (remain.value % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
})
const progress = computed(() => {
  if (duration.value === 0) return 0
  if (!hasStarted.value) return 100
  else return (remain.value / duration.value) * 100
})

onMounted(() => {
  duration.value = setting.pomodoro * 60
  remain.value = duration.value
  updateTime()
  timer = setInterval(updateTime, 1000)
  if (!('Notification' in window) || !setting.notify) return
  if (Notification.permission === 'granted') {
    notify('🍅📝', 'Before you start Pomodoro, please select one To-Do!')
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        notify('🍅📝', 'Before you start Pomodoro, please select one To-Do!')
      }
    })
  }
})
onUnmounted(() => {
  clearInterval(timer)
  clearInterval(countdownTimer)
})
watch(
  () => [mode.value, setting.pomodoro, setting.short, setting.long],
  () => {
    if (hasStarted.value) return
    const map = {
      pomodoro: setting.pomodoro,
      short: setting.short,
      long: setting.long,
    }
    duration.value = map[mode.value] * 60
    remain.value = duration.value
  },
)
watch(todos, () => {
  if (activeTodo.value && !todos.value.some((t) => t.addTime === activeTodo.value.addTime)) {
    activeTodo.value = null
    Pause()
    hasStarted.value = false
    duration.value = setting.pomodoro * 60
    remain.value = duration.value
  }
})

// Timing implementation Remaining time is calculated using Date.now() and a target timestamp, rather than decrementing via setInterval(() => { remain.value--; }, 1000);. This fundamentally avoids inaccuracies caused by browser browser background throttling(Timer Throttling)."../README.md"
function Start() {
  if ((!activeTodo.value?.name && mode.value === 'pomodoro') || isCountdown.value) return
  isCountdown.value = true
  hasStarted.value = true

  lastTickAt.value = Date.now()
  endAt.value = lastTickAt.value + duration.value * 1000
  countdownTimer = setInterval(() => {
    const now = Date.now()
    const diff = Math.max(0, Math.floor((endAt.value - now) / 1000))
    remain.value = diff
    const delta = Math.floor((now - lastTickAt.value) / 1000)
    if (delta > 0) {
      if (mode.value === 'pomodoro') {
        focusTotal.value += delta
      } else {
        breakTotal.value += delta
      }
      lastTickAt.value += delta * 1000
    }
    if (diff === 0) {
      Pause()
      hasStarted.value = false
      if (mode.value === 'pomodoro') pomodoroTotal.value++
      handleFinish()
    }
  }, 250)

  unlockSound()
}
function Again() {
  Pause()
  hasStarted.value = false
  switch (mode.value) {
    case 'pomodoro':
      duration.value = setting.pomodoro * 60
      break
    case 'short':
      duration.value = setting.short * 60
      break
    case 'long':
      duration.value = setting.long * 60
      break
  }
  remain.value = duration.value
}
function Pause() {
  clearInterval(countdownTimer)
  isCountdown.value = false
  lastTickAt.value = 0
}
function Finish() {
  Pause()
  hasStarted.value = false
  remain.value = 0
  earlyCompletions.value++
  if (mode.value === 'pomodoro') pomodoroTotal.value++
  handleFinish()
}
function handleFinish() {
  if (mode.value === 'pomodoro') {
    const info = getTimeInfo()
    activeTodo.value.doneTime = info.timestamp
    activeTodo.value.doneAt = `${info.month}/${info.date} ${info.hour}:${info.minute}`
    completedTodos.value.push({ ...activeTodo.value })
    todos.value = todos.value.filter((todo) => !todo.doneTime)
    playSound(sounds.pomodoro)
    activeTodo.value = null
    pomodoroCount.value++
    if (pomodoroCount.value % setting.interval === 0) {
      duration.value = setting.long * 60
      mode.value = 'long'
      notify('🛏️ Long Break', pick(quotes.long))
    } else {
      duration.value = setting.short * 60
      mode.value = 'short'
      notify('☕ Short Break', pick(quotes.short))
    }
  } else {
    if (mode.value === 'short') playSound(sounds.short)
    else playSound(sounds.long)
    duration.value = setting.pomodoro * 60
    mode.value = 'pomodoro'
    notify('🍅 Pomodoro', pick(quotes.pomodoro))
  }
  remain.value = duration.value
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function updateTime() {
  Object.assign(time, getTimeInfo())
  time.blink = !time.blink
}
function playSound(audio) {
  if (!setting.sound) return
  audio.currentTime = 0
  audio.play()
}
function notify(title, body) {
  if (!setting.notify) return
  new Notification(title, { body })
}
function unlockSound() {
  Object.values(sounds).forEach((sound) => {
    sound.muted = true
    sound
      .play()
      .then(() => {
        sound.pause()
        sound.currentTime = 0
        sound.muted = false
      })
      .catch(() => {})
  })
}
</script>

<style scoped>
#body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 2fr 3fr;
  grid-template-areas:
    'Pomodoro nav'
    'Pomodoro section'
    'footer footer';
  height: 100%;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--bgc1);
  font-family: 'Delius', cursive;
  color: var(--font1);
}
#Pomodoro {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: Pomodoro;
  margin-right: 1rem;
  padding: 1rem;
  background-color: var(--bgc2);
  border: solid 2px var(--bgc3);
  border-radius: 1rem;
}
#current {
  overflow: inherit;
  width: 100%;
  height: 2rem;
  text-align: center;
  word-break: break-word;
  white-space: normal;
}
#box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  width: 100%;
  padding: 0.5rem 0;
}
#countClock {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 50%;
}
#pomodoroClock {
  container-type: inline-size;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 95%;
  border-radius: 50%;
}
#countdown {
  user-select: none;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 97%;
  background-color: var(--bgc3);
  border-radius: 50%;
  font-size: clamp(1rem, 20cqw, 4rem);
  font-family: Consolas, 'Courier New', monospace;
  font-weight: 900;
  color: var(--theme1);
}
#Pomodoro button {
  width: 6rem;
  padding: 0.4rem 0;
  transition: background-color 0.2s;
  border: none;
  font-size: 1.2rem;
  font-weight: 900;
}
#Pomodoro button:disabled {
  background-color: var(--theme2);
  cursor: not-allowed;
}
#Pomodoro button:hover {
  background-color: var(--theme2);
}

nav {
  display: flex;
  grid-area: nav;
  padding: 0.2rem;
  background-color: var(--bgc2);
  border: solid 2px var(--bgc3);
  border-radius: 0.6rem;
  font-family: 'Aldrich', sans-serif;
}
.control {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  padding: 0.2rem 0;
  border-radius: 0.4rem;
  color: var(--font1);
  text-decoration: none;
}
.control:hover {
  color: var(--theme2);
}
.control.router-link-exact-active {
  background-color: var(--bgc3);
  color: var(--theme1);
}

section {
  grid-area: section;
  min-height: 0;
  margin-top: 0.5rem;
  border: solid 2px var(--bgc3);
  border-width: 2px;
  border-radius: 1rem;
}

footer {
  grid-area: footer;
  text-align: center;
}
.colon {
  transition: opacity 0.1s;
  text-shadow: 0 0 2px currentColor;
}
</style>
