import { _import } from '../helper'
import routesPath from '../routes-path'

export default [
  {
    path: routesPath.ACCOUNT_LOGIN,
    component: _import('module-account/account-login/index'),
    meta: { noCheckLogin: true }
  }
]
