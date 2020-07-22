import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapActions, mapState } from 'vuex'

import '@/base'
import '@/common/filters'
import '@/common/plugins'
import '@/common/directives'
import './assets/styles/index.scss'
import '@/assets/icons/iconfont.css'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    ...mapState('global', ['$loading'])
  },

  methods: {
    ...mapActions('global', ['$showLoading', '$hideLoading'])
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
