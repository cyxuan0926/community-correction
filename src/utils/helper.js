import { MessageBox } from 'element-ui'
import { URLConfig } from '@/services/urls'
import * as lang from './lang'

export { default } from './amapUtil'

//export default AmapUtil;

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
