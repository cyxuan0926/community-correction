import { httpClient } from '../request'

// 报到统计-报到详情
export const getReportDetailsPage = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}

// 报到统计-报到统计报表
export const getReportStatisticsPage = params => {
  return httpClient.get('/report/Statistics', params)
}
