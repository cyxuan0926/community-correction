import * as correctionStaffAPI from '@/services/api/module-correction-staff'

import { mutationCorrectionStaff } from './mutation-types'

import { filterFileLists } from './helper'

export default {
  async getCorrectionalPage({ commit }, params) {
    try {
      const { data } = await correctionStaffAPI.getCorrectionalPage(params)

      const { totalCount = 0, list = [] } = data

      const filterList = list.map(staff => {
        let filterStaff = {
          attachmentFileList: []
        }

        if (!staff.addressList && !Array.isArray(staff.attachmentFileList))
          filterStaff.addressList = []

        if (!staff.effectiveRange) filterStaff.effectiveRange = 300

        if (staff.attachmentFileList && Array.isArray(staff.attachmentFileList))
          filterStaff.attachmentFileList = filterFileLists(
            staff.attachmentFileList
          )

        return { ...staff, ...filterStaff }
      })

      commit(mutationCorrectionStaff.GET_CORRECTIONAL_PAGE, {
        filterList,
        totalCount
      })
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async authCorrectionalStaff({ commit }, params) {
    try {
      const { code } = await correctionStaffAPI.authCorrectionalStaff(params)

      const isSuccess = code === 200

      const { opStatus } = params

      commit(mutationCorrectionStaff.SET_CORRECTIONAL_AUTH_RESULT, {
        isDenied: opStatus === 'DENIED' && isSuccess,
        isPassed: opStatus === 'PASSED' && isSuccess
      })

      return isSuccess
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getCorrectionalDetail({ commit }, params) {
    try {
      const { data } = await correctionStaffAPI.getCorrectionalDetail(params)

      const { attachmentFileList = [], addressList = [] } = data

      let filterAttachmentFileList = []

      if (attachmentFileList && Array.isArray(attachmentFileList))
        filterAttachmentFileList = filterFileLists(attachmentFileList)

      if (!addressList && !Array.isArray(addressList)) data['addressList'] = []

      commit(
        mutationCorrectionStaff.SET_CORRECTIONAL_STAFF_FILE_LISTS,
        filterAttachmentFileList
      )

      commit(mutationCorrectionStaff.SET_CORRECTIONAL_STAFF_DETAIL, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async saveCorrectionalInformation({ commit }, params) {
    try {
      const { code } = await correctionStaffAPI.saveCorrectionalInformation(
        params
      )

      const isSuccess = code === 200

      commit(mutationCorrectionStaff.SET_CORRECTIONAL_EDIT_RESULT, true)

      return isSuccess
    } catch (err) {
      Promise.reject(err)
    }
  }
}
