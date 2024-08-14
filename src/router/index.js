import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/auth/AuthView.vue'
import RoomList from '../views/rooms/ListView.vue'
import Detail from '../views/rooms/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthView
    },
    {
      path: '/rooms',
      children: [
        {
          path: '',
          name: 'rooms.home',
          component: RoomList
        },
        {
          path: 'detail/:name',
          name: 'rooms.detail',
          component: Detail
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
