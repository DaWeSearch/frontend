import Vue from 'vue'
import VueRouter from 'vue-router'

import Reviews from '../views/Reviews.vue'
import ReviewInfo from '../views/ReviewInfo.vue'
import Search from '../views/Search.vue'
import Score from '../views/Score.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Reviews',
    component: Reviews
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reviewinfo',
    name: 'ReviewInfo',
    component: ReviewInfo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
