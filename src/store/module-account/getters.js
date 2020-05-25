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
  },

  isJudiciaryAccount() {
    return state.accountJurisdictionAreaInfo.level == 1
  },

  isJusticeDepartmentAccount() {
    return state.accountJurisdictionAreaInfo.level == 2
  },

  isJusticeBureauAccount() {
    return state.accountJurisdictionAreaInfo.level == 3
  },

  isJudiceOfficeAccount() {
    return state.accountJurisdictionAreaInfo.level == 4
  }

}
