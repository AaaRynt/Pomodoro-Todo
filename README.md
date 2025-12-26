# Pomodoro-ToDo

[English](README.md) | [中文](README_zh.md)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-42b883.svg)
![remixicon](https://img.shields.io/badge/SVG%20from-remixicon-0066ff.svg)

A Pomodoro + To-Do focus tool designed for **real-world, long-term use**.
Live demo: _[https://aaarynt.github.io/Pomodoro-Todo/](https://aaarynt.github.io/Pomodoro-Todo/)_

---

## 🧑‍💻 Overview

There are plenty of Pomodoro timers and countless To-Do apps, but they are often disconnected:

- 🍅 Pomodoro timers track time, but not _what_ you are actually working on.
- 📝 To-Do lists track completion status, but not _how much focused time_ a task costs.

This project **binds the two together**:

> 🎯 Every focus session is tied to a specific task
> 📑 Every completed task has a real, measurable time cost

---

## ✨ Features

- 🍅 Automatic switching between Pomodoro / ☕ Short Break / 🛏️ Long Break
- ⏰ Timestamp-based time calculation to avoid browser background throttling
- ⏯️ Manual control during timing: pause / resume / complete
- 📝 To-Do management (active / completed)
- 📊 **Historical statistics and completion records**
  - 🍅 Total Pomodoro sessions completed
  - 🎯 Total focus duration
  - ☕ Total break duration
  - ⚡ Early completion count
- 📤 Export completed tasks as `.CSV`
- 💾 Persistent local storage (data survives reloads, reset supported)
- 🌈 **Theme system**
  - 🌗 Automatic light / dark mode
  - 🎨 Customizable accent colors
- **Notifications (optional)**
  - 🎵 Sound alerts for Pomodoro / short break / long break
  - 🔔 Desktop notifications
- ⏱️ Customizable focus and break durations
- 📱 **Responsive layout**: optimized for both desktop and mobile

---

## 🖼️ 界面预览

- Five theme colors
  ![THEME](/Image/THEME.png)
- Light / dark mode
  ![Setting](/Image/Setting.png)
- To-Do view
  ![To-Do](/Image/To-Do.png)
- Statistics chart
  ![table](/Image/table.png)
- Mobile interface
  ![phone](/Image/Phone.jpg)

---

## 🧩 Design Philosophy

- **🎯 Task-driven focus**
  A Pomodoro session must be **associated** with a To-Do item. No task, no timer.
- **⏰ Timing implementation**
  Remaining time is calculated using `Date.now()` and a target timestamp, rather than decrementing via `setInterval`.
  This fundamentally avoids inaccuracies caused by browser [background timer throttling](https://developer.chrome.com/blog/timer-throttling-in-chrome-88).
- **🔒 No accounts, no network dependency**
  All data is stored locally using `localStorage`. Full user ownership, zero server reliance.
- **🛠️ Built for daily use, not demos**
  A restrained UI, explicit interactions, and adaptability across devices and usage scenarios.

---

## 🧱 Tech Stack

- [Vue 3 (Composition API)](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/)
- Web APIs
  - [Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
  - [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
  - [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- CSS
  - [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*)
  - [Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
  - [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)

---

## 🚀 Installation & Development

```bash
git clone https://github.com/AaaRynt/Pomodoro-Todo.git
cd Pomodoro-Todo
npm install
npm run dev
```

Open _[http://localhost:5173](http://localhost:5173)_ in your browser.

---

## ⚠️ Notes on Deployment

This project is deployed on GitHub Pages.

Since GitHub Pages is a static hosting service, it does not support SPA history-based routing.

Refreshing the page on a non-root route (e.g. `/todos`) will result in a **_404_**.

**Please access the project via the root path:**

[https://aaarynt.github.io/Pomodoro-Todo/](https://aaarynt.github.io/Pomodoro-Todo/)

or navigate using in-app links.

<!-- This can be resolved via Nginx rewrite rules or a 404.html redirect, but no backend is currently introduced -->

> UI 默认使用英文，词汇极简，图标直观。
> 如有中文需求，欢迎 [PR](https://github.com/AaaRynt/Pomodoro-Todo/pulls) / [Issue](https://github.com/AaaRynt/Pomodoro-Todo/issues)

---

## 📄 License

[MIT](LICENSE) © 2025.12 [RynT](https://github.com/AaaRynt)

> UI 默认使用英文，词汇极简，图标直观。
> 如有中文需求，欢迎 [PR](https://github.com/AaaRynt/Pomodoro-Todo/pulls) / [Issue](https://github.com/AaaRynt/Pomodoro-Todo/issues)

---

## 📄 License

[MIT](LICENSE) © 2025.12 [RynT](https://github.com/AaaRynt)
