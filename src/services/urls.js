const BUILD_ENV = process.env.VUE_APP_BUILD_ENV.toLowerCase()

const config = {
  // 开发/本地环境
  dev: {
    publicApiHost: 'http://qa-auth-api.yuwugongkai.com',
    apiHost: 'http://qa-correction-api.yuwugongkai.com',
    mapKey: '9415fa5f5fd07290d579f5de39ace82f'
  },

  // 测试环境
  staging: {
    publicApiHost: 'http://qa-auth-api.yuwugongkai.com',
    apiHost: 'http://qa-correction-api.yuwugongkai.com',
    mapKey: '9415fa5f5fd07290d579f5de39ace82f'
  },

  // 线上环境
  prod: {
    publicApiHost: 'https://auth-api.yuwugongkai.com',
    apiHost: '',
    mapKey: '9415fa5f5fd07290d579f5de39ace82f'
  }
}

export const URLConfig = config[BUILD_ENV]
