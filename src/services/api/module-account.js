import { httpClient } from '../request'

import { URLConfig } from '../urls'

// 公共服务的接口地址
const basicConfig = {
  baseURL: URLConfig.publicApiHost
}

// basicToken的账户/密码
const tokenAuthConfig = {
  username: 'correction.admin',
  password: 'e9425a7911bd406dbc75bd95869e5707'
}

// 获取登陆的token

export const getToken = ({ username, password }) => {
  return httpClient.postForm(
    '/oauth/token',
    {
      username,
      password,
      grant_type: 'password',
      mode: 'account_password'
    },
    Object.assign({}, basicConfig, { auth: tokenAuthConfig })
  )
}

// 获取对应账户在公共服务的信息

export const getPublicUserInfo = () => {
  return httpClient.get('/users/me', {}, basicConfig)
}

// 获取对应账户的菜单信息

export const getMenus = () => {
  return httpClient.get('/menus/my', {}, basicConfig)
}

// 根据username查询账户
export const getAccountByUserName = ({ username }) => {
  return httpClient.get('/sys/user/by-username', { username })
}

// 首页-日历(一个月的数据)
export const getCalendarOfMonthReportDetails = () => {
  return httpClient.get('/report/reportremind/query-month-reportinfo')
}

// 首页-日历(某一天报到情况)
export const getCalendarOfOnedayReportDetails = ({ day }) => {
  return httpClient.get('/report/reportremind/query-oneday-reportinfo', { day })
}

// 首页-临近报到人数统计
export const getReportRemindOfReportNearby = () => {
  return httpClient.get('/report/reportremind/query-reportnear')
}

// 首页-报到期内未报到人数
export const getReportRemindOfUnreportPersons = () => {
  return httpClient.get('/report/reportremind/count-unreportperson')
}
