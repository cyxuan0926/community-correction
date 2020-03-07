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
  }
}
