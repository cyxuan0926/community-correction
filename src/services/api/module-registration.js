import { httpClient } from '../request'

// 报到统计-报到详情
export const getReportDetailsPage = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}

// 报到统计-报到统计报表
export const getReportStatisticsPage = params => {
  return httpClient.get('/report/Statistics', params)
}

// 非审核-地图打点分布列表
export const getReportMapmarks = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}

// 非审核-地图
export const getReportHistory = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}
