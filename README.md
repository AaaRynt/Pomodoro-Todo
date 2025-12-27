# Pomodoro-ToDo

[English](README.md) | [中文](README_zh.md)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-42b883.svg)](https://vuejs.org/)
[![Remix Icon](https://img.shields.io/badge/SVG%20from-Remix%20Icon-0066ff.svg)](https://remixicon.com/)

A Pomodoro + To-Do focus tool designed for **real-world, long-term use**.
Live demo: _[https://aaarynt.github.io/Pomodoro-Todo/](https://aaarynt.github.io/Pomodoro-Todo/)_

---

## Overview

There are plenty of Pomodoro timers and countless To-Do apps, but they are often disconnected:

- Pomodoro timers track time, but not _what_ you are actually working on.
- To-Do lists track completion status, but not _how much focused time_ a task costs.

This project **binds the two together**:

> Every focus session is tied to a specific task
> Every completed task has a real, measurable time cost

---

## Features

- Automatic switching between _Pomodoro_ / _Short Break_ / _Long Break_
- Timestamp-based time calculation to avoid [browser background throttling(Timer Throttling)](https://developer.chrome.com/blog/timer-throttling-in-chrome-88).
- Manual control during timing: _Pause_ / _Again_ / _Finish_
- _To-Do_ management (_active_ / _pend_ / _completed_)
- **Historical statistics and completion records**
  - Total Pomodoro sessions completed
  - Total focus duration
  - Total break duration
  - Early completion count
  - Completed _To-Do_ statistics
- Export completed _To-Do_ as `.CSV`
- Persistent local storage (data survives reloads, reset supported)
- **Theme system**
  - Automatic light / dark mode
  - Customizable accent colors
- **Notifications (optional)**
  - Random emojis and quotes
  - Sound alerts for _Pomodoro_ / _Short Break_ / _Long Break_
  - Desktop notifications
- Customizable focus and break durations
- **Responsive layout**: optimized for both desktop and mobile

---

## UI Preview

- Five theme colors
  ![THEME](/Image/THEME.png)
- _Light_ / _Dark_ mode
  ![Setting](/Image/Setting.png)
- To-Do view
  ![To-Do](/Image/To-Do.png)
- Statistics chart
  ![table](/Image/table.png)
- Mobile interface
  ![phone](/Image/Phone.jpg)

---

## Design Philosophy

- **Task-driven focus**
  Each _Pomodoro_ session must be **associated** with a _To-Do_ item. No task, no timer.
- **Timing implementation**
  Remaining time is calculated using `Date.now()` and a target timestamp, rather than decrementing via `setInterval()`.
  This fundamentally avoids inaccuracies caused by browser [browser background throttling(Timer Throttling)](https://developer.chrome.com/blog/timer-throttling-in-chrome-88).
- **No accounts, no network dependency**
  All data is stored locally using `localStorage`. Full user ownership, zero server reliance.
- **Built for daily use, not demos**
  A restrained UI, explicit interactions, and adaptability across devices and usage scenarios.

---

## Tech Stack

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

## Installation & Development

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

## License

[MIT](LICENSE) © 2025.12 [RynT](https://github.com/AaaRynt)
