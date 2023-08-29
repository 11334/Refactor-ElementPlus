import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../view/Home.vue'
import Container from '../components/container/src/ConstantVue.vue'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Container,
        children: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/chooseIcon',
                component: () => import('../view/chooseIcon/ChooseIcon.vue')
            },
            {
                path: '/chooseArea',
                component: () => import('../view/chooseArea/ChooseArea.vue')
            }
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router