<template>
	<div id="body">
		<fieldset id="theme">
			<legend>Select the theme <span id="color">COLOR</span></legend>
			<div id="list">
				<div v-for="value in colors" :key="value">
					<input type="radio" :id="value" :value="value" v-model="setting.theme" :style="{ accentColor: value }" />
					<label :for="value" :style="{ color: value }">{{ value.charAt(0).toUpperCase() + value.slice(1) }}</label>
				</div>
			</div>
			<button id="mode" @click="setting.isDark = !setting.isDark">
				<div id="moon" :style="{ transform: setting.isDark ? 'scale(1) translate(30%, -30%)' : 'scale(0) translate(30%, -30%)' }"></div>
				<div id="sun" :style="{ border: setting.isDark ? '2px solid var(--font1)' : '2px solid var(--bgc2)' }"></div>
				<small v-for="i in 4" :key="i" class="sun-ray" :style="{ height: setting.isDark ? '0px' : '48px' }"></small>
			</button>
		</fieldset>
		<fieldset id="duration">
			<legend><a href="https://en.wikipedia.org/wiki/Pomodoro_Technique#Description" target="_blank">Duration setting</a></legend>
			<div class="range_set">
				<label for="pomodoro">Pomodoro </label><span>{{ setting.pomodoro }} mins</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="pomodoro" step="1" min="10" max="60" v-model.number="setting.pomodoro" /> -->
			<input type="range" id="pomodoro" step="1" min="1" max="60" :value="setting.pomodoro ?? 25" @input="setting.pomodoro = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="short">Short Break</label><span>{{ setting.short }} mins</span>
			</div>
			<!-- BUG: input[type="range"].value === 50
			<input type="range" id="short" step="1" min="3" max="15" v-model.number="setting.short" /> -->
			<input type="range" id="short" step="1" min="3" max="15" :value="setting.short ?? 5" @input="setting.short = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="long">Long Break</label><span>{{ setting.long }} mins</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="long" step="1" min="10" max="30" v-model.number="setting.long" /> -->
			<input type="range" id="long" step="1" min="10" max="30" :value="setting.long ?? 25" @input="setting.long = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="interval">Interval</label><span>{{ setting.interval }} done</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="interval" step="1" min="2" max="6" v-model.number="setting.interval" /> -->
			<input type="range" id="interval" step="1" min="2" max="6" :value="setting.interval ?? 25" @input="setting.interval = Number($event.target.value)" />
			<br />
		</fieldset>
		<button type="reset" id="reset" @click="reset">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon text">
				<path
					d="M12 4C9.4095 4 7.10606 5.23053 5.64274 7.14274L8 9.5H2V3.5L4.21863 5.71863C6.05061 3.452 8.85558 2 12 2 17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20 14.5905 20 16.894 18.7695 18.3573 16.8573L16 14.5 22 14.5V20.5L19.7814 18.2814C17.9494 20.548 15.1444 22 12 22 6.47715 22 2 17.5228 2 12H4Z"
				></path>
			</svg>
			Reset localStorage
		</button>
	</div>
</template>

<script setup>
import { setting } from "@/store/setting";
import { todos, completedTodos } from "@/store/todo";

const colors = ["tomato", "sandybrown", "seagreen", "skyblue", "violet"];

function reset() {
	const ok = confirm("Are you sure?");
	if (ok) {
		setting.theme = "tomato";
		setting.isDark = true;
		setting.pomodoro = 25;
		setting.short = 5;
		setting.long = 20;
		setting.interval = 4;
		todos.value = [];
		completedTodos.value = [];
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
	background: linear-gradient(105deg, tomato, sandybrown, seagreen, skyblue, violet);
	background-clip: text;
	color: transparent;
}
#mode {
	all: unset;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transform: translateX(-200%);
	transition: transform 0.5s !important;
	cursor: pointer;
}
#mode:hover {
	transform: translateX(-200%) rotate(-22.5deg);
}
#moon {
	transform-origin: right bottom;
	position: absolute;
	z-index: 2;
	width: 44px;
	height: 44px;
	transition: transform 0.5s, background-color 0.8s;
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
	transition: height 0.3s ease-in, background-color 0.8s;
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
	transition: accent-color 0.8s;
}
input[type="range"] {
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
	text-decoration: underline solid;
}
#reset {
	padding: 0.4rem 1.6rem;
	background-color: var(--bgc2);
	border: 1px solid var(--font2);
	color: var(--font1);
}
#reset:hover {
	transition: border 0.2s;
	background-color: var(--bgc3);
	border: 1px solid rgb(200, 50, 50);
	color: tomato;
}
</style>
