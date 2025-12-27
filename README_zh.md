# Pomodoro-ToDo

[English](README.md) | [中文](README_zh.md)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-42b883.svg)](https://cn.vuejs.org/)
[![Remix Icon](https://img.shields.io/badge/SVG%20from-Remix%20Icon-0066ff.svg)](https://remixicon.com/)

一个为**真实长期使用**而设计的 番茄钟 + To-Do 专注工具。
项目地址：_[https://aaarynt.github.io/Pomodoro-Todo/](https://aaarynt.github.io/Pomodoro-Todo/)_

---

## 项目简介

市面上有很多番茄钟，也有很多 To-Do 应用，但两者往往是割裂的：

- 番茄钟只关心时间，不关心你到底*在做什么*。
- To-Do 只记录完成状态，不关心你付出了多少*专注时间*。

这个前端项目把两者**绑定在一起**：

> 每一次专注，都对应一个具体的任务
> 每一个完成的任务，都有真实的时间成本。

---

## 主要功能

- 自动切换 _番茄钟_ / _短休息_ / _长休息_
- 基于时间戳计算，避免浏览器[后台节流机制(Timer Throttling)](https://developer.chrome.com/blog/timer-throttling-in-chrome-88?hl=zh-cn)
- 计时过程中可手动 _暂停_ / _重新开始_ / _完成_
- _To-Do_ 管理（_进行中_ / _待处理_ / _已完成_）
- **历史数据统计与完成记录展示**
  - 番茄钟累计完成次数
  - 专注总时长
  - 休息总时长
  - 提前完成次数
  - 完成的 _To-Do_ 统计
- 完成的 _To-Do_ 支持导出 `.CSV`
- 本地持久化存储（重新加载页面不丢数据，可重置）
- **主题模式**
  - 暗黑模式 / 亮色模式自动切换
  - 可自定义主题色
- **提醒功能（可关闭）**
  - 随机 emoji、提示语
  - 番茄、短休、长休音效提醒
  - 桌面通知支持
- 计时时长、休息间隔自定义
- **响应式布局**：PC / 手机端自适应

---

## 界面预览

- 五种主题色
  ![THEME](/Image/THEME.png)
- _日_/ _夜_ 间切换
  ![Setting](/Image/Setting.png)
- To-Do 视图
  ![To-Do](/Image/To-Do.png)
- 统计图表
  ![table](/Image/table.png)
- 手机端界面
  ![phone](/Image/Phone.jpg)

---

## 设计理念

- **任务驱动专注:**  
  每个 _番茄钟_ 须要**绑定**一个 _To-Do_，没有任务就无法开始计时。
- **计时实现说明**
  本项目使用 `Date.now()` + 目标时间戳计算剩余时间，而非依赖 `setInterval()` 递减。
  从根本上避免浏览器[后台节流机制(Timer Throttling)](https://developer.chrome.com/blog/timer-throttling-in-chrome-88?hl=zh-cn)导致的计时不准问题。
- **无需账号、无需联网:**  
  使用 `localStorage` 本地存储，数据完全掌控在用户自己手里。
- **为长期使用而不是展示而设计:**  
  UI 克制、交互明确，适配不同设备与使用场景

---

## 技术栈

- [Vue 3 (Composition API)](https://cn.vuejs.org/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Vite](https://cn.vite.dev/)
- Web APIs
  - [Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
  - [Notification API](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API)
  - [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- CSS
  - [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/--*)
  - [响应式布局](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
  - [prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)

---

## 安装与运行

```bash
git clone https://github.com/AaaRynt/Pomodoro-Todo.git
cd Pomodoro-Todo
npm install
npm run dev
```

浏览器打开 _http://localhost:5173_ 查看效果。

---

## ⚠️ 注意事项

本项目部署在 GitHub Pages 上，

由于 Pages 为静态托管，不支持 SPA 的 history 路由回退，

因此在非根路径（如 `/todos`）下刷新页面会出现 **_404_**。

**请通过根路径访问本项目！**

https://aaarynt.github.io/Pomodoro-Todo/

或使用站内导航进行页面切换。

<!-- 可通过 Nginx rewrite 或 404.html 重定向方案解决，但当前未引入服务端 -->

> UI 默认使用英文，词汇极简，图标直观。
> 如有中文需求，欢迎 [PR](https://github.com/AaaRynt/Pomodoro-Todo/pulls) / [Issue](https://github.com/AaaRynt/Pomodoro-Todo/issues)

---

## License

[MIT](LICENSE) © 2025.12 [RynT](https://github.com/AaaRynt)
