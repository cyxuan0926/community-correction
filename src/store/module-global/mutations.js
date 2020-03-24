import { mutationsGlobal } from './mutation-types'

export default {
  [mutationsGlobal.SET_COMPONENTS_KEEPALIVE]: (state, components) => {
    state.componentsKeepAlive = components
  },

  [mutationsGlobal.SET_LOADING]: (state, loading) => {
    state.$loading = loading
  },

  [mutationsGlobal.SET_PROVINCE]: (state, provinceLists) => {
    state.provinceLists = provinceLists
  },

  [mutationsGlobal.SET_CITY]: (state, cityLists) => {
    state.cityLists = cityLists
  },

  [mutationsGlobal.SET_COUNTY]: (state, countyLists) => {
    state.countyLists = countyLists
  }
}
