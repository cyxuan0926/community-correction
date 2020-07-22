import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import routesPath from '@/router/routes-path'
import { URLConfig } from '@/services/urls'

const tips = (message = '操作失败', type = 'error') => {
  Message.closeAll()
  Message({
    type,
    message,
    duration: 3000,
    showClose: true
  })
}

const codes = {
  200: {
    resData: true
  },
  400: {
    next: params => {
      tips(params.msg || '请求无效')
    }
  },
  401: {
    next: params => {
      tips(params.msg || '身份验证失败，请重新登录')
      store.dispatch('global/logout')
      router.push({
        path: routesPath.ACCOUNT_LOGIN,
        query: { redirect: router.currentRoute.fullPath }
      })
    }
  },
  403: {
    next: params => {
      tips(typeof params === 'string' ? params : '权限不足，请重新登录')
      router.replace({ path: routesPath.HOME })
    }
  },
  404: {
    next: params => {
      tips(params.msg || '找不到对应的资源！')
    }
  },
  405: {
    next: params => {
      tips(params.msg || '请求方法错误！')
    }
  },
  413: {
    next: params => {
      tips(params.msg || '文件过大，请重新上传')
    }
  },
  415: {
    next: params => {
      tips(params.msg || '提交的数据格式错误！')
    }
  },
  500: {
    next: params => {
      tips(params.msg || '服务器内部错误！')
    }
  },
  502: {
    next: params => {
      tips(params.msg || 'Bad Gateway,网关错误！')
    }
  },
  504: {
    next: params => {
      tips(params.msg || '请检查服务是否启动！')
    }
  },
  10006: {
    next: params => {
      tips(params.msg || '账号不存在，请确认用户名或密码错误')
    }
  },
  20002: {
    next: params => {
      tips(params.msg || '登录超时')
      store.dispatch('global/logout')
      router.push({
        path: routesPath.ACCOUNT_LOGIN,
        query: { redirect: router.currentRoute.fullPath }
      })
    }
  },
  99998: {
    next: params => {
      tips(params.msg || '无相应权限，请重新登录')
    }
  },
  '-1': {
    next: params => {
      tips(params.msg)
    }
  }
}

const enToZh = {
  timeout: '请求超时，请稍后重试'
}

const handleErrorMessage = message => {
  let word = Object.keys(enToZh).find(w => {
    return message.indexOf(w) > -1
  })
  return word ? enToZh[word] : message
}

const commonResponseHandler = params => {
  const result = codes[params.status === 200 ? params.data.code : params.status]
  if (!result) {
    tips(params.data ? params.data.msg : handleErrorMessage(params.message))
    return false
  }
  result.next && result.next(params.data, params.config.url)
  if (params.data) return params.data
}

const publicResponseHandler = {
  200: res => {
    return res.data
  },
  // 有些接口正向成功是201
  201: res => {
    return res.data
  },
  // 请求成功 无返回体成功分为正向成功和反向成功 需要区别处理
  204: () => {},
  // 请求失败 有错误返回体
  400: res => {
    res.data && tips(res.data.message)
    return false
  },
  // 未授权
  401: () => {
    tips('请求未授权')
    store.dispatch('global/logout')
    router.push({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
    return false
  },
  // 请求被拒绝
  403: () => {
    tips('请求被拒绝')
    return false
  },
  // 请求资源找不到
  404: () => {},
  // 服务器报错
  500: () => {
    tips('公共服务问题')
    // tips('请求失败，服务器错误')
    return false
  },
  undefined: () => {
    tips('Network Error')
    return false
  }
}

export const responseHandler = response => {
  store.dispatch('global/$hideLoading')

  if (
    response.config &&
    response.config.baseURL &&
    response.config.baseURL === URLConfig.publicApiHost
  )
    return publicResponseHandler[response.status](response)
  else return commonResponseHandler(response)
}
