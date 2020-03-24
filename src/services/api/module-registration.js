import { httpClient } from '../request'

export const getReportDetailsPage = params => {
  return httpClient.get('/report/reportDetails/findPage', params)
}
