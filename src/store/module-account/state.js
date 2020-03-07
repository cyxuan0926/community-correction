import {
  getToken,
  getMenus,
  getAuthorities,
  getPublicUserInfo
} from '@/utils/storage'

export default {
  // 权限列表
  authorities: getAuthorities(),

  // 菜单列表
  menus: getMenus(),

  // token
  token: getToken(),

  // 公共服务用户信息
  publicUserInfo: getPublicUserInfo()
}
