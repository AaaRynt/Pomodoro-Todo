<template>
	<pre style="position: absolute; background-color: gray; opacity: 0.8">
duration:{{ duration }}
remain:{{ remain }}
pomodoroCount:{{ pomodoroCount }}
{{ setting }}
breakTime:{{ breakTime }}
pomodoroTime:{{ pomodoroTime }}

</pre
	>
	<div id="body">
		<div id="Pomodoro">
			<div id="current" :style="{ fontSize: currentTodo?.name ? '1.5rem' : '3rem' }">{{ currentTodo?.name ?? emoji }}</div>
			<div id="box">
				<div id="clock" :style="{ background: `conic-gradient(var(--theme1) 0% ${progress}%,var(--theme3) ${progress}% 100%)` }">
					<div id="countdown">{{ result }}</div>
				</div>
			</div>
			<div id="time_control">
				<button
					type="button"
					:style="{ display: isCountdown ? 'none' : 'flex', cursor: currentTodo?.name ? 'pointer' : 'not-allowed', backgroundColor: currentTodo ? 'var(--theme1)' : 'var(--theme2)' }"
					@click="Start"
					:disabled="!currentTodo?.name"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
						<path
							d="M16.3944 12.0001L10 7.7371V16.263L16.3944 12.0001ZM19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"
						></path></svg
					>{{ remain === duration ? "START" : "Begin" }}
				</button>
				<button type="button" :style="{ display: isCountdown || remain === duration ? 'none' : 'flex' }" @click="Again">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text icon">
						<path
							d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"
						></path></svg
					>Again
				</button>
				<button type="button" :style="{ display: isCountdown ? 'flex' : 'none' }" @click="Pause">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>Pause
				</button>
				<button type="button" :style="{ display: isCountdown ? 'flex' : 'none' }" @click="Finish">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
						<path
							d="M22 4C21.4477 4 21 4.44772 21 5V10.6665L11.7774 4.51806C11.6952 4.4633 11.5987 4.43408 11.5 4.43408C11.2239 4.43408 11 4.65794 11 4.93408V10.6665L1.77735 4.51806C1.69522 4.4633 1.59871 4.43408 1.5 4.43408C1.22386 4.43408 1 4.65794 1 4.93408V19.0656C1 19.1643 1.02922 19.2608 1.08397 19.3429C1.23715 19.5727 1.54759 19.6348 1.77735 19.4816L11 13.3332V19.0656C11 19.1643 11.0292 19.2608 11.084 19.3429C11.2372 19.5727 11.5476 19.6348 11.7774 19.4816L21 13.3332V19C21 19.5523 21.4477 20 22 20C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4ZM3 7.73686L9.39445 11.9998L3 16.2628V7.73686ZM13 16.2628V7.73686L19.3944 11.9998L13 16.2628Z"
						></path></svg
					>Finish
				</button>
			</div>
		</div>
		<nav>
			<RouterLink class="control" to="/chart">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
					<path
						d="M11 7H13V17H11V7ZM15 11H17V17H15V11ZM7 13H9V17H7V13ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"
					></path>
				</svg>
				Chart
			</RouterLink>
			<RouterLink class="control" to="/todos">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
					<path
						d="M17 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H7V0H9V2H15V0H17V2ZM17 4V6H15V4H9V6H7V4H5V20H19V4H17ZM7 8H17V10H7V8ZM7 12H17V14H7V12Z"
					></path>
				</svg>
				Todos
			</RouterLink>
			<RouterLink class="control" to="/setting">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
					<path
						d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"
					></path>
				</svg>
				Setting
			</RouterLink>
		</nav>
		<div id="page">
			<RouterView />
		</div>
		<footer>
			<time :datetime="time.timestamp">{{ time.year }}-{{ time.month.toString().padStart(2, "0") }}-{{ time.date.toString().padStart(2, "0") }}&nbsp{{ time.day }}&nbsp</time>
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
import { onMounted, onUnmounted, ref, reactive, computed, watch } from "vue";
import { setting } from "@/store/setting";
import { pomodoroTime, breakTime, currentTodo, completedTodos } from "@/store/todo";
import { getTimeInfo } from "@/utils/getTimeInfo";
import emojis from "@/assets/emojis.json";
import quotes from "@/assets/quotes.json";

/* ================== 核心状态 ================== */

const mode = ref("pomodoro"); // ...pomodoro | short | long |...
const pomodoroCount = ref(0);
const isCountdown = ref(false);
const hasStarted = ref(false);
const remain = ref(0);

/* ================== 时间长度 ================== */

const duration = computed(() => {
	if (mode.value === "pomodoro") return setting.pomodoro * 60;
	if (mode.value === "short") return setting.short * 60;
	if (mode.value === "long") return setting.long * 60;
});

/* ================== 显示用 ================== */

const emoji = computed(() => pick(emojis));
// prettier-ignore
const result = computed(() => {
	const min = Math.floor(remain.value / 60).toString().padStart(2, "0");
	const sec = (remain.value % 60).toString().padStart(2, "0");
	return `${min}:${sec}`;
});
const progress = computed(() => {
	if (duration.value === 0) return 0;
	return (1 - remain.value / duration.value) * 100;
});

