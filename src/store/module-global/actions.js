import { mutationsGlobal } from './mutation-types'
import { removeStore } from '@/utils/storage'
import { mutationsAccount } from '../module-account/mutation-types'
import { Message } from 'element-ui'
import * as globalAPI from '@/services/api/module-common'

export default {
  setComponentsKeepAlive({ commit }, components) {
    commit(mutationsGlobal.SET_COMPONENTS_KEEPALIVE, components)
  },

  $showLoading({ commit }) {
    commit(mutationsGlobal.SET_LOADING, true)
  },

  $hideLoading({ commit }) {
    commit(mutationsGlobal.SET_LOADING, false)
  },

  logout({ commit, dispatch }) {
    removeStore()
    dispatch('$hideLoading')
    commit(`account/${mutationsAccount.SET_TOKEN}`, {}, { root: true })
    commit(`account/${mutationsAccount.SET_MENUS}`, [], { root: true })
    commit(`account/${mutationsAccount.SET_AUTHORITIES}`, [], { root: true })
    commit(`account/${mutationsAccount.SET_PUBLICUSERINFO}`, {}, { root: true })
    Message.closeAll()
  },

  async getProvinces({ commit }, params) {
    try {
      const { content } = await globalAPI.getProvinces(params)

      commit(mutationsGlobal.SET_PROVINCE, content)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getCities({ commit }, params) {
    try {
      const { content } = await globalAPI.getCities(params)

      commit(mutationsGlobal.SET_CITY, content)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getCounties({ commit }, params) {
    try {
      const { content } = await globalAPI.getCounties(params)

      commit(mutationsGlobal.SET_COUNTY, content)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  }
}
