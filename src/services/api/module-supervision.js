import { httpClient } from '../request'

// 报到提醒-列表
export const getReportRemindLists = params => {
  return httpClient.get('/report/reportremind/query-reportremind-page', params)
}

// 报到提醒-提醒
export const sendReportRemind = () => {
  return httpClient.post('/report/reportremind/batch-send-reportremind')
}

// 外出审批-列表
export const getReportOutLists = params => {
  return httpClient.get('/away-apply/audit/applications', params)
}

// 外出审批-详情
export const getReportOutDetails = ({ applicationId }) => {
  return httpClient.get(`/away-apply/audit/application/${applicationId}`)
}

// 外出审批-审批
export const approveReportOut = params => {
  return httpClient.putForm('/away-apply/audit/application', params)
}
