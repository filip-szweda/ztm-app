import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/RegisterUser.vue';
import Login from '../components/LoginUser.vue';
import StopsTables from '../components/StopsTables.vue';
import HomePage from '../components/HomePage.vue';

const router = createRouter({
history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/stops', component: StopsTables },
        { path: '/', component: HomePage }
    ]
})

export default router