import Vue from 'vue'

import table from './table'
import pagination from './pagination'
import imgViewer from './img-viewer'
import video from './video'
import audio from './audio'
import mapViewer from './map-viewer'

Vue.component('base-table', table)
Vue.component('base-pagination', { ...pagination, inheritAttrs: false })
Vue.component('base-img-viewer', imgViewer)
Vue.component('base-video', video)
Vue.component('base-audio', audio)
Vue.component('base-map-viewer', mapViewer)
