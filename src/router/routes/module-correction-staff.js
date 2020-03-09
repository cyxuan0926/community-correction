import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.CORRECTION_STAFF,
    component: _import('layout/the-layout'),
    redirect: routesPath.CORRECTION_STAFF_LIST,
    meta: {},
    children: [
      {
        path: routesPath.CORRECTION_STAFF_LIST,
        component: _import('module-correction-staff'),
        meta: {}
      }
    ]
  }
]
