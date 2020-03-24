import Vue from 'vue'
import { toDateString, filterInput } from '@/utils/lang'

Vue.filter('toDateString', toDateString)

Vue.filter('filterInput', filterInput)
