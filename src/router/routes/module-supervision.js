import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.SUPERVISION,
    component: _import('layout/the-layout'),
    redirect: routesPath.SUPERVISION_OUT,
    meta: { title: '监督管理' },
    children: [
      {
        name: 'SupervisionOut',
        path: routesPath.SUPERVISION_OUT,
        component: _import('module-supervision/supervision-out'),
        meta: { title: '外出审批' }
      },
      {
        name: 'SupervisonRemind',
        path: routesPath.SUPERVISION_REMIND,
        component: _import('module-supervision/supervison-remind'),
        meta: { title: '报到提醒' }
      }
    ]
  }
]
