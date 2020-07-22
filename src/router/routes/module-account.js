import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    name: 'Login',
    path: routesPath.ACCOUNT_LOGIN,
    component: _import('module-account/account-login'),
    meta: { noCheckLogin: true }
  }
]
