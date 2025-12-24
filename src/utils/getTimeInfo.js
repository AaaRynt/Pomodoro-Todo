export function getTimeInfo() {
	const now = new Date();
	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return {
		timestamp: now.getTime(),
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		date: now.getDate(),
		day: week[now.getDay()],
		hour: now.getHours().toString().padStart(2, "0"),
		minute: now.getMinutes().toString().padStart(2, "0"),
		second: now.getSeconds().toString().padStart(2, "0"),
	};
}
