import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.ROOT,
    component: _import('layout/the-layout'),
    redirect: routesPath.HOME,
    meta: {},
    children: [
      {
        path: routesPath.HOME,
        component: _import('module-account/account-home'),
        meta: {}
      }
    ]
  }
]
