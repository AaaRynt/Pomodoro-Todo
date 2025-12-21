// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

import { createRouter, createWebHistory } from "vue-router";
import Chart from "@/pages/chart.vue";
import Todos from "@/pages/todos.vue";
import Setting from "@/pages/setting.vue";
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/todos" },
		{ path: "/chart", component: Chart },
		{ path: "/todos", component: Todos },
		{ path: "/setting", component: Setting },
	],
});
export default router;
