import routesPath from '../routes-path'
import account from './module-account'
import correctionStaff from './module-correction-staff'
import registration from './module-registration'
import supervision from './module-supervision'
import home from './module-home'

export default [
  {
    path: '*',
    redirect: routesPath.HOME,
    meta: {}
  },
  ...account,
  ...correctionStaff,
  ...registration,
  ...supervision,
  ...home
]
