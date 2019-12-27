import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(store.getters.isAuth)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next()
      return
    }
    next('/')
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isAuth) {
      next('/dashboard')
    }
    next();
  } else {
    next()
  }
})


export default router