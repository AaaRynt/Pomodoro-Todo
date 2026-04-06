<template>
  <div id="body">
    <table>
      <caption title="Well done!">
        Completed Todos:<span id="count">&nbsp{{ completedTodos.length }}</span>
      </caption>

      <thead>
        <tr>
          <th title="🍅"><span class="media-text">Pomodoros&nbsp</span><RiVerifiedBadgeLine /></th>
          <th title="🎯"><span class="media-text">Focus Time&nbsp</span><RiTargetLine /></th>
          <th title="☕"><span class="media-text">Break Time&nbsp</span><RiCupLine /></th>
          <th title="⚡"><span class="media-text">Early Finishes </span><RiTimerFlashLine /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="total">{{ pomodoroTotal }}</td>
          <td class="total mono">{{ totalTime(focusTotal) }}</td>
          <td class="total mono">{{ totalTime(breakTotal) }}</td>
          <td class="total">{{ earlyCompletions }}</td>
        </tr>
      </tbody>

      <thead>
        <tr>
          <th title="✔" colspan="2">
            <RiCheckDoubleLin />
            <span class="media-text">&nbspTo-Do Names&nbsp</span>
            <RiCheckDoubleLin class="media-text" />
          </th>
          <th title="⏲"><span class="media-text">Add&nbsp</span><RiTimerLine /></th>
          <th title="⏰"><span class="media-text">Done&nbsp</span><RiAlarmLine /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in [...completedTodos].reverse()" :key="value.addTime">
          <td colspan="2" class="td-text" id="todo-name">{{ value.name }}</td>
          <td class="td-text mono">{{ value.addAt }}</td>
          <td class="td-text mono">{{ value.doneAt }}</td>
        </tr>
      </tbody>
    </table>

    <div class="button-control">
      <button type="button" class="page-button" @click="exportCSV">
        <RiUpload2Line />&nbspExport CSV
      </button>
      <button type="reset" class="page-button" @click="reset">
        <RiRefreshLine />&nbspReset History
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  completedTodos,
  pomodoroTotal,
  focusTotal,
  breakTotal,
  earlyCompletions
} from '@/store/todo'
import {
  RiAlarmLine,
  RiCheckDoubleLin,
  RiCupLine,
  RiRefreshLine,
  RiTargetLine,
  RiTimerFlashLine,
  RiTimerLine,
  RiUpload2Line,
  RiVerifiedBadgeLine
} from '@/assets/icons'

function totalTime(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return `${h ? `${h}h` : ''}${m || h ? `${m}m` : ''}${s}s`
}
function exportCSV() {
  const headers = ['Todo', 'AddTimestamp', 'DoneTimestamp']
  const rows = completedTodos.value.map((t) => {
    const name = (t.name ?? '').replace(/"/g, '""')
    return [`"${name}"`, t.addTime, t.doneTime]
  })
  let csv = headers.join(',') + '\n'
  rows.forEach((row) => {
    csv += row.join(',') + '\n'
  })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `pomodoro_${new Date().toISOString()}.csv`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
function reset() {
  const OK = confirm('Are you sure?')
  if (OK) {
    completedTodos.value = []
    pomodoroTotal.value = 0
    focusTotal.value = 0
    breakTotal.value = 0
    earlyCompletions.value = 0
  }
}
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--bgc2);
  border-radius: 1rem;
}
caption {
  caption-side: bottom;
}
#count {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--theme1);
}
table {
  border-collapse: collapse;
  width: 100%;
}
.total {
  text-align: center;
}
tbody > :nth-child(odd) {
  background-color: var(--bgc3);
}
th,
td {
  width: 25%;
  padding: 0.5rem 0;
  border: 1px solid var(--font2);
  white-space: pre;
}
.td-text {
  padding: 0.5rem 0rem 0.5rem 0.5rem;
}
#todo-name {
  text-decoration: line-through var(--theme2) solid;
}
@media (max-width: 768px) {
  .media-text {
    display: none;
  }
}
</style>
