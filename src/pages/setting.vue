<template>
	<div id="body">
		<fieldset id="theme">
			<legend>Select the theme <span id="color">COLOR</span></legend>
			<div id="list">
				<div v-for="value in colors" :key="value">
					<input type="radio" :id="value" :value="value" v-model="setting.theme" :style="{ accentColor: value }" />
					<label :for="value" class="label-select" :style="{ color: value, textDecoration: value === setting.theme ? `underline solid ${value}` : `none` }">{{ value.charAt(0).toUpperCase() + value.slice(1) }}</label>
				</div>
			</div>
			<div class="button-control" style="width: 50%">
				<button class="mode" id="isDark" @click="setting.isDark = !setting.isDark">
					<div id="moon" :style="{ transform: setting.isDark ? 'scale(1) translate(30%, -30%)' : 'scale(0) translate(30%, -30%)' }"></div>
					<div id="sun" :style="{ border: setting.isDark ? '2px solid var(--font1)' : '2px solid var(--bgc2)' }"></div>
					<small v-for="i in 4" :key="i" class="sun-ray" :style="{ height: setting.isDark ? '0px' : '48px' }"></small>
				</button>
				<button class="mode" @click="toggleSound">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="prompt" :style="{ display: setting.sound ? 'block' : 'none' }">
						<path d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="prompt" :style="{ display: setting.sound ? 'none' : 'block' }">
						<path d="M10 7.22056L6.60282 10.0001H3V14.0001H6.60282L10 16.7796V7.22056ZM5.88889 16.0001H2C1.44772 16.0001 1 15.5524 1 15.0001V9.00007C1 8.44778 1.44772 8.00007 2 8.00007H5.88889L11.1834 3.66821C11.3971 3.49335 11.7121 3.52485 11.887 3.73857C11.9601 3.8279 12 3.93977 12 4.05519V19.9449C12 20.2211 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16.0001ZM20.4142 12.0001L23.9497 15.5356L22.5355 16.9498L19 13.4143L15.4645 16.9498L14.0503 15.5356L17.5858 12.0001L14.0503 8.46454L15.4645 7.05032L19 10.5859L22.5355 7.05032L23.9497 8.46454L20.4142 12.0001Z"></path>
					</svg>
				</button>
				<button class="mode" @click="setting.notify = !setting.notify">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="prompt" :style="{ display: setting.notify ? 'block' : 'none' }"><path d="M20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="prompt" :style="{ display: setting.notify ? 'none' : 'block' }">
						<path d="M18.5859 20H4.00016C3.72401 20 3.50016 19.7762 3.50016 19.5C3.50016 19.3918 3.53525 19.2866 3.60016 19.2L4.00016 18.6667V10C4.00016 8.67022 4.32462 7.41619 4.8987 6.31279L1.39355 2.80765L2.80777 1.39343L22.6068 21.1924L21.1925 22.6066L18.5859 20ZM6.40776 7.82185C6.14458 8.49707 6.00016 9.23169 6.00016 10V18H16.5859L6.40776 7.82185ZM20.0002 15.7858L18.0002 13.7858V10C18.0002 6.68633 15.3139 4.00003 12.0002 4.00003C10.9117 4.00003 9.89096 4.28986 9.01087 4.79655L7.55919 3.34486C8.8297 2.49537 10.3571 2.00003 12.0002 2.00003C16.4184 2.00003 20.0002 5.58176 20.0002 10V15.7858ZM9.50016 21H14.5002C14.5002 22.3807 13.3809 23.5 12.0002 23.5C10.6194 23.5 9.50016 22.3807 9.50016 21Z"></path>
					</svg>
				</button>
			</div>
		</fieldset>

		<fieldset id="duration">
			<legend><a href="https://en.wikipedia.org/wiki/Pomodoro_Technique#Description" target="_blank">Duration setting</a></legend>
			<div class="range_set">
				<label for="pomodoro">Pomodoro</label><span>{{ setting.pomodoro }}&nbspmins</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="pomodoro" step="1" min="10" max="60" v-model.number="setting.pomodoro" /> -->
			<input type="range" id="pomodoro" step="5" min="10" max="60" :value="setting.pomodoro ?? 25" @input="setting.pomodoro = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="short">Short Break</label><span>{{ setting.short }}&nbspmins</span>
			</div>
			<!-- BUG: input[type="range"].value === 50
			<input type="range" id="short" step="1" min="3" max="15" v-model.number="setting.short" /> -->
			<input type="range" id="short" step="1" min="3" max="15" :value="setting.short ?? 5" @input="setting.short = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="long">Long Break</label><span>{{ setting.long }}&nbspmins</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="long" step="1" min="10" max="30" v-model.number="setting.long" /> -->
			<input type="range" id="long" step="1" min="10" max="30" :value="setting.long ?? 25" @input="setting.long = Number($event.target.value)" />
			<br />
			<div class="range_set">
				<label for="interval">Long Break Interval</label><span>Every&nbsp{{ setting.interval }}&nbspdone</span>
			</div>
			<!-- BUG:input[type="range"].value === 50
			<input type="range" id="interval" step="1" min="2" max="6" v-model.number="setting.interval" /> -->
			<input type="range" id="interval" step="1" min="2" max="6" :value="setting.interval ?? 25" @input="setting.interval = Number($event.target.value)" />
			<br />
		</fieldset>

		<button type="reset" class="page-button" @click="reset">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M12 4C9.4095 4 7.10606 5.23053 5.64274 7.14274L8 9.5H2V3.5L4.21863 5.71863C6.05061 3.452 8.85558 2 12 2 17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20 14.5905 20 16.894 18.7695 18.3573 16.8573L16 14.5 22 14.5V20.5L19.7814 18.2814C17.9494 20.548 15.1444 22 12 22 6.47715 22 2 17.5228 2 12H4Z"></path></svg
			>&nbspReset localStorage
		</button>
	</div>
</template>

<script setup>
import { setting } from "@/store/setting";
import appearance from "@/assets/appearance-effect-6733.mp3";

const colors = ["tomato", "sandybrown", "seagreen", "skyblue", "violet"];
const appearanceMp3 = new Audio(appearance);

function toggleSound() {
	if (!setting.sound) {
		appearanceMp3.currentTime = 0;
		appearanceMp3.play();
	}
	setting.sound = !setting.sound;
}
function reset() {
	const OK = confirm("Are you sure?");
	if (OK) {
		setting.theme = "tomato";
		setting.isDark = true;
		setting.sound = true;
		setting.notify = true;
		setting.pomodoro = 25;
		setting.short = 5;
		setting.long = 20;
		setting.interval = 4;
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
	font-size: 1.2rem;
	color: transparent;
}
.mode {
	all: unset;
	height: 50px;
	width: 50px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 1;
	transition: transform 0.5s,background-color 0.3s;
	cursor: pointer;
}
.mode:not(#isDark):hover {
	background-color: var(--bgc3);
}
#isDark:hover {
	transform: translateX(-6.25%) rotate(-22.5deg);
}
.prompt {
	width: 40px;
	height: 40px;
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
	text-decoration: underline solid var(--theme1);
}
</style>
