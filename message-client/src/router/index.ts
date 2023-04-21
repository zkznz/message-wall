import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/wall?id=0',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/wall',
        name: 'wall',
        component: () => import(/* webpackChunkName: "about" */ '../views/WallMessage.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
