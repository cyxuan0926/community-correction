import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.SUPERVISION,
    component: _import('layout/the-layout'),
    redirect: routesPath.SUPERVISION_OUT,
    meta: {},
    children: [
      {
        path: routesPath.SUPERVISION_OUT,
        component: _import('module-supervision/supervision-out'),
        meta: {}
      },
      {
        path: routesPath.SUPERVISION_REMIND,
        component: _import('module-supervision/supervison-remind'),
        meta: {}
      }
    ]
  }
]
