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
      let menusResult = false,
        publicUserInfoResult = false,
        accountJurisdictionAreaInfoResult = false

      const tokenResult = await dispatch('getToken', { username, password })

      if (tokenResult) {
        commit(
          mutationsAccount.SET_AUTHORITIES,
          jwtDecode(state.token.access_token).authorities || []
        )

        menusResult = await dispatch('getMenus')

        publicUserInfoResult = await dispatch('getPublicUserInfo')

        accountJurisdictionAreaInfoResult = await dispatch('getAccountByUserName', { username })
      }
      return tokenResult && menusResult && publicUserInfoResult && accountJurisdictionAreaInfoResult
    } catch (err) {
      Promise.reject(err)
    }
  }
}
