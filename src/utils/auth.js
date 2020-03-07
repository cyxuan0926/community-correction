import store from '@/store'

import { getToken } from './storage'

import { isEmptyObject } from './lang'

const _hasAuth = auth => store.state.account.authorities.includes(auth)

export const hasAuth = auth => {
  if (Array.isArray(auth)) return auth.some(s => _hasAuth(s))
  else _hasAuth(auth)
}

export const hasLogin = () => {
  const token = getToken()

  return token && !isEmptyObject(token)
}
