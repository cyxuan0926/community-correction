import * as registrationAPI from '@/services/api/module-registration'

import { mutationRegistration } from './mutation-types'

import { URLConfig } from '@/services/urls'

export default {
  async getReportDetailsPage({ commit }, params) {
    try {
      const { data } = await registrationAPI.getReportDetailsPage(params)

      const { totalCount } = data

      let { list } = data

      list = list.map(item => {
        const { video } = item

        return {
          ...item,
          videoUrl: video ? `${ URLConfig.publicApiHost }/files/${ video }` : ''
        }
      })

      commit(mutationRegistration.GET_REPORT_DETAIL_LISTS, {
        list,
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getReportStatisticsPage({ commit }, params) {
    try {
      const { data } = await registrationAPI.getReportStatisticsPage(params)

      const { list, totalCount } = data

      commit(mutationRegistration.GET_REPORT_STATISTICS_LISTS, {
        list,
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  }
}
