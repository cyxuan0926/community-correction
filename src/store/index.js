import Vue from 'vue'
import Vuex from 'vuex'

import account from './module-account/index'
import correctionStaff from './module-correction-staff'
import registration from './module-registration'
import supervision from './module-supervision'
import global from './module-global'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    account,
    correctionStaff,
    registration,
    supervision,
    global
  }
})
