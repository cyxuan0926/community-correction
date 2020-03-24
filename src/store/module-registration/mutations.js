import { mutationRegistration } from './mutation-types'

export default {
  [mutationRegistration.GET_REPORT_DETAIL_LISTS]: (
    state,
    { list = [], totalCount = 0 }
  ) => {
    state.reportDetailLists.content = list
    state.reportDetailLists.totalCount = totalCount
  }
}
