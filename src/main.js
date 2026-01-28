// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-DBVDLF0RZ6')

import './css/index.css'
import './css/global.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

createApp(App).use(router).mount('#app')
