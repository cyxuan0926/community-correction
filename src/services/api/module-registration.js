import { httpClient } from '../request'

// 报到统计-报到详情
export const getReportDetailsPage = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}

// 报到统计-报到统计报表
export const getReportStatisticsPage = params => {
  return httpClient.get('/report/Statistics', params)
}

// 地图打点分布列表
export const getReportMapmarks = () => {
  return httpClient.get('/report/reportDetails/findAll', {})
}

// 矫正人员详情
export const getReportDetails = params => {
  return httpClient.get('/report/reportDetails/by-id', params)
}

// 矫正人员历史报道日期
export const getReportHistoryDate = params => {
  return httpClient.get('/report/reportDetails/by-username', params)
}
