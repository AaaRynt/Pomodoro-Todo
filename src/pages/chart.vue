<template>
	<div id="body">
		<table>
			<caption title="Well done!">
				Completed Todos:<span id="count">&nbsp{{ completedTodos.length }}</span>
			</caption>
			<thead>
				<tr>
					<th title="🍅">
						<span class="media-text">Pomodoros&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M10.0072 2.10365C8.60556 1.64993 7.08193 2.28104 6.41168 3.59294L5.6059 5.17011C5.51016 5.35751 5.35775 5.50992 5.17036 5.60566L3.59318 6.41144C2.28128 7.08169 1.65018 8.60532 2.10389 10.0069L2.64935 11.6919C2.71416 11.8921 2.71416 12.1077 2.64935 12.3079L2.10389 13.9929C1.65018 15.3945 2.28129 16.9181 3.59318 17.5883L5.17036 18.3941C5.35775 18.4899 5.51016 18.6423 5.6059 18.8297L6.41169 20.4068C7.08194 21.7187 8.60556 22.3498 10.0072 21.8961L11.6922 21.3507C11.8924 21.2859 12.1079 21.2859 12.3081 21.3507L13.9931 21.8961C15.3947 22.3498 16.9183 21.7187 17.5886 20.4068L18.3944 18.8297C18.4901 18.6423 18.6425 18.4899 18.8299 18.3941L20.4071 17.5883C21.719 16.9181 22.3501 15.3945 21.8964 13.9929L21.3509 12.3079C21.2861 12.1077 21.2861 11.8921 21.3509 11.6919L21.8964 10.0069C22.3501 8.60531 21.719 7.08169 20.4071 6.41144L18.8299 5.60566C18.6425 5.50992 18.4901 5.3575 18.3944 5.17011L17.5886 3.59294C16.9183 2.28104 15.3947 1.64993 13.9931 2.10365L12.3081 2.6491C12.1079 2.71391 11.8924 2.71391 11.6922 2.6491L10.0072 2.10365ZM8.19271 4.50286C8.41612 4.06556 8.924 3.8552 9.39119 4.00643L11.0762 4.55189C11.6768 4.74632 12.3235 4.74632 12.9241 4.55189L14.6091 4.00643C15.0763 3.8552 15.5841 4.06556 15.8076 4.50286L16.6133 6.08004C16.9006 6.64222 17.3578 7.09946 17.92 7.38668L19.4972 8.19246C19.9345 8.41588 20.1448 8.92375 19.9936 9.39095L19.4481 11.076C19.2537 11.6766 19.2537 12.3232 19.4481 12.9238L19.9936 14.6088C20.1448 15.076 19.9345 15.5839 19.4972 15.8073L17.92 16.6131C17.3578 16.9003 16.9006 17.3576 16.6133 17.9197L15.8076 19.4969C15.5841 19.9342 15.0763 20.1446 14.6091 19.9933L12.9241 19.4479C12.3235 19.2535 11.6768 19.2535 11.0762 19.4479L9.3912 19.9933C8.924 20.1446 8.41612 19.9342 8.19271 19.4969L7.38692 17.9197C7.09971 17.3576 6.64246 16.9003 6.08028 16.6131L4.50311 15.8073C4.06581 15.5839 3.85544 15.076 4.00668 14.6088L4.55213 12.9238C4.74656 12.3232 4.74656 11.6766 4.55213 11.076L4.00668 9.39095C3.85544 8.92375 4.06581 8.41588 4.50311 8.19246L6.08028 7.38668C6.64246 7.09946 7.09971 6.64222 7.38692 6.08004L8.19271 4.50286ZM6.75972 11.7573L11.0023 15.9999L18.0734 8.92885L16.6592 7.51464L11.0023 13.1715L8.17394 10.343L6.75972 11.7573Z"
							></path>
						</svg>
					</th>
					<th title="🎯">
						<span class="media-text">Focus Time&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12 2.00005C12.5523 2.00005 13 2.44776 13 3.00005C12.9999 3.5523 12.5522 4.00005 12 4.00005C7.58172 4.00005 4 7.58177 4 12C4.00004 16.4183 7.58174 20 12 20C16.4182 20 19.9999 16.4183 20 12C20 11.4478 20.4477 11 21 11C21.5523 11 22 11.4478 22 12C21.9999 17.5229 17.5228 22 12 22C6.47717 22 2.00004 17.5229 2 12C2 6.4772 6.47715 2.00005 12 2.00005ZM12 6.00005C12.5523 6.00005 13 6.44776 13 7.00005C12.9999 7.5523 12.5522 8.00005 12 8.00005C9.79085 8.00005 7.99999 9.79091 7.99999 12C8.00004 14.2092 9.79088 16 12 16C14.2091 16 15.9999 14.2092 16 12C16 11.4478 16.4477 11 17 11C17.5523 11 18 11.4478 18 12C17.9999 15.3137 15.3137 18 12 18C8.68631 18 6.00004 15.3137 6 12C6 8.68634 8.68629 6.00005 12 6.00005ZM17.6562 2.10063C18.0468 1.71011 18.6807 1.71011 19.0713 2.10063C19.4614 2.49111 19.4615 3.12425 19.0713 3.51469L18.3633 4.22075L18.3642 4.22173C17.9737 4.61225 17.9737 5.24526 18.3642 5.63579C18.7548 6.02618 19.3878 6.02627 19.7783 5.63579L20.4853 4.92876C20.8759 4.53845 21.5089 4.53832 21.8994 4.92876C22.2899 5.31921 22.2897 5.95228 21.8994 6.34282L19.7783 8.46489C19.5909 8.6523 19.3363 8.75677 19.0713 8.75688H16.6572L12.707 12.7071C12.3165 13.0974 11.6834 13.0975 11.293 12.7071C10.9025 12.3166 10.9026 11.6836 11.293 11.293L15.2422 7.3438V4.92876C15.2422 4.66362 15.3477 4.40922 15.5351 4.22173L17.6562 2.10063Z"
							></path>
						</svg>
					</th>
					<th title="☕">
						<span class="media-text">Break Time&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M16 13V5H6V13C6 14.1046 6.89543 15 8 15H14C15.1046 15 16 14.1046 16 13ZM5 3H20C21.1046 3 22 3.89543 22 5V8C22 9.10457 21.1046 10 20 10H18V13C18 15.2091 16.2091 17 14 17H8C5.79086 17 4 15.2091 4 13V4C4 3.44772 4.44772 3 5 3ZM18 5V8H20V5H18ZM2 19H20V21H2V19Z"
							></path>
						</svg>
					</th>
					<th title="⚡">
						<span class="media-text">Early Finishes </span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M6.38231 5.9681C7.92199 4.73647 9.87499 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 10.875 3.73647 8.92199 4.9681 7.38231L3.51472 5.92893L4.92893 4.51472L6.38231 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM13 12H16L11 18.5V14H8L13 7.4952V12ZM8 1H16V3H8V1Z"
							></path>
						</svg>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="total">{{ pomodoroTotal }}</td>
					<td class="total mono">{{ totalTime(focusTotal) }}</td>
					<td class="total mono">{{ totalTime(breakTotal) }}</td>
					<td class="total">{{ earlyCompletions }}</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th title="✔" colspan="2">
						<span class="media-text"
							><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="color: var(--theme1)">
								<path
									d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"
								></path></svg
							>&nbspTo-Do Names&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="color: var(--theme1)">
							<path
								d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"
							></path>
						</svg>
					</th>
					<th title="⏲">
						<span class="media-text">Add&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"
							></path>
						</svg>
					</th>
					<th title="⏰">
						<span class="media-text">Done&nbsp</span
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12.0001 22.0001C7.02956 22.0001 3.00012 17.9707 3.00012 13.0001C3.00012 8.02956 7.02956 4.00012 12.0001 4.00012C16.9707 4.00012 21.0001 8.02956 21.0001 13.0001C21.0001 17.9707 16.9707 22.0001 12.0001 22.0001ZM12.0001 20.0001C15.8661 20.0001 19.0001 16.8661 19.0001 13.0001C19.0001 9.13412 15.8661 6.00012 12.0001 6.00012C8.13412 6.00012 5.00012 9.13412 5.00012 13.0001C5.00012 16.8661 8.13412 20.0001 12.0001 20.0001ZM13.0001 13.0001H16.0001V15.0001H11.0001V8.00012H13.0001V13.0001ZM1.74707 6.2826L5.2826 2.74707L6.69682 4.16128L3.16128 7.69682L1.74707 6.2826ZM18.7176 2.74707L22.2532 6.2826L20.839 7.69682L17.3034 4.16128L18.7176 2.74707Z"
							></path>
						</svg>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="value in [...completedTodos].reverse()" :key="value.id">
					<td colspan="2" class="td-text" id="todo-name">{{ value.name }}</td>
					<td class="td-text mono">{{ value.addAt }}</td>
					<td class="td-text mono">{{ value.doneAt }}</td>
				</tr>
			</tbody>
		</table>
		<div class="button-control">
			<button type="button" class="page-button" @click="exportCSV">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path></svg
				>&nbspExport CSV
			</button>
			<button type="reset" class="page-button" @click="reset">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 4C9.4095 4 7.10606 5.23053 5.64274 7.14274L8 9.5H2V3.5L4.21863 5.71863C6.05061 3.452 8.85558 2 12 2 17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20 14.5905 20 16.894 18.7695 18.3573 16.8573L16 14.5 22 14.5V20.5L19.7814 18.2814C17.9494 20.548 15.1444 22 12 22 6.47715 22 2 17.5228 2 12H4Z"
					></path></svg
				>&nbspReset localStorage
			</button>
		</div>
	</div>
