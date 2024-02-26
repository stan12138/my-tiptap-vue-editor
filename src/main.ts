import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import naive from "./plugins/naive"

createApp(App).use(naive).mount('#app')
