import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '../components/RegisterComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import StopsTablesComponent from '../components/StopsTablesComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';

const router = createRouter({
history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginComponent },
        { path: '/register', component: RegisterComponent },
        { path: '/stops', component: StopsTablesComponent },
        { path: '/', component: HomeComponent }
    ]
})

export default router