<template>
	<div id="body">
		<div id="control">
			<input type="text" v-model="text" placeholder="Add new Todo..." maxlength="24" @keydown.enter="add" />
			<button @click="add" id="add" type="button">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 18H12V20H2V18ZM2 11H22V13H2V11ZM2 4H22V6H2V4ZM18 18V15H20V18H23V20H20V23H18V20H15V18H18Z"></path></svg>
			</button>
		</div>
		<div
			id="show"
			:style="{
				display: todos.length ? 'none' : 'block',
			}"
		>
			No pending TO-DO
		</div>
		<div class="li" v-for="todo in todos" :key="todo.key" :style="{ outline: todo.key === currentTodo?.key ? 'var(--theme1) 2px solid' : 'none' }">
			<button type="button" class="ok" @click="complete(todo)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
				</svg>
			</button>
			<button type="button" class="start" @click="start(todo)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z"
					></path>
				</svg>
			</button>
			<button type="button" class="delete" @click="remove(todo)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
				</svg>
			</button>
			<span class="time">{{ todo.addAt }}</span>
			<span class="name">{{ todo.name }}</span>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { getTimeInfo } from "@/utils/getTimeInfo";
import { todos, completedTodos, currentTodo, earlyCompletions } from "@/store/todo";

const text = ref("");
function add() {
	if (!text.value) {
		alert("Please enter text.");
		return;
	}
	const info = getTimeInfo();
	todos.value.push({
		key: Date.now(),
		addAt: `${info.month}/${info.date} ${info.hour}:${info.minute}`,
		addTime: info.timestamp,
		doneAt: "",
		doneTime: "",
		name: text.value,
	});
	text.value = "";
}
function start(todo) {
	currentTodo.value = todo;
}
function complete(todo) {
	earlyCompletions.value++;
	const info = getTimeInfo();
	todo.doneTime = info.timestamp;
	todo.doneAt = `${info.month}/${info.date} ${info.hour}:${info.minute}`;
	completedTodos.value.push({ ...todo });
	if (currentTodo.value?.key === todo.key) {
		currentTodo.value = null;
	}
	remove(todo);
}
function remove(todo) {
	todos.value = todos.value.filter((t) => t.key !== todo.key);
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
	font-family: "Delius", cursive;
	color: var(--font2);
	transition: outline 0.1s, border 0.1s;
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
button {
	background-color: transparent;
	border: none;
	color: var(--font1);
}
button:hover {
	color: var(--theme1);
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
