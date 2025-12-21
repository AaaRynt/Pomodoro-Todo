import { ref, watch } from "vue";

const STORAGE_KEY = "pomodoro-todos";
export const pomodoroTime = ref(0);
export const breakTime = ref(0);
export const todos = ref([]);
export const completedTodos = ref([]);
export const currentTodo = ref(null);

try {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (raw) {
		const data = JSON.parse(raw);
		todos.value = data.todos ?? [];
		completedTodos.value = data.completedTodos ?? [];
	}
} catch (e) {
	console.warn("Failed to load todos from localStorage", e);
}

watch(
	[todos, completedTodos],
	() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos: todos.value, completedTodos: completedTodos.value }));
	},
	{ deep: true }
);
