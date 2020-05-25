import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import routes from './routes'
import routesPath from './routes-path'
import { unique } from '@/utils/lang'
import { hasLogin, hasAuth } from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { selector: to.hash }
    else return { x: 0, y: 0 }
  }
})

// 登陆校验
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.noCheckLogin) {
    return next()
  }

  if (hasLogin()) {
    next()
  } else {
    next({ path: routesPath.ACCOUNT_LOGIN, query: { redirect: to.fullPath } })
  }
})

// 路由权限校验
router.beforeEach((to, from, next) => {
  const auth = store.state.account.authorities
  console.log('======= beforeEach', auth)

  if (hasAuth(auth)) next()
  else next({ path: routes.HOME, replace: true })
})

// 动态缓存组件
router.beforeEach((to, from, next) => {
  if (to.meta.componentsUnRemoveKeepAlive) {
    const components = store.state.global.componentsKeepAlive.filter(comp => {
      return to.meta.componentsUnRemoveKeepAlive.includes(comp)
    })

    store.dispatch('global/setComponentsKeepAlive', unique(components))
  } else {
    // 默认移除所有动态缓存的组件
    store.dispatch('global/setComponentsKeepAlive', [])
  }

  // 缓存组件
  if (to.meta.componentsToKeepAlive) {
    store.dispatch(
      'global/setComponentsKeepAlive',
      unique([
        ...to.meta.componentsToKeepAlive,
        ...store.state.global.componentsKeepAlive
      ])
    )
  }

  next()
})

export default router
