import * as supervisionAPI from '@/services/api/module-supervision'

import { mutationSupervision } from './mutation-types'

export default {
  async getReportRemindLists({ commit }, params) {
    try {
      const { data } = await supervisionAPI.getReportRemindLists(params)

      const { list, totalCount } = data

      commit(mutationSupervision.GET_REPORT_REMIND_LIST, {
        list,
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async sendReportRemind({ commit }) {
    try {
      const { code } = await supervisionAPI.sendReportRemind()

      const isSuccess = code === 200

      commit(mutationSupervision.SET_REPORT_REMIND_RESULT, isSuccess)

      return isSuccess
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getReportOutLists({ commit }, params) {
    try {
      const { data } = await supervisionAPI.getReportOutLists(params)

      const { list = [], totalCount = 0 } = data

      commit(mutationSupervision.GET_REPORT_OUT_LIST, {
        list,
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getReportOutDetails({ commit }, params) {
    try {
      const { data } = await supervisionAPI.getReportOutDetails(params)

      const {
        tripList,
        auditResult,
        auditTime,
        awayReasons,
        correctionName,
        createTime,
        duration,
        refusalReasons,
        roundType,
        sex,
        status
      } = data

      let details = {
        auditResult,
        auditTime,
        awayReasons,
        correctionName,
        createTime,
        duration,
        refusalReasons,
        roundType,
        sex,
        status
      }

      const filterAuditResult = !auditResult ? 0 : 1

      if (tripList && Array.isArray(tripList) && tripList.length) {
        let trips = {}

        tripList.forEach(trip => {
          if (!trip.roundtripType) {
            trips = Object.assign({}, trips, {
              detailedAddress: trip.detailedAddress,
              outwardCityName: trip.fromcityName,
              destinationCityName: trip.tocityName,
              outwardVehicleNum: trip.vehicleNum,
              outwardVehicleType: trip.vehicleType,
              outwardStartTime: trip.startTime,
              outwardeEndTime: trip.endTime
            })
          } else {
            trips = Object.assign({}, trips, {
              backVehicleNum: trip.vehicleNum,
              backVehicleType: trip.vehicleType,
              backStartTime: trip.startTime,
              backEndTime: trip.endTime,
              backDetailedAddress: trip.detailedAddress
            })
          }
        })

        details = {
          ...details,
          ...trips,
          auditResult: filterAuditResult
        }
      }

      commit(mutationSupervision.SET_REPORT_OUT_DETAIL, details)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async approveReportOut({ commit }, params) {
    try {
      const { code } = await supervisionAPI.approveReportOut(params)

      const isSuccess = code === 200

      commit(mutationSupervision.SET_REPORT_OUT_RESULT, isSuccess)

      return isSuccess
    } catch (err) {
      Promise.reject(err)
    }
  }
}
