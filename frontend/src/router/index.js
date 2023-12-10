import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/RegisterUser.vue';
import Login from '../components/LoginUser.vue';
import StopsTables from '../components/StopsTables.vue';

const router = createRouter({
history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/stops', component: StopsTables }
    ]
})

export default router