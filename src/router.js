import Vue from 'vue'
import VueRouter from 'vue-router'

window.isLogin = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/films',
          component: () => import('./views/Film.vue'),
          children: [
            { path: 'nowPlaying', component: () => import('./components/FilmNowPlaying.vue') },
            { path: 'comingSoon', component: () => import('./components/FilmComingSoon.vue') },
            { path: '', redirect: '/films/nowPlaying' }
          ]
        },
        { path: 'cinemas', component: () => import('./views/Cinema.vue') },
        { path: 'center', component: () => import('./views/Center.vue') }
      ]
    },

    { path: '/film/:id', name: 'detail', component: () => import('./views/Detail.vue') },
    { path: '/city', component: () => import('./views/City.vue') },
    {
      path: '/card',
      component: () => import('./views/Card.vue'),
      beforeEnter: (to, from, next) => {
        // var isLogin = false;
        if (!window.isLogin) {
          // next('/login')
          next({
            path: '/login',
            query: {
              // redirect: '/card'
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/money',
      component: () => import('./views/Money.vue'),
      beforeEnter: (to, from, next) => {
        // var isLogin = false;
        if (!window.isLogin) {
          // next('/login')
          next({
            path: '/login',
            query: {
              // redirect: '/card'
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        console.log('路由的独享守卫,只会在进入 login 的时候触发')
        next()
      }
    },
    { path: '*', redirect: '/films/nowPlaying' }
  ]
})

// 全局的前置守卫
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫')
  console.log(to)
  console.log(from)
  console.log(next)
  next()
})

// 全局的后置钩子
router.afterEach((to, from) => {
  console.log('全局的后置钩子')
})

export default router
