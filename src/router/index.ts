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
      },
      {
        path: '/trend',
        component: () => import('../view/trend/index.vue')
      },
      {
        path: '/notification',
        component: () => import('../view/notification/index.vue')
      },
      {
        path: '/menu',
        component: () => import('../view/menu/index.vue')
      },
      {
        path: '/progress',
        component: () => import('../view/progress/index.vue')
      },
      {
        path: '/chooseTime',
        component: () => import('../view/chooseTime/index.vue')
      },
      {
        path: '/chooseCity',
        component: () => import('../view/chooseCity/index.vue')
      },
      {
        path: '/form',
        component: () => import('../view/form/index.vue')
      },
      {
        path: '/modalform',
        component: () => import('../view/modalForm/index.vue')
      },
      {
        path: '/table',
        component: () => import('../view/table/index.vue')
      },
    ]
  },

]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router