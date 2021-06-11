import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/movies/Home.vue'
import About from '../views/About.vue'
import Details from '../views/movies/Details.vue'
import NotFound from '../views/404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
