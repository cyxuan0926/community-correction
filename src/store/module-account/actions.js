import * as accountAPI from '@/services/api/module-account'

import { mutationsAccount } from './mutation-types'

import jwtDecode from 'jwt-decode'

import { isEmptyObject } from '@/utils/lang'

export default {
  // 获取TOKEN
  async getToken({ commit }, { username, password }) {
    try {
      const token = await accountAPI.getToken({ username, password })

      if (token && !isEmptyObject(token)) {
        commit(mutationsAccount.SET_TOKEN, token)
      }

      return token && !isEmptyObject(token)
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取对应账户在公共服务的信息
  async getPublicUserInfo({ commit }) {
    try {
      const publicUserInfo = await accountAPI.getPublicUserInfo()

      commit(mutationsAccount.SET_PUBLICUSERINFO, publicUserInfo)

      return publicUserInfo
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取对应账户的菜单信息
  async getMenus({ commit }) {
    try {
      const menus = await accountAPI.getMenus()

      commit(mutationsAccount.SET_MENUS, menus)

      return menus
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取账户的司法机构/地区信息
  async getAccountByUserName({ commit }, { username }) {
    try {
      const { data } = await accountAPI.getAccountByUserName({ username })

      commit(mutationsAccount.SET_ACCOUNT_JURISDICTION_AREA_INFO, data)

      return data
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 账户登陆
  async login({ commit, dispatch, state }, { username, password }) {
    try {
      // accountJurisdictionAreaInfoResult = false
      let menusResult = false,
        publicUserInfoResult = false

      const tokenResult = await dispatch('getToken', { username, password })

      if (tokenResult) {
        commit(
          mutationsAccount.SET_AUTHORITIES,
          jwtDecode(state.token.access_token).authorities || []
        )

        menusResult = await dispatch('getMenus')

        publicUserInfoResult = await dispatch('getPublicUserInfo')

        await dispatch(
          'getAccountByUserName',
          { username }
        )
      }
      return tokenResult && menusResult && publicUserInfoResult
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取首页日历整个月数据
  async getCalendarOfMonthReportDetails({ commit }) {
    try {
      const { data } = await accountAPI.getCalendarOfMonthReportDetails()

      let showDays = [],
        dayConfigs = []

      data.forEach(item => {
        if (item.state !== '0') {
          const classObj = {
            '1': ['calendar-day_report'],
            '2': [''],
            // '2': ['calendar-day_noreport'],
            '3': ['calendar-day_danger']
          }

          showDays.push(item.day)

          dayConfigs[item.day] = classObj[item.state]
        }
      })

      commit(mutationsAccount.SET_CALENDAR_MONTH_REPORT_INFORMATIONS, {
        showDays,
        dayConfigs
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取首页日历某一个的具体数据
  async getCalendarOfOnedayReportDetails({ commit }, { day }) {
    try {
      const { data } = await accountAPI.getCalendarOfOnedayReportDetails({
        day
      })

      commit(mutationsAccount.SET_CALENDAR_ONEDAY_REPORT_INFORMATIONS, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取临近报到人数统计
  async getReportRemindOfReportNearby({ commit }) {
    try {
      const { data } = await accountAPI.getReportRemindOfReportNearby()

      commit(mutationsAccount.SET_REPORT_REMIND_NEARBY_PERSONS, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  // 获取报到期内未报到人数
  async getReportRemindOfUnreportPersons({ commit }) {
    try {
      const { data } = await accountAPI.getReportRemindOfUnreportPersons()

      commit(mutationsAccount.SET_REPORT_REMIND_UNREPORT_PERSONS, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  }
}
