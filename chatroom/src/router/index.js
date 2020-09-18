import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'
import Wait from '../views/Wait.vue'
import Bye from '../views/Bye.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/wait',
    name: 'Wait',
    component: Wait,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/bye',
    name: 'Bye',
    component: Bye,
    meta: {
      requiresAuth:true
    }
  },
  {
  path: '/logout',
  name: 'Logout',
  beforeEnter() {
    store.logout()
  }
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => {
    return record.meta.requiresAuth
  })
  if (requiresAuth && !store.$data.isRegistered) {
    next('/login')
  } else {
    next()
  }
})

export default router
