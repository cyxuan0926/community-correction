import { MessageBox } from 'element-ui'

import { URLConfig } from '@/services/urls'

import * as lang from './lang'

export function updateObject(obj, newObj) {
  Object.keys(obj).forEach(k => {
    if (lang.hasValue(newObj[k])) {
      obj[k] = newObj[k]
    }
  })
}

export async function $confirm(message) {
  return await MessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

export function findInTree(arr, filterFn, childKey = 'children') {
  for (let i = 0; i < arr.length; i++) {
    if (filterFn(arr[i])) {
      return { target: arr[i], i, parent: arr }
    }

    if (Array.isArray(arr[i][childKey]) && arr[i][childKey].length > 0) {
      const result = findInTree(arr[i][childKey], filterFn, childKey)

      if (result) {
        return result
      }
    }
  }
}

// 异步加载高德地图
export const MapLoader = () => {
  return new Promise((resolve, reject) => {
    if (window.AMap) resolve(window.AMap)
    else {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${URLConfig.mapKey}&plugin=AMap&callback=initAMp`
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMp = () => {
      resolve(window.AMap)
    }
  })
}
