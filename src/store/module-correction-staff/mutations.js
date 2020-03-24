import { mutationCorrectionStaff } from './mutation-types'

export default {
  [mutationCorrectionStaff.GET_CORRECTIONAL_PAGE]: (
    state,
    correctionalPage
  ) => {
    const { filterList, totalCount } = correctionalPage

    state.correctionalPage.content = filterList

    state.correctionalPage.totalCount = totalCount
  },

  [mutationCorrectionStaff.SET_CORRECTIONAL_AUTH_RESULT]: (
    state,
    correctionalAuthResult
  ) => {
    const { isPassed, isDenied } = correctionalAuthResult

    state.authResult.isPassed = isPassed

    state.authResult.isDenied = isDenied
  },

  [mutationCorrectionStaff.SET_CORRECTIONAL_EDIT_RESULT]: (state, result) => {
    state.correctionalDetailResult = result
  },

  [mutationCorrectionStaff.SET_CORRECTIONAL_STAFF_FILE_LISTS]: (
    state,
    fileLists
  ) => {
    state.correctionalDetailfileLists = fileLists
  },

  [mutationCorrectionStaff.SET_CORRECTIONAL_STAFF_DETAIL]: (state, detail) => {
    state.correctionalDetail = detail
  }
}
