import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.REGISTRATION,
    component: _import('layout/the-layout'),
    redirect: routesPath.CORRECTION_STAFF_LIST,
    children: [
      {
        name: 'Registration',
        path: routesPath.REGISTRATION_LIST,
        component: _import('module-registration/index.vue'),
        meta: { title: '报到统计' }
      }
    ]
  }
]
