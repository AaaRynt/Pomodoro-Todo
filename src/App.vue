<template>
	<pre style="position: absolute; background-color: gray; opacity: 0.8">
duration:{{ duration }}
remain:{{ remain }}
{{ setting }}
</pre
	>
	<div id="body">
		<div id="Pomodoro">
			<div id="current">Current Todo:{{ todo }}</div>
			<div id="box">
				<div id="clock" :style="{ background: `conic-gradient(var(--theme1) 0% ${progress}%,var(--theme3) ${progress}% 100%)` }">
					<div id="countdown">{{ result }}</div>
				</div>
			</div>
			<div id="time_control">
				<button type="button" :style="{ display: isCountdown ? 'none' : 'block' }" @click="start">{{ remain === duration ? "Start" : "Continue" }}</button>
				<button type="button" :style="{ display: isCountdown || remain === duration ? 'none' : 'block' }" @click="restart">ReStart</button>
				<button type="button" :style="{ display: isCountdown ? 'block' : 'none' }" @click="pause">Pause</button>
				<button type="button" :style="{ display: isCountdown ? 'block' : 'none' }" @click="complete">Complete</button>
			</div>
		</div>
		<nav>
			<RouterLink class="control" to="/chart"> Chart </RouterLink>
			<RouterLink class="control" to="/todos"> Todos </RouterLink>
			<RouterLink class="control" to="/setting"> Setting </RouterLink>
		</nav>
		<div id="page">
			<RouterView />
		</div>
		<footer>
			<time :datetime="time.date">{{ time.date }}</time>
			<time :datetime="time">
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
import { onMounted, ref, onUnmounted, reactive, computed, watch } from "vue";
import { setting } from "./store/setting";

const isCountdown = ref(false);
const hasStarted = ref(false);
const duration = ref(setting.pomodoro * 60);
const remain = ref(setting.pomodoro * 60);
const todo = ref("NO");

let timer = null,
	countdownTimer = null;
const time = reactive({
	date: "1970-00-00 Thu",
	hour: "00",
	minute: "00",
	second: "00",
	blink: true,
});

watch(
	() => setting.pomodoro,
	(val) => {
		if (!hasStarted.value) {
			duration.value = val * 60;
			remain.value = val * 60;
		}
	}
);
const result = computed(() => {
	const min = Math.floor(remain.value / 60)
		.toString()
		.padStart(2, "0");
	const sec = (remain.value % 60).toString().padStart(2, "0");
	return `${min}:${sec}`;
});
const progress = computed(() => (1 - remain.value / duration.value) * 100);

onMounted(() => {
	updateTime();
	timer = setInterval(updateTime, 1000);
});
onUnmounted(() => {
	clearInterval(timer);
	clearInterval(countdownTimer);
});
function start() {
	isCountdown.value = true;
	hasStarted.value = true;
	countdownTimer = setInterval(() => {
		if (remain.value > 0) {
			remain.value--;
		} else {
			alert("🍅Pomodoro finished");
			clearInterval(countdownTimer);
			isCountdown.value = false;
			finishPomodoro();
		}
	}, 1000);
}
function restart() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
	hasStarted.value = false;
	remain.value = duration.value;
}
function pause() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
}
function complete() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
	hasStarted.value = false;
	remain.value = 0;
}
function updateTime() {
	const now = new Date();
	const week = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };
	time.blink = !time.blink;
	time.date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${week[now.getDay()]}`;
	time.second = now.getSeconds().toString().padStart(2, "0");
	time.minute = now.getMinutes().toString().padStart(2, "0");
	time.hour = now.getHours().toString().padStart(2, "0");
}
</script>

<style>
:root {
	--bgc1: #282c34;
	--bgc2: #444;
	--font1: #abb2bf;
	--font2: #ccc;
	--theme1: tomato;
	--theme2: color-mix(in srgb, var(--theme1) 80%, #000);
	--theme3: color-mix(in srgb, var(--theme1) 60%, #000);
}
* {
	transition: background-color 0.8s, border 0.8s, color 0.2s;
	border-color: var(--font2);
	border: 2px;
}
::selection {
	background-color: var(--theme1);
	color: var(--bgc1);
}
#body {
	display: grid;
	grid-template-rows: repeat(100, 1fr);
	grid-template-columns: repeat(3, 1fr);
	height: 100%;
	background-color: var(--bgc1);
	color: var(--font1);
	padding: 0.4rem 0.6rem 0 0.6rem;
	font-family: "Delius", cursive;
}
.icon {
	width: 1.25rem;
	height: 1.25rem;
	fill: currentColor;
}
br {
	user-select: none;
}
button {
	font-family: "Delius", cursive;
	background-color: var(--theme1);
	color: var(--bgc1);
	cursor: pointer;
	border: none;
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text {
	margin-right: 0.4rem;
}
#Pomodoro {
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-row: 1 / 100;
	grid-column: 1 / 2;
	padding: 2rem 1rem;
	border-style: solid;
	border-radius: 1rem;
	margin-right: 0.4rem;
}
#Pomodoro button {
	width: 7rem;
	transition: background-color 0.2s;
}
#Pomodoro button:hover {
	background-color: var(--theme2);
}
#box {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 1 0;
	width: 90%;
}
#clock {
	width: 100%;
	border-radius: 50%;
	aspect-ratio: 1 / 1;
	background-color: var(--theme1);
	display: flex;
	justify-content: center;
	align-items: center;
}
#countdown {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 95%;
	height: 95%;
	font-family: "Segoe UI", Consolas, "Courier New", monospace;
	background-color: var(--bgc2);
	border-radius: 50%;
	font-size: 3rem;
	font-weight: 900;
	color: var(--theme1);
	user-select: none;
}
#time_control {
	display: flex;
	justify-content: space-evenly;
	width: 100%;
}
#time_control button {
	border: none;
	padding: 0.4rem 0.8rem;
	font-size: 1.2rem;
	font-weight: 900;
}
#page {
	grid-row: 8 / 100;
	grid-column: 2 / 4;
	border-style: solid;
	border-radius: 1rem;
	margin-left: 0.4rem;
	margin-top: 0.8rem;
}
nav {
	font-family: "Aldrich", sans-serif;
	display: flex;
	grid-row: 1 / 8;
	grid-column: 2 / 4;
	padding: 0.2rem;
	border-style: solid;
	border-radius: 0.6rem;
	margin-left: 0.4rem;
}
.control {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 1 0;
	border-style: solid;
	border-radius: 0.6rem;
	color: var(--font1);
	text-decoration: none;
}
footer {
	grid-row: 100 / 101;
	grid-column: 1 / 4;
	font-family: "Segoe UI", Consolas, "Courier New", monospace;
	text-align: center;
}
.colon {
	transition: opacity 0.1s;
	text-shadow: 0 0 2px;
}
</style>
