import { message } from 'ant-design-vue';
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
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/Personal.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token')) {
    if (to.name === 'personal')
      router.push("/")
    else
      next();
  }
  else {
    if (to.name === 'register')
      router.push("/");
    else
      next();
  }
})

export default router
