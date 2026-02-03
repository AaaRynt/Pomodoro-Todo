<template>
  <div id="body">
    <div id="control">
      <input
        type="text"
        v-model="text"
        placeholder="Add new To-Do..."
        maxlength="24"
        @keydown.enter="add"
      />
      <button type="button" @click="add" id="add">
        <RiPlayListAddLine />
      </button>
    </div>
    <p
      id="show"
      :style="{
        display: todos.length ? 'none' : 'block',
      }"
    >
      No pending To-Do
    </p>
    <div
      class="li"
      v-for="todo in todos"
      :key="todo.addTime"
      :style="{
        outline: todo.addTime === activeTodo?.addTime ? 'var(--theme1) 2px solid' : 'none',
      }"
    >
      <button type="button" class="ok" @click="complete(todo)">
        <RiCheckLine />
      </button>
      <button type="button" class="start" @click="start(todo)">
        <RiPlayCircleLine />
      </button>
      <button type="button" class="delete" @click="remove(todo)">
        <RiDeleteBinLine />
      </button>
      <span class="time">{{ todo.addAt }}</span>
      <span class="name">{{ todo.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { setting } from '@/store/setting'
import { todos, completedTodos, activeTodo, earlyCompletions } from '@/store/todo'
import { getTimeInfo } from '@/utils/getTimeInfo'
import pomodoro from '/assets/audios/pencil_check_mark_1-88805.mp3'
import { RiCheckLine, RiDeleteBinLine, RiPlayCircleLine, RiPlayListAddLine } from '@/assets/icons'

const text = ref('')
const pomodoroMp3 = new Audio(pomodoro)

function add() {
  if (!text.value) {
    alert('Please enter text.')
    return
  }
  const info = getTimeInfo()
  todos.value.push({
    addAt: `${info.month}/${info.date} ${info.hour}:${info.minute}`,
    addTime: info.timestamp,
    doneAt: '',
    doneTime: '',
    name: text.value,
  })
  text.value = ''
}
function start(todo) {
  activeTodo.value = todo
}
function complete(todo) {
  if (setting.sound) {
    pomodoroMp3.currentTime = 0
    pomodoroMp3.play()
  }
  earlyCompletions.value++
  const info = getTimeInfo()
  todo.doneTime = info.timestamp
  todo.doneAt = `${info.month}/${info.date} ${info.hour}:${info.minute}`
  completedTodos.value.push({ ...todo })
  if (activeTodo.value?.addTime === todo.addTime) {
    activeTodo.value = null
  }
  remove(todo)
}
function remove(todo) {
  todos.value = todos.value.filter((t) => t.addTime !== todo.addTime)
}
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--bgc2);
  border-radius: 1rem;
  position: relative;
}
#control {
  display: flex;
  gap: 1rem;
  height: 3rem;
  margin: 0.5rem 0 1rem 0;
}
input {
  flex-grow: 1;
  padding: 0 1rem;
  background-color: var(--bgc2);
  border: var(--font2) 2px solid;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Delius', cursive;
  color: var(--font2);
  transition:
    outline 0.1s,
    border 0.1s;
}
input:focus {
  outline: var(--theme1) solid;
  background-color: var(--bgc3);
  border: var(--theme3) solid;
}
#show {
  text-align: center;
  font-size: 1.25rem;
  color: var(--font2);
  font-style: italic;
}
.li {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 3rem;
  min-height: 2rem;
  padding: 0 1.5rem;
  background-color: var(--bgc3);
  border-radius: 1rem;
}
.li .active {
  border: var(--theme1) 2px solid;
}
.ok {
  order: 1;
}
.time {
  order: 2;
  width: 5rem;
  white-space: pre;
}
.name {
  order: 3;
  flex-grow: 1;
  transition: color 0.2s;
}
span {
  display: inline-block;
  position: relative;
}
.start {
  order: 4;
}
.delete {
  order: 5;
}
button:hover {
  color: var(--theme1);
  background-color: var(--bgc3);
}
#add {
  width: 3rem;
  border: 2px solid var(--theme2);
  border-radius: 0.5rem;
}
.ok:hover ~ .name {
  text-decoration: line-through var(--theme1);
}
.start:hover ~ .name {
  color: var(--theme1);
  text-shadow: 0 0 4px var(--theme3);
}
.delete:hover ~ span {
  opacity: 0.7;
  text-decoration: line-through #f00 double;
}
.delete {
  color: #c33;
}
.delete:hover {
  color: #f00;
}
@media (max-width: 768px) {
  #control {
    height: 4rem;
  }
  #add {
    width: 4rem;
    height: 100%;
    border: 2px solid var(--theme2);
    border-radius: 0.5rem;
  }
  input {
    height: 100%;
  }
}
</style>
