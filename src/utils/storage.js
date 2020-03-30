const TOKEN = 'token'
const MENUS = 'menus'
const AUTHORITIES = 'authorities'
const PUBLICUSERINFO = 'publicUserInfo'
const ACCOUNTJURISDICTIONAREAINFO = 'accountJurisdictionAreaInfo'

export const getToken = () => {
  const token = localStorage.getItem(TOKEN)

  return token ? JSON.parse(token) : {}
}

export const saveToken = token => {
  localStorage.setItem(TOKEN, JSON.stringify(token))
}

export const getMenus = () => {
  const menus = localStorage.getItem(MENUS)

  return menus ? JSON.parse(menus) : []
}

export const saveMenus = menus => {
  localStorage.setItem(MENUS, JSON.stringify(menus))
}

export const getAuthorities = () => {
  const authorities = localStorage.getItem(AUTHORITIES)

  return authorities ? JSON.parse(authorities) : []
}

export const saveAuthorities = authorities => {
  localStorage.setItem(AUTHORITIES, JSON.stringify(authorities))
}

export const getPublicUserInfo = () => {
  const publicUserInfo = localStorage.getItem(PUBLICUSERINFO)

  return publicUserInfo ? JSON.parse(publicUserInfo) : {}
}

export const savePublicUserInfo = publicUserInfo => {
  localStorage.setItem(PUBLICUSERINFO, JSON.stringify(publicUserInfo))
}

export const getAccountJurisdictionAreaInfo = () => {
  const accountJurisdictionAreaInfo = localStorage.getItem(ACCOUNTJURISDICTIONAREAINFO)

  return accountJurisdictionAreaInfo ? JSON.parse(accountJurisdictionAreaInfo) : {}
}

export const saveAccountJurisdictionAreaInfo = accountJurisdictionAreaInfo => {
  localStorage.setItem(ACCOUNTJURISDICTIONAREAINFO, JSON.stringify(accountJurisdictionAreaInfo))
}

export const removeStore = () => {
  localStorage.clear()
}
