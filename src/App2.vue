<template></template>

<script setup>
import { reactive, watch } from "vue";

const colors = ["tomato", "sandybrown", "seagreen", "skyblue", "violet"];
const settings = reactive({
	theme: "tomato",
	isDark: true,
	pomodoro: 25,
	short: 5,
	long: 20,
	interval: 4,
});

watch(
	() => settings.theme,
	(val) => {
		document.documentElement.style.setProperty("--theme", val);
	}
);
watch(
	() => settings.isDark,
	(val) => {
		document.documentElement.style.setProperty("--bgc", val ? "#282c34" : "#abb2bf");
		document.documentElement.style.setProperty("--bgc2", val ? "#444" : "#ccc");
		document.documentElement.style.setProperty("--font", val ? "#abb2bf" : "#282c34");
		document.documentElement.style.setProperty("--font2", val ? "#ccc" : "#444");
	}
);
</script>

<style scoped></style>
