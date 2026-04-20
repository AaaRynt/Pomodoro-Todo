<template>
  <div id="body">
    <button
      id="PiP"
      @click="showPiP"
      :style="{
        cursor: PiPOn ? 'pointer' : 'context-menu',
        color: PiPOn ? 'var(--theme1)' : 'var(--font1)',
      }"
    >
      <RiPictureInPicture2Line :style="{ display: PiPOn ? 'none' : 'block' }" />
      <RiPictureInPictureExitFill :style="{ display: PiPOn ? 'block' : 'none' }" />
    </button>
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
          <RiPlayLine />{{ mode === 'pomodoro' ? 'Start' : 'Relax' }}
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
    <Footer :time="time" />
  </div>
</template>

<script setup>
import { computed, createApp, onMounted, onUnmounted, ref, reactive, watch } from 'vue'
import pomodoroMp3 from '/assets/audios/pencil_check_mark_1-88805.mp3'
import shortMp3 from '/assets/audios/ding-126626.mp3'
import longMp3 from '/assets/audios/ding-47489.mp3'
import {
  RiFileChartLine,
  RiForwardEndLine,
  RiPauseLine,
  RiPictureInPicture2Line,
  RiPictureInPictureExitFill,
  RiPlayLine,
  RiRestartLine,
  RiSettings3Line,
  RiTodoLine,
} from '@/assets/icons'
import quotes from '@/assets/json/quotes.json'
import PiPApp from './pages/PiPApp.vue'
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
import { displayContent, tip, pick } from '@/store/displayContent'
// import { Start, Again, Pause, Finish } from '@/store/pomodoro'
import { getTimeInfo } from '@/utils/getTimeInfo'
import Footer from '@/components/footer.vue'

const PiPOn = ref(false)
const PiPWindow = ref(null)
const PiPApp_Instance = ref(null)
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
  // 清理 PiP 窗口
  if (PiPWindow.value) {
    PiPWindow.value.close()
    PiPWindow.value = null
  }
  if (PiPApp_Instance.value) {
    try {
      PiPApp_Instance.value.unmount()
    } catch (e) {
      console.error('Error unmounting PiPApp:', e)
    }
    PiPApp_Instance.value = null
  }
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

  endAt.value = Date.now() + remain.value * 1000
  if (!hasStarted.value) {
    lastTickAt.value = Date.now()
    hasStarted.value = true
  }

  isCountdown.value = true
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
      lastTickAt.value = 0
      if (mode.value === 'pomodoro') pomodoroTotal.value++
      handleFinish()
    }
  }, 250)

  unlockSound()
}
function Again() {
  Pause()
  hasStarted.value = false
  lastTickAt.value = 0
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
}
function Finish() {
  Pause()
  hasStarted.value = false
  lastTickAt.value = 0
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

// ===|-GENERATE by Claude Haiku 4.5-|===
async function showPiP() {
  if (!('documentPictureInPicture' in window)) {
    alert("Your Browser doesn't support PiP!")
    return
  }
  if (PiPWindow.value) {
    PiPWindow.value.close()
    return
  }

  try {
    const PiPWin = await window.documentPictureInPicture.requestWindow({
      width: 200,
      height: 120,
    })

    PiPWindow.value = PiPWin
    PiPOn.value = true

    const linkElement = PiPWin.document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.href = import.meta.env.BASE_URL + '/css/global.css'
    PiPWin.document.head.appendChild(linkElement)
    const PiPLinkElement = PiPWin.document.createElement('link')
    PiPLinkElement.rel = 'stylesheet'
    PiPLinkElement.href = import.meta.env.BASE_URL + '/css/PiP.css'
    PiPWin.document.head.appendChild(PiPLinkElement)

    const styleElement = PiPWin.document.createElement('style')
    styleElement.textContent = `
      #body {
        background-color: var(--bgc2);
        color: var(--font1);
      }
      #countdown1 {
        color: var(--theme3);
      }
      #countdown2 {
        color: var(--theme1);
      }
    `
    PiPWin.document.head.appendChild(styleElement)
    PiPWin.document.body.style.cssText = `
      margin: 0;
      padding: 0;
      overflow: hidden;
      height:100vh;
    `
    const mountPoint = PiPWin.document.createElement('div')
    mountPoint.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    `
    PiPWin.document.body.appendChild(mountPoint)

    PiPApp_Instance.value = createApp(PiPApp)
    PiPApp_Instance.value.provide('isCountdown', isCountdown)
    PiPApp_Instance.value.provide('remain', remain)
    PiPApp_Instance.value.provide('duration', duration)
    PiPApp_Instance.value.provide('PiPWindow', PiPWin)
    PiPApp_Instance.value.mount(mountPoint)

    const handlePiPClose = () => {
      PiPOn.value = false
      if (PiPApp_Instance.value) {
        try {
          PiPApp_Instance.value.unmount()
        } catch (e) {
          console.error('Error unmounting PiPApp:', e)
        }
        PiPApp_Instance.value = null
      }
      PiPWindow.value = null
      PiPWin.removeEventListener('pagehide', handlePiPClose)
    }
    PiPWin.addEventListener('pagehide', handlePiPClose)
  } catch (error) {
    console.error('Failed to open PiP:', error)
    PiPOn.value = false
    PiPWindow.value = null
    if (PiPApp_Instance.value) {
      try {
        PiPApp_Instance.value.unmount()
      } catch (e) {
        console.error('Error unmounting PiPApp:', e)
      }
      PiPApp_Instance.value = null
    }
  }
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
  position: relative;
}

#PiP {
  position: absolute;
  top: 0.4%;
  left: 0.2%;
  transition:
    color 0.2s,
    filter 0.2s;
}
#PiP:hover {
  filter: brightness(1.25);
}

#Pomodoro {
  box-shadow: #111 0 0 0.4rem;
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
  font-family: Courier;
  font-weight: 900;
  color: var(--theme1);
}
#Pomodoro button {
  width: 6rem;
  padding: 0.4rem 0;
  transition: background-color 0.2s;
  background-color: var(--theme1);
  border: none;
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--bgc2);
}
#Pomodoro button:disabled {
  background-color: var(--theme2);
  cursor: not-allowed;
}
#Pomodoro button:hover {
  background-color: var(--theme2);
}

nav {
  box-shadow: #111 0 0 0.4rem;
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
  box-shadow: #111 0 0 0.4rem;
  grid-area: section;
  min-height: 0;
  margin-top: 0.5rem;
  border: solid 2px var(--bgc3);
  border-width: 2px;
  border-radius: 1rem;
}

@media (max-width: 768px) {
  #body {
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'Pomodoro'
      'section'
      'nav';
    padding: 0;
    background-color: var(--bgc2);
  }
  #Pomodoro,
  nav,
  section {
    box-shadow: none;
    margin: 0;
    border: 0;
  }
  #Pomodoro {
    padding: 0.4rem;
  }
  #current {
    height: 1.5rem;
    text-align: start;
  }
  #countClock {
    width: 60%;
  }
  #PiP,
  footer {
    display: none;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --bgc1: #ddd;
    --bgc2: #fff;
    --bgc3: #eee;
    --font1: #000;
    --font2: #333;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --bgc1: #21252b;
    --bgc2: #282c34;
    --bgc3: #2f343e;
    --font1: #abb2bf;
    --font2: #999;
  }
}
</style>
