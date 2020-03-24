import { httpClient } from '../request'

// 社区矫正人员申请管理-列表
export const getCorrectionalPage = params => {
  return httpClient.get('/correctional/page', params)
}

// 社区矫正人员-审核
export const authCorrectionalStaff = params => {
  return httpClient.postForm('/correctional/auth', params)
}

// 社区矫正人员-详情
export const getCorrectionalDetail = params => {
  return httpClient.get('/correctional/detail', params)
}

// 社区矫正人员信息-保存
export const saveCorrectionalInformation = params => {
  return httpClient.post('/correctional/edit', params)
}
