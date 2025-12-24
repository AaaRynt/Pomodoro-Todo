import { ref, watch } from "vue";

const STORAGE_KEY = "pomodoro-todos";
export const todos = ref([]);
export const completedTodos = ref([]);
export const currentTodo = ref(null);
export const pomodoroTotal = ref(0);
export const focusTotal = ref(0);
export const breakTotal = ref(0);
export const earlyCompletions = ref(0);

try {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (raw) {
		const data = JSON.parse(raw);
		todos.value = data.todos ?? [];
		completedTodos.value = data.completedTodos ?? [];
		pomodoroTotal.value = data.pomodoroTotal ?? [];
		focusTotal.value = data.focusTotal ?? [];
		breakTotal.value = data.breakTotal ?? [];
		earlyCompletions.value = data.earlyCompletions ?? [];
	}
} catch (e) {
	console.warn("Failed to load todos from localStorage", e);
}

watch(
	[todos, completedTodos, pomodoroTotal, focusTotal, breakTotal, earlyCompletions],
	() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				todos: todos.value,
				completedTodos: completedTodos.value,
				pomodoroTotal: pomodoroTotal.value,
				focusTotal: focusTotal.value,
				breakTotal: breakTotal.value,
				earlyCompletions: earlyCompletions.value,
			})
		);
	},
	{ deep: true }
);
