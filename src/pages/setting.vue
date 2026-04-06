<template>
  <div id="body">
    <fieldset id="theme">
      <legend>Select the theme <span id="color">COLOR</span></legend>
      <div id="list">
        <div v-for="value in colors" :key="value">
          <input
            type="radio"
            :id="value"
            :value="value"
            v-model="setting.theme"
            :style="{ accentColor: value }"
          />
          <label
            :for="value"
            class="label-select"
            :style="{
              color: value,
              textDecoration: value === setting.theme ? `underline solid ${value}` : `none`
            }"
            >{{ value.charAt(0).toUpperCase() + value.slice(1) }}</label
          >
        </div>
      </div>
      <div class="button-control" style="width: 50%">
        <button type="button" class="mode" id="isDark" @click="setting.isDark = !setting.isDark">
          <div
            id="moon"
            :style="{
              transform:
                setting.isDark ? 'scale(1) translate(30%, -30%)' : 'scale(0) translate(30%, -30%)'
            }"
          ></div>
          <div
            id="sun"
            :style="{ border: setting.isDark ? '2px solid var(--font1)' : '2px solid var(--bgc2)' }"
          ></div>
          <small
            v-for="i in 4"
            :key="i"
            class="sun-ray"
            :style="{ height: setting.isDark ? '0px' : '48px' }"
          ></small>
        </button>
        <button type="button" class="mode" @click="toggleSound">
          <RiVolumeUpFill :style="{ display: setting.sound ? 'block' : 'none' }" />
          <RiVolumeMuteLine :style="{ display: setting.sound ? 'none' : 'block' }" />
        </button>
        <button type="button" class="mode" @click="setting.notify = !setting.notify">
          <RiNotification4Fill :style="{ display: setting.notify ? 'block' : 'none' }" />
          <RiNotificationOffLine :style="{ display: setting.notify ? 'none' : 'block' }" />
        </button>
      </div>
    </fieldset>

    <fieldset id="duration">
      <legend>
        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique#Description" target="_blank"
          >Duration setting</a
        >
      </legend>
      <div class="range_set">
        <label for="pomodoro">Pomodoro</label><span>{{ setting.pomodoro }}&nbspmins</span>
      </div>
      <!-- BUG:input[type="range"].value === 50
			<input type="range" id="pomodoro" step="1" min="10" max="60" v-model.number="setting.pomodoro" /> -->
      <input
        type="range"
        id="pomodoro"
        step="5"
        min="10"
        max="60"
        :value="setting.pomodoro ?? 25"
        @input="setting.pomodoro = Number($event.target.value)"
      />
      <br />
      <div class="range_set">
        <label for="short">Short Break</label><span>{{ setting.short }}&nbspmins</span>
      </div>
      <input
        type="range"
        id="short"
        step="1"
        min="3"
        max="15"
        :value="setting.short ?? 5"
        @input="setting.short = Number($event.target.value)"
      />
      <br />
      <div class="range_set">
        <label for="long">Long Break</label><span>{{ setting.long }}&nbspmins</span>
      </div>
      <input
        type="range"
        id="long"
        step="1"
        min="10"
        max="30"
        :value="setting.long ?? 25"
        @input="setting.long = Number($event.target.value)"
      />
      <br />
      <div class="range_set">
        <label for="interval">Long Break Interval</label
        ><span>Every&nbsp{{ setting.interval }}&nbspdone</span>
      </div>
      <!-- BUG:input[type="range"].value === 50
			<input type="range" id="interval" step="1" min="2" max="6" v-model.number="setting.interval" /> -->
      <input
        type="range"
        id="interval"
        step="1"
        min="2"
        max="6"
        :value="setting.interval ?? 25"
        @input="setting.interval = Number($event.target.value)"
      />
      <br />
    </fieldset>

    <button type="reset" class="page-button" @click="reset">
      <RiRefreshLine />&nbspReset Setting
    </button>
  </div>
</template>

<script setup>
import { setting } from '@/store/setting'
import appearance from '/assets/audios/appearance-effect-6733.mp3'
import {
  RiRefreshLine,
  RiNotification4Fill,
  RiNotificationOffLine,
  RiVolumeMuteLine,
  RiVolumeUpFill
} from '@/assets/icons'

const colors = ['tomato', 'sandybrown', 'seagreen', 'skyblue', 'violet']
const appearanceMp3 = new Audio(appearance)

function toggleSound() {
  if (!setting.sound) {
    appearanceMp3.currentTime = 0
    appearanceMp3.play()
  }
  setting.sound = !setting.sound
}
function reset() {
  const OK = confirm('Are you sure?')
  if (OK) {
    setting.theme = 'tomato'
    setting.isDark = true
    setting.sound = true
    setting.notify = true
    setting.pomodoro = 25
    setting.short = 5
    setting.long = 20
    setting.interval = 4
  }
}
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0;
  position: relative;
  overflow-y: auto;
  background-color: var(--bgc2);
  border-radius: 1rem;
}
fieldset {
  display: flex;
  width: 100%;
  padding: 1rem;
  border: var(--font2) solid 1px;
  border-radius: 1rem;
}
br {
  user-select: none;
}
#theme {
  justify-content: space-between;
}
#duration {
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
#color {
  -webkit-background-clip: text;
  background: linear-gradient(75deg, tomato, sandybrown, seagreen, skyblue, violet);
  background-clip: text;
  font-size: 1.2rem;
  color: transparent;
}
#isDark:hover {
  transform: translateX(-6.25%) rotate(-22.5deg);
}
#moon {
  transform-origin: right bottom;
  position: absolute;
  z-index: 2;
  width: 44px;
  height: 44px;
  transition:
    transform 0.6s,
    background-color 1s;
  background-color: var(--bgc2);
  border-radius: 50%;
}
#sun {
  width: 32px;
  height: 32px;
  transition: background-color 0.2s;
  background-color: var(--font1);
  border: 4px solid var(--bgc2);
  border-radius: 50%;
}
.sun-ray {
  display: block;
  position: absolute;
  z-index: -1;
  width: 4px;
  transition:
    height 0.3s ease-in,
    background-color 0.8s;
  background-color: var(--font1);
}
.sun-ray:nth-child(3) {
  transform: rotate(0deg);
}
.sun-ray:nth-child(4) {
  transform: rotate(45deg);
}
.sun-ray:nth-child(5) {
  transform: rotate(90deg);
}
.sun-ray:nth-child(6) {
  transform: rotate(135deg);
}
span {
  font-weight: 900;
}
.range_set {
  display: flex;
  justify-content: space-between;
  width: 90%;
}
input {
  accent-color: var(--theme1);
  margin: 0.2rem 0.7rem;
  transition: accent-color 1s;
}
input[type='range'] {
  display: block;
  width: 90%;
  cursor: ew-resize;
}
label {
  display: inline-block;
  cursor: pointer;
  font-weight: 900;
}
a {
  cursor: help;
  color: var(--font1);
  text-decoration: none;
}
a:hover {
  text-decoration: underline solid var(--theme1);
}
</style>
