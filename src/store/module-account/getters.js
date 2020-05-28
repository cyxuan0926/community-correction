import { roles } from '@/common/constants'

const supply0Util = (code) => {
  return code + ( new Array( 12 - code.length ).fill('0') ).join('')
}

export default {

  getJusticeCode(state) {
    let code = state.accountJurisdictionAreaInfo && state.accountJurisdictionAreaInfo.adCode
    return {
      adCode: code.substring(0, 6),
      provinceCode: supply0Util( code.substring(0, 2) ),
      cityCode: supply0Util( code.substring(0, 4) ),
      areaCode: supply0Util( code.substring(0, 6) )
    }
  },

  isJudiciaryAccount(state) {
    return state.accountJurisdictionAreaInfo.level == roles.JUDICIARY_ACCOUNT
  },

  isJusticeDepartmentAccount(state) {
    return state.accountJurisdictionAreaInfo.level == roles.JUSTICE_DEPARTMENT_ACCOUNT
  },

  isJusticeBureauAccount(state) {
    return state.accountJurisdictionAreaInfo.level == roles.JUSTICE_BUREAU_ACCOUNT
  },

  isJudiceOfficeAccount(state) {
    return state.accountJurisdictionAreaInfo.level == roles.JUSTICE_OFFICE_ACCOUNT
  },

  isJusticeStaff(state) {
    return state.token.role == '司法所审核人员'
  }

}
