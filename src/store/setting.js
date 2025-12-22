import { reactive, watch } from "vue";

const STORAGE_KEY = "pomodoro-setting";
const defaultSetting = {
	theme: "tomato",
	isDark: true,
	pomodoro: 25,
	short: 5,
	long: 20,
	interval: 4,
};
let initial = { ...defaultSetting };
try {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (raw) {
		initial = { ...defaultSetting, ...JSON.parse(raw) };
	}
} catch (e) {
	console.warn("Failed to load settings.js from localStorage", e);
}
export const setting = reactive(initial);

watch(
	setting,
	() => {
		document.documentElement.style.setProperty("--theme1", setting.theme);
		document.documentElement.style.setProperty("--bgc1", setting.isDark ? "#21252b" : "#ddd");
		document.documentElement.style.setProperty("--bgc2", setting.isDark ? "#282c34" : "#fff");
		document.documentElement.style.setProperty("--bgc3", setting.isDark ? "#2f343e" : "#eee");
		document.documentElement.style.setProperty("--font1", setting.isDark ? "#abb2bf" : "#000");
		document.documentElement.style.setProperty("--font2", setting.isDark ? "#999" : "#333");
		localStorage.setItem(STORAGE_KEY, JSON.stringify(setting));
	},
	{ deep: true, immediate: true }
);
