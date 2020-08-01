import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PopularComponents from '../components/PopularComponents'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/popularProducts',
    name: 'PopularComponents',
    component: PopularComponents
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
