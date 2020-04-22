import { mutationsAccount } from './mutation-types'

export default {
  [mutationsAccount.SET_TOKEN]: (state, token) => {
    state.token = token
  },

  [mutationsAccount.SET_MENUS]: (state, menus) => {
    state.menus = menus
  },

  [mutationsAccount.SET_AUTHORITIES]: (state, authorities) => {
    state.authorities = authorities
  },

  [mutationsAccount.SET_PUBLICUSERINFO]: (state, publicUserInfo) => {
    state.publicUserInfo = publicUserInfo
  },

  [mutationsAccount.SET_ACCOUNT_JURISDICTION_AREA_INFO]: (
    state,
    accountJurisdictionAreaInfo
  ) => {
    state.accountJurisdictionAreaInfo = accountJurisdictionAreaInfo
  },

  [mutationsAccount.SET_CALENDAR_MONTH_REPORT_INFORMATIONS]: (
    state,
    calendarMonthReportInfomations
  ) => {
    state.calendarMonthReportInfomations = calendarMonthReportInfomations
  },

  [mutationsAccount.SET_CALENDAR_ONEDAY_REPORT_INFORMATIONS]: (
    state,
    calendarOnedayReportInfofomations
  ) => {
    state.calendarOnedayReportInfofomations = calendarOnedayReportInfofomations
  },

  [mutationsAccount.SET_REPORT_REMIND_NEARBY_PERSONS]: (
    state,
    reportRemindNearbyPersons
  ) => {
    state.reportRemindNearbyPersons = reportRemindNearbyPersons
  },

  [mutationsAccount.SET_REPORT_REMIND_UNREPORT_PERSONS]: (
    state,
    reportRemindUnreportPersons
  ) => {
    state.reportRemindUnreportPersons = reportRemindUnreportPersons
  }
}
