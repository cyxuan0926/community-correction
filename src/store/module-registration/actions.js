import * as registrationAPI from '@/services/api/module-registration'

import { mutationRegistration } from './mutation-types'

import { URLConfig } from '@/services/urls'

import BigNumber from 'bignumber.js'

export default {
  async getReportDetailsPage({ commit }, params) {
    try {
      const { data } = await registrationAPI.getReportDetailsPage(params)

      const { totalCount } = data

      let { list } = data

      list = list.map(item => {
        const {
          video,
          audio,
          readContent,
          readNumber
        } = item

        return {
          ...item,

          videoUrl: video ? `${ URLConfig.publicApiHost }/files/${ video }` : '',

          audioUrl: audio ? `${ URLConfig.publicApiHost }/files/${ audio }` : '',

          readContents: readContent + ';' + readNumber
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

      list.forEach(element => {
        element.normalReportRate = new BigNumber(element.normalReportRate).times(100).toNumber()
      })

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
