import { mutationSupervision } from './mutation-types'

export default {
  [mutationSupervision.GET_REPORT_REMIND_LIST]: (
    state,
    { list = [], totalCount = 0 }
  ) => {
    state.reportRemindLists.content = list

    state.reportRemindLists.totalCount = totalCount
  },

  [mutationSupervision.SET_REPORT_REMIND_RESULT]: (state, result) => {
    state.reportRemindResult = result
  },

  [mutationSupervision.GET_REPORT_OUT_LIST]: (state, { list, totalCount }) => {
    state.reportOutLists.content = list

    state.reportOutLists.totalCount = totalCount
  },

  [mutationSupervision.SET_REPORT_OUT_DETAIL]: (state, detail) => {
    state.reportOutDetails = detail
  },

  [mutationSupervision.SET_REPORT_REMIND_RESULT]: (state, result) => {
    state.reportOutResult = result
  }
}
