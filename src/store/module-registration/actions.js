import * as registrationAPI from '@/services/api/module-registration'

import { mutationRegistration } from './mutation-types'

export default {
  async getReportDetailsPage({ commit }, params) {
    try {
      const { data } = await registrationAPI.getReportDetailsPage(params)

      const { list, totalCount } = data

      commit(mutationRegistration.GET_REPORT_DETAIL_LISTS, {
        list,
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  }
}