</template>

<script setup>
import { todos, completedTodos, pomodoroTotal, focusTotal, breakTotal, earlyCompletions } from "@/store/todo";

function totalTime(sec) {
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	return `${h ? `${h}h` : ""}${m || h ? `${m}m` : ""}${s}s`;
}
function exportCSV() {
	const headers = ["Todo", "AddTimestamp", "DoneTimestamp"];
	const rows = completedTodos.value.map((t) => {
		const name = (t.name ?? "").replace(/"/g, '""');
		return [`"${name}"`, t.addTime, t.doneTime];
	});
	let csv = headers.join(",") + "\n";
	rows.forEach((row) => {
		csv += row.join(",") + "\n";
	});
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `pomodoro_${new Date().toISOString()}.csv`;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 0);
}
function reset() {
	const OK = confirm("Are you sure?");
	if (OK) {
		todos.value = [];
		completedTodos.value = [];
		pomodoroTotal.value = 0;
		focusTotal.value = 0;
		breakTotal.value = 0;
		earlyCompletions.value = 0;
	}
}
</script>

<style scoped>
#body {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	overflow-y: auto;
	padding: 1rem;
	background-color: var(--bgc2);
	border-radius: 1rem;
}
caption {
	caption-side: bottom;
}
#count {
	font-size: 1.5rem;
	font-weight: 900;
	color: var(--theme1);
}
table {
	border-collapse: collapse;
	width: 100%;
}
.total {
	text-align: center;
}
tbody > :nth-child(odd) {
	background-color: var(--bgc3);
}
th,
td {
	width: 25%;
	padding: 0.5rem 0;
	border: 1px solid var(--font2);
	white-space: pre;
}
.td-text {
	padding: 0.5rem 0rem 0.5rem 0.5rem;
}
#todo-name {
	text-decoration: line-through var(--theme1) solid;
}
@media (max-width: 768px) {
	.media-text {
		display: none;
	}
}
</style>
