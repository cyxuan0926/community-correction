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
        component: _import('module-supervision/supervision-out/out-list'),
        meta: {
          title: '外出审批',
          componentsToKeepAlive: ['supervisionOut']
        }
      },
      {
        name: 'SupervisionOutInformation',
        path: `${routesPath.SUPERVISION_OUT_INFORMATION}/:id`,
        component: _import(
          'module-supervision/supervision-out/out-information'
        ),
        meta: {
          activeMenu: routesPath.SUPERVISION_OUT,
          title: '外出审批信息',
          componentsUnRemoveKeepAlive: ['supervisionOut']
        },
        props: route => ({ applicationId: route.params.id })
      },
      {
        name: 'SupervisionRemind',
        path: routesPath.SUPERVISION_REMIND,
        component: _import('module-supervision/supervision-remind'),
        meta: { title: '报到提醒' }
      }
    ]
  }
]
