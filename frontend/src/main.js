import { createApp } from 'vue';
import App from './App.vue';
import AxiosPlugin from './axios-plugin';
import router from './router/index.js'

const app = createApp(App);

app.use(router);

app.use(AxiosPlugin);

app.mount('#app');