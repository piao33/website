import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import navVue from '@/components/nav.vue';

const app = createApp(App)

app.component('mNav', navVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
