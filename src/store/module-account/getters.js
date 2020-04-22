import { roles } from '@/common/constants'

export default {
  role(state) {
    const rolesMap = {
      [1]: roles.JUDICIARY_ACCOUNT,

      [2]: roles.JUSTICE_DEPARTMENT_ACCOUNT,

      [3]: roles.JUSTICE_BUREAU_ACCOUNT,

      [4]: roles.JUSTICE_OFFICE_ACCOUNT
    }

    return rolesMap[parseInt(state.accountJurisdictionAreaInfo.level)]
  }
}
