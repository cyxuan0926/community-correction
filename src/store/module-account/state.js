import {
  getToken,
  getMenus,
  getAuthorities,
  getPublicUserInfo,
  getAccountJurisdictionAreaInfo
} from '@/utils/storage'

export default {
  // 权限列表
  authorities: getAuthorities(),

  // 菜单列表
  menus: getMenus(),

  // token
  token: getToken(),

  // 登陆账户公共服务基本信息
  publicUserInfo: getPublicUserInfo(),

  // 登陆账户司法机构/地区信息
  accountJurisdictionAreaInfo: getAccountJurisdictionAreaInfo(),

  // 日历-一个月的数据
  calendarMonthReportInfomations: [],

  // 日历-某一天具体的数据
  calendarOnedayReportInfofomations: '',

  // 临近报到人数
  reportRemindNearbyPersons: '',

  // 报到期内未报到人数
  reportRemindUnreportPersons: 0
}
