<template>
	<div id="body">
		累计专注，累计休息，累计番茄，提前完成次数
		<table>
			<caption>
				Completed Todos:<span>&nbsp{{ completedTodos.length }}</span>
			</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Add timestamp</th>
					<th>Done timestamp</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="value in completedTodos" :key="value.id">
					<td>{{ value.name }}</td>
					<td>{{ value.addAt }}</td>
					<td>{{ value.doneAt }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { completedTodos } from "@/store/todo";
</script>

<style scoped>
#body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 1rem;
}
caption {
    caption-side: bottom;
}
span {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--theme1);
    text-shadow: 0 0 4px var(--theme3);
}
table {
    border-collapse: collapse;
    width: 100%;
}
td,
th {
    padding: 0.5rem;
    border: 1px solid var(--font2);
    text-align: start;
}
</style>
