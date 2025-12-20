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
} catch {}

export const setting = reactive(initial);

watch(
	setting,
	() => {
		document.documentElement.style.setProperty("--theme1", setting.theme);
		document.documentElement.style.setProperty("--bgc1", setting.isDark ? "#282c34" : "#abb2bf");
		document.documentElement.style.setProperty("--bgc2", setting.isDark ? "#444" : "#ccc");
		document.documentElement.style.setProperty("--font1", setting.isDark ? "#abb2bf" : "#282c34");
		document.documentElement.style.setProperty("--font2", setting.isDark ? "#ccc" : "#444");
		localStorage.setItem(STORAGE_KEY, JSON.stringify(setting));
	},
	{ deep: true, immediate: true }
);