/* ================== 系统时间 ================== */

const time = reactive({
	timestamp: 0,
	year: "1970",
	month: "00",
	date: "00",
	day: "Thu",
	hour: "00",
	minute: "00",
	second: "00",
	blink: true,
});

let timer = null;
let countdownTimer = null;

/* ================== 生命周期 ================== */

onMounted(() => {
	remain.value = duration.value;
	updateTime();
	timer = setInterval(updateTime, 1000);
	if ("Notification" in window && Notification.permission === "default") {
		Notification.requestPermission();
	}
});

onUnmounted(() => {
	clearInterval(timer);
	clearInterval(countdownTimer);
});

/* ================== 监听设置变化 ================== */

watch(
	() => setting.pomodoro,
	() => {
		if (!hasStarted.value && mode.value === "pomodoro") {
			remain.value = duration.value;
		}
	}
);

/* ================== 核心行为 ================== */

function Start() {
	isCountdown.value = true;
	hasStarted.value = true;
	countdownTimer = setInterval(() => {
		if (remain.value > 0) {
			remain.value--;
			if (mode.value === "pomodoro") pomodoroTime.value++;
			else breakTime.value++;
		} else {
			clearInterval(countdownTimer);
			isCountdown.value = false;
			handleFinish();
		}
	}, 1000);
}
function Again() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
	hasStarted.value = false;
	remain.value = duration.value;
}
function Pause() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
}
function Finish() {
	clearInterval(countdownTimer);
	isCountdown.value = false;
	hasStarted.value = false;
	remain.value = 0;
	handleFinish();
}

/* ================== 状态切换核心 ================== */

function handleFinish() {
	if (mode.value === "pomodoro") {
		const info = getTimeInfo();
		currentTodo.value.doneAt = `${info.month}/${info.date} ${info.hour}:${info.minute}`;
		completedTodos.value.push({ ...currentTodo.value });
		currentTodo.value = null;
		pomodoroCount.value++;
		if (pomodoroCount.value % setting.interval === 0) {
			mode.value = "long";
			notify("🛏️ Long Break", pick(quotes.long));
		} else {
			mode.value = "short";
			notify("☕ Short Break", pick(quotes.short));
		}
	} else {
		mode.value = "pomodoro";
		notify("🍅 Pomodoro", pick(quotes.pomodoro));
	}
	remain.value = duration.value;
	Start();
}

/* ================== 工具函数 ================== */
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function updateTime() {
	Object.assign(time, getTimeInfo());
	time.blink = !time.blink;
}
function notify(title, body) {
	if ("Notification" in window && Notification.permission === "granted") {
		new Notification(title, {
			body,
		});
	}
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
	border: 2px;
	border-color: var(--font2);
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
	padding: 0.4rem 0.6rem 0 0.6rem;
	background-color: var(--bgc1);
	font-family: "Delius", cursive;
	color: var(--font1);
}
.icon {
	fill: currentColor;
	width: 1.25rem;
	height: 1.25rem;
}
br {
	user-select: none;
}
button {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--theme1);
	cursor: pointer;
	border: none;
	border-radius: 0.5rem;
	font-family: "Delius", cursive;
	color: var(--bgc1);
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
	margin-right: 0.4rem;
	padding: 2rem 1rem;
	border-style: solid;
	border-radius: 1rem;
}
#current {
	overflow: inherit;
	width: 100%;
	height: 1.5rem;
	font-size: 1.5rem;
	text-align: center;
	word-break: break-word;
	white-space: normal;
}
#box {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 1 0;
	width: 90%;
}
#clock {
	aspect-ratio: 1 / 1;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-radius: 50%;
}
#countdown {
	user-select: none;
	font-variant-numeric: tabular-nums;
	font-feature-settings: "tnum";
	display: flex;
	justify-content: center;
	align-items: center;
	width: 95%;
	height: 95%;
	background-color: var(--bgc2);
	border-radius: 50%;
	font-size: 3rem;
	font-family: "Segoe UI", Consolas, "Courier New", monospace;
	font-weight: 900;
	color: var(--theme1);
}
#time_control {
	display: flex;
	justify-content: space-evenly;
	width: 100%;
}
#time_control button {
	width: 6rem;
	padding: 0.4rem 0;
	transition: background-color 0.2s;
	border: none;
	font-size: 1.2rem;
	font-weight: 900;
}
#time_control button:hover {
	background-color: var(--theme2);
}
#page {
	grid-row: 8 / 100;
	grid-column: 2 / 4;
	margin-top: 0.8rem;
	margin-left: 0.4rem;
	border-style: solid;
	border-radius: 1rem;
}
nav {
	display: flex;
	grid-row: 1 / 8;
	grid-column: 2 / 4;
	margin-left: 0.4rem;
	padding: 0.2rem;
	border-style: solid;
	border-radius: 0.6rem;
	font-family: "Aldrich", sans-serif;
}
.control {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 1 0;
	border-radius: 0.4rem;
	color: var(--font1);
	text-decoration: none;
}
.control.router-link-exact-active {
	background-color: var(--bgc2);
	color: var(--theme1);
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
