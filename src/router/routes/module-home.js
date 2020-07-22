import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.HOME,
    component: _import('layout/the-layout'),
    redirect: routesPath.HOME,
    children: [
      {
        name: 'Home',
        path: routesPath.HOME,
        component: _import('module-account/account-home'),
        meta: { isTheOnlyRoot: true }
      }
    ]
  }
]
