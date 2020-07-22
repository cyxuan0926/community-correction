import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.CORRECTION_STAFF,
    component: _import('layout/the-layout'),
    redirect: routesPath.CORRECTION_STAFF_LIST,
    children: [
      {
        name: 'CorrectionStaffList',
        path: routesPath.CORRECTION_STAFF_LIST,
        component: _import('module-correction-staff/correction-staff-list'),
        meta: {
          componentsToKeepAlive: ['correctionStaff'],
          title: '矫正人员管理'
        }
      },
      {
        name: 'CorrectionStaffInformation',
        path: `${routesPath.CORRECTION_STAFF_INFORMATION}/:userName`,
        component: _import(
          'module-correction-staff/correction-staff-information'
        ),
        meta: {
          activeMenu: routesPath.CORRECTION_STAFF_LIST,
          componentsUnRemoveKeepAlive: ['correctionStaff'],
          title: '矫正人员基本信息'
        },
        props: route => ({ userName: route.params.userName })
      }
    ]
  }
]
