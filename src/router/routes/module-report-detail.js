import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.REPORT_DETAIL,
    component: _import('layout/the-layout'),
    redirect: routesPath.REPORT_DETAIL_LIST,
    children: [
      {
        name: 'ReportDetailList',
        path: routesPath.REPORT_DETAIL_LIST,
        component: _import('module-report-detail'),
        meta: { title: '报到详情统计' }
      }
    ]
  }
]
